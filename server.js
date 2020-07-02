const express = require('express')
const dbconnections = require('./dbconnection')
const user = require('./routers/user_route')
const admin = require('./routers/admin_route')
const building = require('./routers/building_routs')

const server = express();

server.use('/api',user,admin,building)

server.listen(8080,()=>{
    console.log('server working on 8080')
})