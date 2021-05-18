export default {
	name: "Register page",
	data() {
		return {
			activeView: 0,
		};
	},
	methods: {
		nextView() {
			if (!this.validateView()) return;
			document
				.getElementsByClassName("tab")
				.item(this.activeView)
				.classList.add("none");
			document
				.getElementsByClassName("tab")
				.item(this.activeView + 1)
				.classList.remove("none");
			this.activeView++;
		},
		previousView() {
			document
				.getElementsByClassName("tab")
				.item(this.activeView)
				.classList.add("none");
			document
				.getElementsByClassName("tab")
				.item(this.activeView - 1)
				.classList.remove("none");
			this.activeView--;
		},
		validateView() {
			const view = document.getElementsByClassName("tab").item(this.activeView);
			const inputs = view.querySelectorAll("input");
			const errors = [];
			inputs.forEach((input) => {
				if (
					input.classList.contains("required") &&
					input.value.trim() === "" &&
					!input.classList.contains("verified")
				)
					errors.push(input.id);
			});
			if (errors.length) {
				errors.forEach((err) => {
					document.getElementById(err).style.background = "#df7f7f";
				});
				return false;
			}
			return true;
		},
		verifyUsername() {
			const usernameError = document.getElementById("form-username-error");
			const username = document.getElementById("form-username");
			if (username.value.length > 2 && username.value.length < 20) {
				usernameError.innerHTML = '';
				if (!username.classList.contains("verified"))
					username.classList.add("verified");
				username.style.background = "";
			} else {
				if (username.classList.contains("verified"))
					username.classList.remove("verified");
				username.style.background = "#df7f7f";
				username.value.length <= 2 ? usernameError.innerHTML = '<p>Username is too short</p>' : usernameError.innerHTML = '<p>Username is too long</p>'
			}
		},
		verifyStrength(el) {
			const passwordError = document.getElementById('form-password1-error')
			const password = document.getElementById(el);
			let strongRegex = new RegExp(
				"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
			);
			let mediumRegex = new RegExp(
				"^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})"
			);
			let strength = "";
			if (strongRegex.test(password.value)) {
				strength = "strong";
			} else if (mediumRegex.test(password.value)) {
				strength = "medium";
			} else {
				strength = "weak";
			}
			switch (strength) {
				case "strong":
					password.style.background = "";
					passwordError.innerHTML = ''
					if (!password.classList.contains('verifed')) password.classList.add("verified");
					break;
				case "medium":
					password.style.background = "#f7bd4a";
					passwordError.innerHTML = '<p>Acceptable password</p>'
					if (!password.classList.contains('verifed')) password.classList.add("verified");
					break;
				case "weak":
					passwordError.innerHTML = '<p>Password too weak</p>'
					password.style.background = "#df7f7f";
					if (password.classList.contains('verifed')) password.classList.remove("verified");
					break;
			}
		},
		matchPasswords() {
			const p1 = document.getElementById('form-password1');
			const p2 = document.getElementById('form-password2');
			const p2Error = document.getElementById('form-password2-error');
			if (p1.value === p2.value && p1.value.length > 0) {
				p2.style.background = ""
				p2Error.innerHTML = ''
				p2.classList.add("verified");
			} else {
				if (p2.classList.contains("verified")) p2.classList.remove("verified");
				p2.style.background = "#df7f7f"
				p2Error.innerHTML = '<p>Passwords do not match</p>'
			}
		},
		verifyAge() {
			const age = document.getElementById('form-age');
			const ageError = document.getElementById('form-age-error');
			if (!age.value || age.value.trim() === '' || age.value.length > 3) {
				age.style.background = "#df7f7f";
				ageError.innerHTML = '<p>Invalid age</p>';
			} else {
				age.style.background = "";
				ageError.innerHTML = '';
			}
		},
		verifyEmail() {
			const email = document.getElementById('form-email');
			const emailError = document.getElementById('form-email-error')
			const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			if (regexEmail.test(email.value)) {
				if (!email.classList.contains('verifed')) email.classList.add('verifed');
				email.style.background = '',
					emailError.innerHTML = '';
			} else {
				if (email.classList.contains('verifed')) email.classList.remove('verifed');
				email.style.background = '#df7f7f';
				emailError.innerHTML = '<p>Invalid email</p>';
			}
		},
		async post() {
			const body = JSON.stringify({
				nickname: document.getElementById("form-username").value,
				password: document.getElementById("form-password1").value,
				first_name: document.getElementById("form-first_name").value,
				last_name: document.getElementById("form-last_name").value,
				age: document.getElementById("form-age").value,
				phone_number: document.getElementById("form-phone_number").value,
				email: document.getElementById("form-email").value,
			});
			const responce = await fetch("http://192.168.0.30:3000/api/v1/members", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				credentials: "include",
				withCredentials: true,
				body: body,
			});
			const result = await responce.json();
			console.log(result);
			if (result && result.status === "success")
				this.$router.push("/member/login");
		},
	},
	mounted() {
		const view = document.getElementsByClassName("tab").item(this.activeView);
		view.classList.remove("none");
	},
};