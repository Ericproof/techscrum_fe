/// <reference types="cypress" />
import projectsData from '../../fixtures/projects.json';
import boardData from '../../fixtures/board.json';
import project from '../../fixtures/project.json';
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

  it('Test navigate to project settings ', () => {
    cy.intercept('GET', '**/projects/*', project).as('fetch-project');
    cy.get('[data-testid="project-settings-btn"]').click();
    cy.wait('@fetch-project');
    cy.get('[data-testid="setting-page"]').should('be.exist');
  });
});
