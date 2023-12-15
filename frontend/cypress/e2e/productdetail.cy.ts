context('Product Detail Page', () => {
  describe('GUI', () => {
    it('Should show every detail of the product', () => {
      // Go to Collections Page
      cy.visit('http://localhost:4000/collections/ca-phe')
      cy.wait(2000);
      
      // Click on the first product
      cy.get('.product').eq(0).click();
      cy.wait(2000);

      // Assert
      cy.get('img[class="chakra-image css-1f8t5lg"]').should('be.visible');
      cy.get('h3[class="chakra-heading css-9seuei"]').should('contain', 'Phin Sữa Tươi Bánh Flan');
      cy.get('p[class="chakra-text css-1yat5gl"]').should('contain', '49.000');
      cy.get('p[class="chakra-text css-jy1jd0"]').should('contain', 'Chọn size (bắt buộc)');
      cy.get('div[class="css-1azotaz"]').should('be.visible');
    });
  });
  
  describe('Comment Section', () => {
    it('Should be able to post a comment or reply', () => {
      // Go to Collections Page
      cy.visit('http://localhost:4000/collections/ca-phe')
      cy.wait(2000);
      
      // Find and click on the "Cà phê" category
      cy.get('.category')
        .contains('Cà phê')
        .then(($element) => {
          cy.wrap($element).click();
        });
      cy.wait(2000);
      
      // Click on the first product
      cy.get('.product').eq(0).click();
      cy.wait(2000);
      
      // Write and post a comment
      cy.get('input[class="chakra-input css-c51tnq"]').type('Cà phê rất ngon.'); 
      cy.get('button[class="chakra-button css-jut409"]').click();
      cy.wait(2000);

      // Write and post a reply
      cy.get('input[class="chakra-input css-wqf9b4"]').type('Tuyệt!'); 
      cy.get('button[class="chakra-button css-exmfkr"]').click();
      cy.wait(2000);
      
      // Assert
      cy.get('p[class="chakra-text css-rltemf"]').should('contain', 'Cà phê rất ngon.');
      cy.get('p[class="chakra-text css-1v4xcoh"]').should('contain', 'Tuyệt!');
    });
  });
});