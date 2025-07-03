import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import './index.css'

export default function ProfissionaisList() {
  const [profissionais, setProfissionais] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/profissional')
      .then(res => setProfissionais(res.data))
      .catch(err => console.error('Erro ao buscar profissionais:', err))
  }, [])

  const excluirProfissional = async (id) => {
    if (window.confirm('Deseja excluir este profissional?')) {
      await api.delete(`/profissional/${id}`)
      setProfissionais(profissionais.filter(p => p.id !== id))
    }
  }

  return (
    <div className="container">
      <h2>Profissionais</h2>
      <button onClick={() => navigate('/profissionais/novo')}>Cadastrar novo</button>

      <ul>
        {profissionais.map(p => (
          <li key={p.id}>
            <strong>{p.nome}</strong> - CRM: {p.crm} - Especialidade ID: {p.especialidade_id}
            <div>
              <button onClick={() => navigate(`/profissionais/editar/${p.id}`)}>Editar</button>
              <button onClick={() => excluirProfissional(p.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
