// Parametric RAM ball compatible mounting arm
// defaults for 1" Ram 'B' ball using RAM standard hardware
// Nick Lucent
// Nick@allobaby.net

// user editable parameters: 
function getParameterDefinitions() {
  return [
    { name: 'armLength', caption: 'Length of mounting arm', type: 'float', initial: 55 },
    { name: 'armDiam', caption: 'Diameter of mounting arm', type: 'float', initial: 14 },
    { name: 'ballRadius', caption: 'Radius of ball mount', type: 'float', initial: 12.7 },
    { name: 'slotWidth', caption: 'Width of adjustment slot', type: 'float', initial: 12 },
    { name: 'boltDiam', caption: 'Diameter of bolt hole', type: 'float', initial: 4 },
    { name: 'nutTrapDiam', caption: 'Diameter of nut trap', type: 'float', initial: 7 },
    { name: 'nutTrapDepth', caption: 'Depth of nut trap', type: 'float', initial: 4 },
    {
      name: 'slotDir', 
      type: 'choice',
      caption: 'Orientation of adjustment slot',
      values: [0, 1],
      captions: ["Horizontal - Requires support", "Vertical - No support required"], 
      initial: 0
    },
    {
      name: 'endType', 
      type: 'choice',
      caption: 'End Type',
      values: [0, 1],
      captions: ["Flat", "Full Ball"], 
      initial: 0
    },
    {
      name: 'hollowCenter', 
      type: 'choice',
      caption: 'Arm Center',
      values: [0, 1],
      captions: ["Flat", "Raised"], 
      initial: 1
    },
    { name: 'hollowDepth', caption: 'Depth of center space', type: 'float', initial: 2 }
    
  ];
}

function NewArm(params) {
    // create base arm
    var arm = difference(
        // create base shape
        union(
            cylinder({r:params.armDiam, h:params.armLength, center:true}).rotateX(90),
            sphere({r:params.armDiam, center:true}).translate([0,-(params.armLength/2),0]),
            sphere({r:params.armDiam, center:true}).translate([0,(params.armLength/2),0]),
            cylinder({r:params.armDiam * '.75', h:params.armDiam * 2.1, center:true})
        ),
        // balls
        sphere({r:params.ballRadius, center:true}).translate([0,-(params.armLength/2),0]),
        sphere({r:params.ballRadius, center:true}).translate([0,(params.armLength/2),0]),
        // bolt hold
        cylinder({r:params.boltDiam, h:params.armDiam * 3, center:true}),
        // nut trap
        cylinder({r:params.nutTrapDiam, h:params.nutTrapDepth, fn:6, center:true}).translate([0,0,params.armDiam]),
        // remove bottom half
        cube({size:[params.armLength * 2, params.armLength * 2, params.armDiam * 2],center:[1,1,1]}).translate([0,0,-params.armDiam]),
        // shape sides
        sphere({r:params.armDiam * 2, h:params.armLength, center:true}).rotateX(90).translate([params.armDiam * 2.6,0,0]).scale(1.2,1,1),
        sphere({r:params.armDiam * 2, h:params.armLength, center:true}).rotateX(90).translate([-params.armDiam * 2.6,0,0]).scale(1.2,1,1)

    );
    
    if (params.hollowCenter > 0) {
        arm = difference(arm, cube({size:[params.armDiam, params.armLength * '.4', params.hollowDepth * 2], center:[1,1,1]}));
    }
    
    // chop ends if necessary
    if (params.endType < 1) {
        arm = difference(arm, cube({size:params.armDiam * 2,center:true}).translate([0,params.armLength*'.9',0]),cube({size:params.armDiam * 2,center:true}).translate([0,-params.armLength*'.9',0]));
    }
    
    // add vertical slot
    if (params.slotDir > 0) {
        return difference(arm,
                cube({size: [params.slotWidth, params.ballRadius * 1.5,60], round: true, center:true}).translate([0,params.armLength/1.5,0]),
                cube({size: [params.slotWidth, params.ballRadius * 1.5,60], round: true, center:true}).translate([0,-params.armLength/1.5,0])
        );
    }
    // add horizontal slot
    else {
       return difference(arm,
                cube({size: [60, params.ballRadius * 1.5,params.slotWidth], round: true, center:true}).translate([0,params.armLength/1.5,0]),
                cube({size: [60, params.ballRadius * 1.5,params.slotWidth], round: true, center:true}).translate([0,-params.armLength/1.5,0])
        );
    }
}


function main(params) {
    return NewArm(params);
    
    
}
