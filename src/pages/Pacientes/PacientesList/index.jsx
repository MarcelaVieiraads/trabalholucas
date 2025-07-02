import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../services/api'
import './index.css'

export default function PacientesList() {
  const [pacientes, setPacientes] = useState([])

  useEffect(() => {
    api.get('/pacientes')
      .then(res => setPacientes(res.data))
      .catch(err => console.error('Erro ao buscar pacientes:', err))
  }, [])

  const excluir = async (id) => {
    if (confirm('Tem certeza que deseja excluir este paciente?')) {
      try {
        await api.delete(`/pacientes/${id}`)
        setPacientes(pacientes.filter(p => p.id !== id))
      } catch (err) {
        console.error('Erro ao excluir paciente:', err)
      }
    }
  }

  return (
    <div className="pacientes-container">
      <h2>Pacientes</h2>

      <Link to="/pacientes/novo">
        <button className="novo-btn">+ Novo Paciente</button>
      </Link>

      {pacientes.length === 0 ? (
        <p>Nenhum paciente cadastrado.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {pacientes.map(p => (
            <li key={p.id} className="paciente-card">
              <p><strong>Nome:</strong> {p.nome}</p>
              <p><strong>CPF:</strong> {p.cpf}</p>
              <p><strong>Data de Nascimento:</strong> {new Date(p.data_nascimento).toLocaleDateString()}</p>
              <p><strong>Telefone:</strong> {p.telefone}</p>
              <p><strong>Email:</strong> {p.email}</p>
              <p><strong>Endereço:</strong> {p.endereco}</p>

              <div className="paciente-actions">
                <Link to={`/pacientes/editar/${p.id}`}>
                  <button>Editar</button>
                </Link>
                <button className="excluir" onClick={() => excluir(p.id)}>
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
