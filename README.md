# Kingdom Pixel RTS

A lightweight, Android-first 2D pixel-art real-time strategy game built with Phaser 3, vanilla JavaScript, HTML, and CSS.

## Branch strategy

- `main`: stable release baseline. No direct feature development.
- `develop`: integration branch for completed work.
- `up/system`: gameplay systems, simulation, resources, heroes, AI, battle, save, and multiplayer logic.
- `up/ui`: UI/UX, HUD, navigation, responsive layouts, and visual polish.
- `up/performance`: Android performance, memory, pooling, and rendering optimization.
- `pre-release`: release-candidate integration and APK testing.
- `fix/*`: isolated bug fixes.

## Workflow

1. Work on a focused `up/*` or `fix/*` branch.
2. Validate the change before merging into `develop`.
3. Merge `develop` into `pre-release` for release-candidate testing.
4. Merge into `main` only after release checks pass.

## Technical goals

- Phaser 3 with plain JavaScript, HTML, and CSS.
- Static hosting compatible with GitHub Pages.
- Android 12+ support with responsive portrait and landscape layouts.
- Performance-first design for entry-level Android devices.
- RTS unit, particle, and memory budgets enforced during implementation.

## Project status

Initial repository setup. Game implementation is developed on feature branches, not directly on `main`.
