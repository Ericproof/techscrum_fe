/// <reference types="cypress" />
import projectsData from '../../fixtures/projects.json';
import boardData from '../../fixtures/board.json';
import dailyScrum from '../../fixtures/dailyScrum.json';
import dailyScrumUpdate from '../../fixtures/dailyScrumUpdate.json';
describe('Project page', () => {
  beforeEach(() => {
    let projectList = projectsData;
    cy.intercept('GET', '**/projects', projectList).as('fetch-projects');
    cy.visit('/login');
    cy.login('kitman200220022002@gmail.com', '12345678');
    cy.wait('@fetch-projects');
    cy.intercept('GET', '**/board/**', boardData).as('fetch-board');
    cy.get('[data-testid="evan"]').dblclick();
    cy.wait('@fetch-board');
  });

  it('Test should close dailyscrum page', () => {
    cy.get('[data-testid="dailyscrum-btn"]').then((items) => {
      items[0].click();
    });
    cy.get('[data-testid="dailyscrum-close"]').click();
    cy.get('[data-testid="dailyscrum-header"]').should('not.exist');
  });
  it('Test cancel should close dailyscrum page', () => {
    cy.get('[data-testid="dailyscrum-btn"]').then((items) => {
      items[0].click();
    });
    cy.get('[data-testid="dailyscrum-cancel"]').click();
    cy.get('[data-testid="dailyscrum-header"]').should('not.exist');
  });
});
