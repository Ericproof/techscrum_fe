/// <reference types="cypress" />
import 'cypress-file-upload';
// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('/create-projects', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.login('1411231067@qq.com', '12345678');
    cy.visit('/create-projects');
  });

  it('should have project details', () => {
    cy.get('[data-testid="name"]').type('techscrum');
    cy.get('[data-testid="key"]').type('TEC');
    cy.get('[data-testid="save"]').click();
  });

  it('should have error message when create without name', () => {
    cy.get('[data-testid="name"]').type(' ');
    cy.get('[data-testid="save"]').click();
    cy.get('[data-testid="projectError"]').contains('Error');
  });

  it('can change icon', () => {
    const pic = 'testPicture.jpg';
    cy.get('[data-testid="iconButton"]').click();
    cy.get('[data-testid="picInput"]').attachFile(pic);
  });
});
