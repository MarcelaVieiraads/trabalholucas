 import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import './index.css'

export default function ProfissionaisList() {
  const [profissionais, setProfissionais] = useState([])
  const [especialidades, setEspecialidades] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profissionaisRes, especialidadesRes] = await Promise.all([
          api.get('/profissional'),
          api.get('/especialidade')
        ])
        
        setProfissionais(profissionaisRes.data)
        setEspecialidades(especialidadesRes.data)
      } catch (err) {
        console.error('Erro ao buscar dados:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const excluirProfissional = async (id) => {
    if (window.confirm('Deseja excluir este profissional?')) {
      try {
        await api.delete(`/profissional/${id}`)
        setProfissionais(profissionais.filter(p => p.id !== id))
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            alert(error.response.data.error || 'Este profissional não pode ser excluído pois está vinculado a atendimentos')
          } else {
            alert(`Erro: ${error.response.data.message || 'Erro ao excluir profissional'}`)
          }
        } else {
          alert('Erro de conexão. Verifique se o servidor está online.')
          console.error('Erro ao excluir profissional:', error)
        }
      }
    }
  }

  if (loading) return <div>Carregando...</div>

  return (
    <div className="container">
      <h2>Profissionais</h2>
      <button onClick={() => navigate('/profissionais/novo')}>Cadastrar novo</button>

      <ul>
        {profissionais.map(p => {
          const especialidade = especialidades.find(e => e.id === p.especialidade_id)
          return (
            <li key={p.id}>
              <strong>{p.nome}</strong> - CRM: {p.crm} - Especialidade: {especialidade?.descricao || especialidade?.nome || 'N/A'}
              <div>
                <button onClick={() => navigate(`/profissionais/editar/${p.id}`)}>Editar</button>
                <button onClick={() => excluirProfissional(p.id)}>Excluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
