const form = document.querySelector('#form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

//Show input error message:
const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small')
    small.innerText = message;
}

//Show success outline:
const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//check e-mail is valid: 
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return (re.test(input.value.trim())) ?
        showSuccess(input) :
        showError(input, 'Email address is not valid');
}

//Check all required fields: 
const checkRequired = (inputArray) => {
    inputArray.forEach(function (input) {
        return (input.value.trim() === '') ?
            showError(input, `${getFieldName(input)} is required`) :
            showSuccess(input)
    });
}

//check input lenght:
const checkLength = (input, min, max) => {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters.`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max}`);
    } else {
        showSuccess(input)
    }
}

//get Field name with first letter capital:
const getFieldName = (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Check passwords match:
const checkPasswordsMatch = (input1, input2) => {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match')
    }
}

//Event listeners:
form.addEventListener('submit', function (e) {
    e.preventDefault();
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);

});

// Before refactor:
// if(username.value === '') {
//     showError(username, 'Username is required');
// } else {
//     showSuccess(username);
// }
// if(email.value === '') {
//     showError(email, 'E-mail is required');
// } else if (!isValidEmail(email.value)) {
//     showError(email, 'E-mail is not valid')
// } else {
//     showSuccess(email);
// }
// if(password.value === '') {
//     showError(password, 'password is required');
// } else {
//     showSuccess(password);
// }
// if(password2.value === '') {
//     showError(password2, 'password2 is required');
// } else {
//     showSuccess(password2);
// }
