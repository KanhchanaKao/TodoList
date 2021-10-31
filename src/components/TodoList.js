import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
  const [showAddTodo, setShowAddTodo] = useState(false)
  const [todos, setTodos] = useState([]);


  useEffect(() => {
    const getTodos = async () => {
      const todoFromServer = await fetchTodos()
      setTodos(todoFromServer)
    }
    
    getTodos()
  }, [])

  // Fetch Todos
  const fetchTodos = async () => {
      const res = await fetch('http://localhost:5000/todos')
      const data = await res.json()

      return data
    }

    // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch (`http://localhost:5000/todos/${id}`)
    const data = await res.json()

    return data
  }
  //---------- Add ToDo-----------
  const addTodo = async(todo) => {
    const res = await fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',

      },
      body: JSON.stringify(todo),
    })
    const data = await res.json()
    setTodos([...todos, data])
  };
  // const addTodo = (todo) => {
  //   if (!todo.text || /^\s*$/.test(todo.text)) {
  //     return;
  //   }

  //   const newTodos = [todo, ...todos];

  //   setTodos(newTodos);
  //   console.log(...todos);
  // };

  // -------Update ToDo------
  const updateTodo = async(id) => {
    const todoToUpdate = await fetchTask(id)
    const updateTodo = {...todoToUpdate}

    const res = await fetch(`http://localhost:5000`)

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo} : todo
      )
    )
  }

  // const updateTodo = (todoId, newValue) => {
  //   if (!newValue.text || /^\s*$/.test(newValue.text)) {
  //     return;
  //   }

  //   setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  // };

  // --------Delete ToDo----------
  const removeTodo = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`,{
      method: 'DELETE',
    })
    setTodos(todos.filter((todos) => todos.id !== id))
  }

  // const removeTodo = id => {
  //   const removedArr = [...todos].filter(todo => todo.id !== id);

  //   setTodos(removedArr);
  // };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;