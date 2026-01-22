import CartPage from "../../pages/CartPage";
import MainPage from "../../pages/MainPage";
import LoginPage from "../../pages/LoginPage";
import user from '../../fixtures/user.json'
import popup from '../../fixtures/popup.json'
import removeItemsUntilCartIsEmpty from "../../../utils/removeItemsUntilCartIsEmpty";

describe('Empty cart test', () => {
    const cart = new CartPage()
    const main = new MainPage()
    const login = new LoginPage()

    before(() => {
        cy.visit('https://demo.nopcommerce.com/')
        main.loginlink().click()
        login.login(user)
    })

    it('Empties the shopping cart', () => {
        // Delete the first item from the shopping cart.
        cart.cartRows().then(($rows) => {
            const initialCount = $rows.length

            cart.removefromCart().click()

            // Verify that the number of elements in Shopping Cart table is decreased by 1.
            cart.cartRows().should('have.length', initialCount - 1)
        })

        // Click Estimate Shopping button (Verify pop up is open).
        cart.estimateShipping().click()
        cart.esimatePopup().should('be.visible')

        cy.intercept('POST', '**/estimate-shipping').as('estimateShipping')

        // Fill in country, state and postal code fields and click Apply button. (Verify that interception with set data occurred)
        cart.completePopupForm(popup)

        cy.wait('@estimateShipping')
            .its('request.body')
            .should('include', '1001')


        // Repeat steps 1&2 until the last item is deleted.
        removeItemsUntilCartIsEmpty(cart)

        // Verify that Shopping Cart is empty
        cart.emptyCartMessage().should('be.visible')
        cart.cartRows().should('have.length', 0)
    })
})