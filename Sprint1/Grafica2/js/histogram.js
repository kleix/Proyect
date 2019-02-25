AFRAME.registerComponent('histogram', {

    schema: {
        width: {
            type: 'number',
            default: 0.6
        },
        depth: {
            type: 'number',
            default: 0.5
        },
        color: {
            type: 'color',
            default: '#C0C0C0'
        },
        position: {
            type: 'array',
            default: [-3,-1.5,-10]
        }
    },

    init: function() {
        var datosAltura = [2,3,4,5,6,7,8,9,10];
        var data = this.data;
        var entityEl = this.el;

        var relativeX, relativeY, relativeZ;

        relativeX = data.position[0];
        relativeZ = data.position[2];

        console.log("Posicion X: " + relativeX + ", postion Y: " + relativeY + " --- position Z: " + relativeZ);

        var alturaInicial = data.position[1];

        for(var i=0; i < datosAltura.length; i++) {
            var height = datosAltura[i];

            relativeY = alturaInicial + (height / 2);

            var elBox = document.createElement('a-box');
            elBox.setAttribute('width', data.width);
            elBox.setAttribute('height', height);
            elBox.setAttribute('depth', data.depth);
            elBox.setAttribute('color', data.color);

            elBox.setAttribute('position', {
                x: relativeX,
                y: relativeY,
                z: relativeZ
            });

            elBox.addEventListener('click', function (event) {
                console.log("ATRIBUTO: " + this.getAttribute('color'));

                if(this.getAttribute('color') == '#C0C0C0') {
                    this.setAttribute('color', 'red');
                } else {
                    this.setAttribute('color', '#C0C0C0');
                }

            });

            entityEl.appendChild(elBox);

            relativeX += 1;

        }

    }

});
