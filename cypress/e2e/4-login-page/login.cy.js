/// <reference types="cypress" />

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

describe('login', () => {
  beforeEach(() => {
    cy.visit('/login')
  })

  it('should able to login', () => {
    cy.login('kitman200220022002@gmail.com' , '12345678')
  })

  it('should show user not active', () =>{
    cy.get('[data-testid="email"]').type('kitmanwork@gmail.com')
    cy.get('[data-testid="password"]').type('1234678')
    cy.get('[data-testid="login"]').click();
    cy.get('[data-testid="login-tip"]').contains('User has not active account, Please contact staff!')
  })

  it('should show error message when login is incorrect', () =>{
    cy.get('[data-testid="email"]').type('kitmanworkkgmail.com')
    cy.get('[data-testid="password"]').type('1234678')
    cy.get('[data-testid="login"]').click();
    cy.get('[data-testid="login-tip"]').contains('Wrong Email or Password.')
  })
})
