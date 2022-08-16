/// <reference types="cypress" />

describe('signup', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should show please fill in the blank', () => {
    cy.get('[data-testid="register"]').click();
    cy.get('[data-testid="email"]')
      .invoke('prop', 'validationMessage')
      .should('equal', '请填写此字段。');
  });

  it('should show require valide email address', () => {
    cy.get('[data-testid="name"]').type('123');
    cy.get('[data-testid="email"]').type('123');
    cy.get('[data-testid="register"]').click();
    cy.get('[data-testid="email"]')
      .invoke('prop', 'validationMessage')
      .should('equal', '请在电子邮件地址中包括“@”。“123”中缺少“@”。');
  });

  it('should show the email logo', () => {
    cy.get('[data-testid="name"]').type('315521793@qq.com');
    cy.get('[data-testid="email"]').type('315521793@qq.com');
    cy.get('[data-testid="register"]').click();
    cy.get('[data-testid="email-tip"]', { timeout: 20000 }).contains(
      'Email have Sent, Please check your email'
    );
  });

  it('should show the email warning tip', () => {
    cy.get('[data-testid="name"]').type('123');
    cy.get('[data-testid="email"]').type('ldwjser@gmail.com');
    cy.get('[data-testid="register"]').click();
    cy.get('[data-testid="email-warning-tip"]', { timeout: 15000 }).contains(
      'The email already exists. Please try again'
    );
  });
});
