import projectData from '../../fixtures/projects.json';
import activityData from '../../fixtures/activitiesV2.json';
import boardData from '../../fixtures/boardv2.json';

describe('Project page', () => {
  beforeEach(() => {
    let projectList = projectData;
    cy.intercept('GET', '**/projects', projectList).as('fetch-projects');
    cy.visit('/v2/login');
    cy.login('coffeetsang20@gmail.com', 'wendy123');
    cy.wait('@fetch-projects');
    cy.intercept('GET', '**/board/**', boardData).as('fetch-board');
    cy.get('[data-testid="evan"]').dblclick();
    cy.wait('@fetch-board');
    cy.get('[data-testid="task-641bdca55a236b40a1e21253"]').click();
  });
  it('Test should show activities', () => {
    cy.intercept('GET', '**/activities/*', activityData).as('fetch-activities');
    cy.get('[data-testid="show-activity-button"]').click();
    cy.wait('@fetch-activities');
    cy.get('[data-testid="activity-item-641bdca55a236b40a1e2125d"]').should('exist');
  });
});
