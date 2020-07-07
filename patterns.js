const apos = `[\'’\`"]`
const digitsSuffixes = `(?:st|th|rd|nd|-?(?:о?е|[ое]го|[іиы]?м|ому|є|е|ь|ів|ей|я|ьох))`
const days = `monday|tuesday|wednesday|thursday|friday|saturday|sunday|mon|tue|tues|wed|thur|thurs|fri|sat|sun|понедельник|вторник|среда|четверг|пятница|суббота|воскресенье|понеділок|вівторок|п${apos}ятниця|субота|неділя|пн|вт|ср|чт|пт|сб|вс|нд`
const months = `(?:january|february|march|april|may|june|july|august|september|october|november|december|enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|jan\\.?|ene\\.?|feb\\.?|mar\\.?|apr\\.?|abr\\.?|may\\.?|jun\\.?|jul\\.?|aug\\.?|ago\\.?|sep\\.?|sept\\.?|oct\\.?|nov\\.?|dec\\.?|dic\\.?|январ|феврал|март|апрел|июн|июл|август|сентябр|октябр|декабр|янв\\.?|фев\\.?|мар\\.?|апр\\.?|май\\.?|июн\\.?|июл\\.?|авг\\.?|сен\\.?|окт\\.?|ноя\\.?|дек\\.?|січе?н|лют|березе?н|квіте?н|траве?н|черве?н|липе?н|серпе?н|вересе?н|жовте?н|листопад|груде?н|січ\\.?|лют\\.?|бер\\.?|кві\\.?|тра\\.?|чер\\.?|лип\\.?|сер\\.?|вер\\.?|жов\\.?|лис\\.?|гру\\.?)(?:ь|я|ого|им|ем|а)?`
const relativeDays = `(?:сьогодні|сегодня|(?:п[оі]сл[ея])?завтра|(?:поза)?вчера|today|tomorrow|yesterday|the day before yesterday|the day after tomorrow)(?![a-zа-яєїґ])`
const timeIntervals = `years?|months?|weeks?|days?|hours?|minutes?|seconds?|год|рік|м[еі]сяц|недел|тиж(?:де)?н|де?н[я]|час|годин|минут|хвилин|секунд`
const positionalTokensAfter = `ago|ahead|prior|(?:тому )?назад|вперед`
const positionalTokensBefore = `in|через|(?:наступн|попередн|следующ|предыдущ)(?:ий|ого|ем|им|е|а|ая)`
const timezones = `ACDT|ACST|ACT|ACWDT|ACWST|ADDT|ADMT|ADT|AEDT|AEST|AFT|AHDT|AHST|AKDT|AKST|AKTST|AKTT|ALMST|ALMT|AMST|AMT|ANAST|ANAT|ANT|APT|AQTST|AQTT|ARST|ART|ASHST|ASHT|AST|AWDT|AWST|AWT|AZOMT|AZOST|AZOT|AZST|AZT|BAKST|BAKT|BDST|BDT|BEAT|BEAUT|BIOT|BMT|BNT|BORT|BOST|BOT|BRST|BRT|BST|BTT|BURT|CANT|CAPT|CAST|CAT|CAWT|CCT|CDDT|CDT|CEDT|CEMT|CEST|CET|CGST|CGT|CHADT|CHAST|CHDT|CHOST|CHOT|CIST|CKHST|CKT|CLST|CLT|CMT|COST|COT|CPT|CST|CUT|CVST|CVT|CWT|CXT|ChST|DACT|DAVT|DDUT|DFT|DMT|DUSST|DUST|EASST|EAST|EAT|ECT|EDDT|EDT|EEDT|EEST|EET|EGST|EGT|EHDT|EMT|EPT|EST|ET|EWT|FET|FFMT|FJST|FJT|FKST|FKT|FMT|FNST|FNT|FORT|FRUST|FRUT|GALT|GAMT|GBGT|GEST|GET|GFT|GHST|GILT|GIT|GMT|GST|GYT|HAA|HAC|HADT|HAE|HAP|HAR|HAST|HAT|HAY|HDT|HKST|HKT|HLV|HMT|HNA|HNC|HNE|HNP|HNR|HNT|HNY|HOVST|HOVT|HST|ICT|IDDT|IDT|IHST|IMT|IOT|IRDT|IRKST|IRKT|IRST|ISST|IST|JAVT|JCST|JDT|JMT|JST|JWST|KART|KDT|KGST|KGT|KIZST|KIZT|KMT|KOST|KRAST|KRAT|KST|KUYST|KUYT|KWAT|LHDT|LHST|LINT|LKT|LMT|LMT|LMT|LMT|LRT|LST|MADMT|MADST|MADT|MAGST|MAGT|MALST|MALT|MART|MAWT|MDDT|MDST|MDT|MEST|MET|MHT|MIST|MIT|MMT|MOST|MOT|MPT|MSD|MSK|MSM|MST|MUST|MUT|MVT|MWT|MYT|NCST|NCT|NDDT|NDT|NEGT|NEST|NET|NFT|NMT|NOVST|NOVT|NPT|NRT|NST|NT|NUT|NWT|NZDT|NZMT|NZST|OMSST|OMST|ORAST|ORAT|PDDT|PDT|PEST|PET|PETST|PETT|PGT|PHOT|PHST|PHT|PKST|PKT|PLMT|PMDT|PMMT|PMST|PMT|PNT|PONT|PPMT|PPT|PST|PT|PWT|PYST|PYT|QMT|QYZST|QYZT|RET|RMT|ROTT|SAKST|SAKT|SAMT|SAST|SBT|SCT|SDMT|SDT|SET|SGT|SHEST|SHET|SJMT|SLT|SMT|SRET|SRT|SST|STAT|SVEST|SVET|SWAT|SYOT|TAHT|TASST|TAST|TBIST|TBIT|TBMT|TFT|THA|TJT|TKT|TLT|TMT|TOST|TOT|TRST|TRT|TSAT|TVT|ULAST|ULAT|URAST|URAT|UTC|UYHST|UYST|UYT|UZST|UZT|VET|VLAST|VLAT|VOLST|VOLT|VOST|VUST|VUT|WARST|WART|WAST|WAT|WDT|WEDT|WEMT|WEST|WET|WFT|WGST|WGT|WIB|WIT|WITA|WMT|WSDT|WSST|WST|WT|XJT|YAKST|YAKT|YAPT|YDDT|YDT|YEKST|YEKST|YEKT|YEKT|YERST|YERT|YPT|YST|YWT|zzz`
const naTimezones = `pacific|eastern|mountain|central`
const allTimezones = `${timezones}|${naTimezones}`
const delimiter = `(?:[.\\/\\\-]+)`
const quotePatterns = `[«‹»›„“‟”’"❝❞❮❯⹂〝〞〟＂‚‘‛❛❜❟\`]`

