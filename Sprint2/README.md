

En esta fase tengo un HTML muy sencillo para ver que se recorre los elementos del Body correctamente. Para ello, me creo un HTML con unos
pocos elementos, como se muestra a continuación:

```
<body>    

    <h1> Prueba con los Elementos del DOM</h1>

    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Duis auctor dui vel ante imperdiet hendrerit. In sollicitudin ante ultrices,
        finibus elit sit amet, accumsan enim. Integer imperdiet tempor varius. Aliquam
        hendrerit ultrices ligula, eleifend bibendum ligula suscipit tempor. Suspendisse
        aliquam dictum tristique. Curabitur luctus nisi sit amet dolor varius, sed egestas
        purus tristique. Integer aliquam non lacus at pellentesque. Etiam vel nibh elementum
        odio scelerisque ullamcorper. Nam fermentum lorem sed auctor pretium. Pellentesque
        id scelerisque nisi.
    </p>

    <ol>
        <li> Primer elemento de la lista</li>
        <li> Segundo elemento de la lista</li>
        <li> Tercer elemento de la lista
            <ul>
                <li> Elemento 1 de la segunda lista</li>
            </ul>
        </li>
    </ol>

</body>
```

Como se observa, únicamente tenemos un <h1>, un <p> y una lista de elementos, donde el último elemento tiene a su vez anidado
otra lista con un único elemento.
Nuestro objetivo es que se recorra recursivamente todos los elementos del Body, de modo que en la consola nos los muestre todos, así como
sus nodos hijos, y éstos a su vez sus nodos hijos si los tuvieran, y así sucesivamente.
Para ello, hacemos una función recursiva donde le pasamos el propio Body y el nivel 0, de forma que dentro de esta función incrementamos 
el nivel y se llama a misma pasándole cada elemento del DOM que encuentre y el nivel de profundidad del DOM en el que se encuentra.

Para una primera demo, en  ### js/prueba-01.js nos devuelve una array de elementos, donde cada elemento tiene dos propiedades: el nodo
con todas sus propiedades, y el nivel en el que se encuentra dentro del nodo.

En una segunda demo, en ### js/prueba-02.js tenemos la función que se recorre recursivamente el Body que se muestra a continuación:

```
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
```

De forma que por consola nos muestra una coleccion de elementos con cuatro propiedades: el nombre del Nodo, el propio nodo con todos sus
atributos, el nivel de profundidad en el que se encuentra dentro del árbol del DOM y un array de sus nodos hijo si los tuviera (y cada uno 
estos hijos muestra estas cuatro mismas propiedades).









