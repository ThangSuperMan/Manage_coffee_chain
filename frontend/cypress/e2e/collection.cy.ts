context('Collections Page', () => {
  describe('Product detail page', () => {
    it('should render the product detail page after click snack category on a specific product', () => {
      cy.visit('http://localhost:4000/collections/ca-phe');
      cy.wait(4000);

      // Find out the snack category
      cy.get('.category')
        .contains('Bánh & Snack')
        .then(($element) => {
          cy.wrap($element).click();
        });
      cy.wait(4000);

      cy.get('.product').eq(0).click();

      cy.get('.product-title').should('contain', 'Bánh Mì Gậy Gà Kim Quất');
      cy.get('.product-price').should('contain', '25.000');
    });
  });
});
