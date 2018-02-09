function ele(id) {
    let e = document.getElementById(id);
    e.toggleClass = name => e.classList.contains(name) ? e.classList.remove(name) : e.classList.add(name);
    return e;
}

function onclick(ele, fn) {
    ele.addEventListener('click', () => fn());
}

env.add('gui.ele', ele);
env.add('gui.onclick', onclick);