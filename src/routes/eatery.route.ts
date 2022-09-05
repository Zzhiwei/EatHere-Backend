import { Router } from 'express'
import {
  createEatery,
  deleteEatery,
  getAllEateries,
  getEatery,
  updateEatery,
} from '../controller/eatery.controller'

export const eateryRouter = Router()
export const eateryBaseUrl = '/eatery'

eateryRouter.route('/all').get(getAllEateries)
eateryRouter.route('/:id').get(getEatery)
// POST request for creating new resource
eateryRouter.route('/create').post(createEatery)
// PUT for updating existing resource
eateryRouter.route('/update/:id').put(updateEatery)
eateryRouter.route('/delete/:id').delete(deleteEatery)
