const STRINGS = {
  en: {
    missing_entity: 'Timer entity {entity} was not found. Create a timer helper and set it as entity.',
    start: 'Start',
    pause: 'Pause',
    resume: 'Resume',
    stop: 'Stop',
    restart: 'Restart',
    clear: 'Clear',
    add_seconds: 'Add {count} seconds',
    add_minute: 'Add 1 minute',
    add_minutes: 'Add {count} minutes',
    increase_minutes: 'More minutes',
    decrease_minutes: 'Fewer minutes',
    increase_seconds: 'More seconds',
    decrease_seconds: 'Fewer seconds',
    minutes: 'Minutes',
    seconds: 'Seconds',
    timer_done: 'Timer finished. Tap to dismiss.',
    preset_soft_eggs: 'Soft-boiled eggs',
    preset_hard_eggs: 'Hard-boiled eggs',
    preset_pasta: 'Pasta',
    preset_rice: 'Rice',
    preset_boiling_water: 'Boiling water',
    preset_al_dente: 'Al dente',
    preset_low_heat: 'Lid on, low heat',
  },
  nb: {
    missing_entity: 'Fant ikke timer-entiteten {entity}. Opprett en timer-hjelper og bruk den som entity.',
    start: 'Start',
    pause: 'Pause',
    resume: 'Fortsett',
    stop: 'Stopp',
    restart: 'Start på nytt',
    clear: 'Nullstill',
    add_seconds: 'Legg til {count} sekunder',
    add_minute: 'Legg til 1 minutt',
    add_minutes: 'Legg til {count} minutter',
    increase_minutes: 'Flere minutter',
    decrease_minutes: 'Færre minutter',
    increase_seconds: 'Flere sekunder',
    decrease_seconds: 'Færre sekunder',
    minutes: 'Minutter',
    seconds: 'Sekunder',
    timer_done: 'Timeren er ferdig. Trykk for å lukke.',
    preset_soft_eggs: 'Bløtkokte egg',
    preset_hard_eggs: 'Hardkokte egg',
    preset_pasta: 'Pasta',
    preset_rice: 'Ris',
    preset_boiling_water: 'Kokende vann',
    preset_al_dente: 'Al dente',
    preset_low_heat: 'Lokk på, lav varme',
  },
};

export function resolveCardLocale(hass) {
  const candidates = [
    hass?.locale?.language,
    hass?.language,
    hass?.selectedLanguage,
    typeof navigator !== 'undefined' ? navigator.language : '',
  ].filter(Boolean);

  const locale = String(candidates[0] || 'en').toLowerCase();
  if (locale.startsWith('nb') || locale.startsWith('nn') || locale.startsWith('no')) {
    return 'nb';
  }

  return 'en';
}

export function translateCardString(hass, key, params = {}) {
  const locale = resolveCardLocale(hass);
  const table = STRINGS[locale] || STRINGS.en;
  const fallback = STRINGS.en[key] || key;
  const template = table[key] || fallback;

  return template.replace(/\{(\w+)\}/g, (_match, token) => String(params[token] ?? ''));
}

export function defaultPresets(hass) {
  const t = (key) => translateCardString(hass, key);
  return [
    { name: t('preset_soft_eggs'), subtitle: t('preset_boiling_water'), icon: 'mdi:egg-outline', duration: '6:00' },
    { name: t('preset_hard_eggs'), subtitle: t('preset_boiling_water'), icon: 'mdi:egg-fried', duration: '9:00' },
    { name: t('preset_pasta'), subtitle: t('preset_al_dente'), icon: 'mdi:noodles', duration: '10:00' },
    { name: t('preset_rice'), subtitle: t('preset_low_heat'), icon: 'mdi:rice', duration: '12:00' },
  ];
}
