
describe('buy-stock-page', () => {

    //Define a stock we can use throughout our tests
    let stockorder = {
        symbol: "TMUS",
        shares: "10",
        price: "10",
    };

    it('adds a new stock purchase.', () => {
  
      cy.visit('/stock/buy') //visit Buy stock
      cy.contains('h2', 'Buy Stock')
      
      cy.get('[data-test=stock-symbol-input]').type(stockorder.symbol);
      cy.get('[data-test=stock-shares-input]').type(stockorder.shares);
      cy.get('[data-test=stock-price-input]').type(stockorder.price);
      cy.get('[data-test=stock-total-input]').should('have.value', '$100.00')
      cy.get('[data-test=buy-stock-button]').click();
      cy.get('[data-test="stock-added-confirmation"]').should('exist');

    })
  
  })
  
  
  