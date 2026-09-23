/*export const car = {

    car_model: {
        vertices: [   
            //Car bumper
            { x:  -2.5,  y: 0,  z: 1}, //Top left - 0
            { x:  2.5,  y: 0,  z: 1}, //Top right - 1
            { x:  -2.5,  y: -2,  z: 1}, //Bottom left - 2
            { x:  2.5,  y: -2,  z: 1}, //Bottom right - 3
            //Car rear
            { x:  -2.5,  y: 0.5,  z: 1.2}, //Left - 4
            { x:  2.5,  y: 0.5,  z: 1.2}, //Right - 5
            //Car window
            { x:  -2.5,  y: 2.2,  z: 1.5}, //Left - 6
            { x:  2.5,  y: 2.2,  z: 1.5}, //Right - 7
            //Left wheel
            { x:  -2,  y: -1.5,  z: 1}, //Top left - 8
            { x:  -2,  y: -2.5,  z: 1}, //Bottom left - 9
            { x:  -1,  y: -2.5,  z: 1}, //Bottom right - 10
            { x:  -1,  y: -1.5,  z: 1}, //Top right - 11
            //Right wheel
            { x:  1,  y: -1.5,  z: 1}, //Top left - 12
            { x:  1,  y: -2.5,  z: 1}, //Bottom left - 13
            { x:  2,  y: -2.5,  z: 1}, //Bottom right - 14
            { x:  2,  y: -1.5,  z: 1}, //Top right - 15
            //License plate
            { x:  -0.5,  y: -1,  z: 1}, //Top left - 16
            { x:  0.5,  y: -1,  z: 1}, //Top right - 17
            { x:  -0.5,  y: -2,  z: 1}, //Bottom left - 18
            { x:  0.5,  y: -2,  z: 1}, //Bottom right - 19
            //Left lights
            { x:  -2.5,  y: -0.75,  z: 1}, //Bottom Left - 20
            { x:  -2,  y: -0.75,  z: 1}, //Bottom Middle - 21
            { x:  -1.5,  y: -0.75,  z: 1}, //Bottom Right - 22
            { x:  -2,  y: 0,  z: 1}, //Top Middle - 23
            { x:  -1.5,  y: 0,  z: 1}, //Top Right - 24
            //Right lights
            { x:  2.5,  y: -0.75,  z: 1}, //Bottom Right - 25
            { x:  2,  y: -0.75,  z: 1}, //Bottom Middle - 26
            { x:  1.5,  y: -0.75,  z: 1}, //Bottom Left - 27
            { x:  2,  y: 0,  z: 1}, //Top Middle - 28
            { x:  1.5,  y: 0,  z: 1}, //Top Left - 29
            //Car top
            { x:  -2.5,  y: 3,  z: 3}, //Left - 30
            { x:  2.5,  y: 3,  z: 3}, //Right - 31
        ],
        
        edges: [
            //Car bumper
            [0, 1], //Top left -> Top right
            [1, 3], //Top right -> Bottom right
            [2, 3], //Bottom left -> Bottom right
            [0, 2], //Top left -> Bottom left
            //Car rear
            [0, 4],
            [1, 5],
            [4, 5],
            //Car window
            [4, 6], //Car Rear Left -> Car Window Left
            [5, 7], //Car Rear Right -> Car Window Right
            [6, 7], //Car Window Left -> Car Window Rightr
            /*Left wheel
            [8, 9], //Top left -> Bottom left
            [9, 10], //Bottom left -> Bottom right
            [10, 11], //Bottom right -> Top right
            //Right wheel
            [12, 13], //Top left -> Bottom left
            [13, 14], //Bottom left -> Bottom right
            [14, 15], //Bottom right -> Top right
            //License plate
            [16, 17], //Top left -> Top right
            [16, 18], //Top left -> Bottom left
            [17, 19], //Top right -> Bottom right
            [18, 19], //Bottom left -> Bottom right
            //Left Lights
            [20, 21], //Bottom Left -> Bottom Middle
            [21, 23], //Bottom Middle -> Top Middle
            [21, 22], //Bottom Middle -> Bottom Right
            [22, 24], //Bottom Right -> Top Right
            //Right Lights
            [25, 26], //Bottom Right -> Bottom Middle
            [26, 28], //Bottom Middle -> Top Middle
            [26, 27], //Bottom Middle -> Bottom Left
            [27, 29], //Bottom Left -> Top Left
            //Car Top
            [6, 30], //Car Window Left -> Car Top Left
            [7, 31], //Car Window Right -> Car Top Right
            [30, 31], //Car Top Left -> Car Top Right

        ],
    },
}*/

