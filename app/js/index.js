const translateUrlToProxy = (url) => `http://localhost:42000/proxy/${url}`;
const translateUrlFromProxy = (url) => url.replace(/http.\/\/.*:...../, "");

const fetchCoins = () =>
  fetch("http://localhost:42000/coins").then((res) => res.text());

const closeWindow = () => {
  const { ipcRenderer } = require("electron");
  ipcRenderer.send("close");
};

const minimizeWindow = () => {
  const { ipcRenderer } = require("electron");
  ipcRenderer.send("minimize");
};

const setupWindows = () => {
  const close = document.querySelector("#close");
  const minimize = document.querySelector("#minimize");

  close.classList.remove("gone");
  minimize.classList.remove("gone");

  close.addEventListener("click", (_) => {
    closeWindow();
  });

  minimize.addEventListener("click", (_) => {
    minimizeWindow();
  });
};

const setupDarwin = () => {
  const spacer = document.querySelector("#spacer");
  spacer.classList.remove("gone");
};

window.onload = () => {
  const addressbar = document.querySelector("#addressbar");
  const webview = document.querySelector("#webview");
  const backBtn = document.querySelector("#back");
  const reloadBtn = document.querySelector("#reload");
  const loading = document.querySelector("#loading");
  const coins = document.querySelector("#coins");

  if (process.platform === "win32") {
    setupWindows();
  }

  if (process.platform === "darwin") {
    setupDarwin();
  }

  let currentNode = "";

  fetchCoins().then((res) => (coins.innerText = res));

  setInterval(() => {
    fetchCoins().then((res) => (coins.innerText = res));
  }, 1000);

  addressbar.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      if (addressbar.value !== "") {
        const translatedUrl = translateUrlToProxy(addressbar.value);
        currentNode = addressbar.value.split("/")[0];
        webview.loadURL(translatedUrl);

        addressbar.blur();
        webview.focus();
      }
    }
  });

  backBtn.addEventListener("click", () => {
    if (webview.canGoBack()) {
      webview.goBack();
    }
  });

  reloadBtn.addEventListener("click", () => {
    webview.reload();
  });

  webview.addEventListener("did-start-loading", () => {
    loading.classList.add("spin-anim");
  });

  webview.addEventListener("did-stop-loading", () => {
    setTimeout(() => loading.classList.remove("spin-anim"), 750);
    const url = translateUrlFromProxy(webview.getURL());

    if (
      webview.getURL() === "http://localhost:42000/" ||
      webview.getURL() === "http://localhost:42000"
    ) {
      addressbar.value = "";
    } else {
      if (url.includes("/proxy/")) {
        addressbar.value = currentNode;
      } else {
        addressbar.value = `${currentNode}${url}`;
      }
    }
  });
};
