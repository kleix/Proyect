/**
 * Created by voiping_ptc11 on 06/02/2018.
 */

AFRAME.registerComponent('scale-on-mouseenter', {

    schema: {
        to: {
            default: '2.5 2.5 2.5'
        }
    },


    init: function(){
        var data = this.data;
        this.e1.setAttribute('mouseenter', function() {
            this.setAttribute('scale', data.to);
        });
    }

});
