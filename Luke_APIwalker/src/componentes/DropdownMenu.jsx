import React from 'react';

const DropdownMenu = ({ resources, selectedResource, onSelectResource }) => {
    return (
        <select value={selectedResource} onChange={(e) => onSelectResource(e.target.value)}>
            {resources.map((resource, index) => (
                <option key={index} value={resource}>{resource}</option>
            ))}
        </select>
    );
}

export default DropdownMenu;
