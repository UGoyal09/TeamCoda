require('dotenv').config()


const SHEET_ID = process.env.SHEET_ID

const SHEET_RANGE = process.env.NODE_ENV === 'test'
  ? process.env.TEST_SHEET_RANGE
  : process.env.SHEET_RANGE

module.exports = {
  SHEET_RANGE,
  SHEET_ID
}