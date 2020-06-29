const months = {
  '1': /^(?:jan|ener|янв|січ)/gi,
  '2': /^(?:feb|фев|лют)/gi,
  '3': /^(?:mar|мар|бер)/gi,
  '4': /^(?:a[pb]r|апр|кві)/gi,
  '5': /^(?:may|май|тра)/gi,
  '6': /^(?:jun|июн|чер)/gi,
  '7': /^(?:jul|июл|лип)/gi,
  '8': /^(?:aug|ago|авг|сер)/gi,
  '9': /^(?:sep|сен|вер)/gi,
  '10': /^(?:oct|окт|жов)/gi,
  '11': /^(?:nov|ноя|лис)/gi,
  '12': /^(?:d[ei]c|дек|гру)/gi
}

const teens = {
  '20': /^(?:twent|два)/gi,
  '30': /^(?:thirt|три)/gi
}

const verbalDays = {
  '1': /^(?:first|пер[вш])/gi,
  '2': /^(?:second|втор|друг)/gi,
  '3': /^(?:third|трет)/gi,
  '4': /^(?:fourth|четверт)/gi,
  '5': /^(?:fifth|п.?ят[^н])/gi,
  '6': /^(?:sixth|ш[ео]ст[^н])/gi,
  '7': /^(?:seventh|седьм|сьом)/gi,
  '8': /^(?:eighth|восьм)/gi,
  '9': /^(?:nineth|дев.?ят[^н])/gi,
  '10': /^(?:tenth|десят)/gi,
  '11': /^(?:eleventh|один+адц[ая]т)/gi,
  '12': /^(?:twelveth|дв[еа]надц[ая]т)/gi,
  '13': /^(?:thirtieth|тринадц[ая]т)/gi,
  '14': /^(?:fourteenth|ч[ео]т[иы]рнадц[яо]т)/gi,
  '15': /^(?:fifteenth|п.?ятн)/gi,
  '16': /^(?:sixteenth|ш[іе]стн)/gi,
  '17': /^(?:seventeenth|с[іе]мн)/gi,
  '18': /^(?:eighteenth|в[іо]с[іе]мн)/gi,
  '19': /^(?:nineteenth|дев.?ятн)/gi,
  '20': /^(?:twentieth|двадц)/gi,
  '30': /^(?:thirtieth|тридц)/gi
}

const stripChars = str => {
  return str.replace(/^[\s\n\r]+/, '')
}

const getDay = str => {
  for (let day of Object.keys(verbalDays)) {
    if (str.match(verbalDays[day])) return parseInt(day)
  }
}

const getTen = str => {
  for (let ten of Object.keys(teens)) {
    if (str.match(teens[ten])) return parseInt(ten)
  }
}

const normalizeDay = str => {
  str = stripChars(str)
  let numericDay = str.match(/^\d+/)
  if (numericDay) return numericDay[0].padStart(2, '0')
  let textParts = str.split(/\s+/g)
  if (textParts.length === 1) return getDay(textParts[0])
  let date = getTen(textParts[0]) + getDay(textParts[1])
  return date
}

const normalizeMonth = str => {
  str = stripChars(str)
  if (str.match(/[^\d]/)) {
    for (let month of Object.keys(months)) {
      if (str.match(months[month])) return parseInt(month)
    }
  }
  return parseInt(str)
}

const normalizeDate = date => {
  let year = date.year ? date.year : (new Date()).getFullYear() + ''
  let month = date.month ? normalizeMonth(date.month) : 0
  let day = date.day ? normalizeDay(date.day) : 0
  let hours = day.hours ? day.hours : 0
  let minutes = day.minutes ? day.minutes : 0
  let seconds = day.seconds ? day.seconds : 0
  let finalDate = new Date(year, month - 1, day, hours, minutes, seconds)
  let userTimezoneOffset = finalDate.getTimezoneOffset() * 60000
  return new Date(finalDate.getTime() - userTimezoneOffset)
}

const extractDate = source => {
  if (!source.groups) return new Date()
  let date = {}
  for (let key of Object.keys(source.groups)) {
    if (source.groups[key]) date[key.split(/_/g)[0]] = source.groups[key]
  }
  return normalizeDate(date)
}

module.exports = { normalizeDate, extractDate }
