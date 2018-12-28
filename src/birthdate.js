var birthdate = {
  getAge: function (birthday, today) {
    var bday = birthdate.getBirthdayObject(birthday);
    return birthdate.compareAndReturnRightAge(today, bday);
  },
  compareAndReturnRightAge: function (today, bday) {
    if (today.month < bday.month ||
      (
        today.month == bday.month &&
        today.day < bday.day
      )) { return (today.year - bday.year) - 1; }
    return today.year - bday.year;
  },
  getBirthdayObject: function (birthday) {
    var delimeter = (birthday.indexOf('/') !== -1) ? '/' : '-';
    var bdayArray = birthday.split(delimeter);
    if (delimeter === '-') {
      return {
        day: parseInt(bdayArray[2]),
        month: parseInt(bdayArray[1]),
        year: parseInt(bdayArray[0])
      }
    }
    return {
      day: parseInt(bdayArray[1]),
      month: parseInt(bdayArray[0]),
      year: parseInt(bdayArray[2])
    }
  },
}
// module.exports = birthdate
// comment below, uncomment above when about to run unit tests and vice versa
export default birthdate