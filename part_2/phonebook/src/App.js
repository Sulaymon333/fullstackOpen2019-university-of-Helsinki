import React, { useState } from 'react';

const App = ({ names }) => {
    const [persons, setPersons] = useState(names);
    const [newName, setNewName] = useState('');

    const Person = ({ name }) => <p>{name}</p>;
    const personsList = persons.map(person => <Person key={person.id} name={person.name} />);

    const handleNameChange = e => {
        setNewName(e.target.value);
        // console.log(newName);
    };

    const handleSubmit = e => {
        e.preventDefault();
        const newPersonObject = {
            id: persons.length + 1,
            name: newName
        };

        const checkPersonName = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
        console.log(checkPersonName);

        if (checkPersonName) {
            alert(`${newName} is already added to phone book`);
            setNewName('');
            return;
        }
        setPersons(persons.concat(newPersonObject));

        setNewName('');
    };

    return (
        <div>
            <h2>Phone book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>{personsList}</div>
            {/* <div>debug: {newName}</div> */}
        </div>
    );
};

export default App;
