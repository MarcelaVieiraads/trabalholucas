import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../services/api'

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
    <div>
      <h2>Atendimentos</h2>

      <Link to="/atendimentos/novo">
        <button style={{ marginBottom: '16px' }}>+ Novo Atendimento</button>
      </Link>

      {atendimentos.length === 0 ? (
        <p>Nenhum atendimento encontrado.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {atendimentos.map(a => (
            <li key={a.id} style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '10px'
            }}>
              <p><strong>Paciente:</strong> {a.paciente?.nome}</p>
              <p><strong>Profissional:</strong> {a.profissional?.nome} ({a.profissional?.especialidade?.nome})</p>
              <p><strong>Data:</strong> {new Date(a.data_atendimento).toLocaleString()}</p>
              <p><strong>Diagnóstico:</strong> {a.diagnostico || <em>Não preenchido</em>}</p>

              <div style={{ display: 'flex', gap: '8px' }}>
                <Link to={`/atendimentos/editar/${a.id}`}>
                  <button>Editar</button>
                </Link>
                <button onClick={() => excluir(a.id)} style={{ backgroundColor: 'red', color: 'white' }}>
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
