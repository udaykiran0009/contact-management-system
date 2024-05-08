import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function ContactDetails() {
    const { id } = useParams<{ id: string }>();
    const contacts = useSelector((state: RootState) => state.contacts.contacts);
    const contact = contacts.find((contact) => contact.id === id);

    if (!contact) {
        return <div className="p-4">Contact not found.</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Contact Details</h1>
            <div className="border p-4 rounded mb-4">
                <h3 className="font-semibold mb-2">{contact.name}</h3>
                <p>Phone: {contact.phone}</p>
                <p>Email: {contact.email}</p>
                {contact.address && <p>Address: {contact.address}</p>}
            </div>
        </div>
    );
}

export default ContactDetails;
