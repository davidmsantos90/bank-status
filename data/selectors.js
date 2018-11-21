const {
  sign: Sign, min: Min, max: Max, abs: Abs, floor: Floor
} = Math

const filters = {
  get identity() {
      return () => true
  },

  get positive() {
    return (value) => Math.sign(value) > 0
  },

  get negative() {
    return (value) => Math.sign(value) < 0
  }
}

const reducers = {
  get min() {
    return (acc, value) => Math.min(acc, value)
  },

  get max() {
    return (acc, value) => Math.max(acc, value)
  },

  get sum() {
    return (acc, value) => acc + value
  },

  get avg() {
    return (acc, value, index, array) => {
      let newValue = acc + value

      const arrayLength = array.length
      if (index === arrayLength - 1) {
        newValue = newValue / arrayLength
      }

      return newValue
    }
  }
}

const _select = (rows, property) => rows.map(({ [property]: value }) => value)

export default (() => {
  return {
    minimumBalance: (data) => {
      let entries = []

      data.each((key, rows) => {
        const minimum = _select(rows, 'total').reduce(reducers.min)

        entries.push({ key, value: Math.floor(minimum) })
      })

      return entries
    },

    maximumBalance: (data) => {
      let entries = []

      data.each((key, rows) => {
        const maximum = _select(rows, 'total').reduce(reducers.max)

        entries.push({ key, value: Math.floor(maximum) })
      })

      return entries
    },

    averageBalance: (data) => {
      let entries = []

      data.each((key, rows) => {
        const average = _select(rows, 'total').reduce(reducers.avg)

        entries.push({ key, value: Math.floor(average) })
      })

      return entries
    },

    income: (data) => {
      let entries = []

      data.each((key, rows) => {
        const income = _select(rows, 'value').filter(filters.positive).reduce(reducers.sum)

        entries.push({ key, value: Math.floor(income) })
      })

      return entries
    },

    expenses: (data) => {
      let entries = []

      data.each((key, rows) => {
        const expense = _select(rows, 'value').filter(filters.negative).reduce(reducers.sum)

        entries.push({ key, value: Math.abs(Math.floor(expense)) })
      })

      return entries
    }
  }
})()
