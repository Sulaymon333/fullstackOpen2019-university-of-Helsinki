import React from 'react';
import Person from './Person';

const PersonsList = ({ filter, persons, filteredList }) => {
    const personsList = filter
        ? filteredList.map(person => <Person key={person.id} name={person.name} number={person.number} />)
        : persons.map(person => <Person key={person.id} name={person.name} number={person.number} />);

    return <div>{personsList}</div>;
};

export default PersonsList;
