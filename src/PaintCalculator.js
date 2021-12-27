import styled from "@emotion/styled";
import React from "react";

const Table = styled.table`
    & th, tr:nth-of-type(2n+1) {
        padding: 4px;
        background-color: #eee
    }
`

const PaintCalculator = ({canSizes, area}) => {
    
    const totalLitres = (area/5);
    let litres = totalLitres;
    const cansNeeded = [];

    const addCan = can => {
        litres -= can;
        cansNeeded.push(can);
    }
    canSizes.sort((a, b) => b - a)
    .forEach( can => {
        while (Math.ceil(litres) >= can) addCan(can);
    });

    const canTable = () => {
        const count = size => {
            let sum = 0;
            cansNeeded.forEach( can => {
                if (can === size) sum++
            })
            return sum;
        }
        return (
            <Table>
            <tbody>
                <tr>
                    <th>Tamanhos</th>
                    <th>Qnt.</th>
                </tr>
                {
                    canSizes.map( (size,id) => (
                        <tr key={id}>
                            <td>{size}L</td>
                            <td>{count(size)}</td>
                        </tr>
                    ))
                }
            </tbody>
            </Table>
        )
    }
    return (
        <div>
            {area ? <>
                <p>Área total: {area.toFixed(2)}m²</p>
                <p>Quantidade total de tinta: {totalLitres.toFixed(2)}L.</p>
                </>
             : <p>Algo de errado ocorreu!</p>}

            {canTable()}
            
            <p>
                { litres > 0 ? `faltam ${litres.toFixed(2)}L.` :
                `sobraram ${-1*litres.toFixed(2)}L.`
                }
            </p>   
            <p>* Uma porta possui 0,80m x 1,90m, enquanto uma janela 2,00m x 1,20m.</p> 
        </div>
    )
}

export default PaintCalculator;