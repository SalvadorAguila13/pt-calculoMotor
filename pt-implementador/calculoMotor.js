// Tablas de montos mínimos f y m

const tablaMontosMinimosMasculino = {
    mesesPrimerEmpleo:[26, 27, 28, 29, Infinity],
      A: [100, 400, 900, 100, 600],
      B: [1000, 600, 1000, 1000, 1000],
      C: [400, 200, 200, 1000, 600],
      D: [400, 300, 500, 900, 1000],
    };
    const tablaMontosMinimosFemenino = {
        mesesPrimerEmpleo:[24, 25, 26, 27, Infinity],
        A: [800, 800, 800, 600, 200],
        B: [800, 700, 100, 600, 700],
        C: [200, 900, 700, 800, 100],
        D: [500, 1000, 600, 400, 700],
    };

    // Tablas de montos maximos f y m
    const tablaMontosMaximoMasculino = {
    mesesPrimerEmpleo:[26, 27, 28, 29, Infinity],
      A: [4900, 4700, 4600, 4600, 4500],
      B: [4700, 4400, 5000, 4400, 4900],
      C: [5000, 4700, 5000, 4200, 4600],
      D: [4400, 4700, 4300, 4900, 4300],
    };
    
    const tablaMontosMaximoFemenino= {
    mesesPrimerEmpleo:[24, 25, 26, 27, Infinity],
      A: [4000, 4200, 4100, 4200, 4500],
      B: [4700, 4200, 4500, 4300, 4400],
      C: [4600, 4900, 4600, 4700, 4000],
      D: [5000, 4900, 4700, 5000, 4300],
    };
    // console.log(typeof Infinity)

const calculoMotor = (tipoNomina, fechaPrimerEmpleo, genero) => {
        // Número de meses desde la fecha de primer empleo hasta la fecha actual
        const fechaActual = new Date();
        const mesesDesdePrimerEmpleo = Math.round((fechaActual - fechaPrimerEmpleo) / (1000 * 60 * 60 * 24 * 30));

        // Valor más cercano en la tabla de meses
        const mesesPrimerEmpleo = genero === 'm' ? tablaMontosMinimosMasculino.mesesPrimerEmpleo : tablaMontosMinimosFemenino.mesesPrimerEmpleo;
        //                                              anterior, actual                VAbsoluto(diferencia entre)
        const mesMasCercano = mesesPrimerEmpleo.reduce((previousValue, currentValue) => Math.abs(currentValue - mesesDesdePrimerEmpleo) < Math.abs(previousValue - mesesDesdePrimerEmpleo) ? currentValue : previousValue);
    
        // Tabla seleccionada según el género (m / f)
        const tablaMontosMinimos = genero === 'm' ? tablaMontosMinimosMasculino : tablaMontosMinimosFemenino;
        const tablaMontosMaximos = genero === 'm' ? tablaMontosMaximoMasculino : tablaMontosMaximoFemenino;
    
        // Buscar el monto mínimo y máximo en las tablas
        const montoMinimo = tablaMontosMinimos[tipoNomina][mesesPrimerEmpleo.indexOf(mesMasCercano)];
        const montoMaximo = tablaMontosMaximos[tipoNomina][mesesPrimerEmpleo.indexOf(mesMasCercano)];
    
        //todo: Calculo de la recomendación óptima de la línea de crédito
        // 𝑝1 = 𝑚𝑜𝑛𝑡𝑜 𝑚í𝑛𝑖𝑚𝑜 + √𝑚𝑜𝑛𝑡𝑜 𝑚á𝑥𝑖𝑚𝑜 − 𝑚𝑜𝑛𝑡𝑜 𝑚í𝑛𝑖𝑚�
        const p1 = montoMinimo + Math.sqrt(montoMaximo - montoMinimo);
        // 𝑝2 = 𝑚𝑜𝑛𝑡𝑜 𝑚í𝑛𝑖𝑚𝑜 + 0.0175 ∗ (𝑚𝑜𝑛𝑡𝑜 𝑚á𝑥𝑖𝑚𝑜 − 𝑚𝑜𝑛𝑡𝑜 𝑚í𝑛𝑖𝑚𝑜)
        const p2 = montoMinimo + 0.0175 * (montoMaximo - montoMinimo);
        // 𝑙í𝑛𝑒𝑎 𝑑𝑒 𝑐𝑟é𝑑𝑖𝑡𝑜 ó𝑝𝑡𝑖𝑚𝑎 = 𝑚𝑎𝑥(𝑝1, 𝑝2)
        const lineaDeCreditoOptima = Math.max(p1, p2);
    
        
        return {
            montoMinimo,
            montoMaximo,
            lineaDeCreditoOptima,
        };
    }
    
    console.log(calculoMotor('A', new Date('2022-06-12'), 'f'));
    console.log(calculoMotor('B', new Date('1993-12-30'), 'f'));
    console.log(calculoMotor('C', new Date('2020-09-19'), 'm'));
    console.log(calculoMotor('D', new Date('2015-01-15'), 'm'));
    