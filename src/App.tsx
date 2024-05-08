import React from 'react';
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import ContactDetails from './components/ContactDetails';
import Dashboard from './components/Dashboard';
import EditContact from './components/EditContact';

function App() {
    return (
        <Router>
            <nav className="p-4 bg-gray-800 text-white flex space-x-4">
                <Link to="/">Dashboard</Link>
                <Link to="/contacts">Contacts</Link>
                <Link to="/add-contact">Add Contact</Link>
                
            </nav>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/contacts" element={<ContactList />} />
                <Route path="/contacts/:id" element={<ContactDetails />} />
                <Route path="/add-contact" element={<ContactForm />} />
                <Route path="/edit-contact/:id" element={<EditContact />} />
            </Routes>
        </Router>
    );
}

export default App;
