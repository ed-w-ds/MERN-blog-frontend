import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm.js'

describe('<Blog />', () => {
    const createBlog = jest.fn()

    test('form calls the event handler it received as props with the right details when a new blog is created', async () => {
        const user = userEvent.setup()

        render(<BlogForm createBlog={createBlog} />)

        const titleInput = screen.getByPlaceholderText('title')
        const authorInput = screen.getByPlaceholderText('author')
        const urlInput = screen.getByPlaceholderText('url')

        await user.type(titleInput, 'Test Title')
        await user.type(authorInput, 'Test Author')
        await user.type(urlInput, 'Test Url')
        await user.click(screen.getByText('save'))

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('Test Title')
        expect(createBlog.mock.calls[0][0].url).toBe('Test Url')
        expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
    })
})