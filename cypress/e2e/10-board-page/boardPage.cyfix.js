/// <reference types="cypress" />
import projectsData from "../../fixtures/projects.json";
import boardData from "../../fixtures/board.json";
describe('Project page', () => {
    beforeEach(() => {
        let projectList = projectsData;
        cy.intercept('GET', '**/projects', projectList).as('fetch-projects');
        cy.intercept('POST', '**/projects/*/shortcuts', projectList).as('create-shortcut');
        cy.intercept('DELETE', '**/projects/*', (req) => {
            const url = req.url;
            const urlParams = url.split('/');
            const id = urlParams[urlParams.length - 1];
            const newProjectList = [];
            projectList.forEach((project) => {
                if(project.id !== id) newProjectList.push(project)
            });
            projectList = newProjectList;
            return projectList;
        }).as('delete-projects');
        cy.visit('/login');
        cy.login('kitman200220022002@gmail.com', '12345678');
        cy.wait('@fetch-projects');
        cy.intercept('GET', '**/board/*', boardData).as('fetch-board');
        cy.get('[data-testid="evan"]').dblclick()
        cy.wait('@fetch-board')
    })

    it('Test Board Page should show task', () => {
        cy.get('[data-testid="task-63534b09dd32116190a0c8e5"]')
        cy.get('[data-testid="task-634f8a1ef8d245b0eba99b61"]')
        cy.get('[data-testid="task-634e9f2d162cb5e204e4e54c"]')
        cy.get('[data-testid="board-col-634e9f20162cb5e204e4e533"]').contains('To Do')
        cy.get('[data-testid="board-col-634e9f20162cb5e204e4e534"]').contains('In Progress')
        cy.get('[data-testid="board-col-634e9f20162cb5e204e4e535"]').contains('Review')
    })

    it('Test Search Board page', () => {
        cy.get('[data-testid="board-search"]').click()
        cy.get('[data-testid="board-search"]').clear().type('test')
        cy.get('[data-testid="task-634f8a1ef8d245b0eba99b61"]')
        cy.get('[data-testid="task-63534b09dd32116190a0c8e5"]').should('not.exist')
        cy.get('[data-testid="task-634e9f2d162cb5e204e4e54c"]').should('not.exist')
    })
})

