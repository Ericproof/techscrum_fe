import projectData from '../../fixtures/projects.json';
import activityData from '../../fixtures/activities.json';
import boardData from '../../fixtures/board.json';

describe('Project page', () => {
  beforeEach(() => {
    let projectList = projectData;
    cy.intercept('GET', '**/projects', projectList).as('fetch-projects');
    cy.visit('/login');
    cy.login('kitman200220022002@gmail.com', '12345678');
    cy.wait('@fetch-projects');
    cy.intercept('GET', '**/board/**', boardData).as('fetch-board');
    cy.get('[data-testid="evan"]').dblclick();
    cy.wait('@fetch-board');
    cy.get('[data-testid="task-63565485d377d106f9a8b643"]').click();
  });
  it('Test should show activities', () => {
    cy.intercept('GET', '**/activities/*', activityData).as('fetch-activities');
    cy.get('[data-testid="show-activity-button"]').click();
    cy.wait('@fetch-activities');
    cy.get('[data-testid="activity-item-636c50e459754ecaed6dc693"]').should('exist');
  });
});
