/// <reference types="cypress" />

describe('Mouseover examples', () => {

    beforeEach('go to site', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    })

    it('first test', () => {
        cy.get('div.mouse-hover-content').invoke('show')
            .contains('Top').click()

        cy.url().should('include','top')


        cy.contains('Reload').click({force:true})
        cy.url().should('not.include','top')
    })
})