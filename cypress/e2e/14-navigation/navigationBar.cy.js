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
    cy.intercept('GET', '**/board/*', boardData).as('fetch-board');
    cy.get('[data-testid="evan"]').dblclick();
    cy.wait('@fetch-board');
  });
  it('Test navigate between backlog and board', () => {
    cy.get('[data-testid="backlog-btn"]').click();
    cy.get('[data-testid="backlog-header"]').should('be.exist');
    cy.get('[data-testid="board-btn"]').click();
    cy.get('[data-testid="board-create-card"]').should('be.exist');
  });
  it('Test project drop down', () => {
    cy.get('[data-testid="show-project-dropdown-btn"]').click();
    cy.get('[data-testid="project-dropdown"]').should('be.exist');
  });
});
