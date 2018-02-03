((global, fetch) => {
  class core {
    constructor() {
      this.loadPage("home");
    }

    async loadFile(path) {
      return fetch(path)
        .then(res => res.text())
        .catch(er => {
          console.error("GM_ERROR 1\n" + er);
          return false;
        });
    }

    async loadPage(name) {
      setTimeout(async () => {
        const path = `./pages/${name}/${name}`,
          template = await this.loadFile(`${path}.html`),
          page = document.createElement("section"),
          script = document.createElement("script"),
          link = document.createElement("link");

        console.log(page);
        page.id = "page";
        page.innerHTML = template;
        document.body.appendChild(page);

        link.id = "link";
        link.rel = "stylesheet";
        link.href = `${path}.css`;
        document.body.appendChild(link);

        script.id = "script";
        script.src = `${path}.js`;
        document.body.appendChild(script);
      }, 0);
    }
  }

  new core();
})(window, window.fetch);
