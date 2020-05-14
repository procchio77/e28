// https://docs.cypress.io/api/introduction/api.html

describe('order-history-page', () => {

    it('Shows all order history', () => {
  
      cy.visit('/orderhistory') 
      cy.contains('h2', 'Order History')
      cy.contains('OrderId')
      
    })
  
  })
  
  
  