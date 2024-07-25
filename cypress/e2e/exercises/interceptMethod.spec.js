/// <reference types="cypress" />

describe('Using intercept method', () => {

    it('first test with intercept mocking response', () => {
        cy.intercept({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        }, 
        {
            statusCode: 200,
            body: [{
                "book_name": "RestAssured with Java",
                "isbn": "BSG",
                "aisle": "2302"
                }]
        }).as('books')

        cy.visit('https://rahulshettyacademy.com/angularAppdemo')
        cy.get('button.btn.btn-primary').click()

        cy.wait('@books')

        cy.get('p').should('be.visible').and('have.text','Oops only 1 Book available')
    })

    //Test for Check security, return should be 403 for another user 
    it.only('second test with intercept mocking request', () => {
        cy.intercept('GET','https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty', (request) => {
            request.url = 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra'
            request.continue( (response) => {
                expect(response.statusCode).to.equal(403)
            })
        }).as('booksURL')

        cy.visit('https://rahulshettyacademy.com/angularAppdemo')
        cy.get('button.btn.btn-primary').click()

        cy.wait('@booksURL')

        //cy.get('p').should('be.visible').and('have.text','Oops only 1 Book available')
    })

    it('length of the response match with table rows', () => {
        cy.intercept({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        },
        {
            statusCode: 200,
            body: [{
                "book_name": "RestAssured with Java",
                "isbn": "BSG",
                "aisle": "2302"
                }]
        }).as('books')

        cy.visit('https://rahulshettyacademy.com/angularAppdemo')
        cy.get('button.btn.btn-primary').click()

        cy.wait('@books').then( ({request,response}) => {
            const lenght = response.body.length
            cy.get('tr').should('have.length', lenght+1)
        })
    })

})