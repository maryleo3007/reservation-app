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
    return showClass;
}

export function changeNameBranchOffice(branchOffice) {
    
    let showName = '';

    if (branchOffice === '1') {
        showName = 'Oficina principal Inteligo';
    } else if (branchOffice === '2') {
        showName = 'Oficina Patio Panorama Surco';
    } 

    return showName;
}

export const getCutName = (mail) => {
    let cutName = mail.indexOf("@");
    let name = mail.substring(0, cutName);
    return name;
}

export const cashName = (name) => {
    let cashName = (name).slice(4,7);
    let cashNumber = (name).slice(0,3);

    return `${cashName.charAt(0).toUpperCase() + cashName.slice(1)} ${cashNumber}`;
}
