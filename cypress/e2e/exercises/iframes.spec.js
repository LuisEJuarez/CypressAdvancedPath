/// <reference types="cypress" />
/// <reference types="cypress-iframe" />

import frames from "cypress-iframe"

//NEED TO INSTALL npm install -D cypress-iframe

describe('Iframes', () => {

    beforeEach('go to site', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    })

    it('Working with Iframes', () => {
        cy.frameLoaded('#courses-iframe')
        cy.iframe().find('a[href="mentorship"]').eq(0).click()
        cy.iframe().find('h1[class="pricing-title text-white ls-1"]').should('have.length',2)
    })
})