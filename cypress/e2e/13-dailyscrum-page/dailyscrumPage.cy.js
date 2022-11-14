/// <reference types="cypress" />
import projectsData from '../../fixtures/projects.json';
import boardData from '../../fixtures/board.json';
import dailyScrum from '../../fixtures/dailyScrum.json';
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

  it('Test should close dailyscrum page', () => {
    cy.get('[data-testid="dailyscrum-btn"]').click();
    cy.get('[data-testid="dailyscrum-close"]').click();
    cy.get('[data-testid="dailyscrum-header"]').should('not.exist');
  });
  it('Test should cilck no and type reason', () => {
    cy.intercept('GET', '**/dailyScrums/*/none/none', dailyScrum).as('fetch-dailyScrums');
    cy.get('[data-testid="dailyscrum-btn"]').click();
    cy.wait('@fetch-dailyScrums');
    cy.get('[type="radio"]').check();
    cy.get('[data-testid="dailyscrum-reason-636c674b38e168d571d8a619"]').type('I need support');
  });
  it('Test cancel should close dailyscrum page', () => {
    cy.get('[data-testid="dailyscrum-btn"]').click();
    cy.get('[data-testid="dailyscrum-cancel"]').click();
    cy.get('[data-testid="dailyscrum-header"]').should('not.exist');
  });
  it('Test should drag progress bar to 80%', () => {
    cy.intercept('GET', '**/dailyScrums/*/none/14-11-2022/search-all', dailyScrum).as(
      'fetch-dailyScrums'
    );
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value'
    ).set;
    cy.get('[data-testid="dailyscrum-btn"]').click();
    cy.wait('@fetch-dailyScrums');
    cy.get('[data-testid="dailyscrum-progress-bar-6371d4176d614a9131b97e6f"]').then(($range) => {
      const range = $range[0];
      nativeInputValueSetter.call(range, 80);
      range.dispatchEvent(new Event('change', { value: 80, bubbles: true }));
    });
    cy.get('[data-testid="dailyscrum-progress-6371d4176d614a9131b97e6f"]').contains('80%');
  });
  it('Test should submit data', () => {
    cy.intercept('GET', '**/dailyScrums/*/none/14-11-2022/search-all', dailyScrum).as(
      'fetch-dailyScrums'
    );
    cy.intercept('PATCH', '**/dailyScrums/*/*').as('update-dailyScrums');
    cy.get('[data-testid="dailyscrum-btn"]').click();
    cy.wait('@fetch-dailyScrums');
    cy.get('[type="radio"]').check();
    cy.get('[data-testid="dailyscrum-reason-6371d4176d614a9131b97e6f"]').type('I need support');
    cy.get('[data-testid="dailyscrum-submit"]').click();
    cy.wait('@update-dailyScrums');
  });
});
