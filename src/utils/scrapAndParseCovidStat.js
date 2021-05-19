import request from 'request-promise'
import cheerio from 'cheerio'

const getCovidStat = async () => {
  const body = await request.get('https://www.worldometers.info/coronavirus/#countries')
  const $ = cheerio.load(body)

  const covidData = []

  $('table#main_table_countries_today > tbody > tr').each((index, el) => {
    if(index === 0) 
      return true

    const tds = $(el).find('td')
    
    if($(tds[0]).text()) {
      
      const indexInTable = $(tds[0]).text()
      const country = $(tds[1]).text()
      const totalCases = $(tds[2]).text()
      const newCases = $(tds[3]).text()
      const totalDeaths = $(tds[4]).text()
      const totalRecovered = $(tds[5]).text()
      const activeCases = $(tds[6]).text()
      const seriousCritical = $(tds[7]).text()
      const totalCases1MPop = $(tds[8]).text()
      const deaths1MPop = $(tds[9]).text()
      const totalTests = $(tds[10]).text()
      const tests1MPop = $(tds[11]).text()
      const population = $(tds[12]).text()

      const tableRow = {
        indexInTable,
        country, 
        totalCases, 
        newCases,
        totalDeaths,
        totalRecovered,
        activeCases,
        seriousCritical,
        totalCases1MPop,
        deaths1MPop,
        totalTests,
        tests1MPop,
        population
      }
      covidData.push(tableRow)
    }
  })

  return covidData
}

export default getCovidStat