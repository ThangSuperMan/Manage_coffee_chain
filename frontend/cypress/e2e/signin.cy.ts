context('Sign in', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000/signin');
    cy.wait(3000);
  });

  describe('Test GUI', () => {
    it('ensure login interface is responsive on mobile device', () => {
      cy.viewport('iphone-6+');

      cy.get('#email').should('be.visible');
      cy.get('#password').should('be.visible');
      cy.get('button[type="submit"]').eq(0).should('be.visible');
    });

    it('ensure login interface is responsive on tablet devices', () => {
      cy.viewport('ipad-2');

      cy.get('#email').should('be.visible');
      cy.get('#password').should('be.visible');
      cy.get('button[type="submit"]').eq(0).should('be.visible');
    });
  });

  describe('Test Function', () => {
    it('should sign in successfully', () => {
      cy.get('#email').type('thangdevops@gmail.com');
      cy.wait(3000);

      cy.get('#password').type('thang123');
      cy.wait(3000);

      cy.get('button[type="submit"]').eq(0).click();
      cy.wait(3000);

      cy.url().should('include', '/');
    });

    it('should display notification error message correctly when sign in unsuccessfully', () => {
      cy.get('#email').type('thangdevops@gmail.com');
      cy.wait(3000);

      cy.get('#password').type('thangne');
      cy.wait(3000);

      cy.get('button[type="submit"]').eq(0).click();
      cy.wait(3000);

      cy.get('.Toastify__toast--error').should('be.visible').and('contain', 'Đăng nhập không thành công');
    });

    it('should display the inline error message correctly when the password less than 6 characters', () => {
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
