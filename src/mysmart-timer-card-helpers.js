export const STATUS_IDLE = 'idle';
export const STATUS_ACTIVE = 'active';
export const STATUS_PAUSED = 'paused';

// MM:SS editor tops out at 99:59; longer timers still display, they just can't be dialled in.
export const MAX_DRAFT_SECONDS = 99 * 60 + 59;

// Parses the duration formats Home Assistant and card configs use into whole seconds:
// numbers (seconds), "H:MM:SS", "MM:SS", "1 day, 0:05:00" and { hours, minutes, seconds }.
export function parseDuration(value) {
  if (value == null || value === '') {
    return 0;
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0;
  }

  if (typeof value === 'object') {
    const hours = Number(value.hours) || 0;
    const minutes = Number(value.minutes) || 0;
    const seconds = Number(value.seconds) || 0;
    return Math.max(0, Math.round(hours * 3600 + minutes * 60 + seconds));
  }

  let text = String(value).trim();
  let days = 0;
  const dayMatch = text.match(/^(-?\d+)\s+days?,\s*(.*)$/);
  if (dayMatch) {
    days = Number(dayMatch[1]) || 0;
    text = dayMatch[2];
  }

  if (/^\d+(\.\d+)?$/.test(text)) {
    return Math.max(0, Math.round(days * 86400 + Number(text)));
  }

  const parts = text.split(':').map((part) => Number(part));
  if (!parts.length || parts.some((part) => !Number.isFinite(part))) {
    return 0;
  }

  const [hours, minutes, seconds] = parts.length === 3
    ? parts
    : parts.length === 2
      ? [0, parts[0], parts[1]]
      : [0, 0, parts[0]];

  return Math.max(0, Math.round(days * 86400 + hours * 3600 + minutes * 60 + seconds));
}

// Formats seconds as the "HH:MM:SS" string the timer.start service accepts.
export function formatServiceDuration(totalSeconds) {
  const safe = Math.max(0, Math.round(Number(totalSeconds) || 0));
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  return [hours, minutes, seconds].map((part) => String(part).padStart(2, '0')).join(':');
}

// Splits seconds into the two big clock fields. Minutes are total minutes, so 75 min shows as 75:00.
export function splitClock(totalSeconds) {
  const safe = Math.max(0, Math.floor(Number(totalSeconds) || 0));
  return {
    minutes: String(Math.floor(safe / 60)).padStart(2, '0'),
    seconds: String(safe % 60).padStart(2, '0'),
  };
}

// Short label for preset rows, e.g. 360 -> "06:00", 3900 -> "1:05:00".
export function formatPresetDuration(totalSeconds) {
  const safe = Math.max(0, Math.round(Number(totalSeconds) || 0));
  if (safe >= 3600) {
    const hours = Math.floor(safe / 3600);
    const { minutes, seconds } = splitClock(safe % 3600);
    return `${hours}:${minutes}:${seconds}`;
  }

  const { minutes, seconds } = splitClock(safe);
  return `${minutes}:${seconds}`;
}

export function clampDraft(totalSeconds) {
  return Math.max(0, Math.min(MAX_DRAFT_SECONDS, Math.round(Number(totalSeconds) || 0)));
}

// Adjusts one clock field without touching the other: minutes move 0-99, seconds wrap 0-59.
export function stepDraftField(totalSeconds, field, delta) {
  const safe = clampDraft(totalSeconds);
  let minutes = Math.floor(safe / 60);
  let seconds = safe % 60;

  if (field === 'minutes') {
    minutes = Math.max(0, Math.min(99, minutes + delta));
  } else {
    seconds = ((seconds + delta) % 60 + 60) % 60;
  }

  return clampDraft(minutes * 60 + seconds);
}

