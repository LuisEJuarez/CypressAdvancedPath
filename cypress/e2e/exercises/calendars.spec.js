/// <reference types="cypress" />

describe('Calendars', () => {

    beforeEach('go to site', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/offers')
    })

    const monthOfYear = '5'
    const dayOfMont = '15'
    const year = '2025'
    const expectedList = [monthOfYear,dayOfMont,year]

    it('Working wiht calendar', () => {
        cy.get('.react-date-picker__calendar-button').click()
        cy.get('.react-calendar__navigation__label').click().click()
        cy.contains('button',year).click()
        cy.get('[class="react-calendar__tile react-calendar__year-view__months__month"]').eq(Number(monthOfYear)-1).click()
        cy.get('[class="react-calendar__tile react-calendar__month-view__days__day"]').contains(dayOfMont).click()

        cy.get('.react-date-picker__inputGroup__input').each( (ele,index) => {
            cy.wrap(ele).invoke('val').should('contain',expectedList[index])
        })

    })
})