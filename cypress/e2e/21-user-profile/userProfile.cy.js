/// <reference types="cypress" />
import rolesData from '../../fixtures/roles.json';
import permissionsData from '../../fixtures/permissions.json';
import projectsData from '../../fixtures/projects.json';
import autoFetchUserInfo from '../../fixtures/autoFetchInfo.json';
import updateInfoData from '../../fixtures/20-user-profile/userProfile.json';

describe('RolePage', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/projects', projectsData).as('fetch-projects');
    cy.intercept('GET', '**/projects/*/roles', rolesData).as('fetch-roles');
    cy.intercept('GET', '**/permissions', permissionsData).as('fetch-permissions');
    cy.visit('/login');
    cy.login('coffeetsang20@gmail.com', 'wendy123');
    cy.wait('@fetch-projects');
  });

  it('Should able to update details', () => {
    cy.visit('/me')
    cy.intercept('POST','**/auto-fetch-userInfo',autoFetchUserInfo).as('auto-fetch-userInfo');
    cy.intercept('PUT','**/account/me',updateInfoData).as('account-me');
    cy.get('[data-testid="userName"]').type('abc');
    cy.get('[data-testid="save-changes"]').click();
    cy.wait('@account-me');
    cy.get('[data-testid="userName"]').should('have.value','abc');
    cy.get('.Toastify__toast-body').should('contain', 'Saved');
  });

 

});
