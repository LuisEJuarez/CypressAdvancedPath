/// <reference types="cypress" />

describe('This is my first suite', () => {
    
    it('My first test', () => {
        expect(true).to.not.equal(false)
    })

    it.skip('Navigate to a site and search for items', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')

        cy.get('.search-keyword').type('ca')
        cy.get('.products').find('.product').should('have.length',4)
        //other option using visible css property
        cy.get('.product:visible').should('have.length',4)

        cy.get('.products').find('.product button').eq(0).click()

        cy.get('.products').find('.product').each((ele) => {
            const text = ele.find('h4.product-name').text()
            if (text.includes('Carrot')) {
                cy.wrap(ele).find('button').click()
            }
        })

    })

    it('Using Aliases', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')

        cy.get('.search-keyword').type('ca')

        cy.get('.products').find('.product').as('products')

        cy.get('@products').should('have.length',4)
        //other option using visible css property
        cy.get('@products').should('have.length',4)

        cy.get('@products').find('button').eq(0).click()

        cy.get('@products').each((ele) => {
            const text = ele.find('h4.product-name').text()
            if (text.includes('Carrot')) {
                cy.wrap(ele).find('button').click()
            }
        })

    })

    it('Jquery and Cypress', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')

        cy.get('.brand.greenLogo').then( ele => {
            cy.log(ele.text())
            cy.wrap(ele).should('have.text','GREENKART')
        })
    })

})