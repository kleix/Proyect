
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
        let tree = this.getTree(body, 0);       // Obtenemos el arbol del DOM

        console.log("-------------------");
        console.log(tree);
        console.log("-------------------");


        let entityComponent = document.querySelector("#comp-html");

        // inicializo el elementoAnterior en el DOM
        let elementoAnterior = null;

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

    /**
     * Se encarga de obtener recursivamente el arbol del DOM con todos sus elementos
     * @param node      Nodo padre que se le pasa para leer sus hijos. Empieza por el BODY
     * @param nivel     Nivel de profundidad del nodo. Empieza por el 0
     * @returns {{nodeName: *, node: *, hijos: Array, nivel: *}}
     */
    getTree: function(node,nivel) {
        // Si el elemento tiene hijos
        if( (node.hasChildNodes()) && node.id !== "myEmbeddedScene"){
            let children = [];
            nivel++;

            let elem_hijos = node.childNodes;
            elem_hijos.forEach( (element) => {
                let elemNode = this.getTree(element,nivel);

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

    /**
     * Funcion que se encarga de leer los elementos hijos del Body
     * @param bodyDOM
     * @param entityPadre = Body
     * @param elementoAnterior
     */
    leerTree: function (bodyDOM, entityPadre, elementoAnterior) {


        // Recorro los hijos del Body
        console.log("-------------- Leer Tree --------------");
        bodyDOM.hijos.forEach( (elemento) => {
            console.log("Propiedades del nodo -> " + elemento.nodeName + " en el DOM");
            console.log("ClientHeight -> " + elemento.node.clientHeight);
            console.log("ClientWidth -> " + elemento.node.clientWidth);
            console.log("OffsetTOP -> " + elemento.node.offsetTop);
            console.log("OffsetLeft ->" + elemento.node.offsetLeft);
            console.log("offsetHeight ->" + elemento.node.offsetHeight);
            console.log("ClientTop -> " + elemento.node.clientTop);
            console.log("ClientLeft ->" + elemento.node.clientLeft);

            // Obtengo la Posicion y Dimension del elemento
            let charac_elemento = this.obtenerPosiciones(elemento.node, elemento.nivel);
            let entidad = this.obtenerBox(charac_elemento, elemento.node, elementoAnterior);

            // Obtener entidad contenedora
            let charac_elementoCont = this.obtenerPosContenedor(elemento.node, elemento.nivel);
            let entidadContenedora = this.obtenerBoxContenedor(elemento.node,charac_elementoCont, entidad);

            elementoAnterior = elemento.nodeName;

            // Insertar la entidad
            //entidadContenedora.appendChild(entidad);
            this.insertarEntidad(elemento, entidad, entidadContenedora);

            //Añadir textura
            //console.log("Agrego textura a " + elemento.nodeName);
            //this.agregarTexturaHTML(charac_elemento, entidad);

            this.leerTree(elemento, entityPadre, elementoAnterior);
        });

        console.log("------------- Fin Leer Tree ---------------");
    },

    /**
     * Funcion que inserta una entidad dentro de su entidad padre
     */
    insertarEntidad: function(elemento, entidad, entidadContenedora) {
        let elementoPadre = "#" + elemento.node.parentNode.nodeName;
        //console.log("Insertar Entidad - " + entidad.getAttribute("id"));
        //console.log("Insertar Entidad - Elemento Padre: " + elementoPadre);

        // Cojo todos los elementos con ID el del elemento padre
        let elementoBodyDOM_all = document.querySelectorAll(elementoPadre);

        let elementoBodyDOM = elementoBodyDOM_all.item(elementoBodyDOM_all.length - 1);

        console.log("Insertar Entidad - elementoBodyDOM: " + elementoBodyDOM.nodeName + " - " + elementoBodyDOM.getAttribute("id"));
        elementoBodyDOM.appendChild(entidadContenedora);
        elementoBodyDOM.appendChild(entidad);
    },


    /*
        Funcion que devuelve la posicion y las dimensiones del elemento
        que se le pasa como argumento
     */
    obtenerPosBody: function(elemento, nivel) {

        let dimensionY = 1;

        console.log("pintarElemento: " + elemento.nodeName);
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

    /**
     * Obtiene las dimensiones y posicion del elemento
     * @param elemento
     * @param nivel
     * @returns {{posicion: THREE.Vector3, dimensiones: *[], id: *}}
     */
    obtenerPosiciones: function(elemento, nivel) {

        // Dimensiones de la caja
        let ladoX = elemento.clientHeight / 10;
        let ladoY = nivel;
        let ladoZ = elemento.clientWidth / 100;
        let dimension = [ladoX,ladoY,ladoZ];

        let posicionX = this.obtenerCoordenadaX(elemento, elemento.parentNode);
        let posicionY = ladoY;
        //let posicionz = this.obtenerCoordenadaZ(elemento.clientLeft, elemento.clientWidth, elemento.parentNode);
        let posicionz = this.obtenerCoordenadaZ(elemento, elemento.parentNode);
        let pos = new THREE.Vector3(posicionX,posicionY,posicionz);

        console.log("**** Caracteristicas Elemento " + elemento.nodeName + " *******");
        console.log("X: " + posicionX + "    Y: " + posicionY + "    Z: " + posicionz);
        console.log("Dimensiones: " + dimension[0] + ", " + dimension[1] + ", " + dimension[2]);
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
            if(characElemento.id === "BODY") {
                color = response["BODY"];
            } else {
                color = response["defecto"];
            }
            /**if(elementoAnterior === characElemento.id){
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
            }  **/
            //color = response["defecto"];

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

        let elemento = "#" + charac_elemento.id;

        // Cojo todos los elementos con ID el del elemento
        let elementoBodyDOM_all = document.querySelectorAll(elemento);

        let elementoBodyDOM = elementoBodyDOM_all.item(elementoBodyDOM_all.length - 1);

        html2canvas(elementoBodyDOM).then(canvas => {
            //document.body.appendChild(canvas)
            let base64image = canvas.toDataURL("image/png", 0.9);
            entidad.setAttribute('src', base64image);
        });
    },


    /**
     * Funcion que añade un plano con mismo tamaño
     que el box, colocado justo encima, y cuyo material es el html renderizado del elemento correspondiente.
     El plano tiene de ancho la profundidad de la caja, y de altura el ancho de la caja
     */
    addPlano(caractElemento, elemento) {

        // Obtengo el elemento  assets para el canvas
        let assets = document.querySelector("#asst");

        // Creo un canvas para el elemento correspondiente
        let elemCanvas = document.createElement('canvas');
        let valorAleatorio = (Math.random() * (100)).toString();
        elemCanvas.setAttribute("id", "canvas".concat(valorAleatorio));
        let anchoCanvas = "300px";
        let alturaCanvas = "150px";
        //elemCanvas.setAttribute('width', '300px');
        //elemCanvas.style.width = '300px';
        //elemCanvas.setAttribute("height", alturaCanvas);

        //elemento.style.transform = elemento.style.webkitTransform = 'scale(2)';
        //elemento.style.transformOrigin = elemento.style.webkitTransformOrigin = '0 0';

        let idelemCanvas = elemCanvas.getAttribute("id");

        //console.log("******* Se añade plano para el " + caractElemento.id);
        console.log("TagName - " + elemento.tagName);

        if(elemento.tagName !== "BODY") {
            let plane = document.createElement('a-entity');

            console.log("******** ADD PLANO ********* ");
            if(elemento.childNodes != null) {
                console.log("ChildNodes: " + elemento.childNodes.length);
            }
            // SI el elemento tiene dentro la imagen de la Universidad URJC
            if(elemento.childNodes != null && elemento.childNodes.length > 2) {
                if(elemento.childNodes[1].id === "ImagenUni") {
                    console.log(" ------------------- " + elemento.childNodes[1].id + "-----------------");
                    elemento = document.getElementById("ImagenUni");
                } else if(elemento.childNodes[1].id === "portal-logo") {
                    console.log(" ------------------- " + elemento.childNodes[1].id + "-----------------");
                    elemento = document.getElementById("portal-logo");
                }
            }
            //if(elemento.node.childNodes[1].id === "ImagenUni") {

            //}

            let ancho = caractElemento.dimensiones[2];
            let altura = Number(caractElemento.dimensiones[0]) / 2;
            let caracteristicas = "primitive: plane; width: " + ancho + "; height: " + altura;
            //console.log("Ancho Plano -> " + ancho + " ---- " + "Altura Plano -> " + altura);
            plane.setAttribute('geometry', caracteristicas);

            //let canv = document.getElementById("canvas");
            //console.log("Renderizar elemento " + elemento.nodeName);
            //html2canvas(elemento, {canvas:elemCanvas, logging:true});
            //html2canvas(elemento, {canvas:elemCanvas, logging:true, scale: 10, width:elemento.clientWidth, height:elemento.clientHeight});
            //html2canvas(elemento, {canvas:elemCanvas, width:anchoCanvas, height:alturaCanvas});
            html2canvas(elemento, {canvas:elemCanvas, logging:true, letterRendering: 1,allowTaint: true});
            //html2canvas(elemento, {canvas:elemCanvas, allowTaint: true, width:elemento.clientWidth, height:elemento.clientHeight});
            assets.appendChild(elemCanvas);

            plane.object3D.scale.set(1,2,1);
            plane.object3D.rotation.set(
                THREE.Math.degToRad(-90),
                THREE.Math.degToRad(0),
                THREE.Math.degToRad(-90)
            );
            let posX = 0;
            let posY = (caractElemento.posicion.getComponent(1) / 2) + 0.5;
            //let posY = 1.5;
            let posZ = 0;
            plane.object3D.position.set(posX,posY,posZ);

            plane.setAttribute("material", "src:#" + idelemCanvas);
            plane.setAttribute("canvas-updater", '');
            //console.log("***********************");

            return plane;
        } else {
            return null
        }
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

        if(elemento.parentNode != null) {
            offTopParent = 0;
        }

        //Altura del elemento padre / 2
        let parent_height = (parent.clientHeight / 10) / 2;
        console.log("Calcular X -> " + offTopParent + " + " + parent_height + " - " + (top / 10) + " - " + ((height / 10) / 2));

        return offTopParent + parent_height - (top / 10) - ((height / 10) / 2);
    },


    /**
     * Funcion que pasandole datos del elemento(Width,distancia con el lado Left del padre y el elemento adre) devuelve
     * la coordenada Z de la entidad en A-Frame
     */
    obtenerCoordenadaZ: function(elemento, elementoPadre) {
        //Altura del elemento padre / 2
        //let parent_width = (parent.clientWidth /100) / 2;
        //return parent_width - ( (client_left /100) + ((client_width /100) /2) );

        //OffsetLeft Elemento
        let offsetLeft = elemento.offsetLeft / 100;
        // Ancho elemento
        let ancho = (elemento.clientWidth /100) /2;
        // Ancho Padre /2
        let anchoPadre = (elementoPadre.clientWidth /100) / 2;

        console.log("Calcular Z -> " + anchoPadre + " - " + ancho + " + " + offsetLeft);
        return (ancho + offsetLeft) - anchoPadre;
    },
    ///////////////////////////////////////////////////////////////////////////////


    ////// Calcular propedades y obtener entidad de la caja contenedora //////////////

    /**
     * Funcion que calcula el ancho y alto de la caja contenedora, asi como su posicion A-Frame
     */
    obtenerPosContenedor: function(elemento, nivel) {

        // Obtenemos las propiedades CSS del elemento
        let style = window.getComputedStyle(elemento);

        // Calcular la altura de la Caja contenedora
        let marginTop = parseInt(style.marginTop);
        //let borderTop = parseInt(style.borderTop);
        let paddingTop = parseInt(style.paddingTop);
        let marginBottom = parseInt(style.marginBottom);
        //let borderBottom = parseInt(style.borderBottom);
        let paddingBottom = parseInt(style.paddingBottom);
        //let altura_margin = parseInt(margin);
        console.log("MarginTop: " + marginTop + " -- borderTop: " + " -- paddingTop: " + paddingTop);
        let altura = marginTop  + paddingTop + elemento.clientHeight + marginBottom  + paddingBottom;

        // Calcular el Ancho de la Caja contenedora
        let marginLeft = parseInt(style.marginLeft);
        //let borderLeft = parseInt(style.borderLeft);
        let paddingLeft = parseInt(style.paddingLeft);
        let marginRight = parseInt(style.marginRight);
        //let borderRight = parseInt(style.borderRight);
        let paddingRight = parseInt(style.paddingRight);
        let ancho = marginLeft  + paddingLeft + elemento.clientWidth + marginRight  + paddingRight;

        console.log("BOX CONTENDOR: Ancho - " + ancho + " - Altura: " + altura);
        //console.log("margin: " + margin);
        //console.log("altura eleme: " + elemento.clientHeight);
        //console.log("altura: " + altura);

        let ladoX = altura / 10;
        let ladoY = nivel;
        let ladoZ = ancho / 100;
        let dimension = [ladoX,ladoY,ladoZ];

        let posicionX = this.obtenerCoordenadaX(elemento, elemento.parentNode);
        let posicionY = ladoY;
        let posicionz = this.obtenerCoordenadaZ(elemento, elemento.parentNode);
        let pos = new THREE.Vector3(posicionX,posicionY,posicionz);

        //console.log("**** Coordenadas Aframe Contenedor ****");
        //console.log("X: " + posicionX + "    Y: " + posicionY + "    Z: " + posicionz);
        //console.log("***************");

        return {
            dimensiones: dimension,
            posicion: pos,
            id: elemento.nodeName
        };
    },


    /**
     * Funcion que obtiene la entidad contenedora con las dimensiones de la caja que contiene al elemento
     */
    obtenerBoxContenedor: function(elemento, caractElemento, entidadPrimaria) {

        //console.log("---------- OBTENER BOX Inicio ------------------");
        let entidad = document.createElement('a-entity');

        //console.log("Dimensiones caja Box COntenedor A-Frame: ");
        //console.log("lado X -> " + caractElemento.dimensiones[0] + ", lado Y -> " + caractElemento.dimensiones[1]
        //    + ", lado Z -> " + caractElemento.dimensiones[2]);

        //console.log("Posicion");
        //console.log("PosicionX -> " + caractElemento.posicion.getComponent(0));
        //console.log("PosicionY -> " + caractElemento.posicion.getComponent(1));
        //console.log("PosicionZ -> " + caractElemento.posicion.getComponent(2));

        // Color de la entidad primaria
        let color = "#8B0000";
        let opacidad = 0.15;

        let materiaAttr = "color: " + color + "; opacity: " + opacidad;
        entidad.setAttribute('material', materiaAttr);

        let ancho = caractElemento.dimensiones[0];
        let altura = caractElemento.dimensiones[1];
        let profundidad = caractElemento.dimensiones[2];
        let caracteristicas = "primitive: box; width: " + ancho + "; height: " + altura + "; depth: " + profundidad;
        entidad.setAttribute('geometry', caracteristicas);

        let posX = caractElemento.posicion.getComponent(0);
        let posY = caractElemento.posicion.getComponent(1);
        let posZ = caractElemento.posicion.getComponent(2);
        entidad.object3D.position.set(posX,posY,posZ);

       // console.log("---------- OBTENER BOX Fin -------------------");
        return entidad;

    },

    ///////////////////////////////////////////////


    /*
        Funcion que crea la caja dado las dimensiones y posicion del
        elemento
     */
    obtenerBox: function(caractElemento,elemento, elementoAnterior) {

        //console.log("---------- OBTENER BOX Inicio ------------------" + elemento.nodeName);
        let entidad = document.createElement('a-entity');

        console.log("Dimensiones caja Box A-Frame: " + caractElemento.id);
        console.log("lado X -> " + caractElemento.dimensiones[0] + ", lado Y -> " + caractElemento.dimensiones[1]
            + ", lado Z -> " + caractElemento.dimensiones[2]);

        // SI el elemento tiene hijos, le añado una clase como propiedad
        if(elemento.childElementCount > 0 ) {
            let clase = caractElemento.id + "-hijos";
            entidad.setAttribute("class", clase);
        }

        //let valorID = caractElemento.id + "-" + countDOM;
        entidad.setAttribute("id", caractElemento.id);

        // Inserto el plano superpuesto con la imagen del canvas renderizado
        let entityPlane = this.addPlano(caractElemento, elemento);
        console.log("entityPlane - " + entityPlane);


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
        console.log("Pos X -> " + posX + ", Pos Y -> " + posY + ", Pos Z -> " + posZ);
        entidad.object3D.position.set(posX,posY,posZ);

        console.log("---------- OBTENER BOX Fin -------------------");
        //console.log('\n');
        if(entityPlane != null){
            entidad.appendChild(entityPlane);
        }
        return entidad;
    }

});  // Fin componente

AFRAME.registerComponent('canvas-updater', {
    dependencies: ['geometry', 'material'],

    tick: function () {
        let el = this.el;
        let material;

        material = el.getObject3D('mesh').material;
        if (!material.map) { return; }
        material.map.needsUpdate = true;
    }
});