/// <reference types="cypress" />

import projectsData from '../../fixtures/8-project-page/projects.json';
import rolesData from '../../fixtures/8-project-page/roles.json';
import usersData from '../../fixtures/8-project-page/users.json';
import projectSelected from '../../fixtures/16-project-settings-page/projectSelected.json';

describe('Project page', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/projects', projectsData).as('get-projects');
    cy.intercept('GET', '**/roles', rolesData).as('get-roles');
    cy.visit('/v2/login');
    cy.login('coffeetsang20@gmail.com', 'wendy123');
    cy.wait('@get-roles');
    cy.wait('@get-projects');
  });

  it('Test navigate to project settings, and selected project inputs filled', () => {
    cy.intercept('GET', '**/projects', projectsData).as('get-projects');
    cy.intercept('GET', '**/users', usersData).as('get-usersData');
    cy.intercept('GET', '**/projects/*', projectSelected).as('get-selected-project');
    cy.wait('@get-projects');
    cy.get(`[data-testid="project-expand-btn-${projectSelected.id}"]`).click();
    cy.get('[data-testid="project-details"]').click();
    cy.wait('@get-usersData');
    cy.wait('@get-selected-project');
    cy.get('[data-testid="setting-page"]').should('be.exist');
    cy.get('[data-testid="projectName"]').should('have.value', projectSelected.name);
    cy.get('[data-testid="projectKey"]').should('have.value', projectSelected.key);
    cy.get('[data-testid="projectLead"]').contains(projectSelected.projectLeadId.name);
    cy.get('[data-testid="websiteUrl"]').should('have.value', projectSelected.websiteUrl);
    cy.get('[data-testid="description"]').should('have.value', projectSelected.description);
  });
});
