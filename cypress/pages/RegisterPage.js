import user from '../fixtures/user.json'

class RegisterPage{
    register() {
        return cy.contains('button', 'Register')
    }

    genderMale() {
        return cy.get('#gender-male')
    }

    genderFemale() {
        return cy.get('#gender-female')
    }

    firstName() {
        return cy.get('#FirstName')
    }

    lastName() {
        return cy.get('#LastName')
    }

    email() {
        return cy.get('#Email')
    }

    companyName() {
        return cy.get('#Company')
    }

    password() {
        return cy.get('#Password')
    }

    confirmPassword() {
        return cy.get('#ConfirmPassword')
    }

    registerButton() {
        return cy.get('#register-button')
    }

    successMessage() {
        return cy.get('.result')
    }

    registerUser(user) {
        this.genderFemale().check()
        this.firstName().type(user.firstName)
        this.lastName().type(user.lastName)
        this.email().type(user.email)
        this.companyName().type(user.company)
        this.password().type(user.password)
        this.confirmPassword().type(user.password)
        this.registerButton().click()
    }
}

export default RegisterPage