/// <reference types='cypress' />
import { homePage } from "../../support/pageObjects/homePage"
import { productsPage } from "../../support/pageObjects/productsPage"

describe('Hooks & Fixtures', () => {

    before('Load fixtures', () => {
        cy.fixture('example.json').as('dataUser')
    })

    beforeEach('go to site', () => {
        cy.visit(`${Cypress.env('url')}/angularpractice/`)
    })

    
    it.skip('Using Page Object', () => {
        cy.get('@dataUser').then( dataUser => {
            homePage.getEditBox().type(dataUser.name)
            homePage.getGender().select(dataUser.gender)
            cy.debug()
            homePage.getTwoWayDataBinding().should('have.value',dataUser.name)
            homePage.getEditBox().should('have.attr', 'minlength', '2')
            homePage.getEnterpreneaur().should('be.disabled')
        })
        
    })

//HERE we can user function instead of => and then use this.dataUser context instead of @dataUser
//this.dataUser.name
    it.skip('Working wiht hooks', () => {
        cy.get('@dataUser').then( dataUser => {
            cy.get('form input[name="name"]').type(dataUser.name)
            cy.get('#exampleFormControlSelect1').select(dataUser.gender)

            cy.get('input.ng-valid.ng-touched').should('have.value',dataUser.name)
            cy.get('form input[name="name"]').should('have.attr', 'minlength', '2')
            cy.get('#inlineRadio3').should('be.disabled')
        })
        
    })


//Using this. context
    it('Add items to the cart', function () {
        cy.contains('Shop').click()
        cy.get('div[class="card h-100"]').each( ele => {
            if (ele.text().includes(this.dataUser.productName[0])) {
                cy.wrap(ele).find('button').click()
            }
        })

        // cy.get('h4.card-title').each( (ele, index) => {
        //     if (ele.text().includes('iphone X')) {
        //         cy.get('button.btn.btn-info').eq(index).click()
        //     }
        // })

        //CUSTOM Command
        //cy.log(this.dataUser.productName[0])

// -----------> this is for debugging
//cy.pause()    
//cy.contains('Shop').click().debug()

        cy.AddItemToCart(this.dataUser.productName[1])
        cy.AddItemToCart(this.dataUser.productName[2])
        cy.AddItemToCart(this.dataUser.productName[2])

        //USING a foreach
        this.dataUser.productName.forEach( item => {
            cy.AddItemToCart(item)
        })

        productsPage.checkOutButton().click()
        
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

        cy.get('button.btn.btn-success').click()
        cy.get('#country').type('United States of America')
        cy.get('div.suggestions a').eq(0).click()
        cy.get('#checkbox2').check({force:true})
        cy.get('form.ng-untouched  input[type="submit"]').click()
        cy.get('.alert').should('contain','Thank you! Your order will be delivered')


    })

})