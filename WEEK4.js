document.addEventListener('DOMContentLoaded', () => {
    class User {
        constructor(name, email, password) {
            this.name = name;
            this.email = email;
            this.password = password;
        }

        toJSON() {
            return JSON.stringify({
                name: this.name,
                email: this.email,
                password: this.password
            });
        }
    }

    class FormHandler {
        constructor(formId, errorMessageId) {
            this.form = document.getElementById(formId);
            this.errorMessage = document.getElementById(errorMessageId);

            this.form.addEventListener('submit', (event) => this.handleSubmit(event));
        }

        handleSubmit(event) {
            event.preventDefault();
            const name = this.form.name.value.trim();
            const email = this.form.email.value.trim();
            const password = this.form.password.value.trim();
            const confirmPassword = this.form.confirmPassword.value.trim();

            if (this.validateForm(name, email, password, confirmPassword)) {
                const user = new User(name, email, password);
                console.log(user.toJSON());
                this.showErrorMessage('');
            }
        }

        validateForm(name, email, password, confirmPassword) {
            const namePattern = /^[a-zA-Z\s]{2,}$/;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

            if (!namePattern.test(name)) {
                this.showErrorMessage('Name must be at least 2 characters long and contain only letters and spaces.');
                return false;
            }

            if (!emailPattern.test(email)) {
                this.showErrorMessage('Invalid email format.');
                return false;
            }

            if (!passwordPattern.test(password)) {
                this.showErrorMessage('Password must be at least 8 characters long and contain at least one letter and one number.');
                return false;
            }

            if (password !== confirmPassword) {
                this.showErrorMessage('Passwords do not match.');
                return false;
            }

            return true;
        }

        showErrorMessage(message) {
            this.errorMessage.textContent = message;
        }
    }

    new FormHandler('registrationForm', 'errorMessage');
});
