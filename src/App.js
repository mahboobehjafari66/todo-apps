// src/App.js
import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import TodoApp from './TodoApp';

const App = () => {
    return (
        <ThemeProvider>
            <TodoApp />
        </ThemeProvider>
    );
};

export default App;


