// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

///<reference types="cypress" />

Cypress.Commands.add('AddItemToCart', (productName) => {
    cy.get('h4.card-title').each( (ele, index) => {
        if (ele.text().includes(productName)) {
            cy.get('button.btn.btn-info').eq(index).click()
        }
    })
})

Cypress.Commands.add('LoginAPI', () => {

    cy.request("POST","https://rahulshettyacademy.com/api/ecom/auth/login",
        {"userEmail":"luisernesto.juarez@gmail.com","userPassword":"Qwerty1234"})
        .then( (response) => {
            expect(response.status).to.eq(200)
            Cypress.env('token',response.body.token)
        })

})