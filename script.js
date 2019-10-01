let allFields = document.querySelectorAll(".form-field");
let emailField = document.querySelectorAll("input[type=\"email\"]");
let submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("submit", ()=> {
    event.preventDefault();
    allFields.forEach( field => {
        console.log(field.checkValidity());
        return field.checkValidity();
    });

    console.log("submitted!");
});

allFields.forEach( field => {
    field.addEventListener("blur", () => {
        validateRequired(field);
    });
    field.addEventListener("focus", () => {
        removeError(field);
    });
});

function validateRequired(field){
    
    if(field.validity.valueMissing) {
        let msg = "This field is required!";
        hasError(field, msg);
    } else {
        removeError(field);
    }
}

function validateEmail(field){

}

function hasError(field, msg){

    field.classList.add("has-error");
    
    let span = document.createElement("span");
    span.classList.add("error-msg");
    span.innerHTML = msg;

    field.parentNode.appendChild(span);
}

function removeError(field){
    let errorMsg = field.parentNode.querySelector(".error-msg");

    if(errorMsg) {
        field.parentNode.removeChild(errorMsg);
    }

    field.classList.remove("has-error");
}