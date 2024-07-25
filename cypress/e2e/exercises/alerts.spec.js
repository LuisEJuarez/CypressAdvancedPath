/// <reference types="cypress" />

describe('popus and alerts suite', () => {

    beforeEach('go to site', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    })

    it('first test', () => {
        cy.get('#alertbtn').click()
        

        cy.on('window:alert', (str) => {
            expect(str).to.equal('Hello , share this practice page and share your knowledge')
        })

        cy.get('[value="Confirm"]').click()
        cy.on('window:confirm', (str) => {
            expect(str).to.equal('Hello , Are you sure you want to confirm?')
        })

    })
})