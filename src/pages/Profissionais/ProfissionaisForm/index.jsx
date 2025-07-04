import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import './index.css'

export default function ProfissionaisForm() {
  const [nome, setNome] = useState('')
  const [crm, setCrm] = useState('')
  const [especialidadeId, setEspecialidadeId] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [especialidades, setEspecialidades] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/especialidade').then(res => setEspecialidades(res.data))
  }, [])

  const salvar = async (e) => {
    e.preventDefault()
    try {
      await api.post('/profissional', {
        nome,
        crm,
        especialidade_id: especialidadeId,
        telefone,
        email
      })
      navigate('/profissionais')
    } catch (error) {
      console.error('Erro ao salvar profissional:', error)
    }
  }

  return (
    <form className="profissionais-form-container" onSubmit={salvar}>
      <h2>Novo Profissional</h2>

      <label>Nome:</label>
      <input value={nome} onChange={e => setNome(e.target.value)} required />

      <label>CRM:</label>
      <input value={crm} onChange={e => setCrm(e.target.value)} required />

      <label>Especialidade:</label>
      <select value={especialidadeId} onChange={e => setEspecialidadeId(e.target.value)} required>
        <option value="">Selecione...</option>
        {especialidades.map(e => (
          <option key={e.id} value={e.id}>{e.descricao}</option>
        ))}
      </select>

      <label>Email:</label>
      <input value={email} onChange={e => setEmail(e.target.value)} required />

      <label>Telefone:</label>
      <input value={telefone} onChange={e => setTelefone(e.target.value)} required />

      <button type="submit">Salvar</button>
    </form>
  )
}
