import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function EspecialidadesList() {
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    buscar();
  }, []);

  const buscar = () => {
    const dados = JSON.parse(localStorage.getItem("especialidades")) || [];
    setEspecialidades(dados);
  };

  const excluir = (id) => {
    const dados = JSON.parse(localStorage.getItem("especialidades")) || [];
    const novos = dados.filter(e => e.id !== id);
    localStorage.setItem("especialidades", JSON.stringify(novos));
    buscar();
  };

  return (
    <div>
      <h1>Especialidades</h1>
      <Link to="/especialidades/novo">Cadastrar</Link>
      <ul>
        {especialidades.map(e => (
          <li key={e.id}>
            {e.nome}
            <Link to={`/especialidades/editar/${e.id}`}> Editar </Link>
            <button onClick={() => excluir(e.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EspecialidadesList;
