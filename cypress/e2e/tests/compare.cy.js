import MainPage from "../../pages/MainPage"
import NotebooksPage from "../../pages/NotebooksPage"
import LoginPage from "../../pages/LoginPage";
import ProductDetailsPage from "../../pages/ProductDetailsPage";
import user from '../../fixtures/user.json'

describe('Compare list test', () => {
    const main = new MainPage()
    const notebooks = new NotebooksPage()
    const productDetailsPage = new ProductDetailsPage()
    const login = new LoginPage()

    before(() => {
        cy.visit('https://demo.nopcommerce.com/')
        main.loginlink().click()
        login.login(user)
    })

    it('Adds items to wishlist with intercept', () => {
        main.computersMenu()
        main.clickNotebooks()

        notebooks.pageTitle()
            .should('contain.text', 'Notebooks')

        notebooks.productItems().eq(2).click()

        productDetailsPage.productTitle()
            .should('be.visible')

        cy.intercept(
            'POST',
            '**/addproducttocart/details/*'
        ).as('addToWishlist')

        productDetailsPage.addToWishlistButton().click()

        // verify backend request happened
        cy.wait('@addToWishlist').its('response.statusCode')
            .should('eq', 200)

        // verify success notification
        productDetailsPage.wishlistSuccessNotification()
            .should('be.visible')
            .and('contain.text', 'The product has been added to your wishlist')
    })
})