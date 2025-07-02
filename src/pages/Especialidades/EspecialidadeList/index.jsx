import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../../services/api'
import './index.css'

export default function EspecialidadesList() {
  const [especialidades, setEspecialidades] = useState([])

  useEffect(() => {
    api.get('/especialidades')
      .then(res => setEspecialidades(res.data))
      .catch(err => console.error('Erro ao buscar especialidades:', err))
  }, [])

  const excluir = async (id) => {
    if (confirm('Tem certeza que deseja excluir esta especialidade?')) {
      try {
        await api.delete(`/especialidades/${id}`)
        setEspecialidades(especialidades.filter(e => e.id !== id))
      } catch (err) {
        console.error('Erro ao excluir especialidade:', err)
      }
    }
  }

  return (
    <div className="especialidades-container">
      <h2>Especialidades</h2>

      <Link to="/especialidades/novo">
        <button className="novo-btn">+ Nova Especialidade</button>
      </Link>

      {especialidades.length === 0 ? (
        <p>Nenhuma especialidade cadastrada.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {especialidades.map(e => (
            <li key={e.id} className="especialidade-card">
              <p><strong>Nome:</strong> {e.nome}</p>

              <div className="especialidade-actions">
                <Link to={`/especialidades/editar/${e.id}`}>
                  <button>Editar</button>
                </Link>
                <button className="excluir" onClick={() => excluir(e.id)}>
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
