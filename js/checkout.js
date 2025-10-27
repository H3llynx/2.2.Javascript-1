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
		alert("Please fill in all required fields correctly.");
		form.querySelectorAll("input").forEach(input => {
			input.classList.toggle("is-invalid", input.value === "");
		});
		return
	} else {
		alert("Form submitted successfully");
	}
};

const validateName = (input, errorBox, key) => {
	validationStatus[key] = false;
	const errorName = document.getElementById(errorBox);
	errorName.textContent = "";
	if (input.value.length < 3) {
		errorName.style.display = "block";
		errorName.textContent = "This field is required and must have at least 3 characters";
	}
	else if ((!(/^[\p{L}\s'-]+$/ui).test(input.value))) { // I'm allowing ', - and spaces as those are communs characters in French composed names
		errorName.style.display = "block";
		errorName.textContent = "This field can only include valid name characters";
	}
	else {
		errorName.style.display = "none";
		validationStatus[key] = true;
	}
};

const validateEmail = () => {
	validationStatus.email = false;
	const errorEmail = document.getElementById("errorEmail");
	const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
	const includesEmoji = /\p{Extended_Pictographic}/gu;
	if (fEmail.value.trim() === "") {
		errorEmail.style.display = "block";
		errorEmail.textContent = "This field is required";
	}
	else if (includesEmoji.test(fEmail.value)) {
		errorEmail.style.display = "block";
		errorEmail.textContent = "Oops! Emojis are not allowed.";
	} else if (!emailPattern.test(fEmail.value)) {
		errorEmail.style.display = "block";
		errorEmail.textContent = "Please try something like name@domain.com";
	} else {
		errorEmail.style.display = "none";
		validationStatus.email = true;
	}
};

const validatePassword = () => {
	validationStatus.password = false;
	const errorPassword = document.getElementById("errorPassword");
	errorPassword.textContent = "";
	if (fPassword.value.length < 4) {
		errorPassword.style.display = "block";
		errorPassword.textContent = "The password must include at least 4 characters";
	}
	else if ((!(/\d/).test(fPassword.value))) {
		errorPassword.style.display = "block";
		errorPassword.textContent = "The password must include, at least, 1 digit";
	} else {
		errorPassword.style.display = "none";
		validationStatus.password = true;
	}
};

const validatePhone = () => {
	validationStatus.phone = false;
	const errorPhone = document.getElementById("errorPhone");
	errorPhone.textContent = "";
	if (!(/^\d+$/).test(fPhone.value)) {
		errorPhone.style.display = "block";
		errorPhone.textContent = "This field only allow digits. If you have an international number, please replace + by 00";
	}
	else if (fPhone.value.length < 3) {
		errorPhone.style.display = "block";
		errorPhone.textContent = "Your phone number must include, at least, 3 digits";
	}
	else {
		errorPhone.style.display = "none";
		validationStatus.phone = true;
	}
};

const validateAddress = () => {
	validationStatus.address = false;
	const errorAddress = document.getElementById("errorAddress");
	errorAddress.textContent = "";
	if (fAddress.value.length < 3) {
		errorAddress.style.display = "block";
		errorAddress.textContent = "This field must include, at least, 3 characters";
	}
	else {
		errorAddress.style.display = "none";
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
	fEmail.addEventListener("blur", validateEmail);
};
if (fPassword) {
	fPassword.addEventListener("input", validatePassword);
};
if (fPhone) {
	fPhone.addEventListener("blur", validatePhone);
};
if (fAddress) {
	fAddress.addEventListener("blur", validateAddress);
};
if (form) {
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		validate();
	})
};