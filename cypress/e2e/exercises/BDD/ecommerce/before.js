before(()=>
    {
        cy.fixture('example.json').then(function(dataUser)
        {
            this.dataUser=dataUser
        })
    });