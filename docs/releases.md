# Releases

KM Companion publishes Windows x64 setup packages through GitHub Releases. Public version numbering starts at 0.0.1.

## Release Workflow

Pushing the matching numeric `vX.Y.Z` tag starts `Release Desktop App`. The workflow checks the package version, prepares matching application and dependency source archives, packages the app, builds the Windows setup, and uploads the assets to a draft release. Normal releases use the tag trigger once. Do not also start a manual workflow for the same tag.

1. Set the application version in `package.json` and both root version fields in `package-lock.json`. The internal calculation engine and import tooling keep their own versions.
2. Include the release changes, README updates, and `docs/release-notes/<version>.md` in the release pull request.
3. Wait for the build and analysis checks, then merge the reviewed source into `master`.
4. Verify that the merge tree matches the checked pull request head and that its package version is correct.
5. Create the exact version tag at that merge and push it once.
6. Let the tag workflow prepare its draft with the installer, updater metadata, hashes, and matching sources.
7. Verify the draft assets against their metadata and source manifest, then publish the verified release as stable.
8. Replace the generated release notes with the curated changelog and verify the live body and download links.

For version 0.0.1, the tag commands are:

```powershell
git tag v0.0.1
git push origin v0.0.1
```

Run them only from the reviewed merge with a clean checkout. An existing release tag must not be moved to different source.

## Release Assets

Each release includes:

- `KM-Companion-Setup-<version>.exe`, the Windows install, update, repair, and uninstall package.
- `latest.yml`, with the setup filename, size, and SHA-512 digest used by the updater.
- `KM-Companion-Update-<version>.msp`, when a smaller Windows Installer patch is available for recent versions.
- `SHA256SUMS.txt`, with hashes for the installer, any patch, updater metadata, and source assets.
- `KM-Companion-Source-<version>.zip`, containing the exact application source for the release commit.
- `KM-Companion-Dependencies-<version>.tar.gz`, containing dependency sources, including the separate installer's WiX source.
- `KM-Companion-Source-<version>.json`, recording source revisions and archive hashes.

The combined application is GPLv3 only. Retained component notices and source distribution requirements are documented in [LICENSING.md](../LICENSING.md).

## Smaller Windows Updates

The first release with patch support establishes a new MSI ProductCode. Existing installs receive that release through the full setup. Keep that code for subsequent releases with the same MSI file and component layout. When the layout changes, assign a new ProductCode in `Package.wxs` and ship the full setup to establish the next baseline. The MSI and Burn upgrade codes and the Burn provider key carry the installation across baselines.

The release workflow builds one cumulative patch against up to four earlier published versions that share the ProductCode. It extracts the original MSI packages from the verified release setups and uses the Windows SDK patch builder to encode binary changes. The workflow checks each advertised upgrade on its clean Windows runner, compares the installed files with the release payload, verifies uninstall, and exercises the full setup path before it creates the draft. When the preceding release has a compatible patch, the workflow also tests updating an installation that already received it.

An eligible installation can jump directly to the latest version. A clean install, a version outside the patch's supported range, or a failed patch download uses the full setup. If Windows Installer cannot apply a downloaded patch, the app reopens and offers the full setup on the next install attempt. The setup remains available on every release page.

The app and its MSI report the patched version. Windows Installed Apps can show the version of the last full setup because that setup still owns the visible maintenance entry.

## Unsigned Windows Releases

Releases are unsigned. The workflow supplies no certificate and checks that the receipt and public setup are unsigned before publication. Windows may identify the publisher as unknown.

Updater downloads use HTTPS and the digest in the release metadata. They do not verify an Authenticode publisher. Optional local signing remains supported by the setup script, but enabling signing for published releases requires an explicit change to the release policy and workflow.

WiX v7 still requires `WIX_V7_EULA_ACCEPTED=true` in repository variables after the maintainer accepts its OSMF EULA. See the [Windows setup guide](../installer/windows/README.md) for packaging, installer identity, and migration behavior.

## Development Builds

Earlier development builds used versions 0.4.26 and 0.4.27. Those values compare as newer than the public 0.0.1 release, so they do not receive it through the automatic update check. Follow the [development build transition](../installer/windows/README.md#upgrade-and-uninstall-behavior) before installing the public version. Saved data and backup formats retain their existing identities.
