// Assign form to variable and disable default validation. 
const signupForm = document.querySelector("#account_form");
signupForm.noValidate = true;

// Validate form upon submission.
signupForm.addEventListener("submit", validateForm);


function validateForm(e) {
    const form = e.target;
    
    if (!form.checkValidity()) {
        // If form isn't valid, prevent submission.
        e.preventDefault();

        // For all invalid form elements, set error class for appropriate styling.
        for (const element of form.elements) {
            if (element.checkValidity()) {
                element.classList.remove("error");
            }
            else {
                element.classList.add("error");
            }
        }
    }
}