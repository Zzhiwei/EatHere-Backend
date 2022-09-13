import { Request, Response, NextFunction } from 'express'

import { Eatery } from '../model/eatery.model'
import { HttpStatusCode } from '../utils/HttpsStatusCode'

//// create
export const createEatery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eatery = new Eatery(req.body)
    await eatery.save()
    res.status(HttpStatusCode.CREATED).json(eatery)
  } catch (error) {
    next(error)
  }
}

//// get
export const getEatery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eatery = await Eatery.findById(req.params.id)
    console.log({ eatery })
    if (eatery) {
      res.json(eatery)
    } else {
      const err = new Error()
      err.name = 'EateryNotFoundError'
      throw err
    }
  } catch (error) {
    next(error)
  }
}

export const getAllEateries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eateries = await Eatery.find({}).sort({ createdAt: 'desc' })
    res.json(eateries)
  } catch (error) {
    next(error)
  }
}

//// update
export const updateEatery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, address, priceRange } = req.body

    const updatedEatery = await Eatery.findByIdAndUpdate(
      req.params.id,
      { name, address, priceRange },
      { new: true, runValidators: true }
    )

    if (!updatedEatery) {
      const err = new Error()
      err.name = 'EateryNotFoundError'
      throw err
    }

    res.json(updatedEatery)
  } catch (error) {
    next(error)
  }
}

//// delete
export const deleteEatery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedEatery = await Eatery.findByIdAndRemove(req.params.id)

    if (!deletedEatery) {
      const err = new Error()
      err.name = 'EateryNotFoundError'
      throw err
    }

    res.status(HttpStatusCode.OK).json('DELETED')
  } catch (error: any) {
    next(error)
  }
}
