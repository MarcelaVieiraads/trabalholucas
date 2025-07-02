import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../../services/api'
import './index.css'

export default function PacientesForm() {
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const [endereco, setEndereco] = useState('')
  const navigate = useNavigate()

  const salvar = async (e) => {
    e.preventDefault()
    try {
      await api.post('/pacientes', {
        nome,
        cpf,
        data_nascimento: dataNascimento,
        telefone,
        email,
        endereco
      })
      navigate('/pacientes')
    } catch (error) {
      console.error('Erro ao salvar paciente:', error)
    }
  }

  return (
    <form className="pacientes-form-container" onSubmit={salvar}>
      <h2>Novo Paciente</h2>

      <label>Nome:</label>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />

      <label>CPF:</label>
      <input
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        required
      />

      <label>Data de Nascimento:</label>
      <input
        type="date"
        value={dataNascimento}
        onChange={(e) => setDataNascimento(e.target.value)}
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

      <label>Endereço:</label>
      <input
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
        required
      />

      <button type="submit">Salvar</button>
    </form>
  )
}
