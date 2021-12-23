
import { useState } from "react/cjs/react.development";
import AreaForm from "./AreaForm";
import PaintCalculator from "./PaintCalculator";

const parede = {
    largura: 3,
    altura: 2.5,    
    portas: 0,
    janelas: 0,
    totalArea: (parede) => {
        return (parede.largura * parede.altura) - parede.areaVazada(parede);
    },
    areaVazada: (parede) => {
        const {porta, janela} = parede.rules;
        return (
            porta[0] * porta[1] * parede.portas +
            janela[0] * janela[1] * parede.janelas
        );
    },
    rules: {
        porta: [0.8, 1.9],
        janela: [2.0, 1.2],
        metragemMinima: (parede) => {
            let min = 1;
            let maxAlt = 15/parede.largura;
            let maxLarg = 15/parede.altura;
            if (parede.portas > 0) {
                min = parede.rules.porta[1] + 0.3;
            }
            parede.altura = Math.max(min, parede.altura);
            parede.largura = Math.max(min, parede.largura);
            if (parede.altura > maxAlt || parede.largura > maxLarg) {
                return [["largura", "altura"], "Área máxima de 15m² excedida"];
            }
            return null;
        },
        maximaAreaVazada: (parede) => {
            const areaSolida = parede.altura * parede.largura;
            if (areaSolida/2 < parede.areaVazada(parede)) {
                return [["portas", "janelas"], "Atenção: área vazada máxima excedida."]; 
            }
            return null;
        }
    }
}

const latasDeTinta = [0.5, 2.5, 3.6, 18];

const App = () => {
    const [total, setTotal] = useState(0);

    return (
        <div>
            <AreaForm initAreas={4} areaConfig={parede} getTotal={setTotal} />
            <PaintCalculator canSizes={latasDeTinta} area={total} />
        </div>
    )
}

export default App;

