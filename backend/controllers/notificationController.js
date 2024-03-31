import asyncHandler from 'express-async-handler'
import Notification from '../models/notificationModel.js'

const isValidType = (type) => {
  return type === 'Danger' || type === 'Warning' || type === 'Info' || type === 'Success'
}

const getNotifications = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 12
  const page = Number(req.query.pageNumber) || 1
  
  const type = req.query.type ? {
    type: {
      $regex: req.query.type,
      $options: 'i'
    }
  } : {}

  if (type && !isValidType(type)) {
    res.status(400)
    throw new Error('Invalid type provided')
  }

  const count = await Notification.countDocuments({...type})
  const notifications = await Notification.find({...type}).limit(pageSize).skip(pageSize * (page - 1))

  res.json({
    count,
    notifications,
    pageSize,
    page,
    pages: Math.ceil(count / pageSize)
  })
})

const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id)

  if (notification) {
    await notification.deleteOne({_id: notification._id})
    res.json({
      message: 'Notification deleted sucessfully'
    })
  } else {
    res.status(404)
    throw new Error('Notification not found')
  }
})

const createNotification = asyncHandler(async (req, res) => {
  const {
    type,
    message,
    description,
    date
  } = req.body

  if (!isValidType(type)) {
    res.status(400)
    throw new Error('Invalid type provided')
  }

  const notification = await Notification.create({
    type,
    message,
    description,
    date
  })

  if (notification) {
    res.json(notification)
  } else {
    res.status(400)
    throw new Error('Invalid data provided')
  }
})

const getNotificationById = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id)

  if (notification) {
    res.json(notification)
  } else {
    res.status(404)
    throw new Error('Notification not found')
  }
})

export {
  getNotifications,
  deleteNotification,
  createNotification,
  getNotificationById
}