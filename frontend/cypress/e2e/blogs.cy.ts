context('Blogs Page', () => {
  beforeEach(() => {
    cy.visit('/blogs');
    cy.wait(3000);
  });

  describe('Test GUI', () => {
    it('should display at least one tag when there are have some articles', () => {
      const firstAritcleTag = cy.get('[data-testid="tag"]').eq(0);

      firstAritcleTag.should('be.visible');
    });

    it("should highlight aritcle's tag with correct color when click on a tag", () => {
      const firstAritcleTag = cy.get('[data-testid="tag"]').eq(0);

      firstAritcleTag.should('be.visible');
      const chakraActivePrimaryHighlightColorClassName: string = 'css-y614pu';

      firstAritcleTag.click();
      cy.wait(3000);

      firstAritcleTag.should('have.class', chakraActivePrimaryHighlightColorClassName);
    });
  });

  describe('Test Function', () => {
    it('allow to filter articles based on selected tags', () => {
      const firstAritcleTag = cy.get('[data-testid="tag"]').eq(0);
      firstAritcleTag.click();
      cy.wait(3000);

      cy.get('.blog-article').eq(0).should('be.visible');
    });
  });
});
