

export const  getCurrenHour = () => {
    const timeNow = new Date();
    const hours = timeNow.getHours();
    const minutes = timeNow.getMinutes();
    const seconds = timeNow.getSeconds();
    let timeString = '' + (hours > 12 ? hours - 12 : hours);
    timeString += (minutes < 10 ? ':0' : ':') + minutes;
    timeString += (seconds < 10 ? ':0' : ':') + seconds;
    timeString += hours >= 12 ? ' p. m.' : ' a. m.';
    return timeString
}

export const getCurrentDate = () => {
    const today = new Date();
    let dd= today.getDate();
    let mm= today.getMonth() + 1; //January is 0!
    const yyyy = today.getFullYear();
    if (dd < 10) {
    dd = '0' + dd;
    }
    if (mm < 10) {
    mm = '0' + mm;
    }
    return dd + '/' + mm + '/' + yyyy;
}