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
      try {
        await api.delete(`/profissional/${id}`)
        setProfissionais(profissionais.filter(p => p.id !== id))
      } catch (error) {
        if (error.response) {
          // Erros vindos do backend
          if (error.response.status === 400) {
            alert(error.response.data.error || 'Este profissional não pode ser excluído pois está vinculado a atendimentos')
          } else {
            alert(`Erro: ${error.response.data.message || 'Erro ao excluir profissional'}`)
          }
        } else {
          // Erros de rede ou outros
          alert('Erro de conexão. Verifique se o servidor está online.')
          console.error('Erro ao excluir profissional:', error)
        }
      }
    }
  }

  return (
    <div className="container">
      <h2>Profissionais</h2>
      <button onClick={() => navigate('/profissionais/novo')}>Cadastrar novo</button>

      <ul>
        {profissionais.map(p => (
          <li key={p.id}>
            <strong>{p.nome}</strong> - CRM: {p.crm} - Especialidade: {p.especialidade_id}
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