const colors = {
    body:       "#B5121B", // Main glossy red
    bodyLight:  "#D62832", // Surfaces facing more toward light
    bodyDark:   "#7A0C12", // Recesses / downward-facing surfaces
    bodyDeep:   "#4A070A", // Very dark red accents

    window:     "#263238", // Dark blue-gray glass
    windowLight:"#455A64", // Slightly lighter glass
    trim:       "#181A1B", // Black/dark trim
    bumper:     "#5A0A0E"  // Dark bumper/recess color
};

const hazardColors = {
    signFront:       "#E87516", // Bright reflective orange
    signFrontLight:  "#F58A1F", // Highlighted orange
    signSide:        "#B84E0A", // Darker orange edge
    signSideLight:   "#D76510", // Medium orange edge
    signBottom:      "#873607", // Dark underside
    signBack:        "#9E4309", // Muted orange back

    support:         "#343434", // Dark metal support
    supportLight:    "#505050", // Lit support surface
    supportDark:     "#202020"  // Shadowed support
};

export const player = {

    player_car: {
        vertices: [
            //Upper bumper
            { x:  -6,  y: 0,  z: 10}, //Top Left - 0
            { x:  6,  y: 0,  z: 10}, //Top Right - 1
            { x:  -6,  y: -2,  z: 10}, //Bottom Left - 2
            { x:  6,  y: -2,  z: 10}, //Bottom Right - 3
            //Upper Bumper Outer
            { x:  -6,  y: 0.5,  z: 10.01}, //Top Left- 4
            { x:  6,  y: 0.5,  z: 10.01}, //Top Right - 5
            { x:  -6.5,  y: -2.5,  z: 10.01}, //Bottom Left - 6
            { x:  6.5,  y: -2.5,  z: 10.01}, //Bottom Right - 7
            //Spoiler
            { x:  -4.5,  y: 2.5,  z: 10}, //Back Top Left - 8     
            { x:  4.5,  y: 2.5,  z: 10}, //Back Top Right - 9
            { x:  -6.5,  y: 0.5,  z: 11}, //Front Bottom Left - 10
            { x:  6.5,  y: 0.5,  z: 11}, //Front Bottom Right - 11
            { x:  -5,  y: 2.5,  z: 11}, //Front Top Left - 12
            { x:  5,  y: 2.5,  z: 11}, //Front Top Right - 13
            //Rear Window
            { x:  -2,  y: 0.5,  z: 11.1}, //Bottom Left - 14
            { x:  2,  y: 0.5,  z: 11.1}, //Bottom Right - 15
            { x:  -4.5,  y: 1.7,  z: 11.5}, //Middle Left - 16
            { x:  4.5,  y: 1.7,  z: 11.5}, //Middle Right - 17
            { x:  -4,  y: 3,  z: 13}, //Top Left - 18
            { x:   4,  y: 3,  z: 13}, //Top Right - 19
            //Top
            { x:  -4,  y: 3,  z: 17}, //Front Left - 20
            { x:  4,  y: 3,  z: 17}, //Front Right - 21
            //Left Side Window
            { x:  -5.5,  y: 1.7,  z: 18}, //Front Bottom - 22
            { x:  -5.75,  y: 1.7,  z: 12}, //Rear Bottom - 23
            //Left Mirror
            { x:  -8,  y: 1.5,  z: 16.5}, //Top Left - 24
            { x:  -6,  y: 1.5,  z: 16.5}, //Top Right - 25
            { x:  -8,  y: 0.5,  z: 16.5}, //Bottom Left - 26
            { x:  -6,  y: 0.5,  z: 16.5}, //Bottom Right - 27 */
            //Left Front
            { x:  -6.75,  y: 1,  z: 22}, //Left - 28
            { x:  -6.75,  y: 1.5,  z: 18}, //Rear Left - 29
            //Right Front
            { x:  6.75,  y: 1,  z: 22}, //Right - 30
            { x:  6.75,  y: 1.5,  z: 18}, //Rear Right - 31
            //Right Side Window
            { x:  5.5,  y: 1.7,  z: 18}, //Front Bottom - 32
            { x:  5.75,  y: 1.7,  z: 13.5}, //Rear Bottom - 33
            //Lower Bumper
            { x:  -6.5,  y: -3,  z: 10}, //Top Left - 34
            { x:  6.5,  y: -3,  z: 10}, //Top Right - 35
            { x:  -6.5,  y: -5,  z: 10}, //Bottom Left - 36
            { x:  6.5,  y: -5,  z: 10}, //Bottom Right - 37
            //Lower Bumper Left
            { x:  -7.1,  y: -3,  z: 11}, //Left Side Top - 38
            { x:  -7,  y: -5,  z: 10.8}, //Left Side Bottom - 39
            //Left Side
            { x:  -7.25,  y: 0.75,  z: 10.3}, //Top Right point of left wheel - 40
            { x:  -6.5,  y: 1,  z: 13.5}, //Midpoint of left side - 41
            { x:  -6.25,  y: 1.5,  z: 18}, //Side intersection with hood - 42
            //Right Side
            { x:  7.25,  y: 0.75,  z: 10.3}, //Top of right wheel - 43
            { x:  6.5,  y: 1,  z: 13.5}, //Midpoint of right side - 44
            { x:  6.25,  y: 1.5,  z: 18}, //Side intersection with hood - 45
            //Lower Bumper Right
            { x:  7.1,  y: -3,  z: 11}, //Right Side Top - 46
            { x:  7,  y: -5,  z: 10.8}, //RIght Side Bottom - 47
            //Front Bumper Right
            { x:  7.1,  y: -1,  z: 25}, //Lower Right - 48
            //Bottom Right POint
            { x:  7.1,  y: -5,  z: 26}, //Bottom Right POint - 49
             //Front Bumper Left
            { x:  -7.1,  y: -1,  z: 25}, //Lower Left - 50
            //Bottom Left POint
            { x:  -7.1,  y: -5,  z: 26}, //Bottom Left POint - 51
            //Left Back Wheelwell
            { x:  -6.7,  y: -1,  z: 11}, //Middle Rear - 52
            { x:  -6.7,  y: -0.5,  z: 11.7}, //Top - 53
            { x:  -6.7,  y: -1,  z: 12.5}, //MIddle Front - 54
            { x:  -7.1,  y: -5,  z: 13.3}, //Low Front - 55
            //Left Front Wheelwell
            { x:  -6.7,  y: -1,  z: 21.2}, //Middle Rear - 56
            { x:  -6.7,  y: -0.5,  z: 21.4}, //Top - 57
            { x:  -6.7,  y: -1,  z: 22.2}, //MIddle Front - 58
            { x:  -7.1,  y: -5,  z: 23}, //Low Front - 59
            { x:  -7.1,  y: -5,  z: 21.2}, //Low Rear - 60
            //Right Back Wheelwell
            { x:  6.7,  y: -1,  z: 11}, //Middle Rear - 61
            { x:  6.7,  y: -0.5,  z: 11.7}, //Top - 62
            { x:  6.7,  y: -1,  z: 12.5}, //MIddle Front - 63
            { x:  7.1,  y: -5,  z: 13.3}, //Low Front - 64
            //Right Front Wheelwell
            { x:  6.7,  y: -1,  z: 21.2}, //Middle Rear - 65
            { x:  6.7,  y: -0.5,  z: 21.4}, //Top - 66
            { x:  6.7,  y: -1,  z: 22.2}, //MIddle Front - 67
            { x:  7.1,  y: -5,  z: 23}, //Low Front - 68
            { x:  7.1,  y: -5,  z: 21.2}, //Low Rear - 69
            //Extra Left Side Vertices
            { x:  -7.1,  y: -3,  z: 12.9}, //Bevel for left side - 70
            { x:  -7.1,  y: -3,  z: 21.2}, //Bevel for left side front wheel - 71
            { x:  -7.1,  y: -3,  z: 23}, //Bevel for left side front of front wheel - 72
            { x:  -7.1,  y: -3,  z: 26}, //Bevel for left front - 73
            //Extra Right Side Vertices
            { x:  7.1,  y: -3,  z: 12.9}, //Bevel for right side - 74
            { x:  7.1,  y: -3,  z: 21.2}, //Bevel for right side front wheel - 75
            { x:  7.1,  y: -3,  z: 23}, //Bevel for right side front of front wheel - 76
            { x:  7.1,  y: -3,  z: 26}, //Bevel for right front - 77
        ],

        edges: [
            //Upper Bumper
            [0, 1], //Upper Bumper Top Left -> Top Right
            [0, 2], //Upper Bumper Top Left -> Bottom Left
            [1, 3], //Upper Bumper Top Right -> Bottom Right
            [2, 3], //Upper Bumper Bottom Left -> Bottom Right
            //Upper Bumper Outer
            [4, 5], //Top Left -> Top Right
            [4, 6], //Top Left -> Bottom Left
            [5, 7], //Top Right -> Bottom Right
            [6, 7], //Bottom Left -> Bottom Right
            //Spoiler
            [4, 8], //Upper Bumper Outer Top Left -> Spoiler Back Top Left
            [5, 9], //Upper Bumper OUter Top Right -> Spoiler Back Top Right
            [8, 9], //Spoiler Back Top Left -> Back Top Right
            [4, 10], //Outer Bumper Top Left -> Spoiler Front Bottom Left
            [5, 11], //Outer Bumper Top Right -> Spoiler Front Bottom Right
            [8, 12], //Rear Top Left -> Front Top Left
            [9, 13], //Back Top Right -> Front Top Right
            [12, 13], //Front Top Left -> Front Top Right
            [10, 12], //Front Bottom Left -> Front Top Left
            [11, 13], //Front Bottom Right -> Front Top Right
            //Rear Window
            [14, 15], //Bottom Left -> Bottom Right
            [14, 16], //Bottom Left -> Middle Left
            [16, 18], //Middle Left -> Top Left
            [15, 17], //Bottom Right -> Middle Right
            [17, 19], //Middle Right -> Top Right
            [18, 19], //Top Left -> Top Right
            //Top
            [18, 20], //Rear Window Top Left -> Front Left
            [19, 21], //Rear Window Top Right -> Front Right
            [20, 21], //Front Left -> Front Right
            //Left Window
            [20, 22], //Front Left of Top -> Front Bottom of Left Window
            [22, 23], //Front Bottom of Left Window -> Rear Bottom of Left Window
            //Right Window
            [21, 32], //Front Right of Top -> Front Bottom of Right Window
            [32, 33], //Front Bottom of Right Window -> Rear Bottom of Right Window
                        /*Left Mirror
                        [24, 25], //Top Left -> Top Right
                        [24, 26], //Top Left -> Bottom Left
                        [25, 27], //Top Right -> Bottom Right
                        [26, 27], //Bottom Left -> Bottom Right*/
            //Front
            [28, 29], //Front Left -> Rear left of hood
            [29, 22], //Rear left of hood -> Front Bottom of Left Window
            [30, 31], //Front Right -> Rear right of hood
            [31, 32], //Rear right of hood -> Front Bottom of Right Window
            [28, 30], //Front Left -> Front Right
            //Lower Bumper Middle
            [34, 35], //Top Left -> Top Right
            [34, 36], //Top Left -> Bottom Left
            [35, 37], //Top Right -> Bottom Right
            [36, 37], //Bottom Left -> Bottom Right
            //Lower Bumper Left
            [34, 38],
            [36, 39],
            [38, 39],
            //
            [23, 16], //Left Window Bottom Middle -> Back Window Middle Left
            [33, 17], //Right Window Bottom Middle -> Back Window Middle Right
            //Lower Bumper Right
            [35, 46],
            [37, 47],
            [46, 47],
            //Front Hood Right
            [30, 48],
            [48, 77],
            [77, 49],
            //
            [28, 50],
            //Left Side
            [10, 29],
            //Right Side
            [11, 31],
            //Left Back Wheel
            [38, 52],
            [52, 53],
            [53, 54],
            [54, 70],
            [70, 55],
            //Left Front Wheel
            [56, 57],
            [57, 58],
            [58, 72],
            [72, 59],
            [60, 71],
            [71, 56],
            //Lower Left Side
            [55, 60],
            //Lower Left Side in front of wheel
            [51, 59],
            //Right Back Wheel
            [46, 61],
            [61, 62],
            [62, 63],
            [63, 74],
            [74, 64],
            //Right Front Wheel
            [65, 66],
            [66, 67],
            [67, 76],
            [76, 68],
            [65, 75],
            [75, 69],
            //Lower Right Side
            [64, 69],
            //Lower Right Side in front of wheel
            [49, 68],
            //Left Edge
            [70, 71], //In between wheels second lowest line
            [72, 73], //Front of wheels second lowest line
            [50, 73], //
            [73, 51],
            //Right Edge
            [74, 75],
            [76, 77],

            //Extra lines for triangles
            [52, 4],
            [53, 10],
            [6, 34],
            [54, 56],
            [57, 29],
            [58, 50],
            [16, 4],
            [23, 10],
            [14, 4],

            [61, 5],
            [62, 11],
            [7, 35],
            [63, 65],
            [66, 31],
            [67, 48],
            [17, 5],
            [33, 11],
            [15, 5],



        ],

        triangles: [

            /*[0, 1, 3, "gray"], //Inner Upper Bumper
            [0, 3, 2, "gray"], //Inner Upper Bumper

            [4, 5, 7, "red"], //Outer Upper Bumper
            [4, 7, 6, "red"], //Outer Upper Bumper

            // Left spoiler side
            [4, 8, 12, "red"],
            [4, 12, 10, "red"],

            // Right spoiler side
            [5, 11, 13, "red"],
            [5, 13, 9, "red"],

            // Spoiler top
            [8, 9, 13, "red"],
            [8, 13, 12, "red"],


            // Lower rear window
            [14, 15, 17, "gray"],
            [14, 17, 16, "gray"],

            // Upper rear window
            [16, 17, 19, "gray"],
            [16, 19, 18, "gray"],

            //Roof
            [18, 19, 21, "red"],
            [18, 21, 20, "red"],

            //Left Side Window
            [20, 22, 23, "gray"],
            [20, 23, 16, "gray"],
            [20, 16, 18, "gray"],

            //Right Side Window
            [21, 32, 33, "gray"],
            [21, 33, 17, "gray"],
            [21, 17, 19, "gray"],

            //Front
            [28, 30, 31, "darkred"],
            [28, 31, 29, "darkred"],

            // Main lower bumper
            [34, 35, 37, "red"],
            [34, 37, 36, "red"],

            //Side Connectors around rear window
            [14, 15, 5, "darkred"],
            [14, 5, 4, "darkred"],


            //Left Side
            [34, 36, 39, "red"], //Forgot to label but it looks correct so who cares
            [34, 38, 39, "red"],
            [6, 34, 38, "red"],
            [6, 38, 52, "red"],
            [4, 6, 52, "red"],
            [4, 10, 52, "red"],
            [4, 14, 16, "darkred"],
            [55, 60, 71, "red"],
            [55, 70, 71, "red"],
            [56, 70, 71, "red"],
            [54, 56, 70, "red"],
            [53, 56, 57, "red"],
            [53, 57, 29, "red"],
            [53, 54, 56, "red"],
            [10, 29, 53, "red"],
            [51, 59, 73, "red"],
            [59, 72, 73, "red"],
            [50, 72, 73, "red"],
            [50, 58, 72, "red"],
            [28, 29, 50, "red"],
            [29, 50, 58, "red"],
            [22, 29, 53, "darkred"],
            [10, 22, 53, "darkred"],
            [10, 22, 23, "darkred"],
            [4, 10, 16, "darkred"],
            [10, 16, 23, "darkred"],

            //Right Side
            [37, 46, 47, "red"], //Lower right bumper
            [35, 37, 46, "red"], //Lower right bumper
            [7, 35, 46, "red"], //In between lower and upper bumper
            [7, 46, 61, "red"], //Upper bumper right side
            [5, 7, 61, "red"], //Upper bumper right side
            [5, 11, 61, "red"], //Right Side
            [64, 69, 75, "red"], //Right Side bottom
            [64, 74, 75, "red"], //Right side bottom
            [65, 74, 75, "red"], //Right side middle
            [63, 65, 74, "red"], //Right side middle
            [62, 63, 65, "red"], //Right side upper
            [62, 65, 66, "red"], //Right side upper
            [31, 62, 66, "red"], //Right side upper
            [11, 62, 31, "red"], //Right side upper
            [5, 15, 17, "darkred"], //Right side rear window connection to bumper
            [68, 49, 77, "red"], //Front right bumper
            [68, 76, 77, "red"], //Front right bumper
            [48, 76, 77, "red"], //Front right bumper
            [48, 67, 76, "red"], //Front right bumper
            [30, 67, 48, "red"], //Front right bumper
            [30, 66, 67, "red"], //Front right bumper
            [30, 31, 66, "red"], //Front right bumper
            [6, 7, 34, "darkred"], //Connection between right window and right side
            [34, 35, 7, "darkred"], //Connection between right window and right side
            [5, 11, 33, "darkred"], //Connection between right window and right side
            [5, 17, 33, "darkred"], //Connection between right window and right side
            [11, 31, 32, "darkred"], //Connection between right window and right side
            [11, 33, 32, "darkred"], //Connection between right window and right side*/

            [0, 1, 3, colors.bodyDark], // I asked ChatGPT to give the car 'realistic' colors
            [0, 3, 2, colors.bodyDark],

            [4, 5, 7, colors.body],
            [4, 7, 6, colors.body],

            // Left spoiler side
            [4, 8, 12, colors.bodyDark],
            [4, 12, 10, colors.bodyDark],

            // Right spoiler side
            [5, 11, 13, colors.bodyLight],
            [5, 13, 9, colors.bodyLight],

            // Spoiler top
            [8, 9, 13, colors.bodyLight],
            [8, 13, 12, colors.bodyLight],


            // Lower rear window
            [14, 15, 17, colors.window],
            [14, 17, 16, colors.window],

            // Upper rear window
            [16, 17, 19, colors.windowLight],
            [16, 19, 18, colors.windowLight],

            // Roof
            [18, 19, 21, colors.bodyLight],
            [18, 21, 20, colors.bodyLight],

            // Left Side Window
            [20, 22, 23, colors.window],
            [20, 23, 16, colors.window],
            [20, 16, 18, colors.windowLight],

            // Right Side Window
            [21, 32, 33, colors.window],
            [21, 33, 17, colors.window],
            [21, 17, 19, colors.windowLight],


            // Front
            [28, 30, 31, colors.bodyDark],
            [28, 31, 29, colors.bodyDark],

            // Main lower bumper
            [34, 35, 37, colors.bodyDark],
            [34, 37, 36, colors.bodyDark],

            // Side Connectors around rear window
            [14, 15, 5, colors.bodyDeep],
            [14, 5, 4, colors.bodyDeep],


            // Left Side
            [34, 36, 39, colors.body],
            [34, 38, 39, colors.body],
            [6, 34, 38, colors.bodyLight],
            [6, 38, 52, colors.bodyLight],
            [4, 6, 52, colors.bodyLight],
            [4, 10, 52, colors.body],
            [4, 14, 16, colors.bodyDeep],

            [55, 60, 71, colors.body],
            [55, 70, 71, colors.bodyLight],
            [56, 70, 71, colors.bodyLight],
            [54, 56, 70, colors.body],

            [53, 56, 57, colors.body],
            [53, 57, 29, colors.bodyDark],
            [53, 54, 56, colors.body],
            [10, 29, 53, colors.body],

            [51, 59, 73, colors.body],
            [59, 72, 73, colors.bodyLight],
            [50, 72, 73, colors.bodyLight],
            [50, 58, 72, colors.body],

            [28, 29, 50, colors.bodyDark],
            [29, 50, 58, colors.bodyDark],

            [22, 29, 53, colors.bodyDeep],
            [10, 22, 53, colors.bodyDeep],
            [10, 22, 23, colors.bodyDeep],
            [4, 10, 16, colors.bodyDeep],
            [10, 16, 23, colors.bodyDeep],


            // Right Side
            [37, 46, 47, colors.bodyDark],
            [35, 37, 46, colors.bodyDark],
            [7, 35, 46, colors.body],
            [7, 46, 61, colors.bodyLight],
            [5, 7, 61, colors.bodyLight],
            [5, 11, 61, colors.bodyLight],

            [64, 69, 75, colors.body],
            [64, 74, 75, colors.body],
            [65, 74, 75, colors.bodyLight],
            [63, 65, 74, colors.bodyLight],
            [62, 63, 65, colors.bodyLight],
            [62, 65, 66, colors.bodyLight],

            [31, 62, 66, colors.body],
            [11, 62, 31, colors.body],

            [5, 15, 17, colors.bodyDeep],

            [68, 49, 77, colors.body],
            [68, 76, 77, colors.body],
            [48, 76, 77, colors.bodyLight],
            [48, 67, 76, colors.bodyLight],
            [30, 67, 48, colors.body],
            [30, 66, 67, colors.body],
            [30, 31, 66, colors.body],

            [6, 7, 34, colors.bodyDeep],
            [34, 35, 7, colors.bodyDeep],
            [5, 11, 33, colors.bodyDeep],
            [5, 17, 33, colors.bodyDeep],
            [11, 31, 32, colors.bodyDeep],
            [11, 33, 32, colors.bodyDeep]


],  

    }
}

