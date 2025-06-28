import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PacientesList() {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    buscar();
  }, []);

  const buscar = () => {
    const dados = JSON.parse(localStorage.getItem("pacientes")) || [];
    setPacientes(dados);
  };

  const excluir = (id) => {
    const dados = JSON.parse(localStorage.getItem("pacientes")) || [];
    const novos = dados.filter(p => p.id !== id);
    localStorage.setItem("pacientes", JSON.stringify(novos));
    buscar();
  };

  return (
    <div>
      <h1>Pacientes</h1>
      <Link to="/pacientes/novo">Cadastrar</Link>
      <ul>
        {pacientes.map(p => (
          <li key={p.id}>
            {p.nome}
            <Link to={`/pacientes/editar/${p.id}`}> Editar </Link>
            <button onClick={() => excluir(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PacientesList;
