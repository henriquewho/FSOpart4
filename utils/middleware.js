const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method =', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  if (request.path=='/info'){
    response.send('This is the blog backend app')
  } else
  response.status(404).send({ error: `unknown endpoint at ${request.path}` })
}

const errorHandler = (error, request, response, next) => {
  logger.info(`Entered the errorHandler middleware`);
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}