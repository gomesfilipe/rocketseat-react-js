import React, {useState, useEffect} from 'react'
import './style.css'
import {Card} from '../../components/Card'

export function Home() {
  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({name: '', avatar: ''})

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

  // Executa sempre que a página é renderizada e quando alguma variável do vetor de depêndencias é alterada.
  useEffect(() => {
    fetch('https://api.github.com/users/gomesfilipe')
      .then(response => response.json())
      .then(data => {
        setUser({
          name: data.name,
          avatar: data.avatar_url
        })
      })
  }, []) // Vetor de dependências.

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil." />
        </div>
      </header>
      
      <input 
        type="text" 
        placeholder="Digite o nome..." 
        onChange={e => setStudentName(e.target.value)}/>

      <button type="button" onClick={handle_add_student}>
        Adicionar
      </button>

      {
        students.map(student => <Card name={student.name} time={student.time} key={student.time}/>)
      }
    </div>
  )
}
