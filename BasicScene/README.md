Escena básica para A-FRAME

Primero añadimos una entidad con una primitiva standard de A-Frame como puede ser <a-box>
Debajo de esta primitva está <a-entity> con los componentes geometry y material.

Luego lo transformamos en una entidad en 3D añadiendo una rotación y una escala.

Las entidades pueden tener un unico padre y múltiples hijos. Los hijos heredan las propiedades(rotacion, escala,posición) de sus padres.

Para colocar nuestra caja en frente de nuestra cámara, la movemos -5 en el eje Z mediante el componente Position


Podemos usar componentes creados por otros desarroladores, incluyendo el script para ello

Podemos usar texturas de imagenes en la caja con una imagen, video o canvas usando el atributo src

Es recomendable usar el sistema de gestión de recursos, que hace más fácil al navegador cachear recursos como omagenes, modelos, etc.
Si definimos una imagen <img> en el AMS, luego three.js no tiene internamente que crear una <img>
Para ello:
       Añadimos  <a-assets> a la escena
       Definimos la textura como una <img> debajo de <a-assets>
       Damos a la <img> un id HTML
       Referenciamos el recurso usando el id

       <a-assets>
           <img id="boxTexture" src="https://i.imgur.com/mYmmbrp.jpg">
       </a-assets>

       <a-box src="#boxTexture" position="0 2 -5" rotation="0 45 45" scale="2 2 2"></a-box>


Podemos modificar la luz en la escena mediante <a-light>

Para añadir animación, tenemos <a-animation> como hijo de otra entidad, o con componentes de Animacion

Para añadir interacción:

    - Para añadir interacción en la caja --> Por ejemplo, cuando miremos la caja, incrementaremos el tamañano de la caja, y cuando demos click en ella, la haremos girar.

    El componente cursor proporciona por defecto la habilidad de clickear en entidades fijándose en la entidad que sea y dandole click al ratón.
    Para tener un cursor visible sujeto a la camara, colocamos en cursro como hijo de la camara.

    Una manera de manejar manualmente los eventos del cursor es añadir un eventListener

       <script>
         var boxEl = document.querySelector('a-box');
         boxEl.addEventListener('mouseenter', function () {
           boxEl.setAttribute('scale', {x: 2, y: 2, z: 2});
         });
       </script>
