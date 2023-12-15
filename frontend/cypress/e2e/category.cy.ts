context('Category - Sidebar component', () => {
  const TOTAL_CHILD_CATEGORIES_OF_SNACK_CATEGORY: number = 3;
  beforeEach(() => {
    cy.visit('/collections/ca-phe');
    cy.wait(3000);
  });

  describe('E2E GUI', () => {
    let categoryLink: any;

    it('should highlight category with correct color when click on a category', () => {
      const chakraActivePrimaryHighlightColorClassName: string = 'css-13lp4jc';

      categoryLink = cy.get('a[href="/collections/banh"] > p');
      categoryLink.click();
      cy.wait(3000);

      categoryLink.should('have.class', chakraActivePrimaryHighlightColorClassName);
    });

    it('should display enough child categories when click on a category', () => {
      categoryLink = cy.get('a[href="/collections/banh"] > p');
      categoryLink.click();

      const totalChildCategories = cy
        .get('a[href="/collections/banh"]')
        .parent('li')
        .children('div')
        .find('ul > li')
        .should('have.length', TOTAL_CHILD_CATEGORIES_OF_SNACK_CATEGORY);
      cy.wait(3000);

      totalChildCategories.each(($li) => {
        cy.wrap($li).should('be.visible');
      });
    });
  });
});
