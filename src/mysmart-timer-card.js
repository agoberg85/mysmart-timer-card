import { LitElement, html, nothing } from 'lit';

import {
  STATUS_ACTIVE,
  STATUS_IDLE,
  STATUS_PAUSED,
  clampDraft,
  displaySeconds,
  finishKey,
  formatPresetDuration,
  formatServiceDuration,
  getTimerSnapshot,
  isFinishedAlarm,
  looksLikeFinish,
  normalizePresets,
  parseActionConfig,
  parseDuration,
  resolveActivePreset,
  splitClock,
  stepDraftField,
} from './mysmart-timer-card-helpers.js';
import { defaultPresets, translateCardString } from './mysmart-timer-card-i18n.js';
import { cardStyles } from './mysmart-timer-card-styles.js';

const TICK_MS = 250;
const DRAG_STEP_PX = 14;
const HOLD_DELAY_MS = 400;
const HOLD_REPEAT_MS = 90;
const DEFAULT_DRAFT_SECONDS = 300;
const STORAGE_PREFIX = 'mysmart-timer-card';

// Config keys that map straight onto CSS custom properties. Background keys accept gradients.
const COLOR_OPTIONS = {
  card_background: '--mysmart-timer-card-background',
  text_color: '--mysmart-timer-ink',
  muted_color: '--mysmart-timer-muted',
  accent_color: '--mysmart-timer-accent',
  digit_color: '--mysmart-timer-digit-color',
  separator_color: '--mysmart-timer-separator-color',
  arrow_color: '--mysmart-timer-arrow-color',
  button_background: '--mysmart-timer-button-background',
  button_color: '--mysmart-timer-button-color',
  play_button_background: '--mysmart-timer-play-background',
  play_button_color: '--mysmart-timer-play-color',
  preset_background: '--mysmart-timer-preset-background',
  preset_icon_background: '--mysmart-timer-preset-icon-background',
  preset_icon_color: '--mysmart-timer-preset-icon-color',
  preset_icon_border: '--mysmart-timer-preset-icon-border',
  preset_active_background: '--mysmart-timer-preset-active-background',
  preset_active_color: '--mysmart-timer-preset-active-color',
  flash_background: '--mysmart-timer-flash-background',
  flash_color: '--mysmart-timer-flash-color',
  presets_width: '--mysmart-timer-presets-width',
  height: '--mysmart-timer-card-height',
};

function readStorage(key) {
  try {
    return window.localStorage?.getItem(key) ?? null;
  } catch (_error) {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    if (value == null) {
      window.localStorage?.removeItem(key);
    } else {
      window.localStorage?.setItem(key, value);
    }
  } catch (_error) {
    // Storage can be unavailable (private mode, blocked site data); the card works without it.
  }
}

function cssSize(value) {
  if (typeof value === 'number' || /^\d+(\.\d+)?$/.test(String(value).trim())) {
    return `${value}px`;
  }
  return String(value);
}

class MySmartTimerCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
      _draft: { state: true },
      _tick: { state: true },
      _dismissedKey: { state: true },
      _observedFinishKey: { state: true },
      _startedPreset: { state: true },
    };
  }

  static get styles() {
    return cardStyles;
  }

  constructor() {
    super();
    this._draft = null;
    this._tick = Date.now();
    this._dismissedKey = '';
    this._observedFinishKey = '';
    this._startedPreset = null;
    this._baseDuration = 0;
    this._clock = null;
    this._previousSnapshot = null;
    this._drag = null;
    this._holdTimer = null;
    this._holdHandled = false;
    this._dragMoveHandler = this._handleDragMove.bind(this);
    this._dragEndHandler = this._handleDragEnd.bind(this);
  }

  setConfig(config) {
    if (!config?.entity) {
      throw new Error('You need to define a timer entity (entity: timer.kitchen)');
    }

    const entityChanged = this.config?.entity !== config.entity;
    this.config = {
      auto_dismiss: 120,
      seconds_step: 5,
      quick_add: [30, 60, 300],
      running_add: 60,
      ...config,
    };

    if (entityChanged) {
      this._restoreLocalState();
    }
  }

  static getStubConfig(hass) {
    const timer = Object.keys(hass?.states || {}).find((entityId) => entityId.startsWith('timer.'));
    return { entity: timer || 'timer.kitchen' };
  }

  getCardSize() {
    return 5;
  }

  getGridOptions() {
    return { columns: 12, rows: 5, min_rows: 4 };
  }

  connectedCallback() {
    super.connectedCallback();
    this._syncClock();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._stopClock();
    this._stopHold();
    this._endDrag();
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    if (changedProperties.has('hass')) {
      this._trackTransitions();
    }

    this._syncClock();
  }

  // ---------------------------------------------------------------- state

  _t(key, params) {
    return translateCardString(this.hass, key, params);
  }

  _storageKey(name) {
    return `${STORAGE_PREFIX}:${this.config?.entity}:${name}`;
  }

  _restoreLocalState() {
    const draft = Number(readStorage(this._storageKey('draft')));
    this._draft = Number.isFinite(draft) && readStorage(this._storageKey('draft')) !== null ? clampDraft(draft) : null;
    this._dismissedKey = readStorage(this._storageKey('dismissed')) || '';
    this._baseDuration = Number(readStorage(this._storageKey('base'))) || 0;

    try {
      const started = JSON.parse(readStorage(this._storageKey('preset')) || 'null');
      this._startedPreset = started && Number.isInteger(started.index) ? started : null;
    } catch (_error) {
      this._startedPreset = null;
    }
  }

  _setDraft(seconds) {
    this._draft = clampDraft(seconds);
    writeStorage(this._storageKey('draft'), String(this._draft));
  }

  _setStartedPreset(value) {
    this._startedPreset = value;
    writeStorage(this._storageKey('preset'), value ? JSON.stringify(value) : null);
  }

  _setBaseDuration(seconds) {
    this._baseDuration = seconds;
    writeStorage(this._storageKey('base'), seconds ? String(seconds) : null);
  }

  _stateObj() {
    return this.hass?.states?.[this.config?.entity];
  }

  _snapshot() {
    return getTimerSnapshot(this._stateObj(), Date.now());
  }

  _currentDraft() {
    if (this._draft != null) {
      return this._draft;
    }

    // First use: start from the helper's configured duration so the card matches the entity.
    const configured = parseDuration(this._stateObj()?.attributes?.duration);
    return clampDraft(configured || DEFAULT_DRAFT_SECONDS);
  }

  _presets() {
    return normalizePresets(this.config?.presets, defaultPresets(this.hass));
  }

  _isAlarm() {
    const stateObj = this._stateObj();
    return isFinishedAlarm(stateObj, {
      nowMs: Date.now(),
      autoDismissSeconds: Number(this.config?.auto_dismiss) || 0,
      dismissedKey: this._dismissedKey,
      observedFinish: Boolean(this._observedFinishKey) && this._observedFinishKey === finishKey(stateObj),
    });
  }

  _trackTransitions() {
    const stateObj = this._stateObj();
    const now = Date.now();

    if (looksLikeFinish(this._previousSnapshot, stateObj, now)) {
      this._observedFinishKey = finishKey(stateObj);
    }

    const snapshot = getTimerSnapshot(stateObj, now);
    if (snapshot.status === STATUS_IDLE && this._startedPreset) {
      this._setStartedPreset(null);
    }
    this._previousSnapshot = snapshot;
  }

  // The clock only ticks while something on screen changes with time: a running countdown,
  // or a flashing alarm that has to auto-dismiss.
  _syncClock() {
    const status = this._stateObj()?.state;
    const shouldRun = this.isConnected && (status === STATUS_ACTIVE || this._isAlarm());

    if (!shouldRun) {
      this._stopClock();
      return;
    }

    if (this._clock) {
      return;
    }

    this._tick = Date.now();
    this._clock = window.setInterval(() => {
      this._tick = Date.now();
    }, TICK_MS);
  }

  _stopClock() {
    if (this._clock) {
      window.clearInterval(this._clock);
      this._clock = null;
    }
  }

  // ---------------------------------------------------------------- timer actions

  _callTimer(service, data = {}) {
    return this.hass.callService('timer', service, { entity_id: this.config.entity, ...data });
  }

  async _start() {
    const snapshot = this._snapshot();

    if (snapshot.status === STATUS_PAUSED) {
      await this._callTimer('start');
      return;
    }

    const draft = this._currentDraft();
    if (draft <= 0) {
      return;
    }

    this._setStartedPreset(null);
    this._setBaseDuration(draft);
    await this._callTimer('start', { duration: formatServiceDuration(draft) });
  }

  async _pause() {
    await this._callTimer('pause');
  }

  async _stop() {
    this._setStartedPreset(null);
    await this._callTimer('cancel');
  }

  async _restart() {
    const snapshot = this._snapshot();
    const duration = this._baseDuration || snapshot.duration;
    if (duration <= 0) {
      return;
    }

    if (this._startedPreset) {
      this._setStartedPreset({ ...this._startedPreset, duration });
    }
    await this._callTimer('start', { duration: formatServiceDuration(duration) });
  }

  // timer.change can't extend past the duration a timer was started with, so adding time to a
  // running timer restarts it with the new remaining time instead.
  async _addTime(seconds) {
    const snapshot = this._snapshot();

    if (snapshot.status === STATUS_IDLE) {
      this._setDraft(this._currentDraft() + seconds);
      return;
    }

    // HA truncates the restart to whole seconds, so round the remainder up to avoid losing a second.
    const nextDuration = Math.max(1, Math.ceil(snapshot.remaining) + seconds);
    if (this._startedPreset) {
      this._setStartedPreset({ ...this._startedPreset, duration: nextDuration });
    }

    await this._callTimer('start', { duration: formatServiceDuration(nextDuration) });
    if (snapshot.status === STATUS_PAUSED) {
      await this._callTimer('pause');
    }
  }

  async _startPreset(preset, index) {
    this._setDraft(preset.duration);
    this._setBaseDuration(preset.duration);
    this._setStartedPreset({ index, duration: preset.duration });
    await this._callTimer('start', { duration: formatServiceDuration(preset.duration) });
  }

  _dismissAlarm(event) {
    event.stopPropagation();
    event.preventDefault();
    const key = finishKey(this._stateObj());
    this._dismissedKey = key;
    this._observedFinishKey = '';
    writeStorage(this._storageKey('dismissed'), key);
    this._runDismissAction();
  }

  // Runs after the flash is already dismissed, so a failed call never leaves the card stuck.
  async _runDismissAction() {
    const action = parseActionConfig(this.config?.dismiss_action);
    if (!action) {
      return;
    }

    try {
      await this.hass.callService(action.domain, action.service, action.data, action.target);
    } catch (error) {
      console.warn('mysmart-timer-card: dismiss_action failed', error);
    }
  }

  // ---------------------------------------------------------------- digit editing

  _secondsStep() {
    return Math.max(1, Math.min(30, Math.round(Number(this.config?.seconds_step) || 5)));
  }

  _fieldStep(field) {
    return field === 'minutes' ? 1 : this._secondsStep();
  }

  _stepField(field, direction) {
    this._setDraft(stepDraftField(this._currentDraft(), field, direction * this._fieldStep(field)));
  }

  _startDrag(event, field) {
    if (!this._isEditable() || (event.pointerType === 'mouse' && event.button !== 0)) {
      return;
    }

    event.preventDefault();
    const target = event.currentTarget;
    this._drag = { field, startY: event.clientY, startDraft: this._currentDraft(), pointerId: event.pointerId, target };

    try {
      target.setPointerCapture?.(event.pointerId);
    } catch (_error) {
      // Pointer capture is a nicety; dragging still works through the window listeners.
    }

    window.addEventListener('pointermove', this._dragMoveHandler);
    window.addEventListener('pointerup', this._dragEndHandler);
    window.addEventListener('pointercancel', this._dragEndHandler);
  }

  _handleDragMove(event) {
    if (!this._drag) {
      return;
    }

    const { field, startY, startDraft } = this._drag;
    const steps = Math.round((startY - event.clientY) / DRAG_STEP_PX);
    this._setDraft(stepDraftField(startDraft, field, steps * this._fieldStep(field)));
  }

  _handleDragEnd() {
    this._endDrag();
  }

  _endDrag() {
    if (this._drag?.target?.hasPointerCapture?.(this._drag.pointerId)) {
      try {
        this._drag.target.releasePointerCapture(this._drag.pointerId);
      } catch (_error) {
        // Ignore release failures.
      }
    }

    window.removeEventListener('pointermove', this._dragMoveHandler);
    window.removeEventListener('pointerup', this._dragEndHandler);
    window.removeEventListener('pointercancel', this._dragEndHandler);
    this._drag = null;
  }

  _handleWheel(event, field) {
    if (!this._isEditable()) {
      return;
    }

    event.preventDefault();
    this._stepField(field, event.deltaY < 0 ? 1 : -1);
  }

  _handleFieldKeydown(event, field) {
    if (!this._isEditable()) {
      return;
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
      event.preventDefault();
      this._stepField(field, 1);
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
      event.preventDefault();
      this._stepField(field, -1);
    }
  }

  // Arrow buttons step once on press and keep stepping while held. Keyboard activation arrives
  // as a plain click, which is ignored when the pointer already handled the press.
  _startHold(event, field, direction) {
    if (!this._isEditable() || (event.pointerType === 'mouse' && event.button !== 0)) {
      return;
    }

    this._holdHandled = true;
    this._stepField(field, direction);
    this._stopHold();
    this._holdTimer = window.setTimeout(() => {
      this._holdTimer = window.setInterval(() => this._stepField(field, direction), HOLD_REPEAT_MS);
    }, HOLD_DELAY_MS);
  }

  _stopHold() {
    if (this._holdTimer) {
      window.clearTimeout(this._holdTimer);
      window.clearInterval(this._holdTimer);
      this._holdTimer = null;
    }
  }

  _handleArrowClick(field, direction) {
    if (this._holdHandled) {
      this._holdHandled = false;
      return;
    }

    this._stepField(field, direction);
  }

  _isEditable() {
    return this._snapshot().status === STATUS_IDLE && !this._isAlarm();
  }

  // ---------------------------------------------------------------- rendering

  _styleMap() {
    return Object.entries(COLOR_OPTIONS)
      .filter(([key]) => this.config?.[key] !== undefined && this.config?.[key] !== '')
      .map(([key, property]) => {
        const value = ['height', 'presets_width'].includes(key) ? cssSize(this.config[key]) : this.config[key];
        return `${property}:${value}`;
      })
      .join(';');
  }

  render() {
    if (!this.config || !this.hass) {
      return nothing;
    }

    const stateObj = this._stateObj();
    if (!stateObj) {
      return html`
        <ha-card class="shell" style=${this._styleMap()}>
          <div class="error">${this._t('missing_entity', { entity: this.config.entity })}</div>
        </ha-card>
      `;
    }

    const snapshot = this._snapshot();
    const alarm = this._isAlarm();
    const editable = snapshot.status === STATUS_IDLE && !alarm;
    const seconds = alarm ? 0 : snapshot.status === STATUS_IDLE ? this._currentDraft() : displaySeconds(snapshot.remaining);
    const presets = this._presets();
    const startedIndex = this._startedPreset && this._startedPreset.duration === snapshot.duration ? this._startedPreset.index : -1;
    const activePreset = resolveActivePreset(presets, snapshot, startedIndex);

    return html`
      <ha-card class="shell ${alarm ? 'is-alarm' : ''}" style=${this._styleMap()}>
        <div class="layout ${presets.length ? '' : 'no-presets'}">
          <div class="main">
            ${this._renderClock(seconds, editable)}
            ${this._renderControls(snapshot)}
          </div>

          ${presets.length ? html`
            <div class="presets">
              ${presets.map((preset, index) => html`
                <button
                  class="preset ${index === activePreset ? 'active' : ''}"
                  aria-pressed=${index === activePreset ? 'true' : 'false'}
                  @click=${() => this._startPreset(preset, index)}
                >
                  <span class="preset-icon"><ha-icon icon=${preset.icon}></ha-icon></span>
                  <span class="preset-copy">
                    <span class="preset-name">${preset.name}</span>
                    ${preset.subtitle ? html`<span class="preset-subtitle">${preset.subtitle}</span>` : nothing}
                  </span>
                  <span class="preset-time">${formatPresetDuration(preset.duration)}</span>
                </button>
              `)}
            </div>
          ` : nothing}

          ${alarm ? html`
            <div
              class="alarm-catcher"
              role="button"
              tabindex="0"
              aria-label=${this._t('timer_done')}
              @pointerdown=${(event) => this._dismissAlarm(event)}
              @keydown=${(event) => { if (event.key === 'Enter' || event.key === ' ') this._dismissAlarm(event); }}
            ></div>
          ` : nothing}
        </div>
      </ha-card>
    `;
  }

  _renderClock(totalSeconds, editable) {
    const { minutes, seconds } = splitClock(totalSeconds);

    return html`
      <div class="clock ${editable ? 'is-editable' : ''}" role="timer" aria-live="off">
        ${this._renderField('minutes', minutes, editable)}
        <div class="separator" aria-hidden="true"><div class="separator-line"><span class="colon">:</span></div></div>
        ${this._renderField('seconds', seconds, editable)}
      </div>
    `;
  }

  _renderField(field, value, editable) {
    const increaseLabel = this._t(field === 'minutes' ? 'increase_minutes' : 'increase_seconds');
    const decreaseLabel = this._t(field === 'minutes' ? 'decrease_minutes' : 'decrease_seconds');

    return html`
      <div class="field">
        ${this._renderArrow(field, 1, 'mdi:chevron-up', increaseLabel, editable)}
        <div
          class="digits"
          role="spinbutton"
          tabindex=${editable ? '0' : '-1'}
          aria-label=${this._t(field)}
          aria-valuenow=${String(Number(value))}
          aria-valuemin="0"
          aria-valuemax=${field === 'minutes' ? '99' : '59'}
          aria-readonly=${editable ? 'false' : 'true'}
          @pointerdown=${(event) => this._startDrag(event, field)}
          @wheel=${(event) => this._handleWheel(event, field)}
          @keydown=${(event) => this._handleFieldKeydown(event, field)}
        >
          ${[...value].map((char) => html`<span class="digit">${char}</span>`)}
        </div>
        ${this._renderArrow(field, -1, 'mdi:chevron-down', decreaseLabel, editable)}
      </div>
    `;
  }

  _renderArrow(field, direction, icon, label, editable) {
    return html`
      <button
        class="arrow"
        aria-label=${label}
        tabindex=${editable ? '0' : '-1'}
        ?disabled=${!editable}
        @pointerdown=${(event) => this._startHold(event, field, direction)}
        @pointerup=${() => this._stopHold()}
        @pointerleave=${() => this._stopHold()}
        @pointercancel=${() => this._stopHold()}
        @click=${() => this._handleArrowClick(field, direction)}
      >
        <ha-icon icon=${icon}></ha-icon>
      </button>
    `;
  }

  _quickAddLabel(seconds) {
    return seconds % 60 === 0 ? `+${seconds / 60} min` : `+${seconds} s`;
  }

  _quickAddAria(seconds) {
    if (seconds === 60) {
      return this._t('add_minute');
    }

    return seconds % 60 === 0
      ? this._t('add_minutes', { count: seconds / 60 })
      : this._t('add_seconds', { count: seconds });
  }

  _renderControls(snapshot) {
    if (snapshot.status === STATUS_IDLE) {
      const quickAdd = (Array.isArray(this.config?.quick_add) ? this.config.quick_add : [])
        .map((value) => parseDuration(value))
        .filter((value) => value > 0);
      const draft = this._currentDraft();

      return html`
        <div class="controls">
          ${quickAdd.map((seconds) => html`
            <button class="chip" aria-label=${this._quickAddAria(seconds)} @click=${() => this._addTime(seconds)}>
              ${this._quickAddLabel(seconds)}
            </button>
          `)}
          <button class="round-button" aria-label=${this._t('clear')} ?disabled=${draft <= 0} @click=${() => this._setDraft(0)}>
            <ha-icon icon="mdi:backspace-outline"></ha-icon>
          </button>
          <button class="play-button" aria-label=${this._t('start')} ?disabled=${draft <= 0} @click=${() => this._start()}>
            <ha-icon icon="mdi:play"></ha-icon>
          </button>
        </div>
      `;
    }

    // running_add: 0 hides the chip; stop and restart are always shown.
    const runningAdd = parseDuration(this.config?.running_add);
    const isActive = snapshot.status === STATUS_ACTIVE;

    return html`
      <div class="controls">
        <button class="round-button" aria-label=${this._t('stop')} @click=${() => this._stop()}>
          <ha-icon icon="mdi:close"></ha-icon>
        </button>
        <button class="round-button" aria-label=${this._t('restart')} @click=${() => this._restart()}>
          <ha-icon icon="mdi:restart"></ha-icon>
        </button>
        ${runningAdd > 0 ? html`
          <button class="chip" aria-label=${this._quickAddAria(runningAdd)} @click=${() => this._addTime(runningAdd)}>
            ${this._quickAddLabel(runningAdd)}
          </button>
        ` : nothing}
        <button
          class="play-button"
          aria-label=${isActive ? this._t('pause') : this._t('resume')}
          @click=${() => (isActive ? this._pause() : this._start())}
        >
          <ha-icon icon=${isActive ? 'mdi:pause' : 'mdi:play'}></ha-icon>
        </button>
      </div>
    `;
  }
}

if (!customElements.get('mysmart-timer-card')) {
  customElements.define('mysmart-timer-card', MySmartTimerCard);
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'mysmart-timer-card',
  name: 'MySmart Timer Card',
  description: 'A touch-friendly kitchen timer driven by a timer helper, with draggable digits and presets.',
});
