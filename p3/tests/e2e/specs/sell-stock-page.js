
describe('buy-stock-page', () => {

    //Define a stock we can use throughout our tests
    let stockorder = {
        symbol: "TMUS",
        shares: "2",
        price: "5",
    };

    it('adds a new stock purchase.', () => {
  
      cy.visit('/stock/sell') //visit Buy stock
      cy.contains('h2', 'Sell Stock')
     
      cy.get('[data-test=sell-stock-symbol-input]').type(stockorder.symbol);
      cy.get('[data-test=sell-stock-shares-input]').type(stockorder.shares);
      cy.get('[data-test=sell-stock-price-input]').type(stockorder.price);
      cy.get('[data-test=sell-stock-ordertotal-input]').should('have.value', '$10.00')
      cy.get('[data-test=sell-stock-button]').click();
      cy.get('[data-test="stock-sold-confirmation"]').should('exist');

    })
  
  })
  
  
  