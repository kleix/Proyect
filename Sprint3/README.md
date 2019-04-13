Parto de un HTML sencillo que contiene cuatro elementos sin hijos, como se muestra a continuación:


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

    <p id="pruebaP">
        El quinto planeta era muy curioso. Era el más pequeño de todos, pues apenas cabían en él un farol
        y el farolero que lo habitaba. El principito no lograba explicarse para qué servirían allí, en el cielo,
        en un planeta sin casas y sin población un farol y un farolero.
    </p>

    <h3> Ejemplo de Encabezado h3 </h3>

    <div id="myEmbeddedScene">
        <a-scene id="escena" embedded>
            <a-entity camera look-controls position="0 3.6 33"></a-entity>
            <a-entity id="comp-html" comp-html></a-entity>
            <!--<a-sphere position="0 1.25 -5" radius="1.25" color="#EF2D5E"></a-sphere> -->
        </a-scene>
    </div>

</body>

```

El objetivo es partir de un HTML básico con elementos sin hijos para ver que la representación de cada entidad se realiza correctamente
y que se ajusta al tamaño de la entidad BODY. 

En primer lugar, mostramos el Body como una entidad sobre la que se van a situar el resto de elementos. Para ello, la colocamos en la
posición A-Frame (0,0,0) y hacemos un cambio en sus dimensiones para que se ajuste a la escena, de tal forma que las dimensiones de
la entidad son las siguientes:
        * El lado X se corresponde con la altura del elemento en el DOM dividido por un factor 10
        * El lado Y se corresponde al nivel del elemento en el árbol del DOM
        * EL lado Z se corresponde con la anchura del elemento en el DOM dividido por un factor 100
        
Para el resto de elementos, las dimensiones siguen estos mismos patrones, pero su posición es relativa al elemento padre, en este caso
el Body.
Esto se puede ver en **js/prueba-03.js**

El resultado final se muestra a continuación:

![alt text](C:/Users/assub/Desktop/Proyect/imagenes/sprint3-01.png)


    
