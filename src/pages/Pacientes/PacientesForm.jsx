import { useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'

export default function PacientesForm() {
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const navigate = useNavigate()

  const salvar = async (e) => {
    e.preventDefault()
    await api.post('/pacientes', { nome, cpf })
    navigate('/pacientes')
  }

  return (
    <form onSubmit={salvar}>
      <h2>Cadastro de Paciente</h2>
      <label>Nome:</label>
      <input value={nome} onChange={(e) => setNome(e.target.value)} />
      <label>CPF:</label>
      <input value={cpf} onChange={(e) => setCpf(e.target.value)} />
      <button type="submit">Salvar</button>
    </form>
  )
}