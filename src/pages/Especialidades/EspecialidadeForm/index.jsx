import { useState } from 'react'
import api from '../../services/api'
import { useNavigate } from 'react-router-dom'

export default function EspecialidadesForm() {
  const [nome, setNome] = useState('')
  const navigate = useNavigate()

  const salvar = async (e) => {
    e.preventDefault()
    await api.post('/especialidades', { nome })
    navigate('/especialidades')
  }

  return (
    <form onSubmit={salvar}>
      <h2>Nova Especialidade</h2>
      <label>Nome:</label>
      <input value={nome} onChange={(e) => setNome(e.target.value)} />
      <button type="submit">Salvar</button>
    </form>
  )
}
