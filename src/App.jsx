import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'

import PacientesList from './pages/Pacientes/PacientesList'
import PacientesForm from './pages/Pacientes/PacientesForm'
import ProfissionaisList from './pages/Profissionais/ProfissionaisList'
import ProfissionaisForm from './pages/Profissionais/ProfissionaisForm'
import EspecialidadesList from './pages/Especialidades/EspecialidadesList'
import EspecialidadesForm from './pages/Especialidades/EspecialidadesForm'
import AtendimentosList from './pages/Atendimentos/AtendimentosList'
import AtendimentosForm from './pages/Atendimentos/AtendimentosForm'

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/pacientes" element={<PacientesList />} />
        <Route path="/pacientes/novo" element={<PacientesForm />} />

        <Route path="/profissionais" element={<ProfissionaisList />} />
        <Route path="/profissionais/novo" element={<ProfissionaisForm />} />

        <Route path="/especialidades" element={<EspecialidadesList />} />
        <Route path="/especialidades/novo" element={<EspecialidadesForm />} />

        <Route path="/atendimentos" element={<AtendimentosList />} />
        <Route path="/atendimentos/novo" element={<AtendimentosForm />} />
      </Routes>
    </>
  )
} 