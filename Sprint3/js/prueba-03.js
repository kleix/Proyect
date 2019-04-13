
/*
    Prueba-03 correspondiente al Sprint 3.
    En este caso, tenemos un HTML con cuatro elementos sin hijos, y mostramos la representacion en cajas A-Frame
    de cada uno de ellos, jugando con los margenes de cada uno para que se ajuste al tamaño y posicion al Body.
    Los colores de cada caja se sacan del documento JSON colores.json
 */

const colores = {
    BODY: "#000000",
    H1: "#BDB76B",
    H2: "#1E90FF",
    H3: "#A52A2A",
    P: "#4B0082",
    OL: "#F08080",
    UL: "#90EE90",
    LI: "#FFFF00"
};

AFRAME.registerComponent('comp-html', {

    schema: {
        color: {
            type: 'color',
            default: '#556B2F'
        },
        position: {
            type: 'array',
            default: [-18,-5,-15]
        }
    },

    init: function() {
        console.log("I'm ready!");
        let data = this.data;

        let body = document.querySelector("body");
        let tree = this.getTree(body, 0);

        console.log("----------------");
        console.log(tree);
        console.log("---------------");


        let entityComponent = document.querySelector("#comp-html");
        let scene = document.querySelector("a-scene");

        //let relativeX = data.position[0];

        // Obtengo la Posicion y Dimension del Body
        let caract_Body = this.obtenerPosBody(tree.node, tree.nivel);
        let entidadBody = this.obtenerBox(caract_Body,entityComponent);

        entityComponent.appendChild(entidadBody);
        this.leerTree(tree, entidadBody);

        console.log("End Init");
    },


    getTree: function(node,nivel) {
        // Si el elemento tiene hijos
        if( (node.hasChildNodes()) && node.id !== "myEmbeddedScene"){
            var children = [];
            nivel++;

            let elem_hijos = node.childNodes;
            elem_hijos.forEach( (element) => {
                var elemNode = this.getTree(element,nivel);

                if(elemNode !== undefined){
                    //console.log(elemNode);
                    children.push(elemNode);
                }
            });

            return {
                nodeName: node.nodeName,
                node: node,
                nivel: nivel,
                hijos: children,
            };
        }
    },

    leerTree: function (bodyDOM, entityPadre) {

        // Recorro los hijos del Body
        console.log("------------- Leer Tree ---------------");
        bodyDOM.hijos.forEach((elemento) => {
            console.log("Propiedades del nodo -> " + elemento.nodeName + " en el DOM");

            console.log("Altura -> " + elemento.node.clientHeight);
            console.log("Ancho -> " + elemento.node.clientWidth);
            console.log("OffsetTOP -> " + elemento.node.offsetTop);
            console.log("OffsetLeft ->" + elemento.node.offsetLeft);

            //elementoAnterior = bodyDOM.nodeName;

            // Obtengo la Posicion y Dimension del elemento
            let charac_elemento = this.obtenerPosiciones(elemento.node, elemento.nivel);
            let entidad = this.obtenerBox(charac_elemento);

            entityPadre.appendChild(entidad);
            if (elemento.hijos.length > 0){
                entityPadre = entidad;
            }

            this.leerTree(elemento, entityPadre);
        });

        console.log("------------- Fin Leer Tree ---------------");
    },

    /*
        Funcion que devuelve la posicion y las dimensiones del elemento
        que se le pasa como argumento
     */
    obtenerPosBody: function(elemento, nivel) {

        console.log("Caracteristicas del " + elemento.nodeName);
        console.log("Anchura DOM ---------------> " + elemento.clientWidth);
        console.log("Altura DOM ---------------> " + elemento.clientHeight);

        // Dimensiones de la caja
        let ladoX = elemento.clientHeight / 10;
        let ladoY = nivel;
        let ladoZ = elemento.clientWidth / 100;
        let dimension = [ladoX,ladoY,ladoZ];

        // Posicion de la Caja
        let posicionX = elemento.offsetTop;
        let posicionY = elemento.offsetLeft;
        let posicionz = 0;
        let pos = new THREE.Vector3(posicionX,posicionY,posicionz);

        return {
            dimensiones: dimension,
            posicion: pos,
            id: elemento.nodeName
        };
    },

    /*
        Devuelve las posiciones y dimesiones A-Frame del elemento
     */
    obtenerPosiciones: function(elemento, nivel) {

        // Dimensiones de la caja
        let ladoX = elemento.clientHeight / 10;
        let ladoY = nivel;
        let ladoZ = elemento.clientWidth / 100;
        let dimension = [ladoX,ladoY,ladoZ];

        // Lados del Body en propiedades A_Frame
        let alturaBody = (elemento.offsetParent.clientHeight /10) / 2;

        // Margin-Right del elemento si lo tuviera
        let marginRight = (elemento.offsetParent.clientWidth / 100) - (elemento.clientWidth /100) - (elemento.offsetLeft / 100);
        console.log("Margen derecho -> " + marginRight);

        // Distancia que por defecto se coloca el elemento respecto al eje Z
        let distanciaZ = ( (elemento.offsetParent.clientWidth / 100) /2 ) - ((elemento.clientWidth /100) / 2);
        let posZ = distanciaZ - marginRight;

        //let posicionX = anchuraBody  - (elemento.offsetTop /10) - (ladoX / 2);
        let posicionX = alturaBody  - (elemento.offsetTop /10) - (elemento.clientHeight / 10);
        let posicionY = ladoY;
        let posicionz;
        posicionz = posZ;
        let pos = new THREE.Vector3(posicionX,posicionY,posicionz);

        return {
            dimensiones: dimension,
            posicion: pos,
            id: elemento.nodeName
        };
    },

    /*
        Funcion que devuelve el color de la entidad correspondiente
     */
    giveColor: function(characElemento) {
        let color;
        console.log("------------ colores IN------------------------");

        // Propiedades de la constante colores
        const keys = Object.keys(colores);
        let clave;
        for (const key of keys) {
           if(key === characElemento.id){
               clave = key;
           }
        }
        if(clave !== null){
            color = colores[clave];
        }

        console.log("color devuelto -> " + color);
        console.log("------------ colores END ------------------------");
        return color;
    },

    /*
        Funcion que obtiene el color del documento JSON a partir del elemento dado
     */
    giveColorJson: function(characElemento, callback) {

        console.log("---------------Inicio JSON ------------------");
        let request = new XMLHttpRequest();
        request.open('GET', 'src/data/colores.json');
        request.responseType = 'json';
        request.send();

        let clave;
        let color = null;
        request.onload = function() {
           let response = request.response;
           let keys = Object.keys(response);
           for (let key of keys) {
                if(key === characElemento.id){
                    clave = key;
                }
            }
            if(clave !== null){
                color = response[clave];
            }
            callback(color);
        };
    },


    /*
        Funcion que Inserta la caja en la escena dado las dimensiones y posicion del
        elemento
     */
    obtenerBox: function(caractElemento) {

        console.log("---------- OBTENER BOX Inicio ------------------")
        let entidad = document.createElement('a-entity');

        console.log("Dimensiones caja Box A-Frame: ");
        console.log("lado X -> " + caractElemento.dimensiones[0] + ", lado Y -> " + caractElemento.dimensiones[1]
            + ", lado Z -> " + caractElemento.dimensiones[2]);

        console.log("Posicion");
        console.log("Posicion-X A-Frame-> " + caractElemento.posicion.getComponent(0));
        console.log("Posicion-Y A-Frame-> " + caractElemento.posicion.getComponent(1));
        console.log("Posicion-Z A-Frame-> " + caractElemento.posicion.getComponent(2));

        entidad.setAttribute("id", caractElemento.id);

        let ancho = caractElemento.dimensiones[0];
        let altura = caractElemento.dimensiones[1];
        let profundidad = caractElemento.dimensiones[2];
        let caracteristicas = "primitive: box; width: " + ancho + "; height: " + altura + "; depth: " + profundidad;
        entidad.setAttribute('geometry', caracteristicas);


        //let colorElemento = this.giveColor(caractElemento);
        this.giveColorJson(caractElemento, function(color) {
            if(color !== null) {
                if(typeof color === "string"){
                    let colorString = "color: " + color;
                    entidad.setAttribute('material', colorString);
                } else {
                    let valor = Math.round(Math.random() * (color.length - 0));
                    let colorString = "color: " + color[valor];
                    entidad.setAttribute('material', colorString);
                }
            }
        });

        let posX = caractElemento.posicion.getComponent(0);
        let posY = caractElemento.posicion.getComponent(1);
        let posZ = caractElemento.posicion.getComponent(2);
        entidad.object3D.position.set(posX,posY,posZ);

        console.log("---------- OBTENER BOX Fin -------------------")
        return entidad;
    }

});  // Fin componente