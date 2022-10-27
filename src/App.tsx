import React from 'react';
import { TodosProvider } from './context/useTodos';
import Operational from './components/Operational';
import TodoList from './components/TodoList';
import useAxios from './hooks/useAxios';
import './App.scss';

const AppWrapper = () => {
  const { data, error, loaded } = useAxios(
    'https://jsonplaceholder.typicode.com/todos',
    'GET',
    {
      title: 'batu',
      body: 'batu',
      userId: 1,
    }
  );
  console.log('data', data);
  return (
    <TodosProvider
      initialTodos={[{ id: 0, text: 'Hey there useContext', done: false }]}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '50% 50%',
          margin: '50px',
        }}
      >
        <Operational />
        <TodoList />
      </div>
    </TodosProvider>
  );
};

export default AppWrapper;
