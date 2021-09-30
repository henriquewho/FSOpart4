const Blog = require('../models/blog'); 

const initialBlogs = [
    {
        title: 'first blog', author: 'first author', url: 'first url', likes: 1
    },
    {
        title: 'second blog', author: 'second author', url: 'second url', likes: 2
    }
]

const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.remove()
  
    return blog._id.toString()
}
  
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}