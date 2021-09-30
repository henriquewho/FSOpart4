/* 
1 - Use the supertest package for writing a test that makes an HTTP GET request to the /api/blogs url. OK
2 - Write a test that verifies that the unique identifier property of the blog posts is named id, by default the database names the property _id. Verifying the existence of a property is easily done with Jest's toBeDefined matcher. OK
3 - Write a test that verifies that making an HTTP POST request to the /api/blogs url successfully creates a new blog post. OK
4 - Write a test that verifies that if the likes property is missing from the request, it will default to the value 0. OK
5 - verifies that if the title and url properties are missing from the request data, the backend responds to the request with status 400 Bad Request OK
*/

const mongoose = require('mongoose'); 
const supertest = require('supertest'); 
const app = require('../app'); 
const api = supertest(app); 
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach ( async ()=>{
    await Blog.deleteMany({}); 
    const blogObjects = helper.initialBlogs.map(each => new Blog(each)); 
    const promiseArray = blogObjects.map (each => each.save()); 
    await Promise.all(promiseArray); 
},100000)

test ('blogs are returned as json', async () => {
    await api.get('/api/blogs')
    .expect(200).expect('Content-Type', /application\/json/);
});

test ('verifies that the identifier is named id', async () => {
    const blogs = await api.get('/api/blogs');
    expect(blogs.body[0].id).toBeDefined(); 
})

test ('verifies that creating a note works', async () => {
    const newBlog = {
        title: 'new blog', author: 'new author', url: 'new url', likes: 33
    }
    await api.post('/api/blogs').send(newBlog).expect(200).expect('Content-Type', /application\/json/); 

    const blogsEnd = await helper.blogsInDb(); 
    expect(blogsEnd.length).toBe(helper.initialBlogs.length + 1); 
})

test ('verifies that if likes is missing it defaults to 0', async () => {
    const newBlog = {
        title: 'new blog', author: 'new author', url: 'new url'   
    }
    await api.post('/api/blogs').send(newBlog).expect(200).expect('Content-Type', /application\/json/); 
    const blogsEnd = await helper.blogsInDb(); 
    expect(blogsEnd[blogsEnd.length-1].likes).toBe(0); 
})

test ('verifies that if title and url are missing it responds with 400', async()=>{
    const newBlog = {
        author: 'new author', likes: 9
    }
    await api.post('/api/blogs').send(newBlog)
    .expect(400); 
})

afterAll ( ()=>{
    mongoose.connection.close(); 
})