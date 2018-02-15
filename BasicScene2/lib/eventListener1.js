/**
 * Created by voiping_ptc11 on 14/02/2018.
 */


var sphere = document.querySelector('a-sphere');

sphere.addEventListener('mouseenter', function() {
    sphere.setAttribute('scale' , {x:1.2, y:1.2, z:1.2});
});

sphere.setAttribute('mouseleave', function() {
   sphere.setAttribute('scale', {x:1, y:1, z:1});
});