
import mongoose from 'mongoose'

const connectDB = async () => {
      try {
            const connection = await mongoose.connect(
                  `${process.env.MONGODB_URL}/CampusConnect`,
                  {
                        serverSelectionTimeoutMS: 10000,
                  }
            )

            console.log(`MongoDB connected successfully: ${connection.connection.host}`)
      } catch (err) {
            console.error('Error connecting to MongoDB:', err.message)
            throw err
      }
}

export default connectDB
