
Parto de un HTML similar al sprint anterior.

En este sprint, modifico las ecuaciones del cambio de coordenadas, de modo que obtengo la coordenada X de la entidad 
A-Frame a partir de propiedades del propio elemento como el offsetTop (distancia del elemento actual respecto al borde superior del nodo offsetParent) o el clientHeight (ALtura del elemento), además de propiedades del elemento padre como su altura u offsetTop.

```
obtenerCoordenadaX: function(elemento, parent) {

        let top = elemento.offsetTop;
        let height = elemento.clientHeight;
        let offTopParent = (parent.offsetTop / 10);

        //Altura del elemento padre / 2
        let parent_height = (parent.clientHeight / 10) / 2;
        
        return offTopParent + parent_height - (top / 10) - ((height / 10) / 2);
},

```

Igualmente, para obtener la coordenada Z de la entidad A-Frame:

```
obtenerCoordenadaZ: function(client_left, client_width, parent) {

        let parent_width = (parent.clientWidth /100) / 2;

        return (client_left /100) + ( (client_width /100) /2) - parent_width;
},

```

También modifico la manera de insertar la entidad dentro de su elemento padre, ya que en la representación del Sprint 4 ocurría que por ejemplo el elemento UL, hijo del elemento LI, a la hora de insertarlo lo metía en el primer LI que encontraba, de manera que lo añadia al primer elemento de la lista, en vez de al tercero, como corresponde. 

El resultado final se muestra a continuación:


<img width="722" alt="sprint5-01" src="https://user-images.githubusercontent.com/5637203/59214047-8ef15480-8bb6-11e9-9aea-79523b2637d1.PNG">

<img width="596" alt="sprint5-02" src="https://user-images.githubusercontent.com/5637203/59214068-987abc80-8bb6-11e9-83e8-ab71914dd479.PNG">


<img width="261" alt="sprint5-03" src="https://user-images.githubusercontent.com/5637203/59214077-9e709d80-8bb6-11e9-9ff9-107025ac9656.PNG">


<img width="369" alt="sprint5-04" src="https://user-images.githubusercontent.com/5637203/59214097-a7616f00-8bb6-11e9-9141-435a1788ab19.PNG">





