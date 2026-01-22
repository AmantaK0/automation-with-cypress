import LoginPage from "../../pages/LoginPage";
import MainPage from "../../pages/MainPage";
import user from "../../fixtures/user.json"

describe('User logs in', () =>{
    const login = new LoginPage()
    const main = new MainPage()

    it('Logs in successfully', () =>{
        cy.visit('https://demo.nopcommerce.com')

        main.loginlink()
        .should('be.visible')
        .and('have.text', 'Log in')
        .click()

        login.login(user)

        login.welcomeText().should('be.visible')
        main.logoutlink().click()
    })
})