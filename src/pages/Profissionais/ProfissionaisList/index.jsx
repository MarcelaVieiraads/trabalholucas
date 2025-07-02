import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../services/api'
import './index.css'

export default function ProfissionaisList() {
  const [profissionais, setProfissionais] = useState([])

  useEffect(() => {
    api.get('/profissionais')
      .then(res => setProfissionais(res.data))
      .catch(err => console.error('Erro ao buscar profissionais:', err))
  }, [])

  const excluir = async (id) => {
    if (confirm('Tem certeza que deseja excluir este profissional?')) {
      try {
        await api.delete(`/profissionais/${id}`)
        setProfissionais(profissionais.filter(p => p.id !== id))
      } catch (err) {
        console.error('Erro ao excluir profissional:', err)
      }
    }
  }

  return (
    <div className="profissionais-container">
      <h2>Profissionais</h2>

      <Link to="/profissionais/novo">
        <button className="novo-btn">+ Novo Profissional</button>
      </Link>

      {profissionais.length === 0 ? (
        <p>Nenhum profissional cadastrado.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {profissionais.map(p => (
            <li key={p.id} className="profissional-card">
              <p><strong>Nome:</strong> {p.nome}</p>
              <p><strong>CRM:</strong> {p.crm}</p>
              <p><strong>Especialidade:</strong> {p.especialidade?.nome}</p>
              <p><strong>Email:</strong> {p.email}</p>
              <p><strong>Telefone:</strong> {p.telefone}</p>

              <div className="profissional-actions">
                <Link to={`/profissionais/editar/${p.id}`}>
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
