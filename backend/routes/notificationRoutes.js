import express from 'express'
import {
  getNotifications,
  deleteNotification,
  createNotification,
  getNotificationById
} from '../controllers/notificationController.js'
const router = express.Router()

router.route('/').get(getNotifications).post(createNotification)
router.route('/:id').get(getNotificationById).delete(deleteNotification)

export default router