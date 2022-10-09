import bcrypt from 'bcrypt'
import { NextFunction, Request, Response, Router } from 'express'
import jwt from 'jsonwebtoken'

import { User } from '../model/user.model'

export const authRouter = Router()
export const authBaseUrl = '/auth'

authRouter.route('/register').post(register)

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
    // console.log({
    //   name,
    //   username,
    //   passwordHash,
    //   role,
    // })
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

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        error: 'invalid username or password',
      })
    }

    const userForToken = {
      username: user.username,
      id: user._id,
    }

    const token = jwt.sign(userForToken, String(process.env.SECRET))

    res.status(200).json({ token, username: user.username, name: user.name })
  } catch (error) {
    next(error)
  }
}
