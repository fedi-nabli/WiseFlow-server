import express from 'express'
import {
  getConsumptions,
  deleteConsumption,
  createConsumption,
  getConsumptionById,
  addConsumptionData
} from '../controllers/consumptionController.js'
const router = express.Router()

router.route('/').get(getConsumptions).post(createConsumption)
router.route('/:id').get(getConsumptionById).delete(deleteConsumption).put(addConsumptionData)

export default router