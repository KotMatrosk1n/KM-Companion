# Retained license texts

These files supplement the application's root GPLv3 license. They do not
relicense third party components.

- `MIT-legacy.txt`: the complete root MIT notice before the 2026-10-20 GPLv3
  distribution change, preserving Honko, contributors, and Matroskin.
- `Apache-2.0.txt`: the full Apache license, used for Select2's dual license
  choice. Its original Igor Vaynberg copyright header is retained in the files.
- `jQuery-MIT.txt`: upstream `MIT-LICENSE.txt` from jQuery 1.9.1.
- `normalize-MIT.txt`: upstream `LICENSE.md` from normalize.css 3.0.2.
- `lazy-val-MIT.txt`: the exact package/version declaration and reproduced MIT
  terms for an upstream release that has no separate license file.
- `WiX-MS-RL.txt`: upstream `LICENSE.TXT` from WiX v7.0.0.
- `dotnet-LICENSE.TXT` and `dotnet-THIRD-PARTY-NOTICES.TXT`: unmodified notices
  from `Microsoft.NETCore.App.Runtime.win-x64` 11.0.0.
- `dotnet-desktop-LICENSE.txt`: the unmodified `LICENSE` from
  `Microsoft.WindowsDesktop.App.Runtime.win-x64` 11.0.0.

The build also copies complete license/notice files from every installed
production npm package into the distribution, preserving their original text.
Electron's own `LICENSE` and `LICENSES.chromium.html` remain in its distribution.
Source revisions, dependency inventories, asset exclusions, and build instructions
are recorded in [LICENSING.md](../LICENSING.md) and [CREDITS.md](../CREDITS.md).
