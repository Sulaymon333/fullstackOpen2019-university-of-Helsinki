import React from 'react';

const AddPersonForm = ({ newName, newNumber, handleName, handleNumber, handleSubmit }) => {
    return (
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
    );
};

export default AddPersonForm;
