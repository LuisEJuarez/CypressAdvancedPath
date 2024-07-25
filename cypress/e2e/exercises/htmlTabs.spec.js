/// <reference types="cypress" />

describe('Handling Child Windows', () => {
    
    beforeEach('go to site', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    })

    it('First test with tabs', () => {
        //target="_blank"
        cy.get('#opentab').invoke('removeAttr','target').click()

        cy.origin('https://www.qaclickacademy.com/', () => {
            cy.get('[class="navbar navbar-expand-lg"]').contains('About us').click()
            cy.get('.section-title').should('contain','Welcome to QAClick Academy')
        })
    })

    it.only('Get attr', () => {
        cy.get('#opentab').then( ele => {
            const ulr = ele.prop('href')
            cy.visit(ulr)
        })

        cy.origin(ulr, () => {
            cy.get('[class="navbar navbar-expand-lg"]').contains('About us').click()
            cy.get('.section-title').should('contain','Welcome to QAClick Academy')
        })
    })

    it.skip('Second test with windows', () => {
        //onclick="openWindow()"
        //http://www.qaclickacademy.com/
        cy.get('#openwindow').invoke('removeAttr','onclick').click()

        cy.origin('https://www.qaclickacademy.com/', () => {
            cy.get('[class="navbar navbar-expand-lg"]').contains('About us').click()
            cy.get('.section-title').should('contain','Welcome to QAClick Academy')
        })
    })

})