import express from 'express'

import { getDataByCoutry, updateCovidStat } from '../controllers/covidStat.controller'
import authToken from '../middlewares/authToken.middleware'

const router = express.Router()

router.get('/get-data-by-country/:country', authToken, getDataByCoutry)
router.get('/update-covid-stat', updateCovidStat)

export default router