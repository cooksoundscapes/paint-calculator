
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

    return (
        <div>
            <p>Para {area}m², são necessários {totalLitres}L de tinta;</p>

            <p>Para {totalLitres}L de tinta, é preciso de latas com 
                {cansNeeded.map( (c,i) => <span key={i}>{c}L, </span>)}.</p>

            <p>
                { litres > 0 ? `faltam ${litres.toFixed(2)}L.` :
                `sobraram ${-1*litres.toFixed(2)}L.`
                }
            </p>    
        </div>
    )
}

export default PaintCalculator;