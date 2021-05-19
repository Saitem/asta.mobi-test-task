import mongoose from 'mongoose'

const Schema = mongoose.Schema

const schema = new Schema({
  indexInTable: {
    type: String,
  },
  country: {
    type: String,
  }, 
  totalCases: {
    type: String,
  },  
  newCases: {
    type: String,
  }, 
  totalDeaths: {
    type: String,
  }, 
  totalRecovered: {
    type: String,
  }, 
  activeCases: {
    type: String,
  }, 
  seriousCritical: {
    type: String,
  }, 
  totalCases1MPop: {
    type: String,
  }, 
  deaths1MPop: {
    type: String,
  }, 
  totalTests: {
    type: String,
  }, 
  tests1MPop: {
    type: String,
  }, 
  population: {
    type: String,
  }, 
}, { collection: 'covidStat' })

const CovidStat = mongoose.model('CovidStat', schema)

export default CovidStat