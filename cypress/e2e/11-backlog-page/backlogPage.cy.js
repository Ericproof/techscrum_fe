/// <reference types="cypress" />
import projectsData from '../../fixtures/projects.json';
import boardData from '../../fixtures/board.json';
import backlogData from '../../fixtures/backlog.json';
import backlogDataAddTask from '../../fixtures/backlogAddTask.json';
import backlogDataChangeTitle from '../../fixtures/backlogChangeTitle.json';
import backlogDataChangePriority from '../../fixtures/backlogChangePriority.json';
describe('Backlog page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/projects', projectsData).as('fetch-projects');
    cy.intercept('GET', '**/board/*', boardData).as('fetch-board');
    cy.intercept('GET', '**/projects/*/backlogs', backlogData).as('fetch-backlog');
    cy.visit('/login');
    cy.login('kitman200220022002@gmail.com', '12345678');
    cy.wait('@fetch-projects');
    cy.get('[data-testid="evan"]').dblclick();
    cy.wait('@fetch-board');
    cy.get('[data-testid="backlog-btn"]').click();
    cy.wait('@fetch-backlog');
  });

  // it('Test backlog page show tasks', () => {
  //   cy.get('[data-testid="task-6350dbbca5c71eda4bcf78aa"]').contains('asdf');
  //   cy.get('[data-testid="task-6350dcfa560c73ef4f32e2a6"]').contains('daf');
  //   cy.get('[data-testid="task-6350dfbbca131ce6228f3e59"]').contains('daffdd');
  // });

  // it('Test create task', () => {
  //   cy.intercept('POST', '**/tasks', backlogDataAddTask).as('create-issue');
  //   cy.intercept('GET', '**/projects/*/backlogs', backlogDataAddTask).as('fetch-backlog-2');
  //   cy.get('[data-testid="create-issue"]').click();
  //   cy.get('[data-testid="create-issue-input"]').type('eat lunch');
  //   cy.get('input').type('{enter}');
  //   cy.wait('@create-issue');
  //   cy.wait('@fetch-backlog-2');
  //   cy.get('[data-testid="task-6350dbbca5c71eda4bcf78aa3"]').contains('eat lunch');
  // });

  // it('Test delete task', () => {
  //   //create task
  //   cy.intercept('POST', '**/tasks', backlogDataAddTask).as('create-issue');
  //   cy.intercept('GET', '**/projects/*/backlogs', backlogDataAddTask).as('fetch-backlog-2');
  //   cy.get('[data-testid="create-issue"]').click();
  //   cy.get('[data-testid="create-issue-input"]').type('eat lunch');
  //   cy.get('input').type('{enter}');
  //   cy.wait('@create-issue');
  //   cy.wait('@fetch-backlog-2');
  //   cy.get('[data-testid="task-6350dbbca5c71eda4bcf78aa3"]').contains('eat lunch');
  //   //delete task
  //   cy.intercept('DELETE', '**/tasks/*', backlogData).as('delete-issue');
  //   cy.intercept('GET', '**/projects/*/backlogs', backlogData).as('fetch-backlog');
  //   cy.get('[data-testid="task-6350dbbca5c71eda4bcf78aa3"]').trigger('mouseover');
  //   cy.get('[data-testid="hover-show-option-btn-6350dbbca5c71eda4bcf78aa3"]').click();
  //   cy.get('[data-testid="delete-task-6350dbbca5c71eda4bcf78aa3"]').click();
  //   cy.wait('@delete-issue');
  //   cy.wait('@fetch-backlog');
  // });

  // it('Test change title', () => {
  //   cy.intercept('PUT', '**/tasks/*', backlogDataChangeTitle).as('change-title');
  //   cy.intercept('GET', '**/projects/*/backlogs', backlogDataChangeTitle).as('fetch-backlog-3');
  //   cy.get('[data-testid="task-hover-6350dbbca5c71eda4bcf78aa"]').trigger('mouseover');
  //   cy.get('[data-testid="task-edit-btn-6350dbbca5c71eda4bcf78aa"]').click({ force: true });
  //   cy.get('[data-testid="task-title-input-6350dbbca5c71eda4bcf78aa"]').clear().type('drink water');
  //   cy.get('input').type('{enter}');
  //   cy.wait('@change-title');
  //   cy.wait('@fetch-backlog-3');
  // });
  it('Test show priority', () => {
    cy.get('[data-testid="priority-btn-6350dbbca5c71eda4bcf78aa"]').should('exist');
    cy.get('[data-testid="priority-btn-6350dcfa560c73ef4f32e2a6"]').should('exist');
    cy.get('[data-testid="priority-btn-6350dfbbca131ce6228f3e59"]').should('exist');
  });
  it('Test change priority', () => {
    cy.intercept('PUT', '**/tasks/*', backlogDataChangePriority).as('change-priority');
    cy.intercept('GET', '**/projects/*/backlogs', backlogDataChangePriority).as('fetch-backlog-4');
    cy.get('[data-testid="priority-btn-6350dbbca5c71eda4bcf78aa"]').click();
    cy.get('[data-testid="priority-dropdown-btn-6350dbbca5c71eda4bcf78aa-Highest"]').click();
    cy.wait('@change-priority');
    cy.wait('@fetch-backlog-4');
  });
});
