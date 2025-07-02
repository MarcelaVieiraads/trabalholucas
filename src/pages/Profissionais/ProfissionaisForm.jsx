import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProfissionaisForm() {
  const [nome, setNome] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const dados = JSON.parse(localStorage.getItem("profissionais")) || [];
      const prof = dados.find(p => p.id == id);
      if (prof) setNome(prof.nome);
    }
  }, [id]);

  const salvar = (e) => {
    e.preventDefault();
    const dados = JSON.parse(localStorage.getItem("profissionais")) || [];

    if (id) {
      const novos = dados.map(p => p.id == id ? { ...p, nome } : p);
      localStorage.setItem("profissionais", JSON.stringify(novos));
    } else {
      const novo = { id: Date.now(), nome };
      dados.push(novo);
      localStorage.setItem("profissionais", JSON.stringify(dados));
    }
    navigate("/profissionais");
  };

  return (
    <div>
      <h1>{id ? "Editar" : "Cadastrar"} Profissional</h1>
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

export default ProfissionaisForm;