// Useless tokens (at least for now)
const positionalTokens = `next|last|(?:следующ|предыдущ|наступн|попередн)(?:ий|ого|ем|им|е|а|ая)`
const extraTokens = 'due|by|on|during|standard|daylight|savings|time|date|dated|of|to|through|between|until|at|day|дня|вечера|в|о|від|до|от'

// Digits patterns
const yearDigit = '(?:19|20)\\d{2}'
const monthDigit = '(?:0[1-9]|1[0-2])'
const dayDigit = '[0-2]\\d|3[0-1]'
const singleDayDigit = '[1-2\\s]?\\d|[3\\s]?[0-1]'
const singleMonthDigit = '\\s\\d|1[0-2]'
const hourDigit = '[0-2]?\\d'
const hmDigit = '[0-5]\\d'
const timePeriod = '[ap]\\.?m\\.?'
const verbalDays = `(?:(?:first|second|third|fourth|fifth|sixth|seventh|eighth|nineth|tenth|eleventh|twelveth|thirteenth|fourteenth|fifteenth|sixteenth|seventeenth|eighteenth|nineteenth|twentieth|thirtieth|пер[вш]|втор|треть?|четверт|п${apos}?ят|ш[ео]ст|седьм|восьм|дев${apos}?ят|десят|один+адц[ая]т|дв[еа]надц[ая]т|тринадц[ая]т|ч[ео]т[иы]рнадц[яо]т|п${apos}?ятнадц[ая]т|ш[іе]стнадц[яа]т|с[іе]мнадц[ая]т|в[іо]с[іе]мнадц[ая]т|дев${apos}?ятнадц[ая]т|друг|сьом)(?:${digitsSuffixes})?)`
const verbalNumbers = `one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|(?:оди?н|дв[аіе]?|три?|ч[ео]т[ыи]р|п.?ят|ш[еі]ст|с(?:[еі]|ьо)м|в[оі]с[еь]м|дев.?ят|десят|один+адц[ая]т|дв[еа]н+адцат|тринадц[ая]т|ч[ео]т[ыи]рнадц[ая]т|п.?ятнадцат|ш[еі]стнадц[ая]т|с[іе]мнадц[ая]т|в[оі]с[іе]мнадц[ая]т|дев.?ятнадц[ая]т)(?:${digitsSuffixes})?`
const teens = `(?:twenty|thirty|fourty|fifty|sixty|seventy|eighty|ninety|hundred|двадц[ая]т|тридц[ая]т|сорок|п.?ятдесят|ш[іе]сть?десят|с[еі]мь?десят|в[оі]семьдесят|дев.?яност|сто|дв[еі]ст|трист|ч[ео]т[ыи]рест|п.?ятсот|ш[іе]сть?сот|с[еі]мь?сот|в[оі]с[еі]мь?сот|дев.*ять*сот)${digitsSuffixes}?`
const verbalDay = `(?:${teens}\\s*)?${verbalDays}`
const verbalNumberDay = `(?:${teens}\\s*)*${verbalNumbers}`
const timePositionsPatterns = `(?<timepositionToken_before>${positionalTokensBefore})\\s*(?<timepositionNumber_before>${verbalNumberDay}|\\d+)?\\s*(?<timepositionInterval_before>${timeIntervals})|(?<timepositionNumber_after>${verbalNumberDay}|\\d+\\s*)?(?<timepositionInterval_after>${timeIntervals})\\s*(?<timepositionToken_after>${positionalTokensAfter})`
const relativeDaysPatterns = `(?<relative>${relativeDays})`

