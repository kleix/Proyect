# Sprint 1

En los primeros pasos del Sprint 1, el objetivo es entrar en el terreno de las gráficas de barras y empezar a jugar 
con las posibilidades que nos da A-Frame en la visualización de los datos que obtenemos de dichas gráficas.

## Gráfica 1

Esta primera parte del Sprint 1 consta de tres documentos HTML que muestran diferentes gráficas cada uno con pequeñas variaciones en
cada una de ellas.

* [Ejemplo-1](https://kleix.github.io/Proyect/Sprint1/Grafica1/index.html) - Este primer ejemplo muestra un histograma o una gráfica de barras
en 3D mediante A-Frame. En ella se puede ver varias gráficas solapadas entre sí, con barras de diferentes tamaños y cargando los datos a través de 
un documento JSON. 

* [Ejemplo-2](https://kleix.github.io/Proyect/Sprint1/Grafica1/index2.html) - En este segundo ejemplo ya intento ir paso a paso y muestro una única
gráfica de barras, en la que cada barra tiene diferente altura, pero todas las barras empiezan en la misma posición y. 
Son unicamente cuatro barras, donde la altura de cada barra se introcuce en el propio documento js mediante un array de datos.

* [Ejemplo-3](https://kleix.github.io/Proyect/Sprint1/Grafica1/index3.html) - En este tercer ejemplo cojo la gráfica del ejemplo 2 y le añado alguna 
pequeña variante, como la entidad camera en el documento HTML, para poder controlar las acciones del raton, de modod que cuando el cursor se coloca en alguna
de las barras, cambia el color de ésta.


## Gráfica 2

En este segunda gráfica el objetivo es añadir alguna pequeña variante más a la gráfica 1. En este caso, añado más barras a la gráfica, en la que el tamaño de la barra va en escala ascendente.
Además le añado la entidad 'cursor' dentro de la entidad 'a-camera', para controlar las acciones del ratón pero sin necesidad de mostrar
el cursor como pasaba en el ejemplo anterior.
```
<a-camera>
    <a-entity cursor= "rayOrigin: mouse" ></a-entity>
</a-camera>
```

Así, cada vez que se hace click en alguna de las barras de la gráfica, ésta cambia de color al rojo. Y cuando se vuelve a hacer click en la barra de color rojo, vuelve a su color original.

Puedes visualizar la gráfica aquí: [Gráfica 2](https://kleix.github.io/Proyect/Sprint1/Grafica2/index.html)


## Gráfica 3

Partiendo de la gráfica 2, añado los ejex X,Y,Z a la gráfica, mantengo el mismo efecto al ratón, pero cambiando el color cada vez que hace click a alguna de las barras, e incorporo un cuadro de diálogo en la ventana superior derecha que me informa de la altura de la barra en la que está situado el cursor del ratón. 

 [Gráfica 3](https://kleix.github.io/Proyect/Sprint1/Grafica3/index.html)

