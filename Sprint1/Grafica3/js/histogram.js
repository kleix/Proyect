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

        var arrayX = [];
        var arrayZ = [];

        console.log("Posicion X: " + relativeX + ", postion Y: " + relativeY + " --- position Z: " + relativeZ);

        var alturaInicial = data.position[1];
        var posEjeZ = relativeZ;

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

            arrayX.push(relativeX);
            arrayZ.push(posEjeZ);

            elBox.addEventListener('mouseenter', function (event) {
                this.setAttribute('color' , '#556B2F');

                $( "#dialogo" ).dialog({
                    autoOpen: false,
                    modal: true
                });


                $( "#dialogo" ).html("<b>Altura: </b>" + "<h6>" + this.getAttribute('height') + "</h6>");

                $( "#dialogo" ).dialog( "option", "position", { my: "right top", at: "right top", of: "#escena" } );
                $("#dialogo").dialog("option", "width", 200);
                $("#dialogo").dialog("option", "height", 150);
                $( "#dialogo" ).dialog( "open" );


            });

            elBox.addEventListener('mouseleave', function (event) {
                this.setAttribute('color' , data.color);

                $( "#dialogo" ).dialog();
                $( "#dialogo" ).dialog( "close" );
            });


            entityEl.appendChild(elBox);

            relativeX += 1;
            posEjeZ = posEjeZ - 0.9;

        }

        this.crearEjex(arrayX,data,entityEl);
        this.crearEjeY(data, datosAltura[datosAltura.length -1], entityEl);
        this.crearEjeZ(data,arrayZ,entityEl);

    },


    /**
     * Funcion que crea el eje X
     *
     * @param arrayX
     * @param data
     * @param entityEl
     */
    crearEjex: function(arrayX, data, entityEl) {
        xMin = arrayX[0] - (data.width /2) - 0.1;
        console.log("Xmin: " + xMin);
        xMax = arrayX[arrayX.length - 1] + (data.width /2) + 0.1;

        var newLine = document.createElement("a-entity");

        newLine.setAttribute("line",{
            start:  {x:xMin, y:data.position[1], z: data.position[2] + 0.4},
            end:    {x:xMax, y:data.position[1], z:data.position[2] + 0.4},
            color: 'black'
        });
        entityEl.appendChild(newLine);
    },

    /**
     * Funcion que crea el eje Y
     *
     * @param data
     * @param ymax
     * @param entityEl
     */
    crearEjeY: function(data, ymax,entityEl) {
        yMin = data.position[1];
        yMax = ymax - 0.6;

        console.log("Ymax es : " + xMax);

        var newLine = document.createElement("a-entity");
        newLine.setAttribute("line" ,{
            start:  {x:data.position[0] -(data.width /2) - 0.1 ,  y:yMin,  z: data.position[2] + 0.4},
            end:    {x:data.position[0] - (data.width /2) - 0.1,  y:yMax,  z:data.position[2] + 0.4},
            color: 'black'
        });

        entityEl.appendChild(newLine);
    },


    crearEjeZ: function(data,arrayZ,entityEl) {
        zMin = arrayZ[0] + 0.4;
        zMax = arrayZ[arrayZ.length -1] - (data.width /2) - 9.5;

        console.log("zMin es : " + zMin +" y zMax es: " + zMax);

        var newLine = document.createElement("a-entity");
        newLine.setAttribute("line",{
            start:  {x:data.position[0] -(data.width /2) - 0.1 ,   y:data.position[1], z: zMin},
            end:    {x:data.position[0] -(data.width /2) - 0.1,    y:data.position[1], z: zMax},
            color: 'black'
        });
        entityEl.appendChild(newLine);
    }



});
