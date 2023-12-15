context('Collections Page', () => {
  //   describe('Product detail page', () => {
  //     it('should render the product detail page after click snack category on a specific product', () => {
  //       cy.visit('http://localhost:4000/collections/ca-phe');
  //       cy.wait(4000);

  //       // Find out the snack category
  //       cy.get('.category')
  //         .contains('Bánh & Snack')
  //         .then(($element) => {
  //           cy.wrap($element).click();
  //         });
  //       cy.wait(4000);

  //       cy.get('.product').eq(0).click();

  //       cy.get('.product-title').should('contain', 'Bánh Mì Gậy Gà Kim Quất');
  //       cy.get('.product-price').should('contain', '25.000');
  //     });
  //   });

  describe('Collection Categories', () => {
    it('Should show products in the selected category', () => {
      // Go to Collections Page
      cy.visit('http://localhost:4000/collections/ca-phe');
      cy.wait(2000);

      // Click on the "Tất cả" category
      cy.get('a[href="/collections/all"]').click();
      cy.wait(2000);
      // Assert
      cy.get('h3[class="chakra-heading css-1ebaxqp"]').should('contain', 'Tất cả');

      // Click on the "Cà phê" category
      cy.get('a[href="/collections/ca-phe"]').click();
      cy.wait(2000);
      // Assert
      cy.get('h3[class="chakra-heading css-1ebaxqp"]').should('contain', 'Cà phê');

      // Click on the "Cà Phê Highlight" category
      cy.get('a[href="/collections/ca-phe-highlight"]').click();
      cy.wait(2000);
      // Assert
      cy.get('h3[class="chakra-heading css-1ebaxqp"]').should('contain', 'Cà Phê Highlight');

      // Click on the "Cà Phê Việt Nam" category
      cy.get('a[href="/collections/ca-phe-viet-nam"]').click();
      cy.wait(2000);
      // Assert
      cy.get('h3[class="chakra-heading css-1ebaxqp"]').should('contain', 'Cà Phê Việt Nam');

      // Click on the "Cà Phê Máy" category
      cy.get('a[href="/collections/ca-phe-may"]').click();
      cy.wait(2000);
      // Assert
      cy.get('h3[class="chakra-heading css-1ebaxqp"]').should('contain', 'Cà Phê Máy');

      // Click on the "Cà phê" category
      cy.get('a[href="/collections/cold-brew"]').click();
      cy.wait(2000);
      // Assert
      // cy.get('h3[class="chakra-heading css-1ebaxqp"]').should('contain', 'Cà phê');
      // cy.get('a[href="/collections/cold-brew"] > p').should('contain', 'Cà phê');
      // cy.get('.css-l7nc1g').should('contain', 'Cà phê');

      // Click on the "Trà" category
      cy.get('a[href="/collections/tra-trai-cay-tra-sua"]').click();
      cy.wait(2000);
      // Assert
      cy.get('h3[class="chakra-heading css-1ebaxqp"]').should('contain', 'Trà');

      // Click on the "Trà trái cây" category
      cy.get('a[href="/collections/tra-trai-cay"]').click();
      cy.wait(2000);
      // Assert
      cy.get('h3[class="chakra-heading css-1ebaxqp"]').should('contain', 'Trà trái cây');

      // Click on the "Trà sữa Macchiato" category
      cy.get('a[href="/collections/tra-trai-cay"]').click();
      cy.wait(2000);
      // Assert
      // cy.get('h3[class="chakra-heading css-1ebaxqp"]').should('contain', 'Trà sữa Macchiato');

      // Click on the "Cloud" category
      cy.get('a[href="/collections/cloud"]').click();
      cy.wait(2000);
      // Assert
      cy.get('h3[class="chakra-heading css-1ebaxqp"]').should('contain', 'Cloud');

      // Click on the "CloudTea" category
      cy.get('a[href="/collections/cloudtea"]').click();
      cy.wait(2000);
      // Assert
      cy.get('h3[class="chakra-heading css-1ebaxqp"]').should('contain', 'CloudTea');

      // Click on the "CloudFee" category
      cy.get('a[href="/collections/cloudfee"]').click();
      cy.wait(2000);
      // Assert
      cy.get('h3[class="chakra-heading css-1ebaxqp"]').should('contain', 'CloudFee');

      // Click on the "Hi-Teach Healthy" category
      cy.get('a[href="/collections/hi-tea-healthy"]').click();
      cy.wait(2000);
      // Assert
      cy.get('h3[class="chakra-heading css-1ebaxqp"]').should('contain', 'Hi-Teach Healthy');

      // Click on the "Hi-Tea Trà" category
      cy.get('a[href="/collections/hi-tea-tra"]').click();
      cy.wait(2000);
      // Assert
      // cy.get('h3[class="chakra-heading css-1ebaxqp"]').should('contain', 'Hi-Tea Trà');

      // Click on the "Hi-Tea Đá Tuyết" category
      cy.get('a[href="/collections/hi-tea-da-tuyet"]').click();
      cy.wait(2000);
      // Assert
      cy.get('h3[class="chakra-heading css-1ebaxqp"]').should('contain', 'Hi-Tea Đá Tuyết');

      // Click on the "Bánh & Snack" category
      cy.get('a[href="/collections/banh"]').click();
      cy.wait(2000);
      // Assert
      cy.get('h3[class="chakra-heading css-1ebaxqp"]').should('contain', 'Bánh & Snack');

      // Click on the "Bánh mặn" category
      cy.get('a[href="/collections/banh-man"]').click();
      cy.wait(2000);
      // Assert
      cy.get('h3[class="chakra-heading css-1ebaxqp"]').should('contain', 'Bánh mặn');

      // Click on the "Bánh ngọt" category
      cy.get('a[href="/collections/banh-ngot"]').click();
      cy.wait(2000);
      // Assert
      cy.get('h3[class="chakra-heading css-1ebaxqp"]').should('contain', 'Bánh ngọt');

      // Click on the "Snack" category
      cy.get('a[href="/collections/snack"]').click();
      cy.wait(2000);
      // Assert
      cy.get('h3[class="chakra-heading css-1ebaxqp"]').should('contain', 'Snack');
    });
  });
});
