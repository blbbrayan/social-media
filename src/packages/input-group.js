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

env.add('gui.InputGroup', InputGroup);