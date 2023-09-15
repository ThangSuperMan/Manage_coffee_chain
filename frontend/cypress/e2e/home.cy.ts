context('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  describe('should render the home page', () => {
    it('should display a message', () => {
      cy.get('h1').contains('Welcome to Coffee');
    });
  });
});
