import user from '../fixtures/user.json'

class LoginPage{
    email() {
        return cy.get('#Email')
    }

    password() {
        return cy.get('#Password')
    }

    loginButton() {
        return cy.get('button[type="submit"]')
    }

    welcomeText() {
        return cy.contains('Welcome to our store')
    }

    login(user){
        this.email().type(user.email)
        this.password().type(user.password)
        this.loginButton.click()
    }
}

export default LoginPage