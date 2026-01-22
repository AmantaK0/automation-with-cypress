class MainPage {
    loginlink() {
        return cy.get('.ico-login')
    }

    logoutlink() {
        return cy.get('.ico-logout')
    }

    computersMenu() {
        return cy.contains('Computers')
    }

    notebooksLink() {
        return cy.contains('Notebooks')
    }

    wishlistQty() {
        return cy.get('.wishlist-qty')
    }

    cartQty() {
        return cy.get('.cart-qty')
    }

    shoppingCartMenu() {
        return cy.get('.ico-cart')
    }

    goToCartButton() {
        return cy.contains('button', 'Go to cart')
    }
}

export default MainPage