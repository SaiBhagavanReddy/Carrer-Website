import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

 function Testsupabase() {
  interface Data{
    name:string,
    id:number,

    Email:string,

  } 
  const [todos, setTodos] = useState<Data[]>([])

  useEffect(() => {
    async function getTodos() {
      const { data: todos } = await supabase.from('Carrer')

      if (todos) {
        setTodos(todos)
      }
    }

    getTodos()
  }, [])

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.Email}</li>
      ))}
    </ul>
  )
}
export default Testsupabase;