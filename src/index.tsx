import './chart.js'; // Import the chart.js file

// Rest of your imports and application code
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClientProvider } from 'react-query';
import queryClient from './queryClient';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
