/* eslint no-undef: 0 */
// cy.get('[data-cy="submit"]').click()
// and cy.contains('Submit').click()
// is better than using #

describe('Blog app', function() {

    beforeEach(function() {
        cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)
        cy.signUpBackend({ username: 'mluukkai', name: 'Matti Luukkainen', password: 'salainen' })
    })

    it('Login form is shown', function() {
        cy.visit('')
        cy.contains('login')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.loginFrontend({ username: 'mluukkai', password: 'salainen' })
            cy.contains('Matti Luukkainen logged-in')
        })

        it('fails with wrong credentials', function() {
            cy.loginFrontend({ username: 'mluukkai', password: 'wrong' })

            cy.get('#notification')
                .should('contain', 'Wrong credentials')

            cy.get('html').should('not.contain', 'Matti Luukkainen logged-in')
        })
    })
    describe('When logged in', function() {
        beforeEach(function() {
            // cy.request('POST', `${Cypress.env('BACKEND')}/api/testing/reset`)

            // cy.signUpBackend({ username: 'mluukkai', name: 'Matti Luukkainen', password: 'salainen' })
            cy.loginBackend({ username: 'mluukkai', password: 'salainen' })
            cy.visit('')
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
                cy.createBlog({ title: 'a blog created by cypress', author: 'cypress', url: 'www.cypress.com' })
                cy.visit('')
            })

            it('the blog can be liked', function() {
                cy.contains('a blog created by cypress ||').click()
                cy.contains('Likes: 0')
                cy.contains('like').click()
                cy.contains('Likes: 1')
            })

            it('the blog can be deleted by the user that created it', function() {
                cy.contains('a blog created by cypress ||').click()
                cy.contains('remove').click()
                cy.get('html').should('not.contain', 'a blog created by cypress')
            })
            // it('the blog cannot be deleted by another user', function() {
            //     cy.contains('logout').click()
            //     cy.signUpBackend({ username: 'cypress', name: 'Cypress', password: 'salainen' })
            //     cy.loginBackend({ username: 'cypress', password: 'salainen' })
            //     cy.visit('')
            //     cy.get('html').should('contain', 'a blog created by cypress ||')
            //     cy.contains('a blog created by cypress ||').click()
            //     cy.get('html').should('not.contain', 'remove')
            // })
        })

        describe('and multiple blogs exist', function() {
            beforeEach(function() {
                cy.createBlog({ title: 'The title with the second most likes', author: 'cypress', url: 'www.cypress.com' })
                cy.createBlog({ title: 'The title with the most likes', author: 'cypress', url: 'www.cypress.com' })
                cy.createBlog({ title: 'The title with the third most likes', author: 'cypress', url: 'www.cypress.com' })
            })

            it('blogs are ordered by likes', function() {
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