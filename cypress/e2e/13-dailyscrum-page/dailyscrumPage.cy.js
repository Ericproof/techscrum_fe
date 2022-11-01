/// <reference types="cypress" />
import projectsData from '../../fixtures/projects.json';
import boardData from '../../fixtures/board.json';
describe('Project page', () => {
  beforeEach(() => {
    let projectList = projectsData;
    cy.intercept('GET', '**/projects', projectList).as('fetch-projects');
    cy.visit('/login');
    cy.login('kitman200220022002@gmail.com', '12345678');
    cy.wait('@fetch-projects');
    cy.intercept('GET', '**/board/*', boardData).as('fetch-board');
    cy.get('[data-testid="evan"]').dblclick();
    cy.wait('@fetch-board');
  });

  it('Test should close dailyscrum page', () => {
    cy.get('[data-testid="dailyscrum-btn"]').click();
    cy.get('[data-testid="dailyscrum-close"]').click();
    cy.get('[data-testid="dailyscrum-header"]').should('not.exist');
  });
  it('Test should cilck no and type reason', () => {
    cy.get('[data-testid="dailyscrum-btn"]').click();
    cy.get('[type="radio"]').check();
    cy.get('[data-testid="dailyscrum-reason-TEC-333"]').type('I need support');
  });
  it('Test cancel should close dailyscrum page', () => {
    cy.get('[data-testid="dailyscrum-btn"]').click();
    cy.get('[data-testid="dailyscrum-cancel"]').click();
    cy.get('[data-testid="dailyscrum-header"]').should('not.exist');
  });
  it('Test should drag progress bar to 80%', () => {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    ).set;
    cy.get('[data-testid="dailyscrum-btn"]').click();
    cy.get('[data-testid="dailyscrum-progress-bar-TEC-333"]').then(($range) => {
      const range = $range[0];
      nativeInputValueSetter.call(range, 80);
      range.dispatchEvent(new Event('change', { value: 80, bubbles: true }));
    });
    cy.get('[data-testid="dailyscrum-progress-TEC-333"]').contains('80%');
  });
});
