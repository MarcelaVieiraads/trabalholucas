import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../services/api'
import './index.css'

export default function AtendimentosList() {
  const [atendimentos, setAtendimentos] = useState([])

  useEffect(() => {
    api.get('/atendimentos')
      .then(res => setAtendimentos(res.data))
      .catch(err => console.error('Erro ao buscar atendimentos:', err))
  }, [])

  const excluir = async (id) => {
    if (confirm('Tem certeza que deseja excluir este atendimento?')) {
      try {
        await api.delete(`/atendimentos/${id}`)
        setAtendimentos(atendimentos.filter(a => a.id !== id))
      } catch (err) {
        console.error('Erro ao excluir atendimento:', err)
      }
    }
  }

  return (
    <div className="atendimentos-list-container">
      <h2>Atendimentos</h2>

      <Link to="/atendimentos/novo">
        <button className="novo-atendimento-btn">+ Novo Atendimento</button>
      </Link>

      {atendimentos.length === 0 ? (
        <p>Nenhum atendimento encontrado.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {atendimentos.map(a => (
            <li key={a.id} className="atendimento-card">
              <p><strong>Paciente:</strong> {a.paciente?.nome}</p>
              <p><strong>Profissional:</strong> {a.profissional?.nome} ({a.profissional?.especialidade?.nome})</p>
              <p><strong>Data:</strong> {new Date(a.data_atendimento).toLocaleString()}</p>
              <p><strong>Diagnóstico:</strong> {a.diagnostico || <em>Não preenchido</em>}</p>

              <div className="atendimento-actions">
                <Link to={`/atendimentos/editar/${a.id}`}>
                  <button>Editar</button>
                </Link>
                <button
                  className="excluir"
                  onClick={() => excluir(a.id)}
                >
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
