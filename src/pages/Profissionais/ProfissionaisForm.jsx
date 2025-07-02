import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'

export default function ProfissionaisForm() {
  const [nome, setNome] = useState('')
  const [crm, setCrm] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [especialidadeId, setEspecialidadeId] = useState('')
  const [especialidades, setEspecialidades] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/especialidades')
      .then(res => {
        setEspecialidades(res.data)
      })
      .catch(err => {
        console.error('Erro ao carregar especialidades:', err)
      })
  }, [])

  const salvar = async (e) => {
    e.preventDefault()
    try {
      await api.post('/profissionais', {
        nome,
        crm, // nome exato esperado pela API
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
    <form onSubmit={salvar}>
      <h2>Novo Profissional</h2>

      <label>Nome:</label>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />

      <label>CRM:</label>
      <input
        value={crm}
        onChange={(e) => setCrm(e.target.value)}
        required
      />

      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <label>Telefone:</label>
      <input
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        required
      />

      <label>Especialidade:</label>
      <select
        value={especialidadeId}
        onChange={(e) => setEspecialidadeId(e.target.value)}
        required
      >
        <option value="">Selecione...</option>
        {especialidades.map((e) => (
          <option key={e.id} value={e.id}>
            {e.nome}
          </option>
        ))}
      </select>

      <button type="submit">Salvar</button>
    </form>
  )
}
