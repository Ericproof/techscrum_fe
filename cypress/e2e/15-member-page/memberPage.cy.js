/// <reference types="cypress" />
import projectsData from '../../fixtures/projects.json';
import boardData from '../../fixtures/board.json';
import project from '../../fixtures/project.json';
describe('Project page', () => {
  beforeEach(() => {
    let projectList = projectsData;
    cy.intercept('GET', '**/projects', projectList).as('fetch-projects');
    cy.visit('/v1/login');
    cy.login('kitman200220022002@gmail.com', '12345678');
    cy.wait('@fetch-projects');
    cy.intercept('GET', '**/board/**', boardData).as('fetch-board');
    cy.get('[data-testid="evan"]').dblclick();
    cy.wait('@fetch-board');
  });

  it('Test navigate to member ', () => {
    cy.get('[data-testid="member-btn"]').click();
    cy.get('[data-testid="member-page"]').should('be.exist');
  });
});
