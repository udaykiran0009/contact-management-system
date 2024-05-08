import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editContact } from '../contactsSlice';
import { RootState } from '../store';

function EditContact() {
    const { id } = useParams<{ id: string }>(); // Retrieve the contact ID from the URL
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const contacts = useSelector((state: RootState) => state.contacts.contacts);

    const existingContact = contacts.find(contact => contact.id === id);

    // Initialize state variables with existing contact details
    const [name, setName] = useState(existingContact ? existingContact.name : '');
    const [phone, setPhone] = useState(existingContact ? existingContact.phone : '');
    const [email, setEmail] = useState(existingContact ? existingContact.email : '');
    const [address, setAddress] = useState(existingContact ? existingContact.address : '');

    useEffect(() => {
        // Update state variables if the contact is found
        if (existingContact) {
            setName(existingContact.name);
            setPhone(existingContact.phone);
            setEmail(existingContact.email);
            setAddress(existingContact.address);
        }
    }, [existingContact]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!id) {
            console.error("ID is missing");
            // Optionally, you might want to navigate or display an error message here
            return;
        }
        
        const updatedContact = {
            id: id,
            name,
            phone,
            email,
            address,
        };

        // Dispatch the editContact action to update the contact in the store
        dispatch(editContact(updatedContact));

        // Navigate back to the contacts list page
        navigate('/contacts');
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Contact</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block mb-2">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone" className="block mb-2">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address" className="block mb-2">Address:</label>
                    <textarea
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                    Update Contact
                </button>
            </form>
        </div>
    );
}

export default EditContact;
