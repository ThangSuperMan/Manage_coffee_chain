context('Wishlist Page', () => {
  describe('Add a product to wishlist', () => {
    it('Should be able to add', () => {
      // Go to Collections Page
      cy.visit('http://localhost:4000/collections/ca-phe');
      cy.wait(2000);
      
      // Sign In
      cy.get('a[class="chakra-button css-1rzkia3"]').click();
      cy.wait(3000);
      cy.get('#email').type('long@gmail.com');
      cy.get('#password').type('123456');
      cy.get('button[type="submit"]').eq(0).click();
      cy.wait(3000);

      // Add first product to wishlist
      cy.get('button[class="chakra-button css-1it8qiu"]').eq(0).click();

      // Assert
      cy.get('div[role="alert"]').should('contain', 'Thêm sản phẩm vào danh dách yêu thích, thành công!');
    });
  });

  describe('Remove a product from wishlist', () => {
    it('Should be able to remove', () => {
      // Go to Collections Page
      cy.visit('http://localhost:4000/collections/ca-phe');
      cy.wait(2000);

      // Must sign in and add a product again
      // Sign In
      cy.get('a[class="chakra-button css-1rzkia3"]').click();
      cy.wait(3000);
      cy.get('#email').type('long@gmail.com');
      cy.get('#password').type('123456');
      cy.get('button[type="submit"]').eq(0).click();
      cy.wait(2000);
      // Add first product to wishlist
      cy.get('button[class="chakra-button css-1it8qiu"]').eq(0).click();
      cy.wait(2000);
      
      // Go to Wishlist Page
      cy.get('a[id="popover-trigger-:rr:"]').click();
      cy.wait(3000);

      // Remove first product from wishlist
      cy.get('button[class="chakra-button css-1it8qiu"]').eq(0).click();

      // Assert
      cy.get('div[role="alert"]').should('contain', 'Đã xoá sản phẩm yêu thích');
    });
  });
});