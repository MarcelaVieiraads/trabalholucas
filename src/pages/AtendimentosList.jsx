import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AtendimentosList() {
  const [atendimentos, setAtendimentos] = useState([]);

  useEffect(() => {
    buscar();
  }, []);

  const buscar = () => {
    const dados = JSON.parse(localStorage.getItem("atendimentos")) || [];
    setAtendimentos(dados);
  };

  const excluir = (id) => {
    const dados = JSON.parse(localStorage.getItem("atendimentos")) || [];
    const novos = dados.filter(a => a.id !== id);
    localStorage.setItem("atendimentos", JSON.stringify(novos));
    buscar();
  };

  return (
    <div>
      <h1>Atendimentos</h1>
      <Link to="/atendimentos/novo">Cadastrar</Link>
      <ul>
        {atendimentos.map(a => (
          <li key={a.id}>
            {a.descricao}
            <Link to={`/atendimentos/editar/${a.id}`}> Editar </Link>
            <button onClick={() => excluir(a.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AtendimentosList;
