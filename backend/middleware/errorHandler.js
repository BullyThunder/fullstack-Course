
const errorHandler = (error, request, response, next) =>{
    console.error(error.message);
    if(error.name ==='CastError' ){
         return response.status(400).json({ error: 'malformatted id' });
    }
    return response.status(500).json({ error: 'internal server error' });
}

module.exports = errorHandler;