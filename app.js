const fs = require("fs");
const bicicletasArray = require("./datosBici");
const  dhBici = {
    bicicletas: bicicletasArray,
    buscarBici : function (id) {
        const resultado=this.bicicletas.find((bicicleta) =>{
            return bicicleta.id === id;
        });
        if (typeof resultado === 'undefined') {
            return null;
        }
        return resultado; 
    },
    venderBici :function (id) {
        const encontrado = this.buscarBici(id);
        if (encontrado === null){
            return "Bicicleta no encontrada";
        }else{
            encontrado.vendida = true;
            fs.writeFileSync("./bicicletas.json",JSON.stringify(this.bicicletas),"utf-8");
            return encontrado;
        }
    },
    biciParaLaVenta : function () {
        const noVendidas = this.bicicletas.filter((bicicleta) =>{
            return !bicicleta.vendida;
        });      
        return noVendidas;
    },
    totalDeVentas : function () {
        const montoVendido = this.bicicletas.map((bicicleta) =>{ 
            if (bicicleta.vendida) {
                return bicicleta.precio;
            }
            return 0;
        });
        return montoVendido.reduce((num,acum) =>num +acum);
    },
    biciPorRodado : function (rodado) {
        const rodadoElegido = this.bicicletas.filter((bicicleta) =>{
            return bicicleta.rodado===rodado;
        });      
        return rodadoElegido;
    },
    listarTodasLasBici :function () {
        const disponibles = this.biciParaLaVenta();
        disponibles.forEach(bici =>{
            console.log(`
                    ID: ${bici.id} 
                    Marca: ${bici.marca}
                    Modelo: ${bici.modelo}
                    Rodado: ${bici.rodado}
                    Año: ${bici.anio}
                    Color: ${bici.color}
                    Peso: ${bici.Peso}
                    Tipo: ${bici.tipo}
                    Precio: ${bici.precio}
                    \n
            `)
        });
    }
};

const process = require("process");
const comando = process.argv[2];
switch (comando.toLowerCase()) {
    case "buscar":
        const biciEncontrada= dhBici.buscarBici(40);
        console.log(biciEncontrada);
        break;
    case "vender":
        const ventaBici= dhBici.venderBici(32);
        console.log(ventaBici);
        break;
    case "disponibles":
        const noVendidas= dhBici.biciParaLaVenta();
        console.log(noVendidas);
        break;
    case "vendido":
        console.log(dhBici.totalDeVentas());
        break;
    case "rodado":
        console.log(dhBici.biciPorRodado(16));
        break;
    case "aumento":

        break;
    case "listar":
        console.log("Estas son nuestras bicis disponibles ");
        dhBici.listarTodasLasBici();
        break;
    default:
        console.log("Ups! cometiste un error de tipeo, volve a intentarlo...");
        break;
}