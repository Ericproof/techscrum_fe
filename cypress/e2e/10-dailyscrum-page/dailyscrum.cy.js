/// <reference types="cypress" />

describe('dailyscrum', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.login('kitman200220022002@gmail.com', '12345678');
    cy.visit('/projects/634e9f20162cb5e204e4e538/board/634e9f20162cb5e204e4e532');
  });

  it('dailyscrum modal should show', () => {
    cy.get('[data-testid="dailyscrumBtn"]').click();
  });
  it('dailyscrum modal should close', () => {
    cy.get('[data-testid="dailyscrumBtn"]').click();
    cy.get('[data-testid="dailyscrumCancel"]').click();
  });

  it('dailyscrum modal should close', () => {
    cy.get('[data-testid="dailyscrumBtn"]').click();
    cy.get('[data-testid="dailyscrumClose"]').click();
  });
});