// Date patterns
const yyyymmPattern = `(?<year_yyyymm>${yearDigit})${delimiter}?(?<month_yyyymm>${monthDigit})`
const yyyymmddPattern = `(?<year_yyyymmdd>${yearDigit})${delimiter}?(?<month_yyyymmdd>${monthDigit})${delimiter}?(?<day_yyyymmdd>${dayDigit})`
const yyyymmddhhmmssPattern = `(?<year_yyyymmddhhmmss>${yearDigit})${delimiter}?(?<month_yyyymmddhhmmss>${monthDigit})${delimiter}?(?<day_yyyymmddhhmmss>${dayDigit})(?<hours_yyyymmddhhmmss>${hourDigit}):?(?<minutes_yyyymmddhhmmss>${hmDigit}):?(?<seconds_yyyymmddhhmmss>${hmDigit})`
const iso8601Pattern = `(?<year_iso>${yearDigit})-(?<month_iso>${monthDigit})-(?<day_iso>${dayDigit})(?:[T ](?<hours_iso>${hourDigit}):(?<minutes_iso>${hmDigit}):(?<seconds_iso>${hmDigit})(?:[.,]+(?<microseconds_iso>[0-9]+))?(?<offset_iso>(?:Z|[+-](?:2[0-3]|[01][0-9]):[0-5][0-9])))?`

const mmddyyyyPattern = `(?<month_mmddyyyy>${monthDigit})${delimiter}(?<day_mmddyyyy>${dayDigit})${delimiter}(?<year_mmddyyyy>${yearDigit})?`
const ddmmyyyyPattern = `(?<day_ddmmyyyy>${dayDigit})${delimiter}(?<month_ddmmyyyy>${monthDigit})${delimiter}(?<year_ddmmyyyy>${yearDigit})?`

