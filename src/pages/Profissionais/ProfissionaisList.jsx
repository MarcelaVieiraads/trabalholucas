import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProfissionaisList() {
  const [profissionais, setProfissionais] = useState([]);

  useEffect(() => {
    buscar();
  }, []);

  const buscar = () => {
    const dados = JSON.parse(localStorage.getItem("profissionais")) || [];
    setProfissionais(dados);
  };

  const excluir = (id) => {
    const dados = JSON.parse(localStorage.getItem("profissionais")) || [];
    const novos = dados.filter(p => p.id !== id);
    localStorage.setItem("profissionais", JSON.stringify(novos));
    buscar();
  };

  return (
    <div>
      <h1>Profissionais</h1>
      <Link to="/profissionais/novo">Cadastrar</Link>
      <ul>
        {profissionais.map(p => (
          <li key={p.id}>
            {p.nome}
            <Link to={`/profissionais/editar/${p.id}`}> Editar </Link>
            <button onClick={() => excluir(p.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProfissionaisList;
