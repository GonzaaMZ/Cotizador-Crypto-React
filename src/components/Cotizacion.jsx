import styled from "@emotion/styled";
import PropTypes from 'prop-types';

const ResultadoDiv = styled.div`
    color: #fff;
    font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
    font-size: 18px;

    span {
        font-weight: bold;
    }
`;

const Precio = styled.p`
    font-size: 30px;
`;

const Cotizacion = ({ result }) => {
  if (Object.keys(result).length === 0) return null;

  console.log(result);

  return (
    <ResultadoDiv>
      <Precio>
        El precio es: <span>{result.PRICE}</span>
      </Precio>
      <Info>
        Precio más alto del día: <span>{result.HIGHDAY}</span>
      </Info>
      <Info>
        Precio más bajo del día: <span>{result.LOWDAY}</span>
      </Info>
      <Info>
        Variación últimas 24hrs: <span>{result.CHANGEPCT24HOUR}</span>
      </Info>
      <Info>
        Última Actualización: <span>{result.LASTUPDATE}</span>
      </Info>
    </ResultadoDiv>
  );
};

Cotizacion.propTypes = {
  result: PropTypes.object.isRequired
}


export default Cotizacion;
