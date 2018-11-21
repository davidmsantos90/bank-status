import express from "express"

import dataInit from "./data/init"
import selectors from "./data/selectors"

const SERVER_PORT = 1337
const app = express()

dataInit()
  .then((data) => {
    const createDotString = (value) => {
      return Array(Math.floor((value * 2) / 100)).fill('.').join('')
    }

    const getPrintValue = (value) => {
      if (value < 10 ) return '000' + value
      if (value < 100) return '00' + value
      if (value < 1000) return '0' + value

      return value
    }

    const logEntry = (key, value) => {
      const printValue = getPrintValue(value)
      const dotString = createDotString(value)

      return console.log(`  ${ key }: ${ printValue } | ${ dotString }`)
    }

    // ---

    /*
      date
      description

      value: min, max, avg, sum
      total
    */

    console.log(`### Minimum Balance ###`)
    selectors.minimumBalance(data).forEach(({ key, value }) => logEntry(key, value))

    console.log(`\n### Maximum Balance ###`)
    selectors.maximumBalance(data).forEach(({ key, value }) => logEntry(key, value))

    console.log(`\n### Average Balance ###`)
    selectors.averageBalance(data).forEach(({ key, value }) => logEntry(key, value))

    console.log(`\n### Total Income ###`)
    selectors.income(data).forEach(({ key, value }) => logEntry(key, value))

    console.log(`\n### Total Expense ###`)
    selectors.expenses(data).forEach(({ key, value }) => logEntry(key, value))

    return data
  })
  // .then((data) => {
  //   const keys = Object.keys(data)
  //
  //   console.log(keys)
  //
  //   for(let [key, rows] of data) {
  //     const first = 0
  //     const last = rows.length - 1
  //
  //     const mounthInitialValue = rows[first].total - rows[first].value
  //     const { total: mouthFinalValue } = rows[last]
  //
  //     const agg_mov = rows
  //       .map(({ value }) => value)
  //       .reduce((acc, current) => acc + current, mounthInitialValue)
  //
  //     const rowL =  Math.floor(mouthFinalValue)
  //
  //     console.log(`[${ key }] - Agg: ${ Math.floor(agg_mov) }; L:${ rowL }`)
  //   }
  // })

/*
 * ### Start The Server ###
 */
app.listen(SERVER_PORT, () => {
	console.log(`Bank Server started, listenning on ${ 'http://localhost:' + SERVER_PORT }`)
})
