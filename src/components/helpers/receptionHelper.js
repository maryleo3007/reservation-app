export function changeState(state) {
    const classNames = {
        available:'cash-item box-available',
        toBeConfirm:'cash-item box-toBeCofirm',
        busy:'cash-item box-busy',
        unAvailable:'cash-item box-unAvailable'
    }
    let showClass = '';

    if (state === 'Disponible') {
        showClass = classNames.available;
    } else if (state === 'Por confirmar') {
        showClass = classNames.toBeConfirm;
    } else if (state === 'Ocupado'){
        showClass = classNames.busy;
    }else if (state === 'No disponible'){
        showClass = classNames.unAvailable;
    }
    return showClass
}
