import { Router } from 'express'
import {
    createEatery,
    deleteEatery,
    getAllEateries,
    getEatery,
    updateEatery,
} from '../controller/eatery.controller'

export const eateryRouter = Router()

eateryRouter.route('/create').post(createEatery)
eateryRouter.route('/all').get(getAllEateries)
eateryRouter.route('/:id').get(getEatery)

eateryRouter.route('/update/:id').put(updateEatery)
eateryRouter.route('/delete/:id').delete(deleteEatery)
