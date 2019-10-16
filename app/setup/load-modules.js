import express from 'express'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

export default function (server) {
  console.info('SETUP - Loading modules... = ', path.join(__dirname, '..', '..', "public"))

  server.use(cors())
  server.use(express.static(path.join(__dirname, '..', '..', "public")));
  server.use(bodyParser.json())
  server.use(cookieParser())

}
