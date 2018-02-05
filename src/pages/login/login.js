((global) => {
    const
        signup_close = document.getElementById('close-signup'),
        signup_button = document.getElementById('signup'),
        login_menu = document.getElementById('login-menu'),
        signup_menu = document.getElementById('signup-menu');

    function InputGroup() {
        let inputs = Array.from(document.getElementsByTagName('input-group'));
        inputs.forEach(inputGroup => {
            let input, label;
            Array.from(inputGroup.children).forEach(ele => ele.localName === 'input' ? input = ele : label = ele);
            if (input) {
                input.addEventListener('focus', () => label.classList.add('active'));
                input.addEventListener('blur', () => input.value ? null : label.classList.remove('active'));
            }
        });
    }

    function onclick(ele, fn) {
        ele.addEventListener('click', () => fn());
    }

    onclick(signup_button, () => {
        signup_menu.classList.add('active');
        signup_button.classList.add('hidden');
        setTimeout(() => {
            InputGroup();
            login_menu.classList.add('hidden');
        }, 1300 * .8);
    });

    onclick(signup_close, () => {
        signup_menu.classList.add('decay');
        setTimeout(() => {
            login_menu.classList.remove('hidden');
            signup_menu.classList.remove('active');
            signup_menu.classList.remove('decay');
            signup_button.classList.remove('hidden');
        }, 600);
    });

    InputGroup();

})(window);