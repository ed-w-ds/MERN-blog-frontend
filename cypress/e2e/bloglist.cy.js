/* eslint no-undef: 0 */
// describe('template spec', () => {
//     it('passes', () => {
//         cy.visit('https://example.cypress.io')
//     })
// })

// cy.get('[data-cy="submit"]').click()
// and cy.contains('Submit').click()
// is better than using #

describe('Blog app', function() {

    beforeEach(function() {
        cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)
        console.log(`${Cypress.env('BACKEND')}/api/testing/reset`)

        cy.visit('')

        cy.get('#username-input-signup').type('mluukkai')
        cy.get('#name-input-signup').type('Matti Luukkainen')
        cy.get('#password-input-signup').type('salainen')
        cy.get('#signUp-button').click()
    })

    it('Login form is shown', function() {
        cy.contains('login')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username-input').type('mluukkai')
            cy.get('#password-input').type('salainen')
            cy.get('#login-button').click()

            cy.contains('Matti Luukkainen logged-in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username-input').type('mluukkai')
            cy.get('#password-input').type('wrong')
            cy.get('#login-button').click()

            cy.get('#notification')
                .should('contain', 'Wrong credentials')

            cy.get('html').should('not.contain', 'Matti Luukkainen logged-in')
        })
    })
    describe('When logged in', function() {
        beforeEach(function() {
            cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)
            cy.visit('')

            cy.get('#username-input-signup').type('mluukkai')
            cy.get('#name-input-signup').type('Matti Luukkainen')
            cy.get('#password-input-signup').type('salainen')
            cy.get('#signUp-button').click()

            cy.get('#username-input').type('mluukkai')
            cy.get('#password-input').type('salainen')
            cy.get('#login-button').click()
        })

        it('A blog can be created and exists', function() {
            cy.contains('new blog').click()
            cy.get('#title-input').type('a blog created by cypress')
            cy.get('#author-input').type('cypress')
            cy.get('#url-input').type('www.cypress.com')
            cy.get('#submit-button').click()
            cy.contains('a blog created by cypress')
            cy.get('.titleAuthor')
                .should('contain', 'a blog created by cypress')
                .and('contain', 'cypress')
        })

        describe('and a blog exists', function() {
            beforeEach(function() {
                cy.contains('new blog').click()
                cy.get('#title-input').type('a blog created by cypress')
                cy.get('#author-input').type('cypress')
                cy.get('#url-input').type('www.cypress.com')
                cy.get('#submit-button').click()

                cy.contains('a blog created by cypress').click()
            })

            it('the blog can be liked', function() {
                cy.contains('a blog created by cypress || Author').click()
                cy.contains('Likes: 0')
                cy.contains('like').click()
                cy.contains('Likes: 1')
            })

            it('the blog can be deleted by the user that created it', function() {
                cy.contains('a blog created by cypress || Author').click()
                cy.contains('remove').click()
                cy.get('html').should('not.contain', 'a blog created by cypress')

                // opt. include logout and login with another person who can't delete a blog
                // cy.contains(logout).click()
            })

            it('the blog cannot be deleted by another user', function() {
                cy.contains('logout').click()
                // const user = {
                //     name: 'Matti 2',
                //     username: 'mluukkai2',
                //     password: 'salainen'
                // }
                cy.get('#username-input-signup').type('mluukkai')
                cy.get('#name-input-signup').type('Matti Luukkainen')
                cy.get('#password-input-signup').type('salainen')
                cy.get('#signUp-button').click()

                // cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

                // cy.login({ username: 'mluukkai2', password: 'salainen' })

                cy.get('#username-input').type('mluukkai')
                cy.get('#password-input').type('salainen')
                cy.get('#login-button').click()

                cy.contains('a blog created by cypress || Author').click()
                cy.contains('remove').click()
                cy.get('html').should('contain', 'a blog created by cypress')
            })
        })

        describe.only('and multiple blogs exist', function() {
            beforeEach(function() {
                cy.contains('new blog').click()
                cy.get('#title-input').type('The title with the most likes')
                cy.get('#author-input').type('cypress')
                cy.get('#url-input').type('www.cypress.com')
                cy.get('#submit-button').click()

                cy.contains('new blog').click()
                cy.get('#title-input').type('The title with the second most likes')
                cy.get('#author-input').type('cypress')
                cy.get('#url-input').type('www.cypress.com')
                cy.get('#submit-button').click()
            })

            it.only('blogs are ordered by likes', function() {
                cy.contains('The title with the most likes')
                    .click()
                cy.get('#like-btn')
                    .click()
                cy.visit('')
                cy.get('.blog').eq(0).should('contain', 'The title with the most likes')
                cy.get('.blog').eq(1).should('contain', 'The title with the second most likes')
            })
        })
    })
})