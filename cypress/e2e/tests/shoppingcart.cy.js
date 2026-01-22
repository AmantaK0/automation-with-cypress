import CartPage from "../../pages/CartPage";
import MainPage from "../../pages/MainPage";
import LoginPage from "../../pages/LoginPage";
import user from '../../fixtures/user.json'
import calculateProductsSum from "../../../utils/calculateProductsSum";
import getTotalPrice from "../../../utils/getTotalPrice ";

describe('Shopping Cart test', () => {
    const cart = new CartPage()
    const main = new MainPage()
    const login = new LoginPage()

    before(() => {
        cy.visit('https://demo.nopcommerce.com/')
        main.loginlink().click()
        login.login(user)
    })

    it('Validates shopping cart totals', () => {
        // Hover over Shopping Cart – Menu
        main.shoppingCartMenu().trigger('mouseover')

        // Verify that ‘Go To Cart’ – button is displayed
        main.goToCartButton()
            .should('be.visible')
            .and('contain', 'Go to cart')

        // Click ‘Go To Cart’ – button
        main.goToCartButton().click()

        // Verify that we have navigate to Shopping Cart Page
        cy.url().should('include', '/cart')
        cy.get('.page-title h1').should('contain', 'Shopping cart')

        // Verify that the following buttons are displayed
        // Update Cart button is not visible on the page
        cart.continueShopping().should('be.visible')
        cart.estimateShipping().should('be.visible')

        // Verify that the prices sum for all items is equal to Total Price in the end of the page, check that price color is blue.
        let productsSum
        let totalPrice

        calculateProductsSum(cart.unitPrices())
            .then((sum) => {
                productsSum = sum
            })

        getTotalPrice(cart.totalPrice())
            .then((total) => {
                totalPrice = total
            })
            .then(() => {
                expect(productsSum).to.eq(totalPrice)
            })

        // verify color is blue
        cart.totalPrice()
            .should('have.css', 'color', '#4ab2f1')
    })
})