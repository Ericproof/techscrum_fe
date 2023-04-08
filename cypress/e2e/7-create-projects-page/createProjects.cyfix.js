/// <reference types="cypress" />

import 'cypress-file-upload';
import addProject from '../../fixtures/addProject.json';

describe('/create-projects', () => {
  beforeEach(() => {
    cy.visit('/v2/login');
    cy.login('coffeetsang20@gmail.com', 'wendy123');
  });

  it('should have project details', () => {
    cy.intercept('POST', '**/projects', addProject).as('create-project');
    cy.get('[data-testid="board-create-card"]').click();
    cy.get('[data-testid="name"]').type('techscrum');
    cy.get('[data-testid="key"]').type('TEC');
    cy.get('[data-testid="save"]').click();
    cy.wait('@create-project');
  });

  it('should not close window when create without name', () => {
    cy.get('[data-testid="board-create-card"]').click();
    cy.get('[data-testid="name"]').type(' ');
    cy.get('[data-testid="save"]').click();
    cy.get('[data-testid="save"]').should('exist');
  });

  it('can change icon', () => {
    cy.get('[data-testid="board-create-card"]').click();
    const pic = 'testPicture.jpg';
    cy.get('[data-testid="iconButton"]').click();
    cy.get('[data-testid="picInput"]').attachFile(pic);
  });
});
