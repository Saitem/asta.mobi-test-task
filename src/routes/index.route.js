import express from 'express'

import covidStatRoute from './covidStat.route'
import authRoute from './auth.route'
import notificationRoute from './notification.route'

import authToken from '../middlewares/authToken.middleware'

const router = express.Router()

router.use('/covid-stat', covidStatRoute)
router.use('/auth', authRoute)
router.use('/notification',  authToken, notificationRoute)

export default router