class ProductsPage {

    checkOutButton(){
        return cy.contains('Checkout')
    }
}

export const productsPage = new ProductsPage()