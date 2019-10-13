import React, { useState } from 'react';

const App = ({ names }) => {
    const [persons, setPersons] = useState(names);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState(false);
    const [filteredList, setFilteredList] = useState([]);

    const Person = ({ name, number }) => (
        <p>
            {name} {number}
        </p>
    );
    const personsList = filter
        ? filteredList.map(person => <Person key={person.id} name={person.name} number={person.number} />)
        : persons.map(person => <Person key={person.id} name={person.name} number={person.number} />);

    const handleSearch = e => {
        setFilter(true);
        const filteredSearch = persons.filter(person =>
            person.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        const filtered = e.target.value === '' ? persons : filteredSearch;
        setFilteredList(filtered);
    };

    const handleName = e => {
        setNewName(e.target.value);
        // console.log(newName);
    };

    const handleNumber = e => {
        setNewNumber(e.target.value);
    };

    const handleSubmit = e => {
        setFilter(false);
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
            if (checkPersonObject.name.toLowerCase() === newName.toLowerCase() && newName !== '')
                alert(`${newName} is already added to phone book`);
            if (checkPersonObject.number === newNumber && newNumber !== '')
                alert(`${newNumber} is already added to phone book`);
            setNewName('');
            setNewNumber('');
            return;
        }
        if (newName === '' && newNumber === '') {
            alert('The name and number fields cannot be empty');
        } else if (newName === '') {
            alert('The name field cannot be empty');
        } else if (newNumber === '') {
            alert('The number field cannot be empty');
        } else {
            setPersons(persons.concat(newPersonObject));
            setNewName('');
            setNewNumber('');
        }
    };
    // console.log(persons);
    return (
        <div>
            <h2>Phone book</h2>
            <input type="text" onChange={handleSearch} />
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
