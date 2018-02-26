AFRAME.registerComponent('histogram3', {

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
            default: [-3,-1.5,-8]
        }
    },

    init: function() {
        var datos = [3,5,7,9,11];
        var data = this.data;
        var entityEl = this.el;

        var relativeX, relativeY, relativeZ;

        relativeX = data.position[0];
        relativeZ = data.position[2];

        console.log("Posicion X: " + relativeX + ", postion Y: " + relativeY + " --- position Z: " + relativeZ);

        var alturaInicial = data.position[1];

        for(var i=0; i < datos.length; i++) {
            var height = datos[i];

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

            elBox.addEventListener('click', function () {
                this.setAttribute('color', 'red');
            });

            entityEl.appendChild(elBox);

            relativeX += 1;

        }

    }

});

