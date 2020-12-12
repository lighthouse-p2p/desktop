window.onload = () => {
  const addressbar = document.querySelector(".addressbar");
  const webview = document.querySelector("webview");

  let currentNode = "";

  addressbar.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      const translatedUrl = translateUrlToProxy(addressbar.value);
      currentNode = addressbar.value.split("/")[0];
      console.log(currentNode);
      webview.loadURL(translatedUrl);
    }
  });

  webview.addEventListener("did-stop-loading", () => {
    const url = translateUrlFromProxy(webview.getURL());
    if (url !== "/stats") {
      if (url.includes("/proxy/")) {
        addressbar.value = currentNode;
      } else {
        addressbar.value = `${currentNode}${url}`;
      }
    }
  });

  const translateUrlToProxy = (url) => `http://localhost:42000/proxy/${url}`;
  const translateUrlFromProxy = (url) => url.replace(/http.\/\/.*:...../, "");
};
