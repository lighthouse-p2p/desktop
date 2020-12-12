const translateUrlToProxy = (url) => `http://localhost:42000/proxy/${url}`;
const translateUrlFromProxy = (url) => url.replace(/http.\/\/.*:...../, "");

const fetchCoins = () =>
  fetch("http://localhost:42000/coins").then((res) => res.text());

window.onload = () => {
  const addressbar = document.querySelector("#addressbar");
  const webview = document.querySelector("#webview");
  const backBtn = document.querySelector("#back");
  const reloadBtn = document.querySelector("#reload");
  const loading = document.querySelector("#loading");
  const coins = document.querySelector("#coins");

  let currentNode = "";

  fetchCoins().then((res) => (coins.innerText = res));

  addressbar.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      const translatedUrl = translateUrlToProxy(addressbar.value);
      currentNode = addressbar.value.split("/")[0];
      webview.loadURL(translatedUrl);
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
    loading.classList.remove("spin-anim");
    const url = translateUrlFromProxy(webview.getURL());
    if (url !== "/stats") {
      if (url.includes("/proxy/")) {
        addressbar.value = currentNode;
      } else {
        addressbar.value = `${currentNode}${url}`;
      }
    }
  });
};
