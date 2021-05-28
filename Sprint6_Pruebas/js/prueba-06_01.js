AFRAME.registerComponent('start', {

    init: function() {
        console.log("Start INIT");

        let canv = document.getElementById("canvas");
        let elemH1 = document.getElementById("elem1");
        let elemimg = document.getElementById("imagenMad");
        let entidadBox1 = document.getElementById("elemBox1");
        let entidadBox2 = document.getElementById("elemBox2");

        // Plano para la caja 1
        let entidadPlane = document.createElement('a-entity');
        // Canvas para el elemento h1
        html2canvas(elemH1, {canvas:canv, logging:true});

        console.log("Ancho box -> " + entidadBox1.getDOMAttribute('geometry').width);
        console.log("Altura box -> " + entidadBox1.getDOMAttribute('geometry').height);
        console.log("Profundidad box -> " + entidadBox1.getDOMAttribute('geometry').depth);
        let anchoBox = entidadBox1.getDOMAttribute('geometry').width;
        //let alturaBox = entidadBox1.getDOMAttribute('geometry').height;

        let ancho = entidadBox1.getDOMAttribute('geometry').depth;
        let altura = Number(anchoBox) / 2 ;
        let caracteristicas = "primitive: plane; width: " + ancho + "; height: " + altura;
        console.log("Ancho Plano -> " + ancho);
        console.log("Altura Plano -> " + altura);

        entidadPlane.setAttribute('geometry', caracteristicas);

        let posY = entidadBox1.object3D.position.getComponent(1) * 2 + 0.1;  // 1.550
        entidadPlane.object3D.position.set(0,posY,0);

        entidadPlane.object3D.rotation.set(
            THREE.Math.degToRad(-90),
            THREE.Math.degToRad(0),
            THREE.Math.degToRad(-90)
        );
        entidadPlane.object3D.scale.set(1,2,1);
        entidadPlane.setAttribute("material", "src:#canvas");
        entidadPlane.setAttribute("canvas-updater", '');
        entidadBox1.appendChild(entidadPlane);


        // Plano para la entidad Box 2
        console.log("------------------------------");
        let entidadPlane2 = document.createElement('a-entity');
        let canv2 = document.getElementById("canvas2");
        let scale = window.devicePixelRatio;
        console.log("Scala -> " + scale);
        let size = 200;
        canvas.style.width = size + "px";
        canvas.style.height = size + "px";
        //html2canvas(elemimg, {canvas:canv2, logging:true, allowTaint: true, width:300, height:200});
        html2canvas(elemimg, {canvas:canv2, logging:true, letterRendering: 1,allowTaint: true, useCORS: true});

        let anchoBox2 = entidadBox2.getDOMAttribute('geometry').width;
        let alturaBox2 = entidadBox2.getDOMAttribute('geometry').height;
        let deepBox2 = entidadBox2.getDOMAttribute('geometry').depth;
        console.log("Ancho box 2 -> " + anchoBox2);
        console.log("Altura box 2 -> " + alturaBox2);
        console.log("Profundidad box 2 -> " + deepBox2);

        let anchoPlane2 = deepBox2;
        let alturaPlane2 = Number(anchoBox2) / 2 ;
        let caracteristicasPlane2 = "primitive: plane; width: " + anchoPlane2 + "; height: " + alturaPlane2;
        console.log("Ancho Plano 2 -> " + anchoPlane2);
        console.log("Altura Plano 2 -> " + alturaPlane2);
        entidadPlane2.setAttribute('geometry', caracteristicasPlane2);

        let posXPlane2 = entidadBox2.object3D.position.getComponent(0);
        let posYPlane2 = entidadBox2.object3D.position.getComponent(1) * 2 + 0.1;
        let posZPlane2 = entidadBox2.object3D.position.getComponent(2);
        console.log("Posicion Plane2  -> " + posXPlane2 + ", " + posYPlane2 + ", " + posZPlane2);
        entidadPlane2.object3D.position.set(0,posYPlane2,0);

        entidadPlane2.object3D.rotation.set(
            THREE.Math.degToRad(-90),
            THREE.Math.degToRad(0),
            THREE.Math.degToRad(-90)
        );
        entidadPlane2.object3D.scale.set(1,2,1);
        entidadPlane2.setAttribute("material", "src:#canvas2");
        //entidadPlane2.setAttribute("src", "#canvas2");
        entidadPlane2.setAttribute("canvas-updater", '');
        entidadBox2.appendChild(entidadPlane2);
    }
});

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

