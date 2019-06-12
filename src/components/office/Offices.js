import React from 'react';

const Offices = ({office})  => {
    const {id, name} = office
    return (
        <option value={id}>{name}</option>
    );
}

export default Offices;