///<reference types="cypress" />
import neatCsv from 'neat-csv'
let productName

describe('JWT Sessions', () => {

    it('is logged in throught local storage', async() => {
        cy.LoginAPI().then( () => {
            cy.visit("https://rahulshettyacademy.com/client",
            {
                onBeforeLoad: function(window){
                    window.localStorage.setItem('token',Cypress.env('token'))
                }
            })
        })

        cy.get('.card-body b').eq(1).then(ele => {
            productName = ele.text()
        })
        cy.get('.card-body button:last-of-type').eq(1).click()
        cy.get('[routerlink*="cart"]').click()
        cy.contains('Checkout').click()
        cy.get('[placeholder="Select Country"]').type('Mexico')
        cy.get('.ta-results button').each( (ele,index,list) => {
            if (ele.text() === " Mexico") {
                cy.wrap(ele).click()
            }
        })
        cy.get('.action__submit').click()
        cy.wait(2000)
        cy.contains('Click To Download Order Details in CSV').click()

        cy.readFile(Cypress.config("fileServerFolder") + "/cypress/downloads/order-invoice_luisernesto.juarez.csv" ) 
            .then( async (text) => {
                const csv = await neatCsv(text)
                console.log(csv)
                const actualProductCSV = csv[0]["Product Name"]
                expect(productName).to.equal(actualProductCSV)
            })

    })

})