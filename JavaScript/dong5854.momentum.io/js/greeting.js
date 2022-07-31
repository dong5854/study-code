const greeting = document.querySelector("#greeting");
const loginForm = document.querySelector("#login-form");
const loginInput = loginForm.querySelector("input");

const HIDDEM_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLiginSubmit(event) {
	event.preventDefault();
	loginForm.classList.add(HIDDEM_CLASSNAME);
	const username = loginInput.value;
	localStorage.setItem(USERNAME_KEY, username);
	paintGreetings(username);
}

function paintGreetings(username) {
	greeting.innerText = `Hello ${username}`;
	greeting.classList.remove(HIDDEM_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if (savedUsername === null) {
	loginForm.classList.remove(HIDDEM_CLASSNAME);
	loginForm.addEventListener("submit", onLiginSubmit);
} else {
	paintGreetings(savedUsername);
}
