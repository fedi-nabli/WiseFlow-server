import express from 'express'
import { protect, admin, superAdmin } from '../middleware/authMiddleware.js'
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  createAdminUser,
  getUserById,
  updateUserToAdmin,
  updateUserToSuperAdmin
} from '../controllers/userController.js'
const router = express.Router()

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.put('/:id/super', protect, superAdmin, updateUserToSuperAdmin)
router.route('/:id').get(protect, admin, getUserById).put(protect, admin, updateUserToAdmin).delete(protect, admin, deleteUser).post(protect, admin, createAdminUser)

export default router