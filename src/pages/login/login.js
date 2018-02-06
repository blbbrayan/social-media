await env.get('package')('./packages/input-group.js');

const InputGroup = env.get('gui.InputGroup');

const
    signup_close = ele('close-signup'),
    signup_button = ele('signup'),
    login_menu = ele('login-menu'),
    signup_menu = ele('signup-menu');

function ele(id) {
    let e = document.getElementById(id);
    e.toggleClass = name => e.classList.contains(name) ? e.classList.remove(name) : e.classList.add(name);
    return e;
}

function onclick(ele, fn) {
    ele.addEventListener('click', () => fn());
}

onclick(signup_button, () => {
    signup_menu.toggleClass('active');
    signup_button.toggleClass('hidden');
    setTimeout(() => {
        InputGroup();
        login_menu.toggleClass('hidden');
    }, 1300 * .8);
});

onclick(signup_close, () => {
    signup_menu.toggleClass('decay');
    setTimeout(() => {
        login_menu.toggleClass('hidden');
        signup_menu.toggleClass('active');
        signup_menu.toggleClass('decay');
        signup_button.toggleClass('hidden');
    }, 600);
});

InputGroup();