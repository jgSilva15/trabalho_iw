import { useEffect, useState } from "react";

function ListaEstadios() {
  const [lista, setLista] = useState([]);

  useEffect(() => {
  const dadosGuardados = localStorage.getItem("estadios");

  if (dadosGuardados !== null) {
    setLista(JSON.parse(dadosGuardados));
    return;
  }

  fetch(
    "https://api.sheety.co/63d4983702e4defa82c4a37331195657/trabalhoIw/estadios"
  )
    .then((response) => response.json())
    .then((dados) => {
      setLista(dados.estadios);

      localStorage.setItem(
        "estadios",
        JSON.stringify(dados.estadios)
      );
    })
    .catch((erro) => console.error(erro));
}, []);

  const rows = lista.map((estadio) => {
    return (
      <tr key={estadio.id}>
        <td>{estadio.nome}</td>
        <td>{estadio.cidade}</td>
        <td>{estadio.pais}</td>
        <td>{estadio.capacidade}</td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Lista de estádios</h1>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Cidade</th>
            <th>País</th>
            <th>Capacidade</th>
          </tr>
        </thead>

        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

export default ListaEstadios;