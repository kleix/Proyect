

// Recorro recursivamente el arbol del dom
var children = [];

function getTree (node, nivel){

    var elem = {};
    // Si el elemento tiene hijos
    if(node.hasChildNodes()){
        console.log("El elemento " + node.nodeName + " tiene hijos");
        nivel++;

        let elem_hijos = node.childNodes;
        elem_hijos.forEach( (element) => {
            console.log("Nodos -> " + element.nodeName);
            var elemNode = getTree(element,nivel);

            if(elemNode !== undefined){
                console.log(elemNode);
                children.push(elemNode);
            }

        });

        elem.node = node;
        elem.nivel = nivel;

        return elem;
    }
}

let body = document.querySelector("body");

var tree = getTree(body, 0);

console.log("Longitud arbol --> " + children.length);
children.forEach( (elemento) => {
   console.log("----------------");
   console.log(elemento);
});
