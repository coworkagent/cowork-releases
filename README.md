# cowork

An AI agent for your desktop that does the work: it edits files, runs commands, drives a browser and your other apps, and reads and writes real Office documents. Everything runs on your own machine, and every risky action waits for your approval.

This repository hosts the installers, the update feed, and the [website](https://coworkagent.github.io/cowork-releases/) (in `docs/`). **[Download the latest release](https://github.com/coworkagent/cowork-releases/releases/latest).**

## Which file do I need?

| System | File |
|---|---|
| macOS, Apple silicon (M1 and later) | `cowork-<version>-mac-arm64.dmg` |
| macOS, Intel | `cowork-<version>-mac-x64.dmg` |
| Windows, x64 (most PCs) | `cowork-<version>-win-x64-setup.exe` |
| Windows on Arm | `cowork-<version>-win-arm64-setup.exe` |

The `.zip`, `.blockmap` and `latest*.yml` files are used by the in-app updater. You do not need to download them.

## Installing

**macOS.** Open the `.dmg` and drag cowork to Applications. The builds are signed with a Developer ID and notarised by Apple, so they open without a warning. macOS 13 or later.

**Windows.** Run the setup program. The installers are not code-signed yet, so SmartScreen shows a warning on first run: choose *More info*, then *Run anyway*. Windows 10 or later.

## Updates

cowork checks this repository for new versions and installs them when you quit the app. You can turn this off in Settings.

Versions up to and including 0.8.3 looked for updates in a different place and will not find newer ones. If you are on one of those, install the latest version from this page once; updates are automatic from then on.

## Feedback

Bug reports and suggestions are welcome in [Issues](https://github.com/coworkagent/cowork-releases/issues). Please include your cowork version (shown at the bottom of the sidebar) and your operating system. For a security problem, do not open a public issue: use [private vulnerability reporting](https://github.com/coworkagent/cowork-releases/security/advisories/new) instead.

## Licence

cowork is free to use. The installers are provided under the [Functional Source License 1.1 (ALv2 Future License)](LICENSE.md).
