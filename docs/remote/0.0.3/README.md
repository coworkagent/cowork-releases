# Cowork Server 0.0.3 components

These files provide the optional remote-control component for Cowork 0.13.2
and compatible later desktop releases. Install the matching component from the
desktop Remote Control settings. The desktop verifies the signed manifest and
its pinned payload before installing or starting the executable. Installing
does not enable listening or grant a phone access; start the service and approve
pairing separately.

Compatible mobile clients can browse authorized session files and review
changes after the desktop grants workspace reading explicitly. Existing grants
do not acquire this permission automatically. Streaming updates renew Host
authorization before each event is read.

The folders are immutable versioned downloads for macOS arm64/x64 and
Windows x64/arm64. macOS binaries are signed and notarized. Windows binaries
have a component signature but no Windows Authenticode signature.

For offline import, download the matching manifest and executable, then select
both files in the desktop component import action. A manifest from one target
cannot be used with another target's executable.

Each folder includes third-party and Rust standard-library notices.
The public key here is reference metadata; trust is anchored in the desktop
application. No signing private key is distributed.
