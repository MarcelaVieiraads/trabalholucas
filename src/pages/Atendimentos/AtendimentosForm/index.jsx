  import { useEffect, useState } from 'react'
  import { useNavigate, useLocation } from 'react-router-dom'
  import api from '../../../services/api'
  import './index.css'

  export default function AtendimentosForm() {
    const [cpfBusca, setCpfBusca] = useState('')
    const [paciente, setPaciente] = useState(null)
    const [especialidadeId, setEspecialidadeId] = useState('')
    const [profissionalId, setProfissionalId] = useState('')
    const [dataAtendimento, setDataAtendimento] = useState('')
    const [especialidades, setEspecialidades] = useState([])
    const [profissionaisFiltrados, setProfissionaisFiltrados] = useState([])

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
      const query = new URLSearchParams(location.search)
      const cpfQuery = query.get('cpf')
      if (cpfQuery) {
        setCpfBusca(cpfQuery)
        buscarPacientePorCpf(cpfQuery)
      }
    }, [location.search])

  useEffect(() => {
    api.get('/especialidade').then(res => setEspecialidades(res.data))
  }, [])

const limparCpf = (cpf) => cpf.replace(/[.-]/g, '')

const buscarPacientePorCpf = async (cpf) => {
  try {
    const res = await api.get(`/paciente/cpf/${limparCpf(cpf)}`)
    setPaciente(res.data)
  } catch (err) {
    setPaciente(null)
  }
} 


  const buscarProfissionaisDaEspecialidade = async (especialidade_id) => {
    try {
      const res = await api.get('/profissional')
      const filtrados = res.data.filter(p => p.especialidade_id === parseInt(especialidade_id))
      setProfissionaisFiltrados(filtrados)
    } catch (err) {
      console.error('Erro ao buscar profissionais:', err)
    }
  }

    const salvar = async (e) => {
      e.preventDefault()
      try {
        await api.post('/atendimento', {
          paciente_id: paciente.id,
          profissional_id: profissionalId,
          data_atendimento: dataAtendimento
        })
        navigate('/atendimentos')
      } catch (err) {
        console.error('Erro ao salvar atendimento:', err)
      }
    }

    return (
      <div className="atendimento-container">
        <h2>Agendar Atendimento</h2>

        <label>CPF do Paciente:</label>
        <input
          value={cpfBusca}
          onChange={(e) => setCpfBusca(e.target.value)}
          placeholder="Digite o CPF"
        />
        <button type="button" onClick={() => buscarPacientePorCpf(cpfBusca)}>🔍</button>

        {paciente ? (
          <div className="paciente-encontrado">
            <strong>Paciente:</strong> {paciente.nome}<br />
            <strong>Email:</strong> {paciente.email}<br />
            <strong>Telefone:</strong> {paciente.telefone}
          </div>
        ) : cpfBusca && (
          <div className="paciente-nao-encontrado">
            <p>Paciente não encontrado.</p>
            <button onClick={() => navigate(`/pacientes/novo?cpf=${cpfBusca}`)}>
              Cadastrar novo paciente
            </button>
          </div>
        )}

        {paciente && (
          <form onSubmit={salvar}>
            <label>Especialidade:</label>
            <select
              value={especialidadeId}
              onChange={(e) => {
                setEspecialidadeId(e.target.value)
                buscarProfissionaisDaEspecialidade(e.target.value)
              }}
              required
            >
              <option value="">Selecione...</option>
              {especialidades.map(e => (
                <option key={e.id} value={e.id}>{e.nome}</option>
              ))}
            </select>

            <label>Profissional:</label>
            <select
              value={profissionalId}
              onChange={(e) => setProfissionalId(e.target.value)}
              required
            >
              <option value="">Selecione...</option>
              {profissionaisFiltrados.map(p => (
                <option key={p.id} value={p.id}>{p.nome}</option>
              ))}
            </select>

            <label>Data e Hora do Atendimento:</label>
            <input
              type="datetime-local"
              value={dataAtendimento}
              onChange={(e) => setDataAtendimento(e.target.value)}
              required
            />

            <button type="submit">Salvar Atendimento</button>
          </form>
        )}
      </div>
    )
  }