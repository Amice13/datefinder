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

const verbalDays = [
  [100, /^(?:hundred|сто)/gi],
  [200, /^(?:two hundred|дв[іе]ст)/gi],
  [300, /^(?:three hundred|трист)/gi],
  [400, /^(?:four hundred|ч[ое]т[иы]р[ие]ст)/gi],
  [500, /^(?:five hundred|п.?ятсот)/gi],
  [600, /^(?:six hundred|ш[іе]стсот)/gi],
  [700, /^(?:seven hundred|с[іе]мсот)/gi],
  [800, /^(?:eight hundred|в[о]с[іе]мсот)/gi],
  [900, /^(?:nine hundred|дев.?ятсот)/gi],
  [1000, /^(?:thousand|т[ыи]сяч)/gi],
  [20, /^(?:twent|двадц)/gi],
  [30, /^(?:thirt[iy]|тридц)/gi],
  [40, /^(?:fourty|сорок)/gi],
  [50, /^(?:fifty|п.?ять?десят)/gi],
  [60, /^(?:sixty|ш[іе]сть?десят)/gi],
  [70, /^(?:seventy|с[іе]мь?десят)/gi],
  [80, /^(?:eighty|в[оі]с[еі]мьдесят)/gi],
  [90, /^(?:ninety|дев.?яност)/gi],
  [10, /^(?:ten|десят)/gi],
  [11, /^(?:eleven|один+адц[ая]т)/gi],
  [12, /^(?:twelve|дв[еа]надц[ая]т)/gi],
  [13, /^(?:thirteen|тринадц[ая]т)/gi],
  [14, /^(?:fourteen|ч[ео]т[иы]рнадц[яо]т)/gi],
  [15, /^(?:fifteen|п.?ятн)/gi],
  [16, /^(?:sixteen|ш[іе]стн)/gi],
  [17, /^(?:seventeen|с[іе]мн)/gi],
  [18, /^(?:eighteen|в[іо]с[іе]мн)/gi],
  [19, /^(?:nineteen|дев.?ятн)/gi],
  [1, /^(?:first|one|пер[вш]|оди?н)/gi],
  [2, /^(?:second|two|втор|друг|дв[аеі])/gi],
  [3, /^(?:third|three|трет|три)/gi],
  [4, /^(?:four|четверт|ч[ое]тир)/gi],
  [5, /^(?:fi[fv]|п.?ят[^н])/gi],
  [6, /^(?:six|ш[ео]ст[^н])/gi],
  [7, /^(?:seven|седьм|сьом|с[іе]м)/gi],
  [8, /^(?:eight|восьм|в[оі]с[іе]м)/gi],
  [9, /^(?:nine|дев.?ят[^н])/gi]
]

const relativeDays = [
  [/с(?:ьо|е)годн|today/i, (currentDate) => (new Date(currentDate)) ],
  [/позавч[ео]ра|the day before yesterday/, (currentDate) => { return currentDate.setDate(currentDate.getDate() - 2) }],
  [/п[оі]сл[ея]завтр|the day after tomorrow/i, (currentDate) => { return currentDate.setDate(currentDate.getDate() + 2) }],
  [/завтра|tomorrow/i, (currentDate) => { return currentDate.setDate(currentDate.getDate() + 1) }],
  [/вч[ео]ра|yesterday/, (currentDate) => { return currentDate.setDate(currentDate.getDate() - 1) }]
]

const tokenDirections = [
  [/ago|prior|назад|попередн|предыдущ/i, -1],
  [/in|ahead|через|вперед|следующ/i, 1]
]

const timeIntervals = [
  [/year|р[іо]к|год/i, (value, currentDate) => { return currentDate.setFullYear(currentDate.getFullYear() + value) }],
  [/month|м[іе]сяц/i, (value, currentDate) => { return currentDate.setMonth(currentDate.getMonth() + value) }],
  [/week|тиждень|тижн|недел/i, (value, currentDate) => { return currentDate.setDate(currentDate.getDate() + 7 * value) }],
  [/day|де?н/i, (value, currentDate) => { return currentDate.setDate(currentDate.getDate() + value) }],
  [/hour|годин|час/i, (value, currentDate) => { return currentDate.setHours(currentDate.getHours() + value) }],
  [/minute|хвилин|минут/i, (value, currentDate) => { return currentDate.setMinutes(currentDate.getMinutes() + value) }],
  [/second|секунд/i, (value, currentDate) => { return currentDate.setSeconds(currentDate.getSeconds() + value) }],
]

const stripChars = str => {
  return str.replace(/^[\s\n\r]+/, '')
}

const getDay = str => {
  for (let [number, pattern] of verbalDays) {
    if (str.match(pattern)) return number
  }
}

const verbalNumberToInt = str => {
  let numbers = str.split(/\s/g)
  numbers = numbers.map(el => {
    for (let [number, pattern] of verbalDays) if (el.match(pattern)) return number
  })
  let finalNumbers = []
  for (const index of numbers.keys()) {
    if (index + 1 === numbers.length) {
      finalNumbers.push(numbers[index])
      continue
    }
    if (numbers[index] < numbers[index + 1]) {
      finalNumbers.push(numbers[index] * numbers.splice(index + 1, 1))
      continue
    }
    finalNumbers.push(numbers[index])
  }
  return finalNumbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
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

const getRelative = (str, date = new Date()) => {
  for (let [pattern, f] of relativeDays) {
    if (str.match(pattern)) return f(date)
  }
  return date
}

const getDifferentTime = (interval, value, date = new Date()) => {
  for (let [pattern, f] of timeIntervals) {
    if (interval.match(pattern)) return new Date(f(value, date))
  }
}


const normalizeDate = (date, relative) => {
  if (date.relative) {
    return new Date(getRelative(date.relative, relative))
  }
  if (date.timepositionToken) {
    date.timepositionNumber = date.timepositionNumber ? date.timepositionNumber : '1'
    if (date.timepositionNumber.match(/[a-zа-яєії]/)) {
      date.timepositionNumber = verbalNumberToInt(date.timepositionNumber)
    }
    date.timepositionNumber = parseInt(date.timepositionNumber)
    let direction 
    for (let [pattern, sign] of tokenDirections) {
      if (date.timepositionToken.match(pattern)) direction = sign
    }
    if (!direction) return 'Invalid date'
    return new Date(getDifferentTime(date.timepositionInterval, date.timepositionNumber * direction, relative))
  }
  let year = date.year ? date.year : (new Date()).getFullYear() + ''
  let month = date.month ? normalizeMonth(date.month) : 0
  let day = date.day ? normalizeDay(date.day) : 0
  let hours = date.hours ? date.hours : 0
  let minutes = date.minutes ? date.minutes : 0
  let seconds = date.seconds ? date.seconds : 0
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
