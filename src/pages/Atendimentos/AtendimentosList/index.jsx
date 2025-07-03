import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import './index.css'

export default function AtendimentosList() {
  const [atendimentos, setAtendimentos] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/atendimento')
      .then(res => setAtendimentos(res.data))
      .catch(err => console.error('Erro ao buscar atendimentos:', err))
  }, [])

  const excluirAtendimento = async (id) => {
    if (window.confirm('Deseja excluir este atendimento?')) {
      await api.delete(`/atendimento/${id}`)
      setAtendimentos(atendimentos.filter(a => a.id !== id))
    }
  }

  return (
    <div className="container">
      <h2>Atendimentos</h2>
      <button onClick={() => navigate('/atendimentos/novo')}>Cadastrar novo</button>

      <ul>
        {atendimentos.map(a => (
          <li key={a.id}>
            <strong>Paciente ID:</strong> {a.paciente_id} - <strong>Profissional ID:</strong> {a.profissional_id}<br />
            <strong>Data:</strong> {new Date(a.data_atendimento).toLocaleString()}<br />
            <strong>Diagnóstico:</strong> {a.diagnostico || 'Ainda não fornecido'}
            <div>
              <button onClick={() => navigate(`/atendimentos/editar/${a.id}`)}>Editar (diagnóstico)</button>
              <button onClick={() => excluirAtendimento(a.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
  