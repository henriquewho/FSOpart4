const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/info', (request, response)=>{
  response.send('This is the blog backend app')
})

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogsRouter.post('/', async (request, response)=>{
  const defaultUser = await User.findById('615b3f14b4c48aae6b296079');
  const body = request.body; 

  const blog = new Blog({
    title: body.title, author: body.author, 
    url: body.url, like: body.likes, 
    user: defaultUser._id
  })

  const savedBlog = await blog.save(); 
  defaultUser.blogs = defaultUser.blogs.concat(savedBlog._id); 
  let savedUser = await defaultUser.save();
  response.json(savedBlog);
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;

  let resp = await Blog.findByIdAndRemove(id); 
  if (resp) {
    response.status(204).end(); 
  } else {
    response.status(404).send({error:'The blog wasnt found'});
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id; 
  const newBlog = request.body; 

  console.log('id and newBlog: ', id, newBlog);

  let updatedBlog = await Blog.findById(id); 
  for (let key in newBlog) {
    if (key!=='id'){
      updatedBlog[key] = newBlog[key]; 
    }
  }

  /* the example from part3 used findByIdAndUpdate, 
  look for the difference in using save(). Apparently 
  the result is the same */
  let result = await updatedBlog.save(); 
  response.json(result); 
})

module.exports = blogsRouter