/* global cy */

let structure = {
  target: [],
  challenge: []
};

describe('Test breadcrumbs', () => {
  it('should have the correct link', () => {
    let { target, challenge } = structure;
    cy.task('provideTarget', ['08-data-analysis-with-python']).then(res => {
      target = res;

      cy.task('getAllChallengePaths', target).then(res => {
        challenge = res;

        challenge.forEach(challenge => {
          cy.visit(challenge);
          cy.get('.breadcrumb-right').should('have.attr', 'href');
        });
      });
    });
  });
});
