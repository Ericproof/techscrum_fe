/// <reference types="cypress" />
import projectsData from '../../fixtures/projects.json';
import boardData from '../../fixtures/board.json';
import boardSearchResults from '../../fixtures/boardSearchResults.json';

describe('Project page', () => {
  beforeEach(() => {
    let projectList = projectsData;
    cy.intercept('GET', '**/projects', projectList).as('fetch-projects');
    cy.intercept('POST', '**/projects/*/shortcuts', projectList).as('create-shortcut');
    cy.intercept('DELETE', '**/projects/*', (req) => {
      const url = req.url;
      const urlParams = url.split('/');
      const id = urlParams[urlParams.length - 1];
      const newProjectList = [];
      projectList.forEach((project) => {
        if (project.id !== id) newProjectList.push(project);
      });
      projectList = newProjectList;
      return projectList;
    }).as('delete-projects');
    cy.visit('/login');
    cy.login('kitman200220022002@gmail.com', '12345678');
    cy.wait('@fetch-projects');
    cy.intercept('GET', '**/board/**', boardData).as('fetch-board');
    cy.get('[data-testid="evan"]').dblclick();
    cy.wait('@fetch-board');
  });

  it('Test Board Page should show task', () => {
    cy.get('[data-testid="task-63565485d377d106f9a8b643"]');
    cy.get('[data-testid="task-63567b33e9bcb85c00640d0d"]');
    cy.get('[data-testid="task-63567b35e9bcb85c00640d14"]');
    cy.get('[data-testid="board-col-63565445d377d106f9a8b608"]').contains('To Do', {
      matchCase: false
    });
    cy.get('[data-testid="board-col-63565445d377d106f9a8b609"]').contains('In Progress', {
      matchCase: false
    });
    cy.get('[data-testid="board-col-63565445d377d106f9a8b60a"]').contains('Review', {
      matchCase: false
    });
    cy.get('[data-testid="board-col-63565445d377d106f9a8b60b"]').contains('Done', {
      matchCase: false
    });
  });

  it('Test Search Board page', () => {
    cy.get('[data-testid="board-search"]').click();
    cy.intercept('GET', '**/board/**', boardSearchResults).as('search-board');
    cy.get('[data-testid="board-search"]').clear().type('test');
    cy.wait('@search-board');
    cy.get('[data-testid="task-63565485d377d106f9a8b643"]');
    cy.get('[data-testid="task-63567b33e9bcb85c00640d0d"]').should('not.exist');
    cy.get('[data-testid="task-63567b35e9bcb85c00640d14"]').should('not.exist');
  });
});
