import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ShowUserBlogs = () => {
    const id = useParams().id
    const users = useSelector(state => state.users)
    if (!users) {
        return <p>loading...</p>
    }
    const user = users.find(user => user.id === id)

    if (!user) {
        return <p>error - user cannot be found</p>
    }

    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            { user.blogs.length === 0
                ?
                <p>This user has no blogs added</p>
                :
                <ul>
                    {user.blogs.map(blog =>
                        <Link to={`/blogs/${blog.id}`} key={blog.id}>
                            <li>{blog.title}</li>
                        </Link>
                    )}
                </ul>
            }
        </div>
    )
}

export default ShowUserBlogs