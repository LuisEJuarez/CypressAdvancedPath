/// <reference types="cypress" />

describe('Using request method', () => {

    it('Using request mehotd for API testing', () => {
        cy.request('POST', 'http://216.10.245.166/Library/Addbook.php', {
            "name": "Learn Appium Automation with Java",
            "isbn": "qqbcdsssdass",
            "aisle": "22s7",
            "author": "John foe"
        }).then( (response) => {
            expect(response.body).to.have.property("Msg", "successfully added")
            expect(response.status).to.eq(200)
        })
    })
    
})