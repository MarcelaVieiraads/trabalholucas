import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EspecialidadesForm() {
  const [nome, setNome] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const dados = JSON.parse(localStorage.getItem("especialidades")) || [];
      const especialidade = dados.find(e => e.id == id);
      if (especialidade) setNome(especialidade.nome);
    }
  }, [id]);

  const salvar = (e) => {
    e.preventDefault();
    const dados = JSON.parse(localStorage.getItem("especialidades")) || [];

    if (id) {
      const novos = dados.map(e => e.id == id ? { ...e, nome } : e);
      localStorage.setItem("especialidades", JSON.stringify(novos));
    } else {
      const novo = { id: Date.now(), nome };
      dados.push(novo);
      localStorage.setItem("especialidades", JSON.stringify(dados));
    }
    navigate("/especialidades");
  };

  return (
    <div>
      <h1>{id ? "Editar" : "Cadastrar"} Especialidade</h1>
      <form onSubmit={salvar}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}