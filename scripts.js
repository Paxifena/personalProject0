//Initializes many variables
const newDiv = document.createElement('div');
const body = document.querySelector('body');
var canvas = document.querySelector('canvas');
var cursorx = 0;
var cursory = 0;
canvas.setAttribute("height", document.body.clientHeight);
canvas.setAttribute("width", document.body.clientWidth);
var ctx = canvas.getContext("2d");
var terrain = [];
var collisionsOn = true;
var run = true;
//Initializes player character
var player = document.createElement('div', id='player')
player.style.position="absolute";
player.style.backgroundColor="red";
player.style.width="50px";
player.style.height="50px";
player.style.left= '10px';
player.style.top= 'calc(50vh - 25px)';
//Player controller variables
var moveHorz = 0;
var posx = 10;
var posy = 0;
var velx = 0;
var vely = 0;
var accx = 0;
var accy = 0;
var playerControllable = true;
var onFloor = false;
var canGrapple = true;
var grappling = false;
var grapplex = 0;
var grappley = 0;
var jumps = 0;
var grappleDistx = 0;
var grappleDisty = 0;
var grappleDist = 0;
var grappleDistMax = 0;
var grappleAngle = 0;
var flooring = 0;
var grapplexColor = 'green';
var grappleyColor = 'blue';

//On the DOMContent loading
window.addEventListener('DOMContentLoaded', function() {
    posy = player.getBoundingClientRect().top;
    //alert(posy);
})

body.addEventListener('mousedown', function() {
    //alert('woah');
    grappleOut();
})

body.addEventListener('mouseup', function() {
    //alert('haow');
    grappleIn();
})

//Disables right click menu
document.addEventListener('contextmenu', function(e){
    e.preventDefault();
}, false)

//Reads keystrokes
window.addEventListener('keydown', (event) => {
    //alert(event.keyCode);
    if (event.keyCode == 68) {
        moveHorz = 1;
    } else if (event.keyCode == 65) {
        moveHorz = -1;
    }
    if (event.keyCode == 83) {
        accy += 1;
    }
    if (event.keyCode == 87) {
        jump();
    }
    if (event.keyCode == 8) {
        canvas.setAttribute("width", document.body.clientWidth);
    }
}, true)

//On a key being let up
window.addEventListener('keyup', (event) => {
    //alert(event.keyCode);
    if (event.keyCode == 68 || event.keyCode == 65) {
        moveHorz = 0;
    }
    /*if (event.keyCode == 83 || event.keyCode == 87) {
        moveVert = 0;
    }*/
}, true)

//Reads the file and stores it in variable file
var path = window.location.pathname;
var file = path.substring(path.lastIndexOf('/')+1);
file = file.substring(0, (file.length - 5));
//alert(file);

//Runs the correct script for each level
if (file == 'level1') {
    document.body.insertAdjacentElement('afterbegin', player);
    posy = (player.getBoundingClientRect().top);
    runGame();
}


function runGame() {
    if (playerControllable == true) {
        playerController();
    }

    /*if (collisionsOn == true) {
        detectCollisions();
    }*/

    if (grappling == true) {
        doGrapple();
    }

    if (run = true) {
        setTimeout('runGame()', 16);
    }
}

//Player controller function
function playerController() {
    if (moveHorz == 1) {
        accx += 0.1;
    } else if (moveHorz == -1) {
        accx += -0.1;
    }
    if (posx <= 0 || posx >= document.body.clientWidth - 50) {
        accx = 0;
        velx = velx * -0.8;
        if (posx <= 0) {
            posx = 1;
        } else {
            posx = document.body.clientWidth - 51;
        }

    }

    velx += accx;

    if (accx != 0) {
        if (accx < 0.01 && -0.01 <= accx) {
            accx = 0;
        } else {
            if (onFloor == true) {
                accx = accx / 1.1;
            } else {
                accx = accx / 2;
            }
        }
    }

    /*if (velx < 0.5 && -0.5 <= velx) {
        velx = 0;
    }*/

    //alert('trying');
    player.style.left = (posx + velx) + 'px';
    posx += velx;

    if (posy <= 0 || posy >= document.body.clientHeight - 50) {
        if (flooring == false) {
            accy = 0;
            vely = 0;
            flooring = true;
        }
        if (posy <= 0) {
            posy = 1;
        } else {
            onFloor = true;
            posy = document.body.clientHeight - 50;
        }
    }   else {
        onFloor = false;
        flooring = false;
    }

    vely += accy;
    posy += vely;

    /*if (vely < 0.5 && -0.5 <= vely) {
        vely = 0;
    }*/

    
    player.style.top = (posy + vely) + 'px';

    if (onFloor == true) {
        velx = velx / 1.1
        jumps = 1;
    } else {
        accy = 2;
    }
}

