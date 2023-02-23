import styled from "@emotion/styled";
import axios from "axios";
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import useCrypto from "../hooks/useCrypto";
import useMoney from "../hooks/useMoney";
import Error from "./Error";


const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`


const Formulario = ({setMoney, setCrypto}) => {

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar Estadounidense'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'ARS', nombre: 'Peso Argentino'}
    ]

    const [listacripto, setListacripto] = useState([]);

    const [error, setError] = useState(false);

    //uso de useMoney
    const [money, SelectMoney] = useMoney('Elige tu Moneda', '', MONEDAS);

    // uso de useCrypto
    const [crypto, SelectCrypto] = useCrypto('Elige tu Criptomoneda', '', listacripto);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const response = await axios.get(url);
            setListacripto(response.data.Data);
        }
        consultarAPI();
    }, [])

    const cotizarMoneda = (e) => {
        e.preventDefault();

        if (money === '' || crypto === '') {
            setError(true);
            return;
        }

        setError(false);

        setMoney(money);
        setCrypto(crypto);
    }

    return ( 
        <form
        onSubmit={cotizarMoneda}
        >

            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}
            
            <SelectMoney />

            <SelectCrypto />

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
     );
}

Formulario.propTypes = {
    setMoney: PropTypes.func.isRequired,
    setCrypto: PropTypes.func.isRequired
}
 
export default Formulario;