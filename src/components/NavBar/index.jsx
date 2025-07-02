import './index.css'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/">Início</Link>
      <Link to="/pacientes">Pacientes</Link>
      <Link to="/profissionais">Profissionais</Link>
      <Link to="/especialidades">Especialidades</Link>
      <Link to="/atendimentos">Atendimentos</Link>
    </nav>
  )
}