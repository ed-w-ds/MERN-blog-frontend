/* eslint-disable */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Cypress.Commands.add('login', ({ username, password }) => {
//     cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
//         username: 'mluukkai', password: 'salainen'
//     }).then(response => {
//         localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
//         cy.visit('')
//     })
// })

Cypress.Commands.add('signUpFrontend', ({ username, name, password }) => {
    cy.visit('')
    cy.get('#username-input-signup').type(username)
    cy.get('#name-input-signup').type(name)
    cy.get('#password-input-signup').type(password)
    cy.get('#signUp-button').click()
})

Cypress.Commands.add('signUpBackend', ({ username, name, password }) => {
    cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)
    cy.request({
        url: `${Cypress.env('BACKEND')}/api/users`,
        method: 'POST',
        body: { username: username, name: name, password: password }
    })
})

Cypress.Commands.add('loginBackend', ({username, password}) => {
    cy.request({
        url: `${Cypress.env('BACKEND')}/api/login`,
        method: 'POST',
        body: { username: username, password: password }
    }).then(response => {
        localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
        cy.visit('')
    })
})

Cypress.Commands.add('loginFrontend', ({username, password}) => {
    cy.visit('')
    cy.get('#username-input').type(username)
    cy.get('#password-input').type(password)
    cy.get('#login-button').click()
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
    cy.request({
        url: `${Cypress.env('BACKEND')}/api/blogs`,
        method: 'POST',
        body: { title, author, url, likes: 0, user: JSON.parse(localStorage.getItem('loggedNoteappUser')).id },
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedNoteappUser')).token}`
        }
    })
    cy.visit('')
})