import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteContact } from '../contactsSlice';
import { RootState } from '../store';

function ContactList() {
    const contacts = useSelector((state: RootState) => state.contacts.contacts);
    const dispatch = useDispatch();

    const handleDelete = (id: string) => {
        dispatch(deleteContact(id));
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Contact List</h1>
            <Link to="/add-contact" className="mb-4 p-2 bg-blue-500 text-white rounded">
                Add Contact
            </Link>
            <ul>
                {contacts.map((contact) => (
                    <li key={contact.id} className="mb-4 border p-2 rounded">
                        <h3 className="font-semibold">{contact.name}</h3>
                        <p>Phone: {contact.phone}</p>
                        <p>Email: {contact.email}</p>
                        <div className="flex space-x-2 mt-2">
                            {/* Use Link components for navigation */}
                            <Link
                                to={`/contacts/${contact.id}`}
                                className="p-2 bg-green-500 text-white rounded"
                            >
                                View
                            </Link>
                            <Link
                                to={`/edit-contact?id=${contact.id}`}
                                className="p-2 bg-yellow-500 text-white rounded"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(contact.id)}
                                className="p-2 bg-red-500 text-white rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ContactList;
