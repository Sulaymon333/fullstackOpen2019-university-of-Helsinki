import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddPersonForm from './components/AddPersonForm';
import PersonsList from './components/PersonsList';
import FilterForm from './components/FilterForm';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState(false);
    const [filteredList, setFilteredList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3006/persons').then(response => {
            console.log(response.data);
            setPersons(response.data);
        });
    }, []);

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
            <FilterForm handleSearch={handleSearch} />
            <AddPersonForm
                newName={newName}
                newNumber={newNumber}
                handleName={handleName}
                handleNumber={handleNumber}
                handleSubmit={handleSubmit}
            />
            <h2>Numbers</h2>
            <PersonsList filter={filter} persons={persons} filteredList={filteredList} />
        </div>
    );
};

export default App;
