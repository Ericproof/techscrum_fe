/// <reference types="cypress" />

describe('Careers page', () => {
  beforeEach(() => {
    cy.visit('/careers')
  })

  it('scroll the page down', () => {
    cy.scrollTo(250, 2550)
    cy.get('[data-testid="apply-button"]').should('not.be.visible');
  })

  it('when the button is visible', () => {
    cy.scrollTo(250, 2550)
    cy.get('.react-reveal')
      .invoke('css', 'opacity', '1')
      .then(() => cy.get('[data-testid="apply-button"]').should('be.visible'))
  })

  it('click the first apply button', () => {
    cy.get('.react-reveal')
      .invoke('css', 'opacity', '1')
      .then(() => cy.get('[data-testid="apply-button"]').eq(1).click({ force: true }))
  })


  it('click the first apply button', () => {
    cy.get('.react-reveal')
      .invoke('css', 'opacity', '1')
      .then(() => cy.get('[data-testid="apply-button"]').eq(1).click({}))

    cy.get('input[data-testid="full-name"]').type('Andy Wei')
  })

});