// title: kury iso throttle ring
// author: Nick Lucent
// license: Creative Commons CC BY


function getParameterDefinitions() {
  return [
    { name: 'inner_rad', caption: 'Inner radius of ring', type: 'float', initial: 17.75 },
    { name: 'outer_rad', caption: 'Outer radius of ring', type: 'float', initial: 21.25 },
    { name: 'height', caption: 'Height of ring', type: 'float', initial: 7 },
    { name: 'gap_shift', caption: 'Just play with it to get the right gap value. Lower numbers = bigger gap', type: 'float', initial: 90.8 }
  ];
}

function main(params) {
    var ring = base_ring(params);
    
    // 
    var slot = torus({ fni:3, fno:32,roti:180, ri:4, ro:params.outer_rad+2 }).translate([0,0,3.5]);
    return difference(ring,slot);
}

function base_ring(params) {
        return difference(
            // outer ring
            cylinder({r:params.outer_rad, h:params.height, center:[true,true,false]}),
            // inner ring
            cylinder({r:params.inner_rad, h:params.height + 1, center:[true,true,false]}),
            // triangle to make cutout //91.5 too tight, lower number is wider gap
            torus({ fni:4, fno:3,roti:45, ro:80, ri:30 }).translate([-params.gap_shift,0,0])
            );
}