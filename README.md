# MySmart Timer Card

A kitchen timer card for Home Assistant, made for landscape tablet dashboards. Drag the digits (or use the arrows) to set a time, or tap a preset. The card flashes when the timer is done until you tap it.

It controls a Home Assistant `timer` helper, so a running timer survives reloads and shows on every device.

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
| `seconds_step` | `5` | Step for the seconds field. |
| `quick_add` | `[30, 60, 300]` | Quick-add buttons (seconds). |
| `running_add` | `60` | Seconds added while running. |

### Colors

`accent_color`, `card_background`, `text_color`, `muted_color`, `digit_color`, `separator_color`, `arrow_color`, `button_background`, `button_color`, `play_button_background`, `play_button_color`, `preset_background`, `preset_icon_background`, `preset_icon_color`, `preset_active_background`, `preset_active_color`, `flash_background`, `flash_color`.

Background options accept gradients, e.g. `linear-gradient(135deg, #f39ac7, #f3c7c3)`. The accent defaults to `var(--active-big)`.
