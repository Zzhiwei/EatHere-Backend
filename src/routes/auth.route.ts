import bcrypt from 'bcrypt'
import { NextFunction, Request, Response, Router } from 'express'

import { User } from '../model/user.model'
import jwt from 'jsonwebtoken'
import { ROLE } from '../utils/enum'

export const authRouter = Router()
export const authBaseUrl = '/auth'

authRouter.route('/register').post(register)
authRouter.route('/login').post(authentiticate)

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, role, username, password } = req.body

    if (password.length < 6) {
      return res.status(400).json({
        error: 'password is too short',
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
      name,
      username,
      passwordHash,
      role,
    })

    const savedUser = await newUser.save()

    res.status(201).json(savedUser)
  } catch (error: any) {
    next(error)
  }
}

export async function authentiticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    const passwordCorrect =
      user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash as string)

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'invalid username or password',
      })
    }

    // these info will be available when we run jwt.verify()
    const userForToken = {
      username: user.username,
      id: user._id,
      role: user.role,
    }

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60 * 24, // 1 day
    })

    res.status(200).json({
      token,
      username: user.username,
      name: user.name,
      userId: user._id,
    })
  } catch (error) {
    next(error)
  }
}

export function authorize(roles: ROLE[] = []) {
  return [
    (req: Request & { user: any }, res: Response, next: NextFunction) => {
      // verify token
      const authHeader = req.headers['authorization']
      const token = authHeader && authHeader.split(' ')[1]
      if (!token) {
        return res.status(401).json({ error: 'unauthenticated' })
      }

      jwt.verify(token, process.env.SECRET, async (err: any, user: any) => {
        if (err) {
          return res.status(401).json({ error: 'unauthenticated' })
        }
        req.user = user
        next()
      })
    },
    (req: Request & { user: any }, res: Response, next: NextFunction) => {
      // role based authorization

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ error: 'unauthorized' })
      }
      next()
    },
  ]
}
