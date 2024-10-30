function calcAge(yearOfBirth) {
  const year = new Date().getFullYear()
  return year - yearOfBirth
}
const now = new Date()
const student = {
  "name": "Mario",
  "lastName": "Rossi"
}
// Named export
module.exports = {
  calcAge,
  now,
  student
}