export const environment = {

    environment_box: {
        vertices: [
            //Foreground
            { x:  -1,  y: -1,  z: 1}, //Top left
            { x:  -1,  y: 1,  z: 1}, //Bottom left
            { x:  1,  y: -1,  z: 1}, //Bottom right
            { x:  1,  y: 1,  z: 1}, //Top right
            //Background
            { x:  -1,  y: -1,  z: 3}, //Bottom left
            { x:  -1,  y: 1,  z: 3}, //Top left
            { x:  1,  y: -1,  z: 3}, //Bottom right
            { x:  1,  y: 1,  z: 3}, //Top right
            //Lane markers
            { x:  -.33,  y: -1,  z: 1.5}, //8
            { x:  -.33,  y: -1,  z: 2.5}, //9
            { x:  .33,  y: -1,  z: 1.5}, //10
            { x:  .33,  y: -1,  z: 2.5}, //11

        ],

        edges: [
            //Foreground
            [0, 1], //Bottom left -> Top left
            //[0, 2], //Bottom left -> Bottom right
            [1, 3], //Top left -> Top right
            [2, 3], //Bottom right -> Top right
            //Background
            [4, 5], //Bottom left -> Top left
            //[4, 6], //Bottom left -> Bottom right
            [5, 7], //Top left -> Top right
            [6, 7], //Bottom right -> Top right
            //Walls
            [0, 4],
            [1, 5],
            [2, 6],
            [3, 7],
            [8, 9],
            [10, 11],
        ],

        triangles: [

            // Left
            [0, 4, 1, "gray"],
            [1, 4, 5, "gray"],

            // Right
            [2, 3, 6, "gray"],
            [3, 6, 7, "gray"],

        ]
    }
}

