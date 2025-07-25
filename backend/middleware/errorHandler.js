
const errorHandler = (error, request, response, next) =>{
    console.error(error.message);
    if(error.name ==='CastError' ){
         return response.status(400).json({ error: 'malformatted id' });
    }
    else if(error.name === 'ValidationError'){
          const messages = Object.values(error.errors).map(e => e.message)
        return response.status(400).json({ error: messages.join(', ') });
    }
    next(error);
}

module.exports = errorHandler;