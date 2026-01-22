import MainPage from '../../pages/MainPage'
import RegisterPage from '../../pages/RegisterPage'
import user from '../../fixtures/user.json'

describe('User registers', () => {
    const main = new MainPage()
    const register = new RegisterPage()

    it('Completes registration successfully', () => {
        cy.visit('https://demo.nopcommerce.com/', { failOnStatusCode: false })

        // cy.intercept('POST', '/captcha/verify', {
        //     statusCode: 200,
        //     body: { success: true }
        // }).as('captcha');

        Cypress.Commands.add('bypassCaptcha', () => {
            cy.intercept('POST', '/captcha/verify', {
                statusCode: 200,
                body: { success: true },
            });
        });

        main.loginlink().click()
        register.register().click()

        cy.title().should('contain', 'Register')

        cy.intercept('POST', '/register').as('registerRequest')

        register.registerUser(user)

        register.successMessage().should('contain', 'completed')

        cy.wait('@registerRequest')
            .its('response.statusCode')
            .should('eq', 200)

        main.logoutlink().click()
    })
})