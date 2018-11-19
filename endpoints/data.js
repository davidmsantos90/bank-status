import path from "path"
import express from "express"

import ExcelJS from "exceljs"

// ------

const RESOURCES_PATH = path.join(`${ __dirname }`, `../resources/`)

const router = express.Router()

router.get("/:mouth", (req, res) => {

});

const parseCsvFile = ({ filename }) => {
  const filePath = `${ RESOURCES_PATH + filename }`;

  const workbook = new ExcelJS.Workbook()
  workbook.csv.readFile(filePath)
    .then((worksheet) => {
      worksheet.eachRow((row, number) => {
        console.log(row.values)
        // let [
        //   /*empty*/,
        //   operationDate,
        //   /*valueDate*/,
        //   description,
        //   value,
        //   total
        // ] = row.values.split(";");
        //
        // console.log(`Row[${ number }] - ${ description }\nDate: ${ operationDate }\nValue: ${ value }\n`)

      })
    })
    .catch(error => console.error(error))
}

const parseXlsxFile = ({ filename }) => {
  const filePath = `${ RESOURCES_PATH + filename }`;

  const workbook = new ExcelJS.Workbook()
  workbook.xlsx.readFile(filePath)
    .then(() => {
      const worksheet = workbook.getWorksheet(1)
      worksheet.eachRow((row, number) => {
        if (number > 7) {
          let [
            /*empty*/,
            operationDate,
            /*valueDate*/,
            description,
            value,
            total
          ] = row.values;

          console.log(`Row[${ number }] - ${ description }\nDate: ${ operationDate }\nValue: ${ value }\n`)
        }
      })
    })
    .catch(error => console.error(error))
}

parseXlsxFile({filename: "setembro.xlsx"})

// parseCsvFile({filename: "setembro.csv"})


export default router
