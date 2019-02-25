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
