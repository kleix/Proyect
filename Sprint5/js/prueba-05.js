
//require('dist/html2canvas.min.js');
//import "./dist/html2canvas.min.js";
//import html2canvas from 'html2canvas';
//const html2canvas = require('html2canvas');
//require("dist/html2canvas.min.js");
//let html2canvas = require("dist/html2canvas.min.js");

// variable que lleva la cuenta de los elementos del DOM
var countDOM = 0;

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
        let entidadBody = this.obtenerBox(caract_Body,tree.node, elementoAnterior);

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

        // Recorro los hijos del Body
        console.log("-------------- Leer Tree --------------");
        bodyDOM.hijos.forEach( (elemento) => {
            console.log("Propiedades del nodo -> " + elemento.nodeName + " en el DOM");
            console.log("ClientHeight -> " + elemento.node.clientHeight);
            console.log("ClientWidth -> " + elemento.node.clientWidth);
            console.log("OffsetTOP -> " + elemento.node.offsetTop);
            console.log("OffsetLeft ->" + elemento.node.offsetLeft);
            console.log("ClientTop -> " + elemento.node.clientTop);
            console.log("ClientLeft ->" + elemento.node.clientLeft);

            // Obtengo la Posicion y Dimension del elemento
            let charac_elemento = this.obtenerPosiciones(elemento.node, elemento.nivel);
            let entidad = this.obtenerBox(charac_elemento, elemento.node, elementoAnterior);

            elementoAnterior = elemento.nodeName;

            // Insertar la entidad
            this.insertarEntidad(elemento, entidad);

            //Añadir textura
            //this.agregarTexturaHTML(charac_elemento, entidad);

            this.leerTree(elemento, entityPadre, elementoAnterior);
        });

        console.log("------------- Fin Leer Tree ---------------");
    },

    /**
     * Funcion que inserta una entidad dentro de su entidad padre
     */
    insertarEntidad: function(elemento, entidad) {
        let elementoPadre = "#" + elemento.node.parentNode.nodeName;

        // Cojo todos los elementos con ID el del elemento padre
        let elementoBodyDOM_all = document.querySelectorAll(elementoPadre);
        
        let elementoBodyDOM = elementoBodyDOM_all.item(elementoBodyDOM_all.length - 1);

        /*let elementoBodyDOM;
        if (elemento.node.childElementCount > 0) {
            let clase = "." + elementoPadre + "-hijos";
            console.log("Inserto el elemento " + elemento.node.nodeName + " en " + clase);
            elementoBodyDOM = document.querySelector(clase);


        } else {
            console.log("Inserto el elemento " + elemento.node.nodeName + " en " + elementoPadre);
            elementoBodyDOM = document.getElementById(elementoPadre);
            //elementoBodyDOM_all = document.querySelectorAll(elementoPadre);

            //console.log("ELEMENTO LENGTH ---> " + elementoBodyDOM_all.length);
            //elementoBodyDOM = elementoBodyDOM_all.item(elementoBodyDOM_all.length - 1);
            /*console.log("ELEMENTO ---> " + elementoBodyDOM_all.length);
            elementoBodyDOM2.forEach((elemento) => {
                console.log("ELEMENTO ---> " + elemento.className);
            });
        } */

        elementoBodyDOM.appendChild(entidad);
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
        let posicionY = ladoY / dimensionY;
        let posicionz = elemento.offsetLeft;
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

        let posicionX = this.obtenerCoordenadaX(elemento, elemento.parentNode);
        let posicionY = ladoY;
        let posicionz = this.obtenerCoordenadaZ(elemento.clientLeft, elemento.clientWidth, elemento.parentNode);
        let pos = new THREE.Vector3(posicionX,posicionY,posicionz);

        console.log("**** Coordenadas Aframe ****");
        console.log("X: " + posicionX + "    Y: " + posicionY + "    Z: " + posicionz);
        console.log("***************");

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

    /**
     * Funcion que renderiza un elemento del DOM, lo proyecta como imagen en un elemento CANVAS
     * y proyecta ese canvas como textura sobre un elemento A-Frame
     */
    agregarTexturaHTML: function(charac_elemento, entidad) {

        let nuevoCanvas = "canvas" + "_" + charac_elemento.id;

        html2canvas(document.querySelector("#" + charac_elemento.id)).then(canvas => {
            document.body.appendChild(canvas)
        });
    },


    ///////////////////////////////////////////////////////////////////////////
    //// Funciones de Cambios de Coordenadas para obtener las coordenadas A-Frame

    /**
     * Funcion que pasandole datos del elemento(Height,distancia con el Top y el padre) devuelve
     * la coordenada X de la entidad en A-Frame
     */
    obtenerCoordenadaX: function(elemento, parent) {

        let top = elemento.offsetTop;
        let height = elemento.clientHeight;
        let offTopParent = (parent.offsetTop / 10);

        //Altura del elemento padre / 2
        let parent_height = (parent.clientHeight / 10) / 2;
        console.log("X -> " + offTopParent + " + " + parent_height + " - " + (top / 10) + " - " + ((height / 10) / 2));

        return offTopParent + parent_height - (top / 10) - ((height / 10) / 2);
    },


    /**
     * Funcion que pasandole datos del elemento(Width,distancia con el lado Left del padre y el elemento adre) devuelve
     * la coordenada Z de la entidad en A-Frame
     */
    obtenerCoordenadaZ: function(client_left, client_width, parent) {

        //Altura del elemento padre / 2
        let parent_width = (parent.clientWidth /100) / 2;

        return (client_left /100) + ( (client_width /100) /2) - parent_width;
    },
    ///////////////////////////////////////////////////////////////////////////////



    /*
        Funcion que Inserta la caja en la escena dado las dimensiones y posicion del
        elemento
     */
    obtenerBox: function(caractElemento,elemento, elementoAnterior) {

        console.log("---------- OBTENER BOX Inicio ------------------");
        let entidad = document.createElement('a-entity');

        console.log("Dimensiones caja Box A-Frame: ");
        console.log("lado X -> " + caractElemento.dimensiones[0] + ", lado Y -> " + caractElemento.dimensiones[1]
            + ", lado Z -> " + caractElemento.dimensiones[2]);

        console.log("Posicion");
        console.log("PosicionX -> " + caractElemento.posicion.getComponent(0));
        console.log("PosicionY -> " + caractElemento.posicion.getComponent(1));
        console.log("PosicionZ -> " + caractElemento.posicion.getComponent(2));

        // SI el elemento tiene hijos, le añado una clase como propiedad
        if(elemento.childElementCount > 0 ) {
            let clase = caractElemento.id + "-hijos";
            entidad.setAttribute("class", clase);
        }

        //let valorID = caractElemento.id + "-" + countDOM;
        entidad.setAttribute("id", caractElemento.id);

        // Inserto el color a la entidad
        //console.log("Elemento anterior a " + elemento.nodeName + " es -> " + elementoAnterior);
        this.obtenerColor(caractElemento, elementoAnterior, entidad);

        let ancho = caractElemento.dimensiones[0];
        let altura = caractElemento.dimensiones[1];
        let profundidad = caractElemento.dimensiones[2];
        let caracteristicas = "primitive: box; width: " + ancho + "; height: " + altura + "; depth: " + profundidad;
        entidad.setAttribute('geometry', caracteristicas);

        let posX = caractElemento.posicion.getComponent(0);
        let posY = caractElemento.posicion.getComponent(1);
        let posZ = caractElemento.posicion.getComponent(2);
        entidad.object3D.position.set(posX,posY,posZ);

        console.log("---------- OBTENER BOX Fin -------------------");
        console.log('\n');
        return entidad;
    }

});  // Fin componente