export const road_hazard = {

    road_cone: {
        vertices: [
            //Top board
            { x:  -7.5,  y: 5,  z: 1}, //Top Left - 0
            { x:  -7.5,  y: 3,  z: 1}, //Bottom Left - 1
            { x:  7.5,  y: 5,  z: 1}, //Top Right - 2
            { x:  7.5,  y: 3,  z: 1}, //Bottom Right - 3
            //Middle Board
            { x:  -7.5,  y: 2,  z: 1}, //Top Left - 4
            { x:  -7.5,  y: 0,  z: 1}, //Bottom Left - 5
            { x:  7.5,  y: 2,  z: 1}, //Top Right - 6
            { x:  7.5,  y: 0,  z: 1}, //Bottom Right - 7
            //Bottom Board
            { x:  -7.5,  y: -1,  z: 1}, //Top Left - 8
            { x:  -7.5,  y: -3,  z: 1}, //Bottom Left - 9
            { x:  7.5,  y: -1,  z: 1}, //Top Right - 10
            { x:  7.5,  y: -3,  z: 1}, //Bottom Right - 11
            //Middle Thing
            { x:  -4,  y: 5,  z: 1.3}, //Top Left - 12
            { x:  -4,  y: -3,  z: 1}, //Bottom Left - 13
            { x:  4,  y: 5,  z: 1.3}, //Top Right - 14
            { x:  4,  y: -3,  z: 1}, //Bottom Right - 15
            //Base
            { x:  -4,  y: -7,  z: 1}, //Left Foot - 16
            { x:  -7,  y: -7,  z: 1}, //Leftmost point - 17
            { x:  4,  y: -7,  z: 1}, //Right Foot - 18
            { x:  7,  y: -7,  z: 1}, //Rightmost Foot - 19

            //Top board back
            { x:  -7.5,  y: 5,  z: 1.3}, //Top Left - 20
            { x:  -7.5,  y: 3,  z: 1.3}, //Bottom Left - 21
            { x:  7.5,  y: 5,  z: 1.3}, //Top Right - 22
            { x:  7.5,  y: 3,  z: 1.3}, //Bottom Right - 23
            //Middle Board back
            { x:  -7.5,  y: 2,  z: 1.3}, //Top Left - 24
            { x:  -7.5,  y: 0,  z: 1.3}, //Bottom Left - 25
            { x:  7.5,  y: 2,  z: 1.3}, //Top Right - 26
            { x:  7.5,  y: 0,  z: 1.3}, //Bottom Right - 27
            //Bottom Board back
            { x:  -7.5,  y: -1,  z: 1.3}, //Top Left - 28
            { x:  -7.5,  y: -3,  z: 1.3}, //Bottom Left - 29
            { x:  7.5,  y: -1,  z: 1.3}, //Top Right - 30
            { x:  7.5,  y: -3,  z: 1.3}, //Bottom Right - 31
            //Back Supports
            { x:  -4,  y: -7,  z: 3}, //Left Foot Back - 32
            { x:  4,  y: -7,  z: 3}, //Right Foot Back - 33
        
        ],

        edges: [
            //Top Board
            [0, 1],
            [0, 2],
            [1, 3],
            [2, 3],
            //Middle Board
            [4, 5],
            [4, 6],
            [5, 7],
            [6, 7],
            //Bottom Board
            [8, 9],
            [8, 10],
            [9, 11],
            [10, 11],
            //Base
            [13, 16],
            [15, 18],

            //Top Board
            [20, 21],
            [20, 22],
            [21, 23],
            [22, 23],
            //Middle Board
            [24, 25],
            [24, 26],
            [25, 27],
            [26, 27],
            //Bottom Board
            [28, 29],
            [28, 30],
            [29, 31],
            [30, 31],

            //Top Board
            [0, 20],
            [1, 21],
            [2, 22],
            [3, 23],
            //Middle Board
            [4, 24],
            [5, 25],
            [6, 26],
            [7, 27],
            //Bottom Board
            [8, 28],
            [9, 29],
            [10, 30],
            [11, 31],
            //Bottom Feet Back Supports
            [16, 32],
            [18, 33],
            [32, 12],
            [33, 14],

        ],

        triangles: [
            /*
            // FRONT TOP BOARD
            [0, 1, 2, "orange"],
            [1, 3, 2, "orange"],

            // FRONT MIDDLE BOARD
            [4, 5, 6, "orange"],
            [5, 7, 6, "orange"],

            // FRONT BOTTOM BOARD
            [8, 9, 10, "orange"],
            [9, 11, 10, "orange"],


            // BACK TOP BOARD
            [20, 22, 21, "orange"],
            [21, 22, 23, "orange"],

            // BACK MIDDLE BOARD
            [24, 26, 25, "orange"],
            [25, 26, 27, "orange"],

            // BACK BOTTOM BOARD
            [28, 30, 29, "orange"],
            [29, 30, 31, "orange"],


            // TOP BOARD - LEFT SIDE
            [0, 20, 1, "orange"],
            [1, 20, 21, "orange"],

            // TOP BOARD - RIGHT SIDE
            [2, 3, 22, "orange"],
            [3, 23, 22, "orange"],

            // TOP BOARD - TOP
            [0, 2, 20, "orange"],
            [2, 22, 20, "orange"],

            // TOP BOARD - BOTTOM
            [1, 21, 3, "orange"],
            [3, 21, 23, "orange"],


            // MIDDLE BOARD - LEFT SIDE
            [4, 24, 5, "orange"],
            [5, 24, 25, "orange"],

            // MIDDLE BOARD - RIGHT SIDE
            [6, 7, 26, "orange"],
            [7, 27, 26, "orange"],

            // MIDDLE BOARD - TOP
            [4, 6, 24, "orange"],
            [6, 26, 24, "orange"],

            // MIDDLE BOARD - BOTTOM
            [5, 25, 7, "orange"],
            [7, 25, 27, "orange"],


            // BOTTOM BOARD - LEFT SIDE
            [8, 28, 9, "orange"],
            [9, 28, 29, "orange"],

            // BOTTOM BOARD - RIGHT SIDE
            [10, 11, 30, "orange"],
            [11, 31, 30, "orange"],

            // BOTTOM BOARD - TOP
            [8, 10, 28, "orange"],
            [10, 30, 28, "orange"],

            // BOTTOM BOARD - BOTTOM
            [9, 29, 11, "orange"],
            [11, 29, 31, "orange"],

            [13, 16, 32, "orange"],
            [15, 18, 33, "orange"],

            [13, 32, 12, "orange"],
            [15, 33, 14, "orange"],*/

    // =========================
    // FRONT TOP BOARD
    // =========================
    [0, 1, 2, hazardColors.signFront],
    [1, 3, 2, hazardColors.signFront],


    // =========================
    // FRONT MIDDLE BOARD
    // =========================
    [4, 5, 6, hazardColors.signFront],
    [5, 7, 6, hazardColors.signFront],


    // =========================
    // FRONT BOTTOM BOARD
    // =========================
    [8, 9, 10, hazardColors.signFront],
    [9, 11, 10, hazardColors.signFront],


    // =========================
    // BACK TOP BOARD
    // =========================
    [20, 22, 21, hazardColors.signBack],
    [21, 22, 23, hazardColors.signBack],


    // =========================
    // BACK MIDDLE BOARD
    // =========================
    [24, 26, 25, hazardColors.signBack],
    [25, 26, 27, hazardColors.signBack],


    // =========================
    // BACK BOTTOM BOARD
    // =========================
    [28, 30, 29, hazardColors.signBack],
    [29, 30, 31, hazardColors.signBack],


    // =========================
    // TOP BOARD - LEFT SIDE
    // =========================
    [0, 20, 1, hazardColors.signSide],
    [1, 20, 21, hazardColors.signSide],


    // =========================
    // TOP BOARD - RIGHT SIDE
    // =========================
    [2, 3, 22, hazardColors.signSideLight],
    [3, 23, 22, hazardColors.signSideLight],


    // =========================
    // TOP BOARD - TOP
    // =========================
    [0, 2, 20, hazardColors.signFrontLight],
    [2, 22, 20, hazardColors.signFrontLight],


    // =========================
    // TOP BOARD - BOTTOM
    // =========================
    [1, 21, 3, hazardColors.signBottom],
    [3, 21, 23, hazardColors.signBottom],


    // =========================
    // MIDDLE BOARD - LEFT SIDE
    // =========================
    [4, 24, 5, hazardColors.signSide],
    [5, 24, 25, hazardColors.signSide],


    // =========================
    // MIDDLE BOARD - RIGHT SIDE
    // =========================
    [6, 7, 26, hazardColors.signSideLight],
    [7, 27, 26, hazardColors.signSideLight],


    // =========================
    // MIDDLE BOARD - TOP
    // =========================
    [4, 6, 24, hazardColors.signFrontLight],
    [6, 26, 24, hazardColors.signFrontLight],


    // =========================
    // MIDDLE BOARD - BOTTOM
    // =========================
    [5, 25, 7, hazardColors.signBottom],
    [7, 25, 27, hazardColors.signBottom],


    // =========================
    // BOTTOM BOARD - LEFT SIDE
    // =========================
    [8, 28, 9, hazardColors.signSide],
    [9, 28, 29, hazardColors.signSide],


    // =========================
    // BOTTOM BOARD - RIGHT SIDE
    // =========================
    [10, 11, 30, hazardColors.signSideLight],
    [11, 31, 30, hazardColors.signSideLight],


    // =========================
    // BOTTOM BOARD - TOP
    // =========================
    [8, 10, 28, hazardColors.signFrontLight],
    [10, 30, 28, hazardColors.signFrontLight],


    // =========================
    // BOTTOM BOARD - BOTTOM
    // =========================
    [9, 29, 11, hazardColors.signBottom],
    [11, 29, 31, hazardColors.signBottom],


    // =========================
    // SUPPORT / BASE
    // =========================
    [13, 16, 32, hazardColors.support],
    [15, 18, 33, hazardColors.support],

    [13, 32, 12, hazardColors.supportLight],
    [15, 33, 14, hazardColors.supportLight],

],

    }
}
