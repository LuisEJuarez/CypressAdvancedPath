import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { homePage } from "../../../../support/pageObjects/homePage"
import { productsPage } from "../../../../support/pageObjects/productsPage"

//cypress run --spec cypress\integration\examples\BDD\*.feature --headed --browser chrome
//npx cypress-tags run -e TAGS="@Smoke" --headed --browser chrome
// npx cypress run --spec cypress/integration/examples/BDD/*.feature --headed --browser chrome --env url="https://google.com"

Given('I open Ecommerce Page', () => {
    cy.visit(`${Cypress.env('url')}/angularpractice/`)
})

When('I add items to Cart', function(){
    homePage.getShopTab().click()
    cy.get('div[class="card h-100"]').each( ele => {
        if (ele.text().includes(this.dataUser.productName[0])) {
            cy.wrap(ele).find('button').click()
        }
    })

    cy.AddItemToCart(this.dataUser.productName[1])
    cy.AddItemToCart(this.dataUser.productName[2])
    cy.AddItemToCart(this.dataUser.productName[2])

    //USING a foreach
    this.dataUser.productName.forEach( item => {
        cy.AddItemToCart(item)
    })

    productsPage.checkOutButton().click()
})

Then('Validate the total prices', () => {
    var price = 0
        cy.get('tr td:nth-child(4) strong').each( ele => {
            return price += Number(ele.text().split(' ')[1].trim())
        }).then( () => {
            cy.log(price)
        })

        cy.get('tr td:nth-child(5) strong').then( ele => {
            const totalPrice = Number(ele.text().split(' ')[1].trim())
            expect(price).to.equal(totalPrice)
        })
})

Then('select the country sumbit and verify Thankyou message', () => {
    cy.get('button.btn.btn-success').click()
    cy.get('#country').type('United States of America')
    cy.get('div.suggestions a').eq(0).click()
    cy.get('#checkbox2').check({force:true})
    cy.get('form.ng-untouched  input[type="submit"]').click()
    cy.get('.alert').should('contain','Thank you! Your order will be delivered')
})

When('I fill the form details', function(){
    homePage.getEditBox().type(this.dataUser.name)
    homePage.getGender().select(this.dataUser.gender)
})

Then('Validate the forms behaviour', function(){
    homePage.getTwoWayDataBinding().should('have.value',this.dataUser.name)
    homePage.getEditBox().should('have.attr', 'minlength', '2')
    homePage.getEnterpreneaur().should('be.disabled')
})

Then('select the Shop Page', () => {
    homePage.getShopTab().click()
})