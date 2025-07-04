import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import './index.css'

export default function AtendimentosList() {
  const [atendimentos, setAtendimentos] = useState([])
  const [pacientes, setPacientes] = useState([])
  const [profissionais, setProfissionais] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [atendimentosRes, pacientesRes, profissionaisRes] = await Promise.all([
          api.get('/atendimento'),
          api.get('/paciente'),
          api.get('/profissional')
        ])
        
        setAtendimentos(atendimentosRes.data)
        setPacientes(pacientesRes.data)
        setProfissionais(profissionaisRes.data)
      } catch (err) {
        console.error('Erro ao buscar dados:', err)
      } finally {
        setLoading(false)
      }
    }

    carregarDados()
  }, [])

  const formatarData = (dataString) => {
    const data = new Date(dataString)
    const dia = data.getDate().toString().padStart(2, '0')
    const mes = (data.getMonth() + 1).toString().padStart(2, '0')
    const ano = data.getFullYear()
    return `${dia}/${mes}/${ano}`
  }

  const excluirAtendimento = async (id) => {
    if (window.confirm('Deseja excluir este atendimento?')) {
      try {
        await api.delete(`/atendimento/${id}`)
        setAtendimentos(atendimentos.filter(a => a.id !== id))
      } catch (error) {
        console.error('Erro ao excluir atendimento:', error)
        alert('Erro ao excluir atendimento. Verifique o console para detalhes.')
      }
    }
  }

  if (loading) return <div className="loading">Carregando atendimentos...</div>

  return (
    <div className="container">
      <h2>Atendimentos</h2>
      <button onClick={() => navigate('/atendimentos/novo')}>Cadastrar novo</button>

      <ul className="atendimentos-list">
        {atendimentos.map(a => {
          const paciente = pacientes.find(p => p.id === a.paciente_id)
          const profissional = profissionais.find(p => p.id === a.profissional_id)
          
          return (
            <li key={a.id} className="atendimento-card">
              <div className="atendimento-info">
                <p><strong>Paciente:</strong> {paciente?.nome || 'Não encontrado'}</p>
                <p><strong>Profissional:</strong> {profissional?.nome || 'Não encontrado'}</p>
                <p><strong>Data:</strong> {formatarData(a.data_atendimento)}</p>
                <p><strong>Diagnóstico:</strong> {a.diagnostico || 'Ainda não fornecido'}</p>
              </div>
              <div className="atendimento-actions">
                <button 
                  onClick={() => navigate(`/atendimentos/editar/${a.id}`)}
                  className="btn-edit"
                >
                  Editar diagnóstico
                </button>
                <button 
                  onClick={() => excluirAtendimento(a.id)}
                  className="btn-delete"
                >
                  Excluir
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}