import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import './index.css'

export default function EspecialidadesList() {
  const [especialidades, setEspecialidades] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/especialidade')
      .then(res => setEspecialidades(res.data))
      .catch(err => console.error('Erro ao buscar especialidades:', err))
  }, [])

  const excluirEspecialidade = async (id) => {
    if (window.confirm('Deseja excluir esta especialidade?')) {
      await api.delete(`/especialidade/${id}`)
      setEspecialidades(especialidades.filter(e => e.id !== id))
    }
  }

  return (
    <div className="container">
      <h2>Especialidades</h2>
      <button onClick={() => navigate('/especialidades/novo')}>Cadastrar novo</button>

      <ul>
        {especialidades.map(e => (
          <li key={e.id}>
            <strong>{e.nome}</strong>
            <div>
              <button onClick={() => navigate(`/especialidades/editar/${e.id}`)}>Editar</button>
              <button onClick={() => excluirEspecialidade(e.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
