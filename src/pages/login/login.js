const package = env.get('package');

await package('./packages/input-group.js');
await package('./packages/gui.js');

const gui = env.get('gui');
console.log(gui);

const
    signup_close = gui.ele('close-signup'),
    signup_button = gui.ele('signup'),
    login_menu = gui.ele('login-menu'),
    signup_menu = gui.ele('signup-menu');



gui.onclick(signup_button, () => {
    signup_menu.toggleClass('active');
    signup_button.toggleClass('hidden');
    setTimeout(() => {
        gui.InputGroup();
        login_menu.toggleClass('hidden');
    }, 1300 * .8);
});

gui.onclick(signup_close, () => {
    signup_menu.toggleClass('decay');
    setTimeout(() => {
        login_menu.toggleClass('hidden');
        signup_menu.toggleClass('active');
        signup_menu.toggleClass('decay');
        signup_button.toggleClass('hidden');
    }, 600);
});

gui.InputGroup();