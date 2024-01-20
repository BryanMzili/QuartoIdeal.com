function maskCpf(event) {
    let inputValue = event.target.value.replace(/\D/g, '');

    if (inputValue.length > 11) {
        inputValue = inputValue.slice(0, 11);
    }

    let maskedValue = '';
    for (let i = 0; i < inputValue.length; i++) {
        if (i === 3 || i === 6) {
            maskedValue += '.';
        } else if (i === 9) {
            maskedValue += '-';
        }
        maskedValue += inputValue[i];
    }

    event.target.value = maskedValue;
}

function maskDate(event) {
    let inputValue = event.target.value.replace(/\D/g, '');

    if (inputValue.length > 8) {
        inputValue = inputValue.slice(0, 8);
    }

    let maskedValue = '';
    for (let i = 0; i < inputValue.length; i++) {
        if (i === 2 || i === 4) {
            maskedValue += '/';
        }
        maskedValue += inputValue[i];
    }

    event.target.value = maskedValue;
}

function maskContact(event) {
    let inputValue = event.target.value.replace(/\D/g, '');

    if (inputValue.length > 11) {
        inputValue = inputValue.slice(0, 11);
    }

    let maskedValue = '';
    for (let i = 0; i < inputValue.length; i++) {
        if (i === 0) {
            maskedValue += '(';
        } else if (i === 2) {
            maskedValue += ')';
        } else if (i === 7) {
            maskedValue += '-';
        }
        maskedValue += inputValue[i];
    }

    event.target.value = maskedValue;
}