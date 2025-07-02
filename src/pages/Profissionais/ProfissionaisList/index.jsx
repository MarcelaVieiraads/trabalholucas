import { useEffect, useState } from 'react'
import api from '../../../services/api'
import { Link } from 'react-router-dom'

export default function ProfissionaisList() {
  const [profissionais, setProfissionais] = useState([])

  useEffect(() => {
    api.get('/profissionais').then(res => {
      setProfissionais(res.data)
    })
  }, [])

  const excluir = async (id) => {
    await api.delete(`/profissionais/${id}`)
    setProfissionais(profissionais.filter(p => p.id !== id))
  }

  return (
    <div>
      <h2>Profissionais</h2>
      <Link to="/profissionais/novo">Novo Profissional</Link>
      <ul>
        {profissionais.map(p => (
          <li key={p.id}>
            {p.nome} — {p.especialidade?.nome || 'Sem especialidade'}
            <button onClick={() => excluir(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
