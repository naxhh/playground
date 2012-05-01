express = require 'express'
routes = require './routes'
app = modules.exports = express.createServer()

#Config Production/Dev mode
require('./config/enviroment.js')(app, express)

#Config the callbacks for the routes
require('./config/routes.js')(app, routes)

app.listen(3000)