class HomePage{
    getEditBox(){
        return cy.get('form input[name="name"]')
    }

    getTwoWayDataBinding(){
        return cy.get('input.ng-valid.ng-touched')
    }

    getGender(){
        return cy.get('#exampleFormControlSelect1')
    }

    getEnterpreneaur(){
        return cy.get('#inlineRadio3')
    }

    getShopTab(){
        return cy.contains('Shop')
    }
}

//export default HomePage;

export const homePage = new HomePage()