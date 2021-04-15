import React, { useEffect } from 'react';
import TodoList from './Todo/TodoList'
import Context from './context'
import { func } from 'prop-types';
import Loader from './loader'
/*динамический компонент */
const AddTodo = React.lazy(() => import('./Todo/AddTodo'))
function App() {
  const [todos, setTodos] = React.useState([])
//новый State для слежения за лоудингом
const [loading, setLoading] = React.useState(true)
 
useEffect(()=> {
  
  fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
  .then(response => response.json())
  .then(todos =>{
    setTodos(todos)
    setLoading(false)
  })
}, [])
function toggleTodo(id) {
setTodos(
  todos.map(todo => {
  if (todo.id === id) {
    todo.completed = !todo.completed
}
return todo
}) )
}
function removeTodo(id) {
  setTodos(todos.filter(todo => todo.id !== id))
}
function addTodo(title) {
  setTodos(todos.concat([{
    title,
    id: Date.now(),
    completed:false
  }]))
}
  return (
  <Context.Provider value={{removeTodo: removeTodo}}> 
  <div className='wrapper'>
    <h1>react</h1>

    <React.Suspense fallback={<p>loading...</p>}>
    <AddTodo onCreate={addTodo} />
    </React.Suspense>

  
     {/*если лоадинг тру то показывать компонент лоадер*/ }
     {loading && <Loader />}
    {todos.length ? (<TodoList todos={todos} onToggle={toggleTodo} /> 
    ) : loading ? null : (
 <p>no todos!</p>
       )}
    
  </div>  </Context.Provider>  )
  
}

export default App
