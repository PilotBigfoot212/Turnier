const express = require ('express')
const app = express()
const mongoose = require ('mongoose')
require('dotenv').config()

/**Sonst Warnung (node:40232) [MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.
(Use `node --trace-deprecation ...` to show where the warning was created)*/
//mongoose.set('strictQuery', false);


mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on ('error', (error) => console.error (error))
db.once ('open', () => console.log ('Connected to Database'))


app.listen (3000, () => console.log('Server Started'))






