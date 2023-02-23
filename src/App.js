import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useState } from "react";
import Cotizacion from "./components/Cotizacion";
import Formulario from "./components/Formulario";
import Spinner from "./components/Spinner";
import imagen from "./cryptomonedas.png";

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  const [money, setMoney] = useState("");

  const [crypto, setCrypto] = useState("");

  const [result, setResult] = useState({});

  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const cotizarCrypto = async () => {
      if (money === "") return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${money}`;

      const response = await axios.get(url);

      setLoading(true);

      setTimeout(() => {
        setLoading(false);

        setResult(response.data.DISPLAY[crypto][money]);
      }, 3000)

    };
    cotizarCrypto();
  }, [money, crypto]);

  const componente = (loading) ? <Spinner /> :  <Cotizacion result={result}/>

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="imagen-cryto" />
      </div>
      <div>
        <Heading>Cotiza Criptomedas</Heading>
        <Formulario setMoney={setMoney} setCrypto={setCrypto} />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
