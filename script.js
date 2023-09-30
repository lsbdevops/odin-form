// Assign form to variable and disable default validation. 
const signupForm = document.querySelector("#account_form");
signupForm.noValidate = true;

// Validate form upon submission.
signupForm.addEventListener("submit", validateForm);


function validateForm(e) {
    const form = e.target;
    
    if (form.checkValidity()) {
        // Remove all outstanding error messages.
        for (const element of form.elements) {
            if (element.nodeName !== "INPUT") {
                continue;
            }
            
            element.classList.remove("error");
            element.closest("ul").querySelector(".help").classList.remove("error");
            element.closest(".form-row").classList.remove("error");
        }

        // Confirm that the password and confirmation match.
        const password = document.querySelector("#password");
        const passwordConfirmation = document.querySelector("#confirmation");

        if (password.value !== passwordConfirmation.value) {
            e.preventDefault();
            password.classList.add("error");
            passwordConfirmation.classList.add("error");

            const help = password.closest("ul").querySelector(".help");
            help.classList.add("error");
            help.textContent = "Passwords do not match.";
        }
    }
    else {
        // If form isn't valid, prevent submission.
        e.preventDefault();

        // For all invalid form elements, set error class for appropriate styling.
        for (const element of form.elements) {

            // If element is not an input element, proceed to the next element in the node list.
            if (element.nodeName !== "INPUT") {
                continue;
            }

            // Remove/add error class based on field validity.
            if (element.checkValidity()) {
                element.classList.remove("error");
                element.closest("ul").querySelector(".help").classList.remove("error");
                
                // Only remove error class from row div element if the first input element is also valid.
                if (element.closest(".form-row").querySelector("input").checkValidity()) {
                    element.closest(".form-row").classList.remove("error");
                }
            }
            else {
                element.classList.add("error");
                element.closest(".form-row").classList.add("error");

                // Update class and text content for the associated 'help' element.
                const help = element.closest("ul").querySelector(".help");
                help.classList.add("error");

                if (element.validity.valueMissing) {
                    help.textContent = "Input is required for this field";
                }
                else if (element.validity.patternMismatch) {
                    switch(element.type) {
                        case "text":
                            help.textContent = "Name must be letters only";
                            break;
                        case "tel":
                            help.textContent = "Phone must be numbers only";
                            break;
                    }
                }
                else if (element.validity.typeMismatch)
                {
                    help.textContent = "Email must be in format of you@example"
                }
                // Otherwise, default to the standard validation message.
                else {
                    help.textContent = element.validationMessage;
                }
            }
        }
    }
}