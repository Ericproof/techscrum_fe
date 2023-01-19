/// <reference types="cypress" />

describe('Careers page', () => {
  beforeEach(() => {
    cy.visit('/careers')
  })

  it('display four input when apply for a job', () => {
    cy.get('[data-testid="applyButton"]').click();
  });


});