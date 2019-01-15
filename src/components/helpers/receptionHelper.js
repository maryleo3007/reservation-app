export function changeState(state) {
    const classNames = {
        available:'cash-item box-available',
        toBeConfirm:'cash-item box-toBeCofirm',
        busy:'cash-item box-busy',
        unAvailable:'cash-item box-unAvailable'
    }
    let showClass = '';

    if (state === 1) {
        showClass = classNames.available;
    } else if (state === 2) {
        showClass = classNames.toBeConfirm;
    } else if (state === 3){
        showClass = classNames.busy;
    }else if (state === 4){
        showClass = classNames.unAvailable;
    }
    return showClass
}