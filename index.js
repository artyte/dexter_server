import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import graphqlHttp from 'express-graphql'
import https from 'https'
import fs from 'fs'
import { isAuth } from './common.js'
import cors from 'cors'

// app boilerplate output
const app = express()
app.get(`/`, (_, res) => {
  res.redirect(`/graphql`)
})

app.use(bodyParser.json())
app.use(cors())

app.use((req, res, next) => {
  res.setHeader(`Access-Control-Allow-Origin`, `*`)
  res.setHeader(`Access-Control-Allow-Methods`, `POST,GET,OPTIONS`)
  res.setHeader(`Access-Control-Allow-Headers`, `Content-Type, Authorization`)
  if (req.method === `OPTIONS`) {
    return res.sendStatus(200)
  }
  next()
})

app.use(isAuth)

// for graphql
import schema from './graphql/schema/index.js'
import resolver from './graphql/resolvers/index.js'
app.use(
  `/graphql`,
  graphqlHttp({
    schema: schema,
    rootValue: resolver,
    graphiql: false,
  })
)

// // details on string format https://docs.mongodb.com/manual/reference/connection-string/
// this is an authorization enabled uri
// const uri = `mongodb://${process.env.MONGO_USER}:${encodeURIComponent(
//   process.env.MONGO_PASSWORD
// )}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${
//   process.env.MONGO_DB
// }?retryWrites=True`

// details on string format https://docs.mongodb.com/manual/reference/connection-string/
// this is an authorization disable uri
const uri = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?retryWrites=True`

// connect to mongoDB first then start backend server
mongoose.set(`debug`, true)
mongoose
  .connect(`${uri}`, { useNewUrlParser: true })
  .then(() => {
    https
      .createServer(
        {
          key: fs.readFileSync("server.key"),
          cert: fs.readFileSync("server.crt")
        },
        app
      )
    app.listen(3000)
    console.log(`Backend is now live!`)
  })
  .catch((err) => {
    console.log(err)
  })
