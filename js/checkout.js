let isNameValid = false;
let isEmailValid = false;
let isAddressValid = false;
let isPasswordValid = false;
let isPhoneValid = false;

const fName = document.getElementById("fName");
const fEmail = document.getElementById("fEmail");
const fAddress = document.getElementById("fAddress");
const fLastN = document.getElementById("fLastN");
const fPassword = document.getElementById("fPassword");
const fPhone = document.getElementById("fPhone");

// Exercise 6
const validate = () => {
	if (!isNameValid || !isEmailValid || !isAddressValid || !isPasswordValid || !isPhoneValid) {
		alert("Please fill in all required fields correctly.");
		return
	} else {
		alert("Form submitted successfully");
	}
}

const validateName = () => {
	isNameValid = false;
	const errorName = document.getElementById("errorName");
	errorName.textContent = "";
	if (fName.value.length < 3) {
		errorName.style.display = "block";
		errorName.textContent = "This field is required and must have, at least, 3 characters";
	}
	else if ((!(/^[\p{L}\s'-]+$/ui).test(fName.value))) { // I'm allowing ', - and spaces as those are communs characters in French composed names
		errorName.style.display = "block";
		errorName.textContent = "This field can only include valid name characters";
	}
	else {
		errorName.style.display = "none";
		isNameValid = true;
	}
}

const validateEmail = () => {
	isEmailValid = false;
	const errorEmail = document.getElementById("errorEmail");
	const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
	const includesEmoji = /\p{Extended_Pictographic}/gu;
	if (includesEmoji.test(fEmail.value)) {
		errorEmail.style.display = "block";
		errorEmail.textContent = "Oops! Emojis are not allowed.";
	} else if (!emailPattern.test(fEmail.value)) {
		errorEmail.style.display = "block";
		errorEmail.textContent = "Please try something like name@domain.com";
	} else {
		errorEmail.style.display = "none";
		isEmailValid = true;
	}
}

const validateLastName = () => {
	isNameValid = false;
	const errorName = document.getElementById("errorLastN");
	errorName.textContent = "";
	if (fLastN.value.length < 3) {
		errorName.style.display = "block";
		errorName.textContent = "This field is required and must have, at least, 3 characters";
	}
	else if ((!(/^[\p{L}\s'-]+$/ui).test(fLastN.value))) { // I'm allowing ', - and spaces as those are communs characters in French composed names
		errorName.style.display = "block";
		errorName.textContent = "This field can only include valid name characters";
	}
	else {
		errorName.style.display = "none";
		isNameValid = true;
	}
}

const validatePassword = () => {
	isPasswordValid = false;
	const errorPassword = document.getElementById("errorPassword");
	errorPassword.textContent = "";
	if (fPassword.value.length < 3) {
		errorPassword.style.display = "block";
		errorPassword.textContent = "The password must include, at least, 3 characters";
	}
	else if ((!(/\d/).test(fPassword.value))) {
		errorPassword.style.display = "block";
		errorPassword.textContent = "The password must include, at least, 1 digit";
	} else {
		errorPassword.style.display = "none";
		isPasswordValid = true;
	}
}

const validatePhone = () => {
	isPhoneValid = false;
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
		isPhoneValid = true;
	}
}

const validateAddress = () => {
	isAddressValid = false;
	const errorAddress = document.getElementById("errorAddress");
	errorAddress.textContent = "";
	if (fAddress.value.length < 3) {
		errorAddress.style.display = "block";
		errorAddress.textContent = "This field must include, at least, 3 characters";
	}
	else {
		errorAddress.style.display = "none";
		isAddressValid = true;
	}
}

if (fName) {
	fName.addEventListener("change", validateName);
}
if (fEmail) {
	fEmail.addEventListener("change", validateEmail);
}
if (fLastN) {
	fLastN.addEventListener("change", validateLastName);
}
if (fPassword) {
	fPassword.addEventListener("input", validatePassword);
}
if (fPhone) {
	fPhone.addEventListener("input", validatePhone);
}
if (fAddress) {
	fAddress.addEventListener("change", validateAddress);
}
