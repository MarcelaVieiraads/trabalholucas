import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'

export default function PacientesList() {
  const [pacientes, setPacientes] = useState([])

  useEffect(() => {
    api.get('/pacientes')
      .then(res => {
        setPacientes(res.data)
      })
      .catch(err => {
        console.error('Erro ao buscar pacientes:', err)
      })
  }, [])

  const excluir = async (id) => {
    if (confirm('Deseja realmente excluir este paciente?')) {
      await api.delete(`/pacientes/${id}`)
      setPacientes(pacientes.filter(p => p.id !== id))
    }
  }

  return (
    <div>
      <h2>Pacientes</h2>
      <Link to="/pacientes/novo">Novo Paciente</Link>
      <ul>
        {pacientes.map(p => (
          <li key={p.id}>
            <strong>{p.nome}</strong> — CPF: {p.cpf}<br />
            Nascimento: {p.data_nascimento}<br />
            Email: {p.email} | Telefone: {p.telefone}<br />
            Endereço: {p.endereco}<br />
            <button onClick={() => excluir(p.id)}>Excluir</button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  )
}
