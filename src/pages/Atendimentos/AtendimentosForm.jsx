import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AtendimentosForm() {
  const [descricao, setDescricao] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const dados = JSON.parse(localStorage.getItem("atendimentos")) || [];
      const atendimento = dados.find(a => a.id == id);
      if (atendimento) setDescricao(atendimento.descricao);
    }
  }, [id]);

  const salvar = (e) => {
    e.preventDefault();
    const dados = JSON.parse(localStorage.getItem("atendimentos")) || [];

    if (id) {
      const novos = dados.map(a => a.id == id ? { ...a, descricao } : a);
      localStorage.setItem("atendimentos", JSON.stringify(novos));
    } else {
      const novo = { id: Date.now(), descricao };
      dados.push(novo);
      localStorage.setItem("atendimentos", JSON.stringify(dados));
    }
    navigate("/atendimentos");
  };

  return (
    <div>
      <h1>{id ? "Editar" : "Cadastrar"} Atendimento</h1>
      <form onSubmit={salvar}>
        <input
          type="text"
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}
export default AtendimentosForm;