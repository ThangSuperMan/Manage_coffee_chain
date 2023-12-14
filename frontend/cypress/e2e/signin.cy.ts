context('Sign in', () => {
  describe('Test GUI', () => {
    it('should sign in successfully', () => {
      cy.visit('http://localhost:4000/signin');
      cy.wait(3000);

      cy.get('#email').type('thangdevops@gmail.com');
      cy.wait(3000);

      cy.get('#password').type('thang123');
      cy.wait(3000);

      cy.get('button[type="submit"]').eq(0).click();
      cy.wait(3000);

      cy.url().should('include', '/');
    });

    it('should display notification error message correctly when sign in unsuccessfully', () => {
      cy.visit('http://localhost:4000/signin');
      cy.wait(3000);

      cy.visit('http://localhost:4000/signin');
      cy.wait(3000);

      cy.get('#email').type('thangdevops@gmail.com');
      cy.wait(3000);

      cy.get('#password').type('thangne');
      cy.wait(3000);

      cy.get('button[type="submit"]').eq(0).click();
      cy.wait(3000);

      cy.get('.Toastify__toast--error').should('be.visible').and('contain', 'Đăng nhập không thành công');
    });

    it('should display the inline error message correctly when the password less than 6 characters', () => {
      cy.visit('http://localhost:4000/signin');
      cy.wait(3000);

      cy.get('#email').type('thangdevops@gmail.com');
      cy.wait(3000);

      cy.get('#password').type('thang');
      cy.wait(3000);

      cy.get('.chakra-checkbox__control').eq(0).click();
      cy.wait(3000);

      cy.get('.chakra-form__error-message').eq(0).should('have.text', 'Mật khẩu phải có ít nhất 6 ký tự');
    });
  });
});
