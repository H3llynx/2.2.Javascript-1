const validationStatus = {
	name: false,
	lastName: false,
	email: false,
	address: false,
	password: false,
	phone: false
};

const fName = document.getElementById("fName");
const fEmail = document.getElementById("fEmail");
const fAddress = document.getElementById("fAddress");
const fLastN = document.getElementById("fLastN");
const fPassword = document.getElementById("fPassword");
const fPhone = document.getElementById("fPhone");
const form = document.querySelector("form");

// Exercise 6
const validate = () => {
	const isFormValid = Object.values(validationStatus).every(value => value === true);
	if (!isFormValid) {
		const modal = new bootstrap.Modal(document.getElementById("formErrorModal"));
		modal.show();
		return
	} else {
		const modal = new bootstrap.Modal(document.getElementById("formSuccessModal"));
		modal.show();
		setTimeout(() => {
			window.location.href = "index.html";
		}, 2000)
	}
};


const validateName = (input, errorBox, key) => {
	validationStatus[key] = false;
	const errorName = document.getElementById(errorBox);
	if (input.value.length < 3) {
		input.classList.add("is-invalid");
		errorName.textContent = "This field is required and must have at least 3 characters";
	}
	else if ((!(/^[\p{L}\s'-]+$/ui).test(input.value))) { // I'm allowing ', - and spaces as those are communs characters in French composed names
		input.classList.add("is-invalid");
		errorName.textContent = "This field can only include valid name characters";
	}
	else {
		errorName.classList.remove("is-invalid");
		input.classList.remove("is-invalid");
		validationStatus[key] = true;
	}
};

const validateEmail = (input, errorBox) => {
	validationStatus.email = false;
	const errorEmail = document.getElementById(errorBox);
	const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
	const includesEmoji = /\p{Extended_Pictographic}/gu;
	if (input.value.trim() === "") {
		input.classList.add("is-invalid");
		errorEmail.textContent = "This field is required";
	}
	else if (includesEmoji.test(input.value)) {
		input.classList.add("is-invalid");
		errorEmail.textContent = "Oops! Emojis are not allowed.";
	} else if (!emailPattern.test(input.value)) {
		input.classList.add("is-invalid");
		errorEmail.textContent = "Please try something like name@domain.com";
	} else {
		input.classList.remove("is-invalid");
		validationStatus.email = true;
	}
};

const validatePassword = (input, errorBox) => {
	validationStatus.password = false;
	const errorPassword = document.getElementById(errorBox);
	errorPassword.textContent = "";
	if (input.value.length < 4) {
		input.classList.add("is-invalid");
		errorPassword.textContent = "The password must include at least 4 characters";
	}
	else if ((!(/\d/).test(input.value))) {
		input.classList.add("is-invalid");
		errorPassword.textContent = "The password must include at least 1 digit";
	} else {
		input.classList.remove("is-invalid");
		validationStatus.password = true;
	}
};

const validatePhone = (input, errorBox) => {
	validationStatus.phone = false;
	const errorPhone = document.getElementById(errorBox);
	errorPhone.textContent = "";
	if (!(/^\d+$/).test(input.value)) {
		input.classList.add("is-invalid");
		errorPhone.textContent = "This field only allow digits. If you have an international number, please replace + by 00";
	}
	else if (input.value.length < 3) {
		input.classList.add("is-invalid");
		errorPhone.textContent = "Your phone number must include, at least, 3 digits";
	}
	else {
		input.classList.remove("is-invalid");
		validationStatus.phone = true;
	}
};

const validateAddress = (input, errorBox) => {
	validationStatus.address = false;
	const errorAddress = document.getElementById(errorBox);
	errorAddress.textContent = "";
	if (input.value.length < 3) {
		input.classList.add("is-invalid");
		errorAddress.textContent = "This field must include, at least, 3 characters";
	}
	else {
		input.classList.remove("is-invalid");
		validationStatus.address = true;
	}
};

if (fName) {
	fName.addEventListener("blur", () => { validateName(fName, "errorName", "name") });
};
if (fLastN) {
	fLastN.addEventListener("blur", () => { validateName(fLastN, "errorLastN", "lastName") });
};
if (fEmail) {
	fEmail.addEventListener("change", () => validateEmail(fEmail, "errorEmail")); // blur is too intrusive, at least for me since it directly shows me error if I discard native auto fill option
};
if (fPassword) {
	fPassword.addEventListener("input", () => validatePassword(fPassword, "errorPassword"));
};
if (fPhone) {
	fPhone.addEventListener("blur", () => validatePhone(fPhone, "errorPhone"));
};
if (fAddress) {
	fAddress.addEventListener("blur", () => validateAddress(fAddress, "errorAddress"));
};
if (form) {
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		validate();
	})
};