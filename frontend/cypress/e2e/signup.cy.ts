context('Sign up', () => {
  beforeEach(() => {
    cy.visit('/signup');
    cy.wait(3000);
  });

  describe('E2E GUI', () => {
    it('ensure register interface is responsive on mobile device', () => {
      cy.viewport('iphone-6+');

      cy.get('#email').should('be.visible');
      cy.get('#password').should('be.visible');
      cy.get('#confirm_password').should('be.visible');
      cy.get('button[type="submit"]').eq(0).should('be.visible');
    });

    it('ensure register interface is responsive on tablet devices', () => {
      cy.viewport('ipad-2');

      cy.get('#email').should('be.visible');
      cy.get('#password').should('be.visible');
      cy.get('#confirm_password').should('be.visible');
      cy.get('button[type="submit"]').eq(0).should('be.visible');
    });
  });

  describe('E2E Function', () => {
    describe('validate password', () => {
      it('should show error message correctly when the password less than 6 characters', () => {
        cy.get('#email').type('thangdevops@gmail.com');
        cy.wait(3000);

        cy.get('#password').type('thang');
        cy.wait(3000);

        cy.get('#confirm_password').type('thang');
        cy.wait(3000);

        cy.get('button[type="submit"]').eq(0).click();
        cy.wait(3000);

        cy.get('.chakra-form__error-message').should('have.text', 'Mật khẩu phải có ít nhất 6 ký tự');
      });

      it('should show error message correctly if the password and confirm password does not match', () => {
        cy.get('#email').type('thangdevops@gmail.com');
        cy.wait(3000);

        cy.get('#password').type('thangmorning');
        cy.wait(3000);

        cy.get('#confirm_password').type('thangafternoon');
        cy.wait(3000);

        cy.get('.chakra-checkbox__control').eq(0).click();
        cy.wait(3000);

        cy.get('.chakra-form__error-message').should('have.text', 'Mật khẩu không giống nhau');
      });
    });
  });
});
