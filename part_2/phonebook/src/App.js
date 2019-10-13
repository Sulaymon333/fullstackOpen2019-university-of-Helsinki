import React, { useState } from 'react';

const App = ({ names }) => {
    const [persons, setPersons] = useState(names);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

    const Person = ({ name, number }) => (
        <p>
            {name} {number}
        </p>
    );
    const personsList = persons.map(person => <Person key={person.id} name={person.name} number={person.number} />);

    const handleName = e => {
        setNewName(e.target.value);
        // console.log(newName);
    };

    const handleNumber = e => {
        setNewNumber(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        const newPersonObject = {
            id: persons.length + 1,
            name: newName,
            number: newNumber
        };

        const checkPersonObject = persons.find(
            person => person.name.toLowerCase() === newName.toLowerCase() || person.number === newNumber
        );

        // console.log(checkPersonObject);

        if (checkPersonObject) {
            console.log(checkPersonObject.name.toLowerCase());
            if (checkPersonObject.name.toLowerCase() === newName.toLowerCase())
                alert(`${newName} is already added to phone book`);
            if (checkPersonObject.number === newNumber) alert(`${newNumber} is already added to phone book`);
            setNewName('');
            setNewNumber('');
            return;
        }
        setPersons(persons.concat(newPersonObject));

        setNewName('');
        setNewNumber('');
    };

    return (
        <div>
            <h2>Phone book</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    Name: <input value={newName} onChange={handleName} />
                </div>
                <div>
                    Number: <input value={newNumber} onChange={handleNumber} />
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
