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
      try {
        await api.delete(`/paciente/${id}`)
        setPacientes(pacientes.filter(p => p.id !== id))
      } catch (error) {
        if (error.response) {
          // Erros vindos do backend
          if (error.response.status === 400) {
            alert(error.response.data.error || 'Este paciente não pode ser excluído pois está vinculado a atendimentos')
          } else {
            alert(`Erro: ${error.response.data.message || 'Erro ao excluir paciente'}`)
          }
        } else {
          // Erros de rede ou outros
          alert('Erro de conexão. Verifique se o servidor está online.')
          console.error('Erro ao excluir paciente:', error)
        }
      }
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