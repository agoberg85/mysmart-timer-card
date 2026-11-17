import test from 'node:test';
import assert from 'node:assert/strict';

import {
  MAX_DRAFT_SECONDS,
  displaySeconds,
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
} from '../src/mysmart-timer-card-helpers.js';
import { defaultPresets } from '../src/mysmart-timer-card-i18n.js';

test('parseDuration understands HA and config formats', () => {
  assert.equal(parseDuration('0:06:00'), 360);
  assert.equal(parseDuration('6:00'), 360);
  assert.equal(parseDuration('1:05:30'), 3930);
  assert.equal(parseDuration('1 day, 0:00:10'), 86410);
  assert.equal(parseDuration(90), 90);
  assert.equal(parseDuration('90'), 90);
  assert.equal(parseDuration({ minutes: 9 }), 540);
  assert.equal(parseDuration('nonsense'), 0);
  assert.equal(parseDuration(null), 0);
});

test('formatServiceDuration produces HH:MM:SS for timer.start', () => {
  assert.equal(formatServiceDuration(310), '00:05:10');
  assert.equal(formatServiceDuration(3930), '01:05:30');
});

test('splitClock and formatPresetDuration pad fields', () => {
  assert.deepEqual(splitClock(310), { minutes: '05', seconds: '10' });
  assert.deepEqual(splitClock(4500), { minutes: '75', seconds: '00' });
  assert.equal(formatPresetDuration(360), '06:00');
  assert.equal(formatPresetDuration(3930), '1:05:30');
});

test('stepDraftField clamps minutes and wraps seconds independently', () => {
  assert.equal(stepDraftField(310, 'minutes', 1), 370);
  assert.equal(stepDraftField(10, 'minutes', -3), 10);
  assert.equal(stepDraftField(MAX_DRAFT_SECONDS, 'minutes', 1), MAX_DRAFT_SECONDS);
  assert.equal(stepDraftField(355, 'seconds', 5), 300);
  assert.equal(stepDraftField(300, 'seconds', -5), 355);
  assert.equal(stepDraftField(300, 'seconds', 125), 305);
});

test('getTimerSnapshot derives remaining time per status', () => {
  const now = Date.parse('2026-10-09T12:00:00Z');
  const active = getTimerSnapshot({
    state: 'active',
    attributes: { duration: '0:06:00', finishes_at: '2026-10-09T12:02:30+00:00', remaining: '0:06:00' },
  }, now);
  assert.equal(active.status, 'active');
  assert.equal(active.remaining, 150);
  assert.equal(active.duration, 360);

  const paused = getTimerSnapshot({ state: 'paused', attributes: { duration: '0:06:00', remaining: '0:01:15' } }, now);
  assert.equal(paused.remaining, 75);

  assert.equal(getTimerSnapshot(undefined).status, 'idle');
});

test('displaySeconds rounds up so a fresh timer shows its full duration', () => {
  assert.equal(displaySeconds(359.6), 360);
  assert.equal(displaySeconds(0.01), 0);
  assert.equal(displaySeconds(-2), 0);
});

test('isFinishedAlarm flashes only for unacknowledged, recent finishes', () => {
  const finished = {
    entity_id: 'timer.kitchen',
    state: 'idle',
    last_changed: '2026-10-09T12:00:00Z',
    attributes: { last_transition: 'finished' },
  };
  const now = Date.parse('2026-10-09T12:01:00Z');

  assert.equal(isFinishedAlarm(finished, { nowMs: now, autoDismissSeconds: 120 }), true);
  assert.equal(isFinishedAlarm(finished, { nowMs: now, autoDismissSeconds: 30 }), false);
  assert.equal(isFinishedAlarm(finished, { nowMs: now + 3600000, autoDismissSeconds: 0 }), true);
  assert.equal(isFinishedAlarm(finished, { nowMs: now, dismissedKey: 'timer.kitchen|2026-10-09T12:00:00Z' }), false);
  assert.equal(isFinishedAlarm({ ...finished, attributes: { last_transition: 'cancelled' } }, { nowMs: now }), false);
  assert.equal(isFinishedAlarm({ ...finished, attributes: {} }, { nowMs: now, observedFinish: true }), true);
  assert.equal(isFinishedAlarm({ ...finished, state: 'active' }, { nowMs: now }), false);
});

test('looksLikeFinish distinguishes running out from an early cancel', () => {
  const now = Date.parse('2026-10-09T12:00:00Z');
  const ending = { status: 'active', finishesAt: now - 200 };
  const early = { status: 'active', finishesAt: now + 60000 };
  assert.equal(looksLikeFinish(ending, { state: 'idle' }, now), true);
  assert.equal(looksLikeFinish(early, { state: 'idle' }, now), false);
  assert.equal(looksLikeFinish(ending, { state: 'paused' }, now), false);
});

test('normalizePresets uses defaults only when presets are omitted', () => {
  const defaults = defaultPresets({ locale: { language: 'nb' } });
  assert.equal(normalizePresets(undefined, defaults).length, 4);
  assert.equal(normalizePresets(undefined, defaults)[0].name, 'Bløtkokte egg');
  assert.equal(normalizePresets([], defaults).length, 0);
  assert.deepEqual(normalizePresets([{ name: 'Pizza', duration: '0:12:00' }, { name: 'Broken' }]), [
    { name: 'Pizza', subtitle: '', icon: 'mdi:timer-outline', duration: 720 },
  ]);
});

test('resolveActivePreset prefers the preset this card started, then matches by duration', () => {
  const presets = [{ duration: 360 }, { duration: 540 }, { duration: 540 }];
  assert.equal(resolveActivePreset(presets, { status: 'idle', duration: 360 }), -1);
  assert.equal(resolveActivePreset(presets, { status: 'active', duration: 360 }), 0);
  assert.equal(resolveActivePreset(presets, { status: 'active', duration: 540 }, 2), 2);
  assert.equal(resolveActivePreset(presets, { status: 'paused', duration: 999 }), -1);
});

test('parseActionConfig reads strings and action objects', () => {
  assert.deepEqual(parseActionConfig('script.stop_alarm'), {
    domain: 'script',
    service: 'stop_alarm',
    data: {},
    target: undefined,
  });
  assert.deepEqual(
    parseActionConfig({ action: 'light.turn_on', data: { brightness_pct: 50 }, target: { entity_id: 'light.a' } }),
    { domain: 'light', service: 'turn_on', data: { brightness_pct: 50 }, target: { entity_id: 'light.a' } },
  );
});

test('parseActionConfig ignores missing or malformed actions', () => {
  assert.equal(parseActionConfig(undefined), null);
  assert.equal(parseActionConfig(''), null);
  assert.equal(parseActionConfig('not-an-action'), null);
  assert.equal(parseActionConfig({ data: {} }), null);
});
