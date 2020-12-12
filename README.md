<h1 align="center">Lighthouse 🕯 Desktop</h1>
<p align="center">The desktop app for Lighthouse p2p</p>

---

## Building

### Requirements

- `node` > v12 installed on your system
  - `node` > 9 might work, but are not tested. Using a version greater than 12 is highly recommended
- `yarn` package manager installed and configured

**WARNING: DO NOT CLONE THIS REPOSITORY ON ITS OWN, IT CAN ONLY BE USED AS A SUBMODULE TO THE [LIGHTHOUSE PEER](https://github.com/lighthouse-p2p/lighthouse)**

### How to build

- `cd` into this directory
- Run `yarn` to install all the dependencies
- - For MacOS systems, run `yarn build:macos`
  - For Windows systems, run `yarn build:win`
  - To build for both Windows and MacOS, run `yarn build`
  - Why not Linux? Unfortunately I don't currently have a Linux box to test this on, and a I don't ship untested software :) Contributions on the same are welcome
- Running the previous step generates a binary in the `dist` folder. Take a note of its path. It will be used in the lighthouse peer's build step
- Follow further steps on https://github.com/lighthouse-p2p/lighthouse

## Running

While `electron` produces a standalone binary, the application depends heavily on a running lighthouse peer. Running this without a running peer is possible, it is not recommended as the application won't display anything functional

---

## How it works

Click [here](https://github.com/lighthouse-p2p/docs) to see the documentation about the protocol and the algorithm used.

---

## License

Lighthouse Desktop is licensed under the `GPL-3.0-or-later` license. You can obtain a copy [here](https://www.gnu.org/licenses/gpl-3.0.html).
