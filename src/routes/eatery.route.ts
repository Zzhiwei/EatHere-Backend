import { Router } from 'express'
import {
  createEatery,
  deleteEatery,
  getAllEateries,
  getEatery,
  updateEatery,
} from '../controller/eatery.controller'
import { ROLE } from '../utils/enum'
import { authentiticate, authorize } from './auth.route'

export const eateryRouter = Router()
export const eateryBaseUrl = '/eatery'

eateryRouter.route('/all').get(getAllEateries)
eateryRouter.route('/:id').get(getEatery)
eateryRouter.route('/create').post(authorize(), createEatery)
eateryRouter.route('/update/:id').put(authorize(), updateEatery)
eateryRouter.route('/delete/:id').delete(authorize([ROLE.ADMIN]), deleteEatery)

// eatery specific authorization middlewares can be written here
// e.g. authorize only eatery post owners to edit
