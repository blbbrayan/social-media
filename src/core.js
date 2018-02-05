((global, fetch) => {

    async function loadFile(path) {
        return fetch(path)
            .then(res => res.text())
            .catch(er => {
                console.error("GM_ERROR 1\n" + er);
                return false;
            });
    }

    async function loadPage(name) {
        const path = `./pages/${name}/${name}`,
            template = await loadFile(`${path}.html`),
            page = document.createElement("section"),
            script = document.createElement("script"),
            link = document.createElement("link");

        page.id = "page";
        page.innerHTML = template;
        document.body.appendChild(page);

        link.id = "link";
        link.rel = "stylesheet";
        link.href = `${path}.css`;
        document.body.appendChild(link);

        setTimeout(() => {}, 0);

        script.id = "script";
        script.src = `${path}.js`;
        document.body.appendChild(script);
    }

    function clear() {
        ['path', 'link', 'script']
            .forEach(i=>{let e = document.getElementById(i);e.parentNode.replaceChild(null, e);});
    }

    function Router() {
        let currentPage, routes = {};

        function add(path, name) {
            routes[path] = name;
        }

        function load() {
            let route = routes[location.pathname.slice(1) || ''];
            console.log(route);
            if (route && route !== currentPage) {
                if(currentPage)
                    clear();
                currentPage = route;
                loadPage(route);
            }
        }

        function start(){
            window.addEventListener('hashchange', load);
            window.addEventListener('load', load);
            load();
        }

        return {start, add};
    }

    const router = Router();
    router.add('', 'login');
    router.add('login', 'login');
    router.add('profile', 'profile');

    router.start();
})(window, window.fetch);
