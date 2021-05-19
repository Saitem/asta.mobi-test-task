import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import User from '../models/user.model'

dotenv.config()

export const signup = async (req, res) => {
  const phoneNumberExist = await User.findOne({ phoneNumber: req.body.phoneNumber })

  if(phoneNumberExist) {
    return res.status(409).send({ success: false, msg: 'Phone number already exist' })
  }

  const salt = await bcrypt.genSalt(10)

  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  const user = new User({
    name: req.body.name,
    lastname: req.body.lastname,
    password: hashedPassword,
    phoneNumber: req.body.phoneNumber
  })

  try {
    user.save()
    res.status(200).send({ msg: 'User was created', success: true })
  } catch(err) {
    res.status(400).send({ err, success: false })
  }
}



export const signin = async (req, res) => {
  const user = await User.findOne({ phoneNumber: req.body.phoneNumber })
  if(!user) return res.status(400).send({ msg: 'Phone number not found', success: false}) 

  const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
  if(!isPasswordValid) {
    return res.status(400).send({ msg: 'Invalid password', success: false })
  }

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN)
  res.header('access_token', token).send({ token, success: true })
}