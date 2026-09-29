# Cowork Server 0.0.5 components

These files provide the optional remote-control component for Cowork 0.15.0
and compatible later desktop releases. The desktop verifies the signed
manifest and its pinned payload before installing or starting the executable.
Enabling remote control can prepare the trusted bundled component and select
a local network address. Pairing still requires approval on the desktop.

Compatible clients can load recent conversation messages first, read older
pages alongside live activity, and keep concurrent remote requests moving
without a fixed request-count quota. Authentication, authorization, payload
bounds and existing device permissions remain unchanged.

The folders are immutable versioned downloads for macOS arm64/x64 and
Windows x64/arm64. macOS binaries are signed and notarized. Windows binaries
have a component signature but no Windows Authenticode signature.

For offline import, download the matching manifest and executable, then select
both files in the desktop component import action. A manifest from one target
cannot be used with another target's executable.

Each folder includes third-party and Rust standard-library notices.
The public key here is reference metadata; trust is anchored in the desktop
application. No signing private key is distributed.
