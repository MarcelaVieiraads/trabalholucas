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
      try {
        await api.delete(`/especialidade/${id}`)
        setEspecialidades(especialidades.filter(e => e.id !== id))
      } catch (err) {
        if (err.response && err.response.status === 400) {
          // Se o backend retornar status 400, mostra o alert com a mensagem
          alert(err.response.data.error)
        } else {
          // Outros erros (como 500, falha na rede, etc.)
          alert('Ocorreu um erro ao tentar excluir a especialidade.')
          console.error('Erro ao excluir especialidade:', err)
        }
      }
    }
  }

  return (
    <div className="container">
      <h2>Especialidades</h2>
      <button onClick={() => navigate('/especialidades/novo')}>Cadastrar novo</button>

      <ul>
        {especialidades.map(e => (
          <li key={e.id}>
            <strong>{e.descricao}</strong>
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