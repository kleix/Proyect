
window.onload = function() {

    // Recorro recursivamente el arbol del dom
    function getTree (node, nivel){

        // Si el elemento tiene hijos
        if(node.hasChildNodes()){
            //console.log("El elemento " + node.nodeName + " tiene hijos");
            var children = [];
            nivel++;

            let elem_hijos = node.childNodes;
            elem_hijos.forEach( (element) => {
                //console.log("Nodos -> " + element.nodeName);
                var elemNode = getTree(element,nivel);

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
    }


    function leerTree(bodyDOM) {
        // Recorro los hijos del Body
        bodyDOM.forEach( (elemento) => {
            console.log("Propiedades del nodo -> " + elemento.nodeName);
            console.log("Altura -> " + elemento.node.clientHeight);
            console.log("Ancho -> " + elemento.node.clientWidth);
            console.log("OffsetTOP -> " + elemento.node.offsetTop);

            //var box = document.createElement('a-box');
            //box.setAttribute('width', "1");
            //box.setAttribute('height', "5");
            //scene.appendChild(box);

            leerTree(elemento.hijos);
        });
    }


    let body = document.querySelector("body");
    let tree = getTree(body, 0);

    console.log("----------------");
    console.log(tree);
    console.log("---------------");

    //var sceneE1 = document.createElement('a-scene');
    leerTree(tree.hijos);
};

