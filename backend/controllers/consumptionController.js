import asyncHandler from 'express-async-handler'
import Consumption from '../models/consumptionModel.js'

const isValidType = (type) => {
  return type === 'Water' || type === 'Gas' || type === 'Electricity'
}

const getConsumptions = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 12
  const page = Number(req.query.pageNumber) || 1

  const count = await Consumption.countDocuments()
  const consumptions = await Consumption.find().limit(pageSize).skip(pageSize * (page - 1))

  res.json({
    count,
    consumptions,
    pageSize,
    page,
    pages: Math.ceil(count / pageSize)
  })
})

const createConsumption = asyncHandler(async (req, res) => {
  const {
    name,
    type,
    data
  } = req.body

  if (!isValidType(type)) {
    res.status(400)
    throw new Error('Invalid type provided')
  }

  const consumption = await Consumption.create({
    name,
    type,
    data
  })

  if (consumption) {
    res.json(consumption)
  } else {
    res.status(400)
    throw new Error('Invalid data provided')
  }
})

const deleteConsumption = asyncHandler(async (req, res) => {
  const consumption = await Consumption.findById(req.params.id)

  if (consumption) {
    await Consumption.deleteOne({_id: consumption._id})
    res.json({
      message: 'Consumption deleted sucessfully'
    })
  } else {
    res.status(404)
    throw new Error('Consumption not found')
  }
})

const getConsumptionById = asyncHandler(async (req, res) => {
  const consumption = await Consumption.findById(req.params.id)

  if (consumption) {
    res.json(consumption)
  } else {
    res.status(404)
    throw new Error('Consumption not found')
  }
})

const addConsumptionData = asyncHandler(async (req, res) => {
  const consumption = await Consumption.findById(req.params.id)

  if (consumption) {
    const newValue = req.body.data
    consumption.data.push(newValue)
    await consumption.save()
  } else {
    res.status(404)
    throw new Error('Consumption not found')
  }
})

export {
  getConsumptions,
  createConsumption,
  deleteConsumption,
  getConsumptionById,
  addConsumptionData
}