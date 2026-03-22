import React from 'react';
import Todo from './components/Todo';
import './App.css'

const App = () => {
  return (
    <div className='bg-stone-900  grid py-4 min-h-screen'>
     <Todo/>
    </div>
  );
}

export default App;