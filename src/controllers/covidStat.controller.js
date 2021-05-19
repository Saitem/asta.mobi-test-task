import dotenv from 'dotenv'

import CovidStat from '../models/covidStat.model'
import User from '../models/user.model'
import getCovidStat from '../utils/scrapAndParseCovidStat'

dotenv.config()

export const updateCovidStat = async (req, res) => {
  try {
    const covidTable = await getCovidStat()

    await CovidStat.deleteMany({})
    await CovidStat.insertMany([...covidTable])
    res.status(200).send({ success: true, msg: 'Covid stat was updated' })
  } catch (err) {
    res.status(500).send({ success: false, err })
  }
}

export const getDataByCoutry = async (req, res) => {
  const data = await CovidStat.findOne({ country: req.params.country })
  if (!data) {
    return res.status(500).send({ success: false, msg: "Country does not exist" })
  }

  try {
    const user = await User.findOne({ _id: req.userId })

    if (checkCountryAvailability(user.countries, req.params.country)) {
      user.countries = [...user.countries, req.params.country]
      user.save()
    }
    res.status(200).send({ success: true, data, userCoutries: user.countries })

  } catch (err) {
    res.status(500).send({ success: false, err })
  }
}

const checkCountryAvailability = (countries, country) => {
  const check = countries.find(el => el === country)
  return !check
}