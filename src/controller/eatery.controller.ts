import { Request, Response, NextFunction } from 'express'
import { getOrSetCache } from '../db/redis'

import { Eatery } from '../model/eatery.model'
import { User } from '../model/user.model'
import { HttpStatusCode } from '../utils/HttpsStatusCode'

//// create
export const createEatery = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, address, priceRange, userId } = req.body
    const user = await User.findById(userId)
    if (!user) {
      return res.status(400).json({
        error: 'user id is not provided',
      })
    }

    const eatery = new Eatery({ name, address, priceRange, user: user?._id })
    const savedEatery = await eatery.save()
    user.eateries.concat(savedEatery._id as any)
    await user.save()

    res.status(HttpStatusCode.CREATED).json(savedEatery)
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
    const eateries = await getOrSetCache('fullEateryList', async () => {
      const eateries = await Eatery.find({}).sort({ createdAt: 'desc' })
      return eateries
    })

    res.json(eateries)
  } catch (error) {
    next(error)
  }
}

//// update
export const updateEatery = async (
  req: Request & { user: any },
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
