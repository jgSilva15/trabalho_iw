import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

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

  const cartoes = lista.map((estadio) => {
  return (
    <Col key={estadio.id}>
      <Card className="h-100">
        <Card.Img
          variant="top"
          src={estadio.imagemUrl}
          alt={estadio.nome}
          style={{ height: "200px", objectFit: "cover" }}
        />

        <Card.Body>
          <Card.Title as="h2" className="h5">
            {estadio.nome}
          </Card.Title>

          <Card.Text>
            {estadio.cidade}, {estadio.pais}
          </Card.Text>

          <Card.Text>
            Capacidade: {estadio.capacidade}
          </Card.Text>
          
          <Card.Text> 
            {estadio.descricao}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
});

  return (
  <Container className="py-4">
    <h1 className="mb-4">Lista de estádios</h1>

    <Row xs={1} md={2} lg={3} className="g-4">
      {cartoes}
    </Row>
  </Container>
);
}

export default ListaEstadios;