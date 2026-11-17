import { css } from 'lit';

export const cardStyles = css`
      :host {
        display: block;
        --mysmart-timer-card-background: var(--ha-card-background, var(--card-background-color, #2e2e2e));
        --mysmart-timer-ink: var(--primary-text-color, #ffffff);
        --mysmart-timer-muted: var(--secondary-text-color, rgba(255, 255, 255, 0.6));
        --mysmart-timer-accent: var(--active-big, var(--accent-color, #ff8b5e));
        --mysmart-timer-digit-color: var(--mysmart-timer-ink);
        --mysmart-timer-separator-color: var(--mysmart-timer-digit-color);
        --mysmart-timer-arrow-color: var(--mysmart-timer-muted);
        --mysmart-timer-button-background: rgba(255, 255, 255, 0.06);
        --mysmart-timer-button-color: var(--mysmart-timer-ink);
        --mysmart-timer-play-background: var(--mysmart-timer-accent);
        --mysmart-timer-play-color: rgba(0, 0, 0, 0.82);
        --mysmart-timer-preset-background: var(--mysmart-timer-card-background);
        --mysmart-timer-preset-icon-background: rgba(250, 251, 252, 0.1);
        --mysmart-timer-preset-icon-border: rgba(250, 251, 252, 0.1);
        --mysmart-timer-preset-icon-color: var(--mysmart-timer-ink);
        --mysmart-timer-preset-active-background: var(--mysmart-timer-accent);
        --mysmart-timer-preset-active-color: rgba(0, 0, 0, 0.82);
        --mysmart-timer-flash-background: #ffffff;
        --mysmart-timer-flash-color: #171313;
        --mysmart-timer-digit-width: 0.6em;
        --mysmart-timer-presets-width: 412px;
      }

      ha-card.shell {
        position: relative;
        height: var(--mysmart-timer-card-height, auto);
        border: 0;
        border-radius: 32px;
        background: transparent;
        box-shadow: none;
        overflow: visible;
        color: var(--mysmart-timer-ink);
      }

      button {
        font: inherit;
        color: inherit;
        border: 0;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }

      .layout {
        position: relative;
        display: grid;
        grid-template-columns: minmax(0, 1fr) var(--mysmart-timer-presets-width);
        gap: 10px;
        height: 100%;
        min-height: 288px;
      }

      .layout.no-presets {
        grid-template-columns: minmax(0, 1fr);
      }

      .main {
        position: relative;
        display: grid;
        grid-template-columns: auto minmax(0, 1fr);
        align-items: center;
        gap: 24px;
        padding: 22px 22px 22px 28px;
        border-radius: 32px;
        background: var(--mysmart-timer-card-background);
        overflow: hidden;
        min-width: 0;
      }

      /* Flash layer sits under the content so a gradient flash color still works. */
      .main::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--mysmart-timer-flash-background);
        opacity: 0;
        pointer-events: none;
      }

      .main > * {
        position: relative;
      }

      .clock {
        display: flex;
        align-items: center;
        color: var(--mysmart-timer-digit-color);
      }

      .field,
      .separator {
        display: grid;
        grid-template-rows: 32px auto 32px;
        justify-items: center;
        gap: 2px;
      }

      .digits,
      .separator-line {
        font-size: 104px;
        font-weight: 300;
        letter-spacing: -0.03em;
        line-height: 1;
        padding: 6px 4px;
      }

      .digits {
        display: flex;
        border-radius: 20px;
        outline: none;
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
      }

      .is-editable .digits {
        cursor: ns-resize;
      }

      .digits:focus-visible {
        box-shadow: 0 0 0 2px var(--mysmart-timer-accent);
      }

      /* Each digit gets a fixed-width slot, so proportional fonts like Space Grotesk don't jump while counting. */
      .digit {
        display: inline-block;
        width: var(--mysmart-timer-digit-width);
        text-align: center;
        font-variant-numeric: tabular-nums;
      }

      /* Same colon as the wall clock: a smaller ":" raised with vertical-align: super and nudged back down.
         It sits in a line with the digits' font size and padding, so it shares their baseline.
         line-height: 0 keeps the raised glyph from making that line taller. */
      .separator-line {
        grid-row: 2;
        padding-inline: 0;
        color: var(--mysmart-timer-separator-color);
      }

      .colon {
        font-size: 0.6em;
        line-height: 0;
        vertical-align: super;
        position: relative;
        top: var(--mysmart-timer-colon-offset, 18px);
        padding: 0 10px;
      }

      .arrow {
        width: 48px;
        height: 32px;
        display: grid;
        place-items: center;
        border-radius: 999px;
        background: transparent;
        color: var(--mysmart-timer-arrow-color);
        transition: opacity 240ms ease;
        touch-action: manipulation;
      }

      .clock:not(.is-editable) .arrow {
        opacity: 0;
        pointer-events: none;
      }

      .controls {
        justify-self: end;
        align-self: end;
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        justify-content: flex-end;
      }

      .chip,
      .round-button {
        height: 48px;
        background: var(--mysmart-timer-button-background);
        color: var(--mysmart-timer-button-color);
        border-radius: 999px;
        touch-action: manipulation;
      }

      .chip {
        padding: 0 18px;
        font-size: 14px;
        font-weight: 600;
        white-space: nowrap;
      }

      .round-button {
        width: 48px;
        display: grid;
        place-items: center;
      }

      .play-button {
        width: 72px;
        height: 72px;
        display: grid;
        place-items: center;
        border-radius: 999px;
        background: var(--mysmart-timer-play-background);
        color: var(--mysmart-timer-play-color);
        --mdc-icon-size: 30px;
        touch-action: manipulation;
      }

      .chip:disabled,
      .round-button:disabled,
      .play-button:disabled {
        opacity: 0.45;
        cursor: default;
      }

      .presets {
        display: grid;
        grid-auto-rows: minmax(0, 1fr);
        gap: 8px;
        min-height: 0;
      }

      .preset {
        display: grid;
        /* Mirrors the small universal_navigate button-card: 56px icon inset 4px, text from 76px. */
        grid-template-columns: 56px minmax(0, 1fr) auto;
        align-items: center;
        gap: 16px;
        padding: 4px 22px 4px 4px;
        min-height: 0;
        border-radius: 32px;
        background: var(--mysmart-timer-preset-background);
        color: var(--mysmart-timer-ink);
        text-align: left;
        transition: background 200ms ease, color 200ms ease;
      }

      .preset-icon {
        box-sizing: border-box;
        width: 56px;
        height: 56px;
        display: grid;
        place-items: center;
        border-radius: 50%;
        border: 1px solid var(--mysmart-timer-preset-icon-border);
        background: var(--mysmart-timer-preset-icon-background);
        color: var(--mysmart-timer-preset-icon-color);
        --mdc-icon-size: 30px;
      }

      .preset-copy {
        display: grid;
        gap: 2px;
        min-width: 0;
      }

      .preset-name,
      .preset-subtitle {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .preset-name {
        font-size: 16px;
        font-weight: 500;
        line-height: 1.2em;
      }

      .preset-subtitle {
        font-size: 14px;
        font-weight: 500;
        color: inherit;
        opacity: 0.7;
      }

      .preset-time {
        font-size: 16px;
        font-weight: 500;
        font-variant-numeric: tabular-nums;
      }

      .preset.active {
        background: var(--mysmart-timer-preset-active-background);
        color: var(--mysmart-timer-preset-active-color);
      }

      .preset.active .preset-subtitle {
        color: inherit;
        opacity: 0.72;
      }

      .preset.active .preset-icon {
        background: rgba(0, 0, 0, 0.1);
        border-color: rgba(0, 0, 0, 0.1);
        color: inherit;
      }

      .alarm-catcher {
        position: absolute;
        inset: 0;
        z-index: 5;
        border-radius: 32px;
        cursor: pointer;
      }

      .shell.is-alarm .main::before {
        animation: mysmart-timer-flash 1.2s ease-in-out infinite;
      }

      .shell.is-alarm .main {
        animation: mysmart-timer-flash-ink 1.2s ease-in-out infinite;
      }

      .shell.is-alarm .clock {
        color: inherit;
      }

      .shell.is-alarm .separator-line {
        color: inherit;
      }

      .controls {
        transition: opacity 240ms ease;
      }

      .shell.is-alarm .controls {
        opacity: 0;
      }

      @keyframes mysmart-timer-flash {
        0%, 100% { opacity: 0; }
        40%, 60% { opacity: 1; }
      }

      @keyframes mysmart-timer-flash-ink {
        0%, 100% { color: var(--mysmart-timer-ink); }
        40%, 60% { color: var(--mysmart-timer-flash-color); }
      }

      .error {
        padding: 22px 28px;
        border-radius: 32px;
        background: var(--mysmart-timer-card-background);
        color: var(--mysmart-timer-muted);
      }

      @media (prefers-reduced-motion: reduce) {
        .arrow,
        .preset {
          transition: none;
        }
      }
`;
