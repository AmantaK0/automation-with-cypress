class NotebooksPage{
    productItems() {
        return cy.get('.product-item')
    }

    displayDropDown() {
        return cy.get('#products-pagesize')
    }

    ramFilter(){
        return cy.get('[data-option-id="16gb-ram"]')
    }

    addtoWishlist() {
        cy.contains('button', 'Add to wishlist')
    }

    addtoCart() {
        cy.contains('button', 'Add to cart')
    }

    notification() {
        return cy.get('.bar-notification')
    }

    pageTitle() {
        return cy.get('.page-title h1')
    }

    productTitles() {
        return cy.get('.product-title a')
    }
}

export default NotebooksPage