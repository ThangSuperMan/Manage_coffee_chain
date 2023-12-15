context('Voucher Page', () => {
  describe('Add a new voucher', () => {
    it('Should add a voucher', () => {
      // Go to Voucher Page
      cy.visit('http://localhost:4000/admin/vouchers')
      cy.wait(2000);

      // Enter voucher information
      cy.get('input[id="code"]').eq(0).type('1');
      cy.wait(2000);
      cy.get('input[id="discount"]').eq(0).type('20000');
      cy.wait(2000);
      cy.get('input[id="status"]').eq(0).type('Còn');
      cy.wait(2000);
      
      // Add voucher
      cy.get('button[type="submit"]').eq(0).click();
      cy.wait(2000);

      // Assert
      cy.get('td[class="css-xumdn4"]').eq(0).should('contain', '1');
    });
  });

  describe('Update voucher information', () => {
    it('Should update a voucher', () => {
      // Go to Voucher Page
      cy.visit('http://localhost:4000/admin/vouchers')
      cy.wait(2000);

      // Must a new voucher again
      // Enter voucher information
      cy.get('input[id="code"]').eq(0).type('1');
      cy.wait(2000);
      cy.get('input[id="discount"]').eq(0).type('20000');
      cy.wait(2000);
      cy.get('input[id="status"]').eq(0).type('Còn');
      cy.wait(2000);
      // Click on the add button
      cy.get('button[type="submit"]').eq(0).click();
      cy.wait(2000);

      // Click on the update button
      cy.get('button[class="chakra-button css-1nuhxt6"]').click();
      cy.wait(2000);

      // Enter new voucher information
      cy.get('input[id="code"]').eq(0).clear();
      cy.get('input[id="code"]').eq(0).type('2');
      cy.wait(2000);
      cy.get('input[id="discount"]').eq(0).clear();
      cy.get('input[id="discount"]').eq(0).type('30000');
      cy.wait(2000);
      cy.get('input[id="status"]').eq(0).clear();
      cy.get('input[id="status"]').eq(0).type('Hết');
      cy.wait(2000);

      // Click on the update button
      cy.get('button[type="submit"]').eq(0).click();
      cy.wait(2000);

      // Assert
      cy.get('td[class="css-xumdn4"]').eq(0).should('contain', '2');
    });
  });

  describe('Remove a voucher', () => {
    it('Should remove a voucher', () => {
      // Go to Voucher Page
      cy.visit('http://localhost:4000/admin/vouchers')
      cy.wait(2000);

      // Must a new voucher again
      // Enter voucher information
      cy.get('input[id="code"]').eq(0).type('1');
      cy.wait(2000);
      cy.get('input[id="discount"]').eq(0).type('20000');
      cy.wait(2000);
      cy.get('input[id="status"]').eq(0).type('Còn');
      cy.wait(2000);
      // Click on the add button
      cy.get('button[type="submit"]').eq(0).click();
      cy.wait(2000);

      // Remove voucher
      cy.get('button[class="chakra-button css-1wlapav"]').click();

      // Assert
      cy.get('tbody[class="css-0"]').eq(0).should('contain', '');
    });
  });
});