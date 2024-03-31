import mongoose from 'mongoose'

const consumptionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLengh: 6
  },
  type: {
    type: String,
    required: true,
    enum: ['Water', 'Gas', 'Electricity']
  },
  data: [
    {
      value: {
        type: Number,
        required: true,
        min: 0
      },
      date: {
        type: Date
      }
    }
  ]
}, {
  timestamps: true
})

const Consumption = mongoose.model('Consumption', consumptionSchema)

export default Consumption