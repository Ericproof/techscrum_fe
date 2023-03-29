import projectData from '../../fixtures/projects.json';
import boardData from '../../fixtures/boardv2.json';
import taskData from '../../fixtures/updateTask.json';
import updatedLabel from '../../fixtures/updatedLabel.json';

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

  it('Test should change title', () => {
    cy.intercept('PUT', '**/tasks/*', taskData).as('update-task');
    cy.get('[data-testid="card-title"]').click().type(' change');
    cy.get('[data-testid="card-title-input"]').should('have.value', 'change env add task change');
  });

  it('Test should change type', () => {
    cy.intercept('PUT', '**/tasks/*', taskData).as('update-task');
    cy.get('[data-testid="card-type-button"]').click();
    cy.get('[data-testid="card-type-selection"]').then((items) => {
      items[0].click();
    });
    cy.get('[data-testid="card-type-button"]').contains('Task');
  });

  it('Test should change status', () => {
    cy.intercept('PUT', '**/tasks/*', taskData).as('update-task');
    cy.get('[data-testid="card-status-button"]').click();
    cy.get('[data-testid="card-status-selection"]').then((items) => {
      items[2].click();
    });
    cy.get('[data-testid="card-status-button"]').contains('REVIEW');
  });

  it('Test should change priority', () => {
    cy.intercept('PUT', '**/tasks/*', taskData).as('update-task');
    cy.get('[data-testid="card-priority-button"]').click();
    cy.get('[data-testid="card-priority-selection"]').then((items) => {
      items[1].click();
    });
    cy.get('[data-testid="card-priority-button"]').contains('High');
  });

  it('Test should change label', () => {
    cy.intercept('POST', '**/tasks/*/labels', updatedLabel).as('update-task');
    cy.get('[data-testid="card-label-button"]').click();
    cy.get('[data-testid="card-label-button"]').then((items) => {
      items[0].click();
    });
    cy.get('[data-testid="card-label-text"]').click();
    cy.get('[data-testid="card-label-button"]').contains('Backend');
  });
});
