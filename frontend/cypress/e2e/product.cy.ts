context('Product Page', () => {
  describe('Add a new product', () => {
    it('Should add a product', () => {
      // Go to Product Page
      cy.visit('http://localhost:4000/admin/products')
      cy.wait(2000);

      // Enter product information
      cy.get('input[class="chakra-input css-1cjy4zv"]').eq(0).type('Cà phê đen');
      cy.wait(2000);
      cy.get('textarea[class="chakra-textarea css-1msuebi"]').eq(0).type('Một ly cà phê có màu đen.');
      cy.wait(2000);
      
      // Add product
      cy.get('button[type="submit"]').eq(0).click();
      cy.wait(2000);

      // Assert
      cy.get('td[class="css-xumdn4"]').eq(0).should('contain', 'Cà phê đen');
    });
  });

  describe('Update product information', () => {
    it('Should update a product', () => {
      // Go to Product Page
      cy.visit('http://localhost:4000/admin/products')
      cy.wait(2000);

      // Must a new product again
      // Enter product information
      cy.get('input[class="chakra-input css-1cjy4zv"]').eq(0).type('Cà phê đen thui');
      cy.wait(2000);
      cy.get('textarea[class="chakra-textarea css-1msuebi"]').eq(0).type('Một ly cà phê có màu đen thui.');
      cy.wait(2000);
      // Click on the add button
      cy.get('button[type="submit"]').eq(0).click();
      cy.wait(2000);

      // Click on the update button
      cy.get('button[class="chakra-button css-1nuhxt6"]').click();
      cy.wait(2000);

      // Enter new product information
      cy.get('input[class="chakra-input css-1cjy4zv"]').eq(0).clear();
      cy.get('input[class="chakra-input css-1cjy4zv"]').eq(0).type('Cà phê đen');
      cy.wait(2000);
      cy.get('textarea[class="chakra-textarea css-1msuebi"]').eq(0).clear();
      cy.get('textarea[class="chakra-textarea css-1msuebi"]').eq(0).type('Một ly cà phê có màu đen.');
      cy.wait(2000);

      // Click on the update button
      cy.get('button[type="submit"]').eq(0).click();
      cy.wait(2000);

      // Assert
      cy.get('td[class="css-xumdn4"]').eq(0).should('contain', 'Cà phê đen');
    });
  });

  describe('Remove a product', () => {
    it('Should remove a product', () => {
      // Go to Product Page
      cy.visit('http://localhost:4000/admin/products')
      cy.wait(2000);

      // Must a new product again
      // Enter product information
      cy.get('input[class="chakra-input css-1cjy4zv"]').eq(0).type('Cà phê đen');
      cy.wait(2000);
      cy.get('textarea[class="chakra-textarea css-1msuebi"]').eq(0).type('Một ly cà phê có màu đen.');
      cy.wait(2000);
      // Click on the add button
      cy.get('button[type="submit"]').eq(0).click();
      cy.wait(2000);

      // Remove product
      cy.get('button[class="chakra-button css-1wlapav"]').click();

      // Assert
      cy.get('tbody[class="css-0"]').eq(0).should('contain', '');
    });
  });
});