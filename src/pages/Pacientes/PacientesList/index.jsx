import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import './index.css'

export default function PacientesList() {
  const [pacientes, setPacientes] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/paciente') 
      .then(response => setPacientes(response.data))
      .catch(err => console.error('Erro ao buscar pacientes:', err))
  }, [])

  const excluirPaciente = async (id) => {
    if (window.confirm('Deseja realmente excluir este paciente?')) {
      await api.delete(`/paciente/${id}`) 
      setPacientes(pacientes.filter(p => p.id !== id))
    }
  }

  return (
    <div className="container">
      <h2>Pacientes</h2>
      <button onClick={() => navigate('/pacientes/novo')}>Cadastrar novo</button>
      
      <ul>
        {pacientes.map(p => (
          <li key={p.id}>
            <strong>{p.nome}</strong> - {p.cpf}
            <div>
              <button onClick={() => navigate(`/pacientes/editar/${p.id}`)}>Editar</button>
              <button onClick={() => excluirPaciente(p.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
