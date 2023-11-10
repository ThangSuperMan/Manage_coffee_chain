context('Blogs Page', () => {
  it('should filter articles based on selected tags', () => {
    cy.visit('http://localhost:4000/blogs');
    cy.wait(4000);

    cy.get('[data-testid="tag"]').eq(0).click();
    cy.wait(4000);

    cy.get('[data-testid="tag"]').eq(1).click();
    cy.wait(4000);

    cy.get('.blog-article').within(() => {
      cy.get('.blog-article-tag').should('contain', 'Bánh ngon');
      cy.get('.blog-article-tag').should('contain', 'Bánh thơm');
    });
  });
});
