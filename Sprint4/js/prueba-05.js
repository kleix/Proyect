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
        let COLORS = ['#2338D9', '#B22222', '#23D978', '#BAD923', '#D923D3'];

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
        this.leerTree(tree, entidadBody, caract_Body);

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

    leerTree: function (bodyDOM, entityPadre, caract_Body) {

        // Recorro los hijos del Body
        console.log("----------------------------");
        bodyDOM.hijos.forEach((elemento) => {
            console.log("Propiedades del nodo -> " + elemento.nodeName);

            let altura = elemento.node.clientHeight;
            console.log("Altura -> " + elemento.node.clientHeight);

            let anchura = elemento.node.clientWidth;
            console.log("Ancho -> " + elemento.node.clientWidth);

            console.log("OffsetTOP -> " + elemento.node.offsetTop);
            console.log("OffsetLeft ->" + elemento.node.offsetLeft);

            // Obtengo la Posicion y Dimension del elemento
            let charac_elemento = this.obtenerPosiciones(elemento.node, elemento.nivel,caract_Body);
            let entidad = this.obtenerBox(charac_elemento, elemento.nivel);

            entityPadre.appendChild(entidad);
            if (elemento.hijos.length > 0){
                entityPadre = entidad;
            }

            this.leerTree(elemento, entityPadre, caract_Body);
        });

        console.log("----------------------------");
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

    obtenerPosiciones: function(elemento, nivel, carac_body) {

        let dimensionY = 1;

        // Dimensiones de la caja
        let ladoX = elemento.clientHeight / 10;
        let ladoY = nivel;
        let ladoZ = elemento.clientWidth / 100;
        let dimension = [ladoX,ladoY,ladoZ];

        // Posicion de la Caja
        let anchoBody = carac_body.dimensiones[0] / 2;
        console.log("Mitad Ancho Body --> " + anchoBody);
        //let posPadre = entidadPadre.getAttribute("position");
        //let geometryPadre = entidadPadre.getAttribute("geometry");
        //let alturaPadre = geometryPadre.height;


        let posicionX = (carac_body.posicion.getComponent(0) + anchoBody) - (ladoX / 2) - (elemento.offsetTop / 2);
        let posicionY = carac_body.posicion.getComponent(1) + nivel;
        let posicionz = carac_body.posicion.getComponent(2);
        let pos = new THREE.Vector3(posicionX,posicionY,posicionz);

        return {
            dimensiones: dimension,
            posicion: pos,
            id: elemento.nodeName
        };
    },


    /*
        Funcion que Inserta la caja en la escena dado las dimensiones y posicion del
        elemento
     */
    obtenerBox: function(caractElemento, nivel) {

        console.log("----------OBTENER BOX--------------------")
        let entidad = document.createElement('a-entity');
        //let entidad = document.createElement('a-box');


        console.log("Dimensiones: " + caractElemento.dimensiones[0] + ", " + caractElemento.dimensiones[1]
            + ", " + caractElemento.dimensiones[2]);

        console.log("PosicionX -> " + caractElemento.posicion.getComponent(0));
        console.log("PosicionY -> " + caractElemento.posicion.getComponent(1));
        console.log("PosicionZ -> " + caractElemento.posicion.getComponent(2));

        //entidad.setAttribute('width', caractElemento.dimensiones[0]);
        //entidad.setAttribute('height', caractElemento.dimensiones[1]);
        //entidad.setAttribute('depth', caractElemento.dimensiones[2]);

        entidad.setAttribute("id", caractElemento.id);
        entidad.setAttribute('geometry', {
            primitive: "box",
            width: caractElemento.dimensiones[0],
            height: caractElemento.dimensiones[1],
            depth: caractElemento.dimensiones[2],
        });
        //entidad.setObject3D('box');

        entidad.setAttribute('color', );
        let posX = caractElemento.posicion.getComponent(0);
        let posY = caractElemento.posicion.getComponent(1);
        let posZ = caractElemento.posicion.getComponent(2);
        entidad.object3D.position.set(posX,posY,posZ);

        //scene.appendChild(entidad);
        console.log("--------------------------------------")
        return entidad;
    }

});  // Fin componente