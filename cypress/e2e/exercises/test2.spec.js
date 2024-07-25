///<reference types="cypress" />


describe('Second test of my suite', () => {

    it('Using Aliases', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')

        cy.get('.search-keyword').type('ca')
        cy.get('.products').find('.product').as('products')

        cy.get('@products').should('have.length',4)

        cy.get('@products').each((ele) => {
            const text = ele.find('h4.product-name').text()
            if (text.includes('Carrot')) {
                cy.wrap(ele).find('button').click()
            }
        })

        cy.get('a.cart-icon').click()
        cy.contains('PROCEED TO CHECKOUT').click()
        cy.contains('Place Order').click()
    })

})