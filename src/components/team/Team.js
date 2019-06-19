import React from 'react';

const Team = ({team})  => {
    const {label, value} = team
    return (
        <option value={value}>{label}</option>
    );
}

export default Team;