/// <reference types="cypress" />
import rolesData from '../../fixtures/roles.json';
import permissionsData from '../../fixtures/permissions.json';
import projectsData from '../../fixtures/projects.json';

// describe('Role page', () => {
//   beforeEach(() => {
//     cy.intercept('GET', '**/projects/*/roles', rolesData).as('fetch-roles');
//     cy.intercept('GET', '**/projects/*/roles/*', rolesData[0]).as('fetch-one-role');
//     cy.visit('/login');
//     cy.login('kitman200220022002@gmail.com', '12345678');
//     cy.wait('@fetch-roles');
//     cy.get('[data-testid="evan"]').dblclick();
//   });
// });

describe('RolePage', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/projects', projectsData).as('fetch-projects');
    cy.intercept('GET', '**/projects/*/roles', rolesData).as('fetch-roles');
    cy.intercept('GET', '**/permissions', permissionsData).as('fetch-permissions');
    // cy.visit('/roles');
    cy.visit('/login');
    cy.login('kitman200220022002@gmail.com', '12345678');
    cy.wait('@fetch-projects');
    cy.get('[data-testid="testcypress"]').dblclick();
    cy.get('[data-testid="member-btn"]').click();
    cy.get('[data-testid="manage-role-btn"]').click();
    cy.wait('@fetch-roles');
    cy.wait('@fetch-permissions');
  });

  //   it('displays roles table', () => {
  //     cy.get('[data-testid="role-table"]').should('be.visible');
  //   });

  //   it('opens add role form', () => {
  //     cy.get('[data-testid="add-role-btn"]').click();
  //     cy.get('[data-testid="permission-selector"]').should('be.visible');
  //   });

  //   it('opens edit role form', () => {
  //     cy.get('[data-testid="more-btn"]').first().trigger('mouseover');
  //     cy.wait(500);
  //     cy.get('[data-testid="more-list"]').should('be.visible');
  //     // cy.get('[data-testid="edit-btn"]').first().click();
  //     // cy.get('[data-testid="permission-selector"]').should('be.visible');
  //   });

  it('adds new role', () => {
    const roleName = 'Test Role';
    cy.get('[data-testid="add-role-btn"]').click();
    cy.get('[data-testid="role-input"]').type(roleName);
    cy.get('[data-testid="permission-option"]').eq(1).click();
    cy.get('[data-testid="permission-option"]').eq(2).click();
    cy.get('[data-testid="permission-option"]').eq(0).click();
    cy.get('[data-testid="submit-btn"]').click();
    // cy.wait('@fetch-roles');
    // cy.get('[data-testid="role-table"]').should('contain', roleName);
  });

  //   it('edits role', () => {
  //     const roleName = 'Edited Role';
  //     cy.get('[data-testid="edit-role-btn"]').first().click();
  //     cy.get('[data-testid="role-input"]').clear().type(roleName);
  //     cy.get('[data-testid="permission-select"]').eq(0).click();
  //     cy.get('[data-testid="permission-option"]').eq(1).click();
  //     cy.get('[data-testid="submit-btn"]').click();
  //     cy.wait('@getRoles');
  //     cy.get('[data-testid="role-name"]').should('contain', roleName);
  //   });

  //   it('deletes role', () => {
  //     cy.get('[data-testid="delete-role-btn"]').first().click();
  //     cy.get('[data-testid="confirm-delete-btn"]').click();
  //     cy.wait('@getRoles');
  //     cy.get('[data-testid="role-name"]').should('have.length', 2);
  //   });
});
