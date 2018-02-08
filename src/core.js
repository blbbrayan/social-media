((global, fetch) => {

    const env = (() => {
        let g = {};
        const
            remove = path =>{
                let obj = g, keys = path.split('.');
                if (keys.length === 1) return delete g[path];
                keys.slice(0, keys.length-1).forEach(key=>obj=obj[key]);
                delete obj[keys.slice(keys.length-1)];
            },
            get = path => {
                let obj = g;
                path.split('.').forEach(key=>obj=obj[key]);
                return obj;
            },
            add = (path, e) => {
                let obj = g;
                path.split('.').forEach((key, i, ar)=> obj[key] ? obj = obj[key] : i === ar.length-1 ? obj[key] = e : obj = obj[key] = {});
            };
        return {add, remove, get};
    })();

    async function loadFile(path) {
        return fetch(path)
            .then(res => res.text())
            .catch(er => {
                console.error("GM_ERROR 1\n" + er);
                return false;
            });
    }

    function removeComments(str){
        return str.replace(/(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/gm, '');
    }

    async function loadEnvScript(path) {
        env.add('package', loadEnvScript);
        let scriptTemplate = `(async env => {${removeComments(await loadFile(path))}})(env)`;
        eval(scriptTemplate);
        env.remove('package');
    }

    async function loadPage(name) {
        const path = `./pages/${name}/${name}`,
            template = await loadFile(`${path}.html`),
            page = document.createElement("section"),
            link = document.createElement("link");

        page.id = "page";
        page.innerHTML = template;
        document.body.appendChild(page);

        link.id = "link";
        link.rel = "stylesheet";
        link.href = `${path}.css`;
        document.body.appendChild(link);

        setTimeout(() => {}, 0);

        loadEnvScript(`${path}.js`);
    }

    function clear() {
        ['page', 'link'].forEach(i=> {let e = document.getElementById(i);e.parentNode.replaceChild(null, e);});
    }

    const router = (() => {
        let currentPage, routes = {};

        function add(path, name) {
            routes[path] = name;
        }

        function load() {
            let route = routes[location.pathname.slice(1) || ''];
            console.log(route);
            if (route && route !== currentPage) {
                if (currentPage)
                    clear();
                currentPage = route;
                loadPage(route);
            }
        }

        function start() {
            window.addEventListener('hashchange', load);
            window.addEventListener('load', load);
            load();
        }

        return {start, add};
    })();

    router.add('', 'login');
    router.add('login', 'login');
    router.add('home', 'poll');

    router.start();

})(window, window.fetch);