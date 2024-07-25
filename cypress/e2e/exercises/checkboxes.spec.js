///<reference types="cypress" />

describe('Working with HTML elements', () => {
    beforeEach('go to site', () => {
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
    })

    it('Test checkboxes', () => {

        cy.get('input#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')

        cy.get('input#checkBoxOption1').uncheck().should('not.be.checked')

        cy.get('#checkbox-example [type="checkbox"]').check([])

        cy.get('#checkbox-example [type="checkbox"]').uncheck(['option1','option2'])

        //radiobuttons
        cy.get('.radioButton').eq(0).click()
    })

    it.skip('dropdowns', () => {
        cy.get('#dropdown-class-example').select('option3').should('have.value','option3')
        cy.get('#dropdown-class-example').select(1).should('have.value','option1')
        cy.get('#dropdown-class-example').select(0).should('not.have.value')

        //Dynamic
        cy.get('#autocomplete').type('Me')

        cy.get('#ui-id-1 div').each(ele => {
            if (ele.text() === 'Mexico') {
                cy.wrap(ele).click()
                cy.get('#autocomplete').should('have.value','Mexico')
            }
        })
    })

    it('Show - hidden elements', () => {
        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')
    })

})