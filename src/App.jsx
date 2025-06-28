import { BrowserRouter, Routes, Route } from "react-router-dom";
import PacientesList from "./pages/PacientesList";
import PacientesForm from "./pages/PacientesForm";
import ProfissionaisList from "./pages/ProfissionaisList";
import ProfissionaisForm from "./pages/ProfissionaisForm";
import EspecialidadesList from "./pages/EspecialidadesList";
import EspecialidadesForm from "./pages/EspecialidadesForm";
import AtendimentosList from "./pages/AtendimentosList";
import AtendimentosForm from "./pages/AtendimentosForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Tela inicial simples */}
        <Route path="/" element={<h1>Bem-vindo ao Sistema Hospitalar</h1>} />

        {/* Pacientes */}
        <Route path="/pacientes" element={<PacientesList />} />
        <Route path="/pacientes/novo" element={<PacientesForm />} />
        <Route path="/pacientes/editar/:id" element={<PacientesForm />} />

        {/* Profissionais */}
        <Route path="/profissionais" element={<ProfissionaisList />} />
        <Route path="/profissionais/novo" element={<ProfissionaisForm />} />
        <Route path="/profissionais/editar/:id" element={<ProfissionaisForm />} />

        {/* Especialidades */}
        <Route path="/especialidades" element={<EspecialidadesList />} />
        <Route path="/especialidades/novo" element={<EspecialidadesForm />} />
        <Route path="/especialidades/editar/:id" element={<EspecialidadesForm />} />

        {/* Atendimentos */}
        <Route path="/atendimentos" element={<AtendimentosList />} />
        <Route path="/atendimentos/novo" element={<AtendimentosForm />} />
        <Route path="/atendimentos/editar/:id" element={<AtendimentosForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
