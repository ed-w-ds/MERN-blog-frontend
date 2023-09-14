import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog.js'

describe('<Blog />', () => {
    let container
    const updateBlog = jest.fn()
    const deleteBlog = jest.fn()
    const blog = {
        title: 'Test Title',
        author: 'Test Author',
        url: 'Test Url',
        likes: 0,
        user: {
            name: 'Test User'
        }
    }

    beforeEach(() => {
        container = render(
            <Blog
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
            />
        ).container
    })

    test('renders content Title and Author by default', async () => {
        const titleAuthor = container.querySelector('.titleAuthor')
        expect(titleAuthor).toHaveTextContent('Test Title')
        expect(titleAuthor).toHaveTextContent('Test Author')
        const details = container.querySelector('.details')
        expect(details).toHaveStyle('display: none')
    })

    test('renders content Title, Author, Url, Likes and User after the show button is clicked', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const titleAuthor = container.querySelector('.titleAuthor')
        expect(titleAuthor).toHaveTextContent('Test Title')
        expect(titleAuthor).toHaveTextContent('Test Author')
        const div = container.querySelector('.details')
        expect(div).not.toHaveStyle('display: none')
        expect(div).toHaveTextContent('Test Url')
        expect(div).toHaveTextContent('0')
        // toHaveTextContent is synchronous, so we can use it for testing if the user is displayed immediately
        expect(div).toHaveTextContent('Test User')
    })

    test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(updateBlog.mock.calls).toHaveLength(2)
    })
})