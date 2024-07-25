/// <reference types="cypress" />

describe('HTML Tables', () => {

    beforeEach('go to site', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    })

    it('scan tables', () => {
        //:nth-child()  --- CSS
        cy.get('[name="courses"] tr td:nth-child(2)').each( (ele,index) => {
            const text = ele.text()
            if (text.includes('Python')) {
                cy.get('[name="courses"] tr td:nth-child(2)').eq(index).next().should('contain','25')
            }
        })
    })
})