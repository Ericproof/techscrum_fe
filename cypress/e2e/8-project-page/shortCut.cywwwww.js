/// <reference types="cypress" />
import projectsData from "../../fixtures/projects.json";

describe('Project page', () => {
    beforeEach(() => {
        let projectList = projectsData;
        cy.intercept('GET', '**/projects', projectList).as('fetch-projects');
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
    })

    it('should search projects and find it in the project list', () => {
        cy.get('[data-testid="filter-Project"]').click();
        cy.get('[data-testid="Evan"]').dblclick()
        cy.get('[data-testid="add-shortcut"]').dblclick()
        cy.get('[data-testid="shortcut-title"]')
    })
})

