import popup from '../fixtures/popup.json'

class CartPage{
    estimateShipping() {
        return cy.get('#open-estimate-shipping-popup')
    }

    continueShopping(){
        return cy.contains('button', 'Continue shopping')
    }

    emptyMessage() {
        return cy.contains('Your Shopping Cart is empty')
    }

    unitPrices() {
        return cy.get('.product-unit-price')
    }

    totalPrice() {
        return cy.get('.order-total .value-summary strong')
    }

    cartRows() {
        return cy.get('.cart tbody tr')
    }

    removefromCart() {
        return cy.get('input[name="removefromcart"]')
    }

    esimatePopup() {
        return cy.get('#estimate-shipping-popup')
    }

    countryField() {
        return cy.get('#CountryId')
    }

    zipField() {
        return cy.get('#ZipPostalCode')
    }

    applyButton() {
        return cy.contains('button', 'Apply')
    }

    emptyCartMessage() {
        return cy.contains('Your Shopping Cart is empty')
    }

    completePopupForm(popup){
        this.countryField().type(popup.country)
        this.zipField().type(popup.zip)
        this.applyButton().click()
    }
}

export default CartPage