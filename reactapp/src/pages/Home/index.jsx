import React, {useState} from 'react'
import './style.css'
import {Card} from '../../components/Card'

export function Home() {
  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState([])

  function handle_add_student() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    setStudents(previousState => [...previousState, newStudent])
  }

  return (
    <div className="container">
      <h1>Lista de Presença</h1>
      <input 
        type="text" 
        placeholder="Digite o nome..." 
        onChange={e => setStudentName(e.target.value)}/>

      <button type="button" onClick={handle_add_student}>
        Adicionar
      </button>

      {
        students.map((student, i) => <Card name={student.name} time={student.time} key={i}/>)
      }
    </div>
  )
}
