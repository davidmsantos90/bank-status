import path from "path"
import ExcelJS from "exceljs"

const START_LINE = 7
const lineNumber = (number) => number - START_LINE

// ------

const RESOURCES_PATH = path.join(`${ __dirname }`, `../resources/`)

const utils = () => {
  let _data = {}

  _data[Symbol.iterator] = function*() {
    for(let key of Object.keys(this)) {
      yield([key, this[key]])
    }
  }

  return {
    _data,
    get entries() {
      return this._data
    },

    each(callback) {
      for (let [key, rows] of this._data) {
        callback(key, rows)
      }
    },

    sort(entryID) {
      this._data[entryID].sort(({ date: dateA }, { date: dateB }) => {
        const [dayA, mounthA, yearA] = dateA.split('-')
        const timeA = new Date(yearA, mounthA, dayA).getTime()

        const [dayB, mounthB, yearB] = dateB.split('-')
        const timeB = new Date(yearB, mounthB, dayB).getTime()

        return timeA < timeB ? -1 : 1 // else 0 -does not apply
      })
    },

    add(entryID, values) {
      let [
        /*empty*/, date, /*valueDate*/, description, value, total
      ] = values;

      if (this._data[entryID] == null) {
        this._data[entryID] = []
      }

      // console.log(`Row - ${ description }\nDate: ${ date } - ${ value }\n`)

      this._data[entryID].push({ date, description, value, total })
    }
  }
}

const dataCollectionUtils = utils()

const parseXlsxFile = ({ filename }) => {
  const filePath = `${ RESOURCES_PATH + filename }.xlsx`

  const workbook = new ExcelJS.Workbook()
  return workbook.xlsx.readFile(filePath)
    .then(() => {
      const worksheet = workbook.getWorksheet(1)
      worksheet.eachRow((row, number) => {
        if (number > START_LINE) {
          dataCollectionUtils.add(filename, row.values)
        }
      })
    })
    .catch(error => console.error(error))
}

// ---


// 05 to 10 2018
const _mounths = ['05', '06', '07', '08', '09', '10']
export default () => Promise.all(_mounths.map((m) => {
  const filename = `${ m }-2018`
  return parseXlsxFile({ filename }).then(() => dataCollectionUtils.sort(filename))
})).then(() => dataCollectionUtils)
