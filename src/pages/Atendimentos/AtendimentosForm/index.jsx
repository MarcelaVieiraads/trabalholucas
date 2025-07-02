import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import api from '../../services/api'

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

  // Se vier da tela de cadastro de paciente, preenche o CPF automaticamente
  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const cpfQuery = query.get('cpf')
    if (cpfQuery) {
      setCpfBusca(cpfQuery)
      buscarPacientePorCpf(cpfQuery)
    }
  }, [location.search])

  useEffect(() => {
    api.get('/especialidades').then(res => setEspecialidades(res.data))
  }, [])

  const buscarPacientePorCpf = async (cpf) => {
    try {
      const res = await api.get('/pacientes')
      const encontrado = res.data.find(p => p.cpf === cpf)
      if (encontrado) {
        setPaciente(encontrado)
      } else {
        setPaciente(null)
      }
    } catch (err) {
      console.error('Erro ao buscar paciente:', err)
    }
  }

  const buscarProfissionaisDaEspecialidade = async (especialidade_id) => {
    try {
      const res = await api.get('/profissionais')
      const filtrados = res.data.filter(p => p.especialidade_id === parseInt(especialidade_id))
      setProfissionaisFiltrados(filtrados)
    } catch (err) {
      console.error('Erro ao buscar profissionais:', err)
    }
  }

  const salvar = async (e) => {
    e.preventDefault()
    try {
      await api.post('/atendimentos', {
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
    <div>
      <h2>Agendar Atendimento</h2>

      {/* CPF */}
      <label>CPF do Paciente:</label>
      <input
        value={cpfBusca}
        onChange={(e) => setCpfBusca(e.target.value)}
        placeholder="Digite o CPF"
      />
      <button type="button" onClick={() => buscarPacientePorCpf(cpfBusca)}>🔍</button>

      {/* Paciente encontrado */}
      {paciente ? (
        <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
          <strong>Paciente:</strong> {paciente.nome}<br />
          <strong>Email:</strong> {paciente.email}<br />
          <strong>Telefone:</strong> {paciente.telefone}
        </div>
      ) : cpfBusca && (
        <div style={{ marginTop: '10px' }}>
          <p>Paciente não encontrado.</p>
          <button onClick={() => navigate(`/pacientes/novo?cpf=${cpfBusca}`)}>
            Cadastrar novo paciente
          </button>
        </div>
      )}

      {paciente && (
        <form onSubmit={salvar}>
          {/* Especialidade */}
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

          {/* Profissional */}
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

          {/* Data */}
          <label>Data e Hora do Atendimento:</label>
          <input
            type="datetime-local"
            value={dataAtendimento}
            onChange={(e) => setDataAtendimento(e.target.value)}
            required
          />

          {/* Diagnóstico será adicionado somente na edição */}

          <button type="submit">Salvar Atendimento</button>
        </form>
      )}
    </div>
  )
}
