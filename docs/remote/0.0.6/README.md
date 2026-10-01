# Cowork Server 0.0.6 components

These immutable components support Cowork 0.16.0 and compatible later desktop
releases. The desktop verifies the signed manifest and pinned payload before
installation or launch. Its installer includes the matching component.

The gateway supports local network access and explicitly configured Internet
relay connections, with negotiated access lease status. The desktop retains
authority over pairing, project access and every business operation. Relay
credentials do not grant access to conversations.

Four folders cover macOS and Windows on ARM64 and x64. macOS executables are
signed and notarized. Windows executables have component signatures but no
Authenticode signature. For offline import, select the manifest and executable
from the same platform folder.

Each folder includes third-party and Rust standard-library notices. The public
key here is reference metadata; trust is anchored in the desktop application.
No signing private key is distributed.
