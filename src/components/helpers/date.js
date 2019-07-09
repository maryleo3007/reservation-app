export function getDateFull() {
    
    let today = '';
    let dd = '';
    let mm = '';
    let yyyy = '';

    today = new Date();
    dd = today.getDate();
    mm = today.getMonth() + 1;
    yyyy = today.getFullYear();
    
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = dd + "/" + mm + "/" + yyyy;

    return today;
}
export function getDateFormat(p_date) {
    
  let today = p_date;
  let dd = '';
  let mm = '';
  let yyyy = '';

  dd = today.getDate();
  mm = today.getMonth() + 1;
  yyyy = today.getFullYear();
  
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = dd + "/" + mm + "/" + yyyy;

  return today;
}


export function getHour() {
    let today = '';
    let hours = '';
    let minutes = '';
    let seconds = '';
    let ampm = '';
    let strTime = '';

    today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();
    seconds = today.getSeconds();
    ampm = hours >= 12 ? 'p.m' : 'a.m';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds;
    strTime = hours + ':' + minutes + ':'+seconds +' ' + ampm;
    return strTime;
}
export function setDateLocaleStart(p_starDate) {
  let c_date = p_starDate;
  let arr = c_date.split("/")
  return new Date(arr[2], arr[1] - 1, arr[0], 23, 59, 59, 59);
}
export function setDateLocaleEnd(p_endDate) {
  let c_date = p_endDate;
  let arr = c_date.split("/")
  return new Date(arr[2], arr[1] - 1, arr[0]);
}
export function getHourWithOutSecond() {
  let today = '';
  let hours = '';
  let minutes = '';
  let ampm = '';
  let strTime = '';

  today = new Date();
  hours = today.getHours();
  minutes = today.getMinutes();
  ampm = hours >= 12 ? 'p.m' : 'a.m';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  strTime = hours + ':' + minutes + ' ' + ampm + '.';
  return strTime;
}