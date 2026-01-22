import MainPage from "../../pages/MainPage";
import NotebooksPage from "../../pages/NotebooksPage";
import LoginPage from "../../pages/LoginPage";
import user from '../../fixtures/user.json'

describe('Dashboard test', () => {
    const main = new MainPage()
    const notebooks = new NotebooksPage()
    const login = new LoginPage()

    before(() => {
        cy.visit('https://demo.nopcommerce.com/')
        main.loginlink().click()
        login.login(user)
    })

    it('Validates notebooks actions', () => {
        // Hover over Computers Menu
        main.computersMenu().trigger('mouseover')

        // Click Notebooks
        main.notebooksLink().click()

        // Verify that we have navigate to Notebooks Page
        cy.url().should('include', '/notebooks')
        cy.get('.page-title').should('contain', 'Notebooks')
        
        // Choose 9 on Display dropdown
        notebooks.displayDropDown().select('9')

        // Verify that only 6 items are displayed
        notebooks.productItems().should('have.length', 6)

        // On Filter by attributes check 16GB
        notebooks.ramFilter().check()

        // Verify that only 1 item is displayed
        notebooks.productItems().should('have.length', 1)

        // Uncheck the 16GB checkbox
        notebooks.ramFilter().uncheck()

        // Verify that 6 items are displayed now
        notebooks.productItems().should('have.length', 6)

        // Add the second and the third item on wishlist
        notebooks.addtoWishlist().eq(1).click()

        // Verify that after every item added a notification with text: The product has been added to your wishlist – is displayed
        notebooks.notification()
            .should('be.visible')
            .and('contain', 'The product has been added to your wishlist')

        notebooks.addtoWishlist().eq(2).click()
        notebooks.notification()
            .should('be.visible')
            .and('contain', 'The product has been added to your wishlist')

        // verify that detail page for the fourth item is open,
        notebooks.productItems().eq(3).click()
        cy.get('.product-name h1').should('be.visible')

        // go back to Notebooks Page
        cy.go('back')

        // add fifth and sixth item on Shopping Cart
        notebooks.cartButtons().eq(4).click()

        // Verify that for the two last items added a notification with text: The product has been added to your shopping cart
        notebooks.notification()
            .should('be.visible')
            .and('contain', 'The product has been added to your shopping cart')

        notebooks.cartButtons().eq(5).click()
        notebooks.notification()
            .should('be.visible')
            .and('contain', 'The product has been added to your shopping cart')

        // Verify that Wishlist on Menu bar displays 2
        home.wishlistQty().should('contain', '2')

        // Verify that Shopping Cart on Menu bar displays 3
        home.cartQty().should('contain', '3')
    })
})