// Normalizes a timer entity into what the card renders. Remaining time for an active timer is
// derived from finishes_at so the countdown stays smooth between state updates.
export function getTimerSnapshot(stateObj, nowMs = Date.now()) {
  if (!stateObj) {
    return { status: STATUS_IDLE, remaining: 0, duration: 0, finishesAt: 0 };
  }

  const attributes = stateObj.attributes || {};
  const status = [STATUS_ACTIVE, STATUS_PAUSED].includes(stateObj.state) ? stateObj.state : STATUS_IDLE;
  const duration = parseDuration(attributes.duration);
  const finishesAt = attributes.finishes_at ? Date.parse(attributes.finishes_at) : 0;
  let remaining = 0;

  if (status === STATUS_ACTIVE && Number.isFinite(finishesAt) && finishesAt > 0) {
    remaining = Math.max(0, (finishesAt - nowMs) / 1000);
  } else if (status === STATUS_ACTIVE || status === STATUS_PAUSED) {
    remaining = parseDuration(attributes.remaining);
  }

  return {
    status,
    remaining,
    duration,
    finishesAt: Number.isFinite(finishesAt) ? finishesAt : 0,
  };
}

// Whole seconds to show. Rounds up so a fresh 6:00 timer reads 06:00 and 00:00 only appears at the end.
export function displaySeconds(remaining) {
  return Math.max(0, Math.ceil((Number(remaining) || 0) - 0.05));
}

// A stable id for one "finished" occurrence, used to remember that the user dismissed it.
export function finishKey(stateObj) {
  return stateObj ? `${stateObj.entity_id}|${stateObj.last_changed || ''}` : '';
}

// True when the timer entity reports it ran out (not cancelled) and the alarm is still within
// the auto-dismiss window. autoDismissSeconds <= 0 keeps it flashing until tapped.
export function isFinishedAlarm(stateObj, { nowMs = Date.now(), autoDismissSeconds = 0, dismissedKey = '', observedFinish = false } = {}) {
  if (!stateObj || stateObj.state !== STATUS_IDLE) {
    return false;
  }

  const finishedByAttribute = stateObj.attributes?.last_transition === 'finished';
  if (!finishedByAttribute && !observedFinish) {
    return false;
  }

  if (dismissedKey && dismissedKey === finishKey(stateObj)) {
    return false;
  }

  if (autoDismissSeconds > 0) {
    const finishedAt = Date.parse(stateObj.last_changed || '');
    if (Number.isFinite(finishedAt) && nowMs - finishedAt > autoDismissSeconds * 1000) {
      return false;
    }
  }

  return true;
}

// Older Home Assistant versions lack last_transition, so the card also treats an observed
// active -> idle change at (or after) the expected finish time as a finish.
export function looksLikeFinish(previousSnapshot, nextStateObj, nowMs = Date.now()) {
  return Boolean(
    previousSnapshot
    && previousSnapshot.status === STATUS_ACTIVE
    && nextStateObj?.state === STATUS_IDLE
    && previousSnapshot.finishesAt > 0
    && previousSnapshot.finishesAt <= nowMs + 1500,
  );
}

// An explicit `presets: []` hides the preset column; leaving presets out uses the defaults.
export function normalizePresets(presets, fallback = []) {
  const source = Array.isArray(presets) ? presets : fallback;
  return source
    .filter((preset) => preset && typeof preset === 'object')
    .map((preset) => ({
      name: String(preset.name ?? ''),
      subtitle: String(preset.subtitle ?? ''),
      icon: String(preset.icon || 'mdi:timer-outline'),
      duration: parseDuration(preset.duration),
    }))
    .filter((preset) => preset.duration > 0);
}

// Which preset to highlight while a timer runs: the one this card started, if it still applies,
// otherwise any preset whose duration matches what the timer was started with (covers other devices).
export function resolveActivePreset(presets, snapshot, startedPresetIndex = -1) {
  if (!snapshot || snapshot.status === STATUS_IDLE) {
    return -1;
  }

  if (startedPresetIndex >= 0 && startedPresetIndex < presets.length) {
    return startedPresetIndex;
  }

  return presets.findIndex((preset) => preset.duration === snapshot.duration);
}
