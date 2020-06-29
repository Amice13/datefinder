const { dateRegex } = require('./patterns')
const { extractDate } = require('./normalize')

const findDates = text => {
  const dates = []
  while ((dateArray = dateRegex.exec(text)) !== null) {
    dates.push({
      startIndex: dateArray.index,
      endIndex: dateArray[0].length + dateArray.index,
      string: dateArray[0],
      date: extractDate(dateArray)
    })
  }
  return dates
}

module.exports = findDates
