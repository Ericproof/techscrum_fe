/// <reference types="cypress" />
import typesData from '../../fixtures/types.json';
import projectsData from '../../fixtures/projects.json';
import boardData from '../../fixtures/board.json';
import backlogData from '../../fixtures/backlog.json';
import backlogDataAddTask from '../../fixtures/backlogAddTask.json';
import backlogDataDeleteTask from '../../fixtures/backlogDeleteTask.json';
import backlogDataChangeTitle from '../../fixtures/backlogChangeTitle.json';
import backlogDataChangePriority from '../../fixtures/backlogChangePriority.json';

describe('Backlog page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/types', typesData).as('fetch-types');
    cy.intercept('GET', '**/projects', projectsData).as('fetch-projects');
    cy.intercept('GET', '**/board/**', boardData).as('fetch-board');
    cy.intercept('GET', '**/projects/*/backlogs', backlogData).as('fetch-backlog');
    cy.visit('/login');
    cy.login('kitman200220022002@gmail.com', '12345678');
    cy.wait('@fetch-projects');
    cy.wait('@fetch-types');
    cy.get('[data-testid="kitman-test1"]').click();
    cy.wait('@fetch-board');
    cy.get('[data-testid="backlog-btn"]').click();
    cy.wait('@fetch-backlog'); 
  });

  it('Test backlog page show tasks', () => {
    cy.get('[data-testid="task-63e9b7460e1460d2e3e20c52"]').contains('1302');
  });

  it('Test create task', () => {
    cy.intercept('POST', '**/tasks', backlogDataAddTask).as('create-issue');
    cy.intercept('GET', '**/projects/*/backlogs', backlogDataAddTask).as('fetch-backlog-task-added');
    cy.get('[data-testid="create-issue"]').click();
    cy.get('[data-testid="create-issue-input"]').type('new issue {enter}');
    cy.wait('@create-issue');
    cy.wait('@fetch-backlog-task-added');
    cy.get('[data-testid="task-6402d9d0fe10bbef59cac8f4"]').contains('new issue');
  });

  it('Test delete task', () => {
    cy.intercept('DELETE', '**/tasks/*', backlogDataDeleteTask).as('delete-issue');
    cy.intercept('GET', '**/projects/*/backlogs', backlogDataDeleteTask).as(
      'fetch-backlog-task-deleted'
    );
    cy.get('[data-testid="task-63e9b7460e1460d2e3e20c52"]').trigger('mouseover');
    cy.get('[data-testid="hover-show-option-btn-63e9b7460e1460d2e3e20c52"]').click({ force: true });
    cy.get('[data-testid="delete-task-63e9b7460e1460d2e3e20c52"]').click({ force: true });
    cy.wait('@delete-issue');
    cy.wait('@fetch-backlog-task-deleted');
    cy.get('[data-testid="task-63e9b7460e1460d2e3e20c52"]').should('not.exist');
  });

  it('Test change title', () => {
    cy.intercept('PUT', '**/tasks/*', backlogDataChangeTitle).as('change-title');
    cy.intercept('GET', '**/projects/*/backlogs', backlogDataChangeTitle).as(
      'fetch-backlog-task-title-updated'
    );
    cy.get('[data-testid="task-63e9b7460e1460d2e3e20c52"]').trigger('mouseover');
    cy.get('[data-testid="task-edit-btn-63e9b7460e1460d2e3e20c52"]').click({ force: true });
    cy.get('[data-testid="task-title-input-63e9b7460e1460d2e3e20c52"]')
      .clear()
      .type('drink water {enter}');
    cy.wait('@change-title');
    cy.wait('@fetch-backlog-task-title-updated');
    cy.get('[data-testid="task-63e9b7460e1460d2e3e20c52"]').contains('drink water');
  });
  it('Test show priority', () => {
    cy.get('[data-testid="priority-btn-63e9b7460e1460d2e3e20c52"]').should('exist');
  });
  it('Test change priority', () => {
    cy.intercept('PUT', '**/tasks/*', backlogDataChangePriority).as('change-priority');
    cy.intercept('GET', '**/projects/*/backlogs', backlogDataChangePriority).as(
      'fetch-backlog-task-priority-updated'
    );
    cy.get('[data-testid="priority-btn-63e9b7460e1460d2e3e20c52"]').click();
    cy.get('[data-testid="priority-dropdown-btn-63e9b7460e1460d2e3e20c52-Highest"]').click();
    cy.wait('@change-priority');
    cy.wait('@fetch-backlog-task-priority-updated');
  });
});
