import styled from '@emotion/styled';
import React, { Fragment, useState } from 'react';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1rem;
`

const useMoney = (label, stateInicial, opciones) => {

    //Defino el state del custom hook
    const [state, setState] = useState(stateInicial)

    const SelectMoney = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
            onChange={e => setState(e.target.value)}
            value={state}
            >
                <option value="">-- Seleccione --</option>
                {opciones.map(opcion => (
                    <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                ))}
            </Select>
        </Fragment>
    )
    
    //Retorno el state, la interfaz que deseo imprimir y la fn que modifica el state
    return [state, SelectMoney, setState];

}

export default useMoney;