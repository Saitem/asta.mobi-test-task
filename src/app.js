import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import socketIo from 'socket.io' 
import http from 'http'
import request from 'request-promise'

import routes from './routes/index.route'

dotenv.config()

const app = express()

const PORT = 5000

const server = http.createServer(app)

const io = socketIo(server, {
  cors: {
    origin: '*'
  }
});


app.use(express.json())

app.use(cors('*'))

app.use('/api', routes)

let int

io.on("connection", (socket) => {
  if(int)
      clearInterval(int)
  int = setInterval(() => updateCovidStat(socket), 10000)

})

const updateCovidStat = async socket => {
  const res = await request('http://localhost:5000/api/covid-stat/update-covid-stat')
 
  socket.emit('updateCovidStat', res)
}

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})

server.listen(PORT, () => console.log(`Server working on port ${PORT}`))