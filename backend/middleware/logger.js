const morgan = require('morgan');
morgan.token('body',req=>{
    JSON.stringify(req.body)
})
const logger = morgan(':method :url :status :response-time ms :res[content-length] -  :status  :body');
module.exports = logger;