function jump() {
    if (jumps >= 1) {
        jumps -= 1;
        vely += -30;
        accy = 0;
    }
    setTimeout(16);
}

function getCursorPos(event) {
    cursorx = event.clientX;
    cursory = event.clientY;
}

/*function detectCollisions() {
    //Empty for now
}*/ 

function grappleOut() {
    if (canGrapple == true) {
        grapplex = cursorx;
        grappley = cursory;
        grappling = true;
        ctx.beginPath();
        ctx.moveTo((posx + 25), (posy + 25));
        ctx.lineTo(grapplex, grappley);
        ctx.stroke();
        canGrapple = false;
        grappleDistx = (grapplex - (posx + 25));
        grappleDisty = (grappley - (posy + 25));
        grappleDistMax = Math.sqrt((grappleDistx ** 2) + (grappleDisty ** 2));
        doGrapple();
    }
}

function doGrapple() {
    canvas.setAttribute("width", document.body.clientWidth);
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.moveTo((posx + 25), (posy + 25));
    ctx.lineTo(grapplex, grappley);
    ctx.stroke();
    grappleDistx = (grapplex - (posx + 25));
    grappleDisty = (grappley - (posy + 25));
    grappleDist = Math.sqrt((grappleDistx ** 2) + (grappleDisty ** 2));
    if ( grappleDistx >= 0 && grappleDisty <= 0) {

        grappleAngle = Math.asin(-grappleDisty / grappleDist);

    } else if (grappleDistx < 0 && grappleDisty <= 0) {

        grappleAngle = ((Math.PI / 2) - (Math.asin(-grappleDisty / grappleDist))) + (Math.PI / 2);

    } else if (grappleDistx < 0 && grappleDisty > 0) {

        grappleAngle = Math.PI - Math.asin(-grappleDisty / grappleDist);

    } else {

        grappleAngle = (Math.PI * 2) + Math.asin(-grappleDisty / grappleDist);
    }

    //Determines if player is in grapple range
    if (grappleDistx >= 0) {
        if (Math.abs(grapplex + ( -grappleDist * (Math.cos(grappleAngle)))) >= Math.abs(grapplex + ( -grappleDistMax * (Math.cos(grappleAngle))))) {
            grapplexColor = 'green';
        } else {
            //accx = 0;
            //accy = 0;
            velx = Math.cos(grappleAngle) * -velx;
            vely = Math.sin(grappleAngle) * -vely;
            posy = grappley + ( grappleDistMax * (Math.sin(grappleAngle)));
            //posx = grapplex - (grappleDistMax * (Math.cos(grappleAngle))) - 24;
            grapplexColor = 'red';
        }
    } else {
        if (Math.abs(grapplex + ( -grappleDist * (Math.cos(grappleAngle)))) <= Math.abs(grapplex + ( -grappleDistMax * (Math.cos(grappleAngle))))) {
            grapplexColor = 'green';
        } else {
            //accx = 0;
            //accy = 0;
            velx = Math.cos(grappleAngle) * velx;
            vely = Math.sin(grappleAngle) * -vely;
            posy = grappley + ( grappleDistMax * (Math.sin(grappleAngle)));
            //posx = grapplex - (grappleDistMax * (Math.cos(grappleAngle))) - 26;
            grapplexColor = 'red';
        }
    }
    //Draws a circle where the player can be
    ctx.beginPath();
    ctx.strokeStyle = 'orange';
    ctx.arc(grapplex, grappley, grappleDistMax, 0, 2*Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = grapplexColor;
    ctx.moveTo(grapplex, grappley);
    ctx.lineTo( grapplex + ( -grappleDist * (Math.cos(grappleAngle))), grappley);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = grappleyColor;
    ctx.moveTo(grapplex + ( -grappleDist * (Math.cos(grappleAngle))), grappley, grappley);
    ctx.lineTo( grapplex + ( -grappleDist * (Math.cos(grappleAngle))), grappley + ( grappleDist * (Math.sin(grappleAngle))));
    ctx.stroke();
}

function grappleIn() {
    canvas.setAttribute("width", document.body.clientWidth);
    grappling = false;
    canGrapple = true;
}