const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { update } = require('../models/blog')

blogsRouter.get('/info', (request, response)=>{
  response.send('This is the blogs backend')
})

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', 
  {username: 1, name: 1, id: 1});
  response.json(blogs);

})

blogsRouter.post('/', async (request, response)=>{

  const body = request.body; 

  const token = request.token; 
  const userPost = request.user; 

  if (!token || !userPost){
    return response.status(401).json({error: 'token missing or invalid'})
  }
  const defaultUser = await User.findById(userPost);

  const blog = new Blog({
    title: body.title, author: body.author, 
    url: body.url, likes: body.likes, 
    user: defaultUser._id
  })

  const savedBlog = await blog.save(); 
  defaultUser.blogs = defaultUser.blogs.concat(savedBlog._id); 
  let savedUser = await defaultUser.save();
  response.json(savedBlog);
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id;   // id of the blog
  const toDelete = await Blog.findById(id); 
  const userCreated = toDelete.user; 
  const token = request.token;    // using middleware
  const userDelete = request.user; 

  if (!token || !userDelete || userDelete != userCreated.toString()){
    return response.status(401).json({error:'token missing or invalid'})
  }

  let resp = await Blog.findByIdAndRemove(id); 
  if (resp) {
    response.status(204).end(); 
  } else {
    response.status(404).send({error:'The blog wasnt found'});
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id; 

  const userPost = request.user; 

  const oldBlog = await Blog.findById(id);
  oldBlog.likes++; 

  const resp = await oldBlog.save();
  return response.json(resp); 

  /*
  const id = request.params.id; 
  const newBlog = request.body; 

  let updatedBlog = await Blog.findById(id); 
  for (let key in newBlog) {
    if (key!=='id'){
      updatedBlog[key] = newBlog[key]; 
    }
  }

  // the example from part3 used findByIdAndUpdate, 
  // look for the difference in using save(). Apparently 
  // the result is the same

  let result = await updatedBlog.save(); 
  response.json(result); 
  */
})

module.exports = blogsRouter