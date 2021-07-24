 (() => { 
var CreateForm = function () {
	var submitButton;
	var validator;
	var form;

	var initForm = function() {
        $(form.querySelector('[name="category"]')).on('change', function() {
            validator.revalidateField('category');
        });
	}

	var handleForm = function() {
		validator = FormValidation.formValidation(
			form,
			{
				fields: {
					'name': {
						validators: {
							notEmpty: {
								message: 'API name is required'
							}
						}
					},
					'description': {
						validators: {
							notEmpty: {
								message: 'Description is required'
							}
						}
					},
					'category': {
						validators: {
							notEmpty: {
								message: 'Country is required'
							}
						}
					},
					'method': {
						validators: {
							notEmpty: {
								message: 'API method is required'
							}
						}
					}
				},
				plugins: {
					trigger: new FormValidation.plugins.Trigger(),
					bootstrap: new FormValidation.plugins.Bootstrap5({
						rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
					})
				}
			}
		);

		// Action buttons
		submitButton.addEventListener('click', function (e) {
			e.preventDefault();

			// Validate form before submit
			if (validator) {
				validator.validate().then(function (status) {
					console.log('validated!');
					if (status == 'Valid') {
						submitButton.disabled = true;
						setTimeout(function() {
							// Enable button
							submitButton.disabled = false;							
							alert("Form has been successfully submitted!")
							form.submit(); // Submit form
						}, 2000);   						
					} else {
						alert("Sorry, looks like there are some errors detected, please try again")
					}
				});
			}
		});
	
	}

	return {
		// Public functions
		init: function () {
			// Elements
			form = document.querySelector('#create_form');
			submitButton = document.getElementById('create_api_key_submit');
			initForm();
			handleForm();
		}
	};
}();

// On document ready
document.addEventListener('DOMContentLoaded', function(e) {
	CreateForm.init();
  });

 })();
