
import AreaForm from "./AreaForm";

const parede = {
    largura: 3,
    altura: 2.5,
    portas: 0,
    janelas: 0,
    rules: {
        porta: [0.8, 1.9],
        janela: [2.0, 1.2],
        alturaMinima: (parede) => {
            let min = 1, max = 15;
            if (parede.portas > 0) {
                min = porta[1] + 0.3;
            }
            return [min, max];
        }
    }
}

const App = () => (
    <div>
        <AreaForm initAreas={4} areaConfig={parede} />
        
    </div>
)

export default App;

