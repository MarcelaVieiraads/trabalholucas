import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'

export default function EspecialidadesList() {
  const [especialidades, setEspecialidades] = useState([])

  useEffect(() => {
    api.get('/especialidades').then(response => {
      setEspecialidades(response.data)
    })
  }, [])

  const excluir = async (id) => {
    await api.delete(`/especialidades/${id}`)
    setEspecialidades(especialidades.filter(e => e.id !== id))
  }

  return (
    <div>
      <h2>Especialidades</h2>
      <Link to="/especialidades/novo">Nova Especialidade</Link>
      <ul>
        {especialidades.map(e => (
          <li key={e.id}>
            {e.nome}
            <button onClick={() => excluir(e.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
