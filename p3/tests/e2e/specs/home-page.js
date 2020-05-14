// https://docs.cypress.io/api/introduction/api.html

describe('home-page', () => {

  it('Shows stocks by selected sector', () => {

    cy.visit('/') //visit home page
    cy.contains('h2', 'Popular Stocks by Sector')
    cy.get('select').select('wireless') //Select wireless
    cy.contains('[data-test="buy-link"]', 'Buy')
    cy.get('[data-test="buy-link"]').should('have.length',2) //check count
    cy.contains('T-Mobile')
    cy.contains('AT&T')

    //confirm we can buy stock and have it prefill the form in BuyStockPage
    cy.get('[id="TMUS"]').click() //go to buy stock page - click buy for T-Mobile
    cy.get('[id="symbol"]').should('have.value', 'TMUS')
    cy.get('[id="price"]').should('have.value', '89')

  })

})


