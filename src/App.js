
import AreaForm from "./AreaForm";

const parede = {
    largura: 3,
    altura: 2.5,    
    portas: 0,
    janelas: 0,
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
            const {porta, janela} = parede.rules;
            const areaVazada = 
                porta[0] * porta[1] * parede.portas +
                janela[0] * janela[1] * parede.janelas;
            const areaSolida = parede.altura * parede.largura;
            if (areaSolida/2 < areaVazada) {
                return [["portas", "janelas"], "Atenção: área vazada máxima excedida."]; 
            }
            return null;
        }
    }
}

const App = () => (
    <AreaForm initAreas={4} areaConfig={parede} />
)

export default App;

