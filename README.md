# MySmart Timer Card

A kitchen timer card for Home Assistant, made for landscape tablet dashboards. Drag the digits (or use the arrows) to set a time, or tap a preset. The card flashes when the timer is done until you tap it.

It controls a Home Assistant `timer` helper, so a running timer survives reloads and shows on every device.

## Installation

### HACS

1. Open HACS in Home Assistant.
2. Click the three dots in the upper right corner and choose **Custom repositories**.
3. Paste `https://github.com/agoberg85/mysmart-timer-card` into the repository field, select **Dashboard** as the type, and click **Add**.
4. Search for **MySmart Timer Card** in HACS, open it, and click **Download**.
5. Reload your browser when HACS asks you to.

On Home Assistant 2026.11 and later, the built-in Marketplace replaces HACS. Go to **Settings > Marketplace**, choose **Add from link**, and paste the same URL. You need a connected GitHub account for this.

### Manual

1. Download `mysmart-timer-card.js` from the [latest release](https://github.com/agoberg85/mysmart-timer-card/releases/latest) and copy it to `config/www/`.
2. Go to **Settings > Dashboards**, open the three dots menu, and choose **Resources**.
3. Add `/local/mysmart-timer-card.js` as a **JavaScript module**.
4. Reload your browser.

## Setup

1. Create a timer helper: **Settings → Devices & services → Helpers → Create helper → Timer** (e.g. `timer.kitchen`).
2. Add the card:

```yaml
type: custom:mysmart-timer-card
entity: timer.kitchen
height: 288
presets:
  - name: Bløtkokte egg
    subtitle: Kokende vann
    icon: mdi:egg-outline
    duration: "6:00"
  - name: Hardkokte egg
    subtitle: Kokende vann
    icon: mdi:egg-fried
    duration: "9:00"
  - name: Pasta
    subtitle: Al dente
    icon: mdi:noodles
    duration: "10:00"
  - name: Ris
    subtitle: Lokk på, lav varme
    icon: mdi:rice
    duration: "12:00"
```

## Options

| Option | Default | Description |
| --- | --- | --- |
| `entity` | required | The `timer.*` helper. |
| `presets` | 4 kitchen presets | `name`, `subtitle`, `icon`, `duration` (`"MM:SS"` or seconds). `[]` hides them. |
| `height` | auto | Card height, e.g. `288`. |
| `auto_dismiss` | `120` | Seconds before the finish flash stops. `0` = until tapped. |
| `dismiss_action` | none | Action to run when the finish flash is tapped, e.g. to stop an alarm sound. Either `script.stop_alarm` or `{ action, data, target }`. |
| `seconds_step` | `5` | Step for the seconds field. |
| `quick_add` | `[30, 60, 300]` | Quick-add buttons (seconds). `[]` hides them. |
| `running_add` | `60` | Seconds added by the button shown while running. `0` hides it (stop and restart always stay). |

### Colors

`accent_color`, `card_background`, `text_color`, `muted_color`, `digit_color`, `separator_color`, `arrow_color`, `button_background`, `button_color`, `play_button_background`, `play_button_color`, `preset_background`, `preset_icon_background`, `preset_icon_color`, `preset_icon_border`, `preset_active_background`, `preset_active_color`, `flash_background`, `flash_color`.

Background options accept gradients, e.g. `linear-gradient(135deg, #f39ac7, #f3c7c3)`. The accent defaults to `var(--active-big)`.
