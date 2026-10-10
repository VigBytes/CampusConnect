
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { serve } from 'inngest/express'
import { inngest, functions } from './inngest/index.js'

dotenv.config()

const app = express()

app.use(cors({
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
}))

app.use(express.json())
app.post('/api/inngest',serve({client: inngest, functions}))
app.get('/', (req, res) => {
      res.json({
            success: true,
            message: 'CampusConnect server is running!',
      })
})

const PORT = process.env.PORT || 4000

const startServer = async () => {
      try {
            await connectDB()

            app.listen(PORT, () => {
                  console.log(`CampusConnect server is running on port ${PORT}`)
            })
      } catch (err) {
            console.error('Failed to start server:', err.message)
            process.exit(1)
      }
}

startServer()
