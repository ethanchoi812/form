let allFields = document.querySelectorAll(".form-field");
let emailFields = document.querySelectorAll("input[type=\"email\"]");
let passwordFields = document.querySelectorAll("input[type=\"password\"]");
let submitBtn = document.getElementById("submit-btn");
let form = document.querySelector("form");

form.addEventListener("submit", ()=> {
    event.preventDefault();
    if (!validateForm()) {
        return false;
    } else {
        alert("Submitted!");
    }
});


allFields.forEach( field => {
    field.addEventListener("blur", () => {
        validateRequired(field);
        validateEmail(field);
    });
    field.addEventListener("focus", () => {
        removeError(field);
    });
});

emailFields.forEach( field => {
    field.addEventListener("blur", () => {
        validateSameValue(...emailFields);
    });
    field.addEventListener("focus", () => {
        removeError(field);
    });
});

passwordFields.forEach( field => {
    field.addEventListener("blur", () => {
        validateSameValue(...passwordFields);
    });
    field.addEventListener("focus", () => {
        removeError(field);
    });
});

function validateForm(){
    let arr = [];

    allFields.forEach( field => {
        arr.push(validateRequired(field));
    });

    emailFields.forEach( field => {
        arr.push(validateEmail(field));
    })

    arr.push(validateSameValue(...emailFields));
    arr.push(validateSameValue(...passwordFields));

    return arr.includes(false) ? false : true;
}

function validateRequired(field){
    
    if(field.validity.valueMissing) {
        let msg = "This field is required!";
        hasError(field, msg);
        return false;

    } else {
        removeError(field);
        return true;
    }
}

function validateEmail(field){
    
    if(field.value !== ""){
        if(field.validity.typeMismatch) {
            let msg = "Please enter a valid email address";
            hasError(field, msg);
            return false;

        } else {
            removeError(field);
            return true;
        }
    }
}

function validateSameValue(field, confirmField){
    if (field.value !== confirmField.value) {
        let msg = "The field values are different";
            hasError(confirmField, msg);
            return false;
        } else {
            removeError(field);
            return true;
    }
}

function hasError(field, msg){

    field.classList.add("has-error");
    
    let span = document.createElement("span");
    span.classList.add("error-msg");
    span.innerHTML = msg;

    if (!field.nextElementSibling) {
        field.parentNode.appendChild(span);
    }
}

function removeError(field){
    let errorMsg = field.parentNode.querySelector(".error-msg");

    if(errorMsg) {
        field.parentNode.removeChild(errorMsg);
    }

    field.classList.remove("has-error");
}