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

        let body = document.querySelector("body");
        let tree = this.getTree(body, 0);

        console.log("-------------------");
        console.log(tree);
        console.log("-------------------");


        let entityComponent = document.querySelector("#comp-html");

        // inicializo el elementoAnterior en el DOM
        var elementoAnterior = null;

        // Obtengo la Posicion y Dimensiones del Body
        let caract_Body = this.obtenerPosBody(tree.node, tree.nivel);
        let entidadBody = this.obtenerBox(caract_Body,elementoAnterior);

        // Añado la entidad Body a la escena
        entityComponent.appendChild(entidadBody);

        // Asignamos el elementoAnterior al Body
        elementoAnterior = entidadBody.id;

        // Leemos el resto del DOM
        this.leerTree(tree, entidadBody, elementoAnterior);

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

    leerTree: function (bodyDOM, entityPadre, elementoAnterior) {

        //et elementoBody = document.querySelector("#BODY");

        // Recorro los hijos del Body
        console.log("-------------- Leer Tree --------------");
        bodyDOM.hijos.forEach((elemento) => {
            console.log("Propiedades del nodo -> " + elemento.nodeName + " en el DOM");
            console.log("Altura -> " + elemento.node.clientHeight);
            console.log("Ancho -> " + elemento.node.clientWidth);
            console.log("OffsetTOP -> " + elemento.node.offsetTop);
            console.log("OffsetLeft ->" + elemento.node.offsetLeft);

            // Obtengo la Posicion y Dimension del elemento
            let charac_elemento = this.obtenerPosiciones(elemento.node, elemento.nivel);
            let entidad = this.obtenerBox(charac_elemento,elementoAnterior);

            elementoAnterior = elemento.nodeName;

            let elementoPadre = elemento.node.parentNode.nodeName;
            console.log("Entidad padre es ---> " + elementoPadre);

            //let elementoBodyDOM = document.querySelector("#" + elementoPadre);
            let elementoBodyDOM = document.getElementById(elementoPadre);
            console.log("Añado entidad " + entidad.id + " con hijos: " + elemento.hijos.length + " y lado X " + charac_elemento.dimensiones[0] +
                " a " + elementoPadre);
            elementoBodyDOM.appendChild(entidad);

            //console.log("************* " + "#" + elemento.nodeName);
             //let component = document.getElementById(elemento.nodeName).components["html-material"];
            //component.getDocument().body.innerHTML = 'Hello World!';
            //component.updateTexture();

            this.leerTree(elemento, entityPadre, elementoAnterior);
        });

        console.log("------------- Fin Leer Tree ---------------");
    },

    /*
        Funcion que devuelve la posicion y las dimensiones del elemento
        que se le pasa como argumento
     */
    obtenerPosBody: function(elemento, nivel) {

        let dimensionY = 1;

        console.log("pintarElementooo -- " + elemento.nodeName);
        console.log("Anchura ---------------> " + elemento.clientWidth);
        console.log("Altura ---------------> " + elemento.clientHeight);

        // Dimensiones de la caja
        let ladoX = elemento.clientHeight / 10;
        let ladoY = nivel;
        let ladoZ = elemento.clientWidth / 100;
        let dimension = [ladoX,ladoY,ladoZ];

        // Posicion de la Caja
        let posicionX = elemento.offsetTop;
        let posicionY = elemento.offsetLeft;
        let posicionz = ladoY / dimensionY;
        let pos = new THREE.Vector3(posicionX,posicionY,posicionz);

        return {
            dimensiones: dimension,
            posicion: pos,
            id: elemento.nodeName
        };
    },

    obtenerPosiciones: function(elemento, nivel) {

        // Dimensiones de la caja
        let ladoX = elemento.clientHeight / 10;
        let ladoY = nivel;
        let ladoZ = elemento.clientWidth / 100;
        let dimension = [ladoX,ladoY,ladoZ];

        // Lados del Body en propiedades A_Frame
        console.log("Altura " + elemento.offsetParent.nodeName + " -- " + elemento.offsetParent.clientHeight);
        let alturaBody = (elemento.offsetParent.clientHeight /10) / 2;

        // Margin-Right del elemento si lo tuviera
        let marginRight = (elemento.offsetParent.clientWidth / 100) - (elemento.clientWidth /100) - (elemento.offsetLeft / 100);
        console.log("Margen derecho -> " + marginRight);

        // Distancia que por defecto se coloca el elemento respecto al eje Z
        let distanciaZ = ( (elemento.parentNode.clientWidth / 100) /2 ) - ((elemento.clientWidth /100) / 2);
        let posZ = distanciaZ - marginRight;

        //let posicionX = anchuraBody  - (elemento.offsetTop /10) - (ladoX / 2);
        console.log("alturaBody: " + alturaBody + " - " + (elemento.offsetTop /10) + " - " + ( (elemento.clientHeight/2) / 10));

        console.log("POsicionZ: " + ((elemento.offsetParent.clientWidth / 100) /2 ) + " - " + ((elemento.clientWidth /100) / 2) + " - " + marginRight);



        let posicionX = alturaBody  - (elemento.offsetTop /10) - ( (elemento.clientHeight / 2) / 10);
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
    Funcion que obtiene el color del documento JSON a partir del elemento dado
 */
    giveColorJson: function(characElemento, elementoAnterior, callback) {

        let request = new XMLHttpRequest();
        request.open('GET', 'src/data/colores.json');
        request.responseType = 'json';
        request.send();

        let clave;
        let color = null;
        request.onload = function() {
            let response = request.response;
            let keys = Object.keys(response);

            // Si el elemento anterior en el DOM es el mismo, uso un color por defecto
            if(elementoAnterior === characElemento.id){
                color = response["defecto"];
            } else {
                for (let key of keys) {
                    if(key === characElemento.id){
                        clave = key;
                    }
                }
                if(clave !== null){
                    color = response[clave];
                }
            }

            callback(color);
        };
    },

    /*
        Funcion que analiza el elemento y obtiene el color de la entidad correspondiente
     */
    obtenerColor: function(caractElemento, elementoAnterior, entidad) {

        this.giveColorJson(caractElemento, elementoAnterior,function(color) {
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

    },

    /*
        Funcion que Inserta la caja en la escena dado las dimensiones y posicion del
        elemento
     */
    obtenerBox: function(caractElemento,elementoAnterior) {

        console.log("---------- OBTENER BOX Inicio ------------------")
        let entidad = document.createElement('a-entity');

        console.log("Dimensiones caja Box A-Frame: ");
        console.log("lado X -> " + caractElemento.dimensiones[0] + ", lado Y -> " + caractElemento.dimensiones[1]
            + ", lado Z -> " + caractElemento.dimensiones[2]);

        console.log("Posicion");
        console.log("PosicionX -> " + caractElemento.posicion.getComponent(0));
        console.log("PosicionY -> " + caractElemento.posicion.getComponent(1));
        console.log("PosicionZ -> " + caractElemento.posicion.getComponent(2));


        entidad.setAttribute("id", caractElemento.id);
        this.obtenerColor(caractElemento, elementoAnterior, entidad);



        let ancho = caractElemento.dimensiones[0];
        let altura = caractElemento.dimensiones[1];
        let profundidad = caractElemento.dimensiones[2];
        let caracteristicas = "primitive: box; width: " + ancho + "; height: " + altura + "; depth: " + profundidad;
        entidad.setAttribute('geometry', caracteristicas);

        //let componentMultiSRC = "srcs:#right,#left,#top,#bottom,#front,#back";
        //entidad.setAttribute('multisrc', componentMultiSRC);
        //if(caractElemento.id === "BODY") {
         //   let componentMultiSRC = "srcs:#right,#left,#top,#bottom,#front,#back";
         //   entidad.setAttribute('multisrc', componentMultiSRC);
       // }

        let posX = caractElemento.posicion.getComponent(0);
        let posY = caractElemento.posicion.getComponent(1);
        let posZ = caractElemento.posicion.getComponent(2);
        entidad.object3D.position.set(posX,posY,posZ);

        console.log("---------- OBTENER BOX Fin -------------------");
        console.log('\n');
        return entidad;
    }

});  // Fin componente