const mdyyyyPattern = `(?<month_mdyyyy>${singleMonthDigit})${delimiter}(?<day_mdyyyy>${dayDigit})${delimiter}(?<year_mdyyyy>${yearDigit})?`
const dmyyyyPattern = `(?<day_dmyyyy>${singleDayDigit})${delimiter}(?<month_dmyyyy>${singleMonthDigit})${delimiter}(?<year_dmyyyy>${yearDigit})?`

const monthDYPattern = `(?<month_monthDY>${months})\\s*(?<day_monthDY>${singleDayDigit})[,\\s]+(?<year_monthDY>${yearDigit})?`

const monddyyyyPattern = `(?<month_monddyyyy>${months})(?<day_monddyyyy>${dayDigit})(?<year_monddyyyy>${yearDigit})?`
const ddmonyyyyPattern = `(?<day_ddmonyyyy>${dayDigit})(?<month_ddmonyyyy>${months})(?<year_ddmonyyyy>${yearDigit})?`
const yyyymonddPattern = `(?<year_yyyymondd>${yearDigit})(?<month_yyyymondd>${months})(?<day_yyyymondd>${dayDigit})`

const dmonyPattern = `${quotePatterns}?(?<day_dmony>${singleDayDigit}${digitsSuffixes}?|${verbalDay})${quotePatterns}?(?:\\s*of\\s*|[^\S\r\n])?(?<month_dmony>${months})[, ]+(?<year_dmony>${yearDigit})?(\\s*?року|\\s*?года|\\s*[рг]\.)?`
const ydmonPattern = `(?<year_ydmon>${yearDigit})[, ]+(?<day_ydmon>${singleDayDigit}${digitsSuffixes}?|${verbalDay})(?:\\s*of\\s*|[^\S\r\n])?(?<month_ydmon>${months})`
const mondyPattern = `(?<month_mondy>${months})\\s*(?<day_mondy>${singleDayDigit}${digitsSuffixes}?|${verbalDay})[,\\s*]+(?<year_mondy>${yearDigit})?(\\s*року|\\s*?года|\\s*[рг]\.)?`
const dmonPattern = `${quotePatterns}?(?<day_dmon>${singleDayDigit}${digitsSuffixes}?|${verbalDay})${quotePatterns}?(?:\\s*of\\s*|[^\S\r\n])?(?<month_dmon>${months})`

const monyPattern = `(?<month_mony>${months})[,\\s*]+(?<year_mony>${yearDigit})?(\\s*року|\\s*?года|\\s*[рг]\.)?`

// All date patterns
const datePatterns = '(?:' + [
  iso8601Pattern, mondyPattern, ydmonPattern, dmonyPattern, ddmmyyyyPattern, mmddyyyyPattern, 
  yyyymonddPattern, ddmonyyyyPattern, monddyyyyPattern, monthDYPattern, dmonPattern,
  monyPattern, dmyyyyPattern, mdyyyyPattern, yyyymmddhhmmssPattern, yyyymmddPattern,
  yyyymmPattern, timePositionsPatterns, relativeDaysPatterns
].join('|') + ')'

const fullPattern = `(?:(?<hours_before_day>${hourDigit}):(?<minutes_before_day>${hmDigit})(?: ?(?<timePeriod_before_day>${timePeriod}))?[ ,]+)?(?:(?<weekday>${days})[ ,]+)?(?:(?<hours_after_day>${hourDigit}):(?<minutes_after_day>${hmDigit})(?: ?(?<timePeriod_after_day>${timePeriod}))?[ ,]+)?${datePatterns}(?:(?:[, ]*|\\s*at\\s*)(?<hours_after_date>${hourDigit}):(?<minutes_after_date>${hmDigit})(?: ?(?<timePeriod_after_date>${timePeriod}))?)?`
const dateRegex = new RegExp(fullPattern, 'imsg')

module.exports = { dateRegex }
