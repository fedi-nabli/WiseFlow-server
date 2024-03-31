import mongoose from 'mongoose'

const notificationSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['Danger', 'Warning', 'Info', 'Success']
  },
  message: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date
  }
}, {
  timestamps: true
})

const Notification = mongoose.model('Notification', notificationSchema)

export default Notification