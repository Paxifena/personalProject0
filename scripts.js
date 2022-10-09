//Initializes many variables
const newDiv = document.createElement('div');
var terrain = [];
//Initializes player character
var player = document.createElement('div', id='player')
player.style.position="absolute";
player.style.backgroundColor="black";
player.style.width="50px";
player.style.height="50px";
player.style.left= '10px';
player.style.top= 'calc(50vh - 25px)';
//Player controller variables
var posx = 10;
var posy = 0;
var velx = 0;
var vely = 0;
var accx = 0;
var accy = 0;
var playerControllable = true;
var onFloor = false;
var jumps = 0;

//On the DOMContent loading
window.addEventListener('DOMContentLoaded', function() {
    posy = player.getBoundingClientRect().top;
    //alert(posy);
})
//Reads keystrokes
window.addEventListener('keydown', (event) => {
    //alert(event.keyCode);
    if (event.keyCode == 68) {
        accx = 1;
    } else if (event.keyCode == 65) {
        accx = -1;
    }
    if (event.keyCode == 83) {
        accy = 1;
    }
    if (event.keyCode == 87) {
        accy = -1;
    }
}, true)

//On a key being let up
window.addEventListener('keyup', (event) => {
    if (event.keyCode == 68 || event.keyCode == 65) {
        moveHorz = 0;
    }
    if (event.keyCode == 83 || event.keyCode == 87) {
        moveVert = 0;
    }
}, true)

//Reads the file and stores it in variable file
var path = window.location.pathname;
var file = path.substring(path.lastIndexOf('/')+1);
file = file.substring(0, (file.length - 5));
//alert(file);

//Runs the correct script for each level
if (file == 'level1') {
    document.body.insertAdjacentElement('afterbegin', player);
    playerController();
    posy = (player.getBoundingClientRect().top);
}

//Player controller function
function playerController() {
    if (posx <= 0 || posx >= screen.width - 50) {
        accx = accx * -1;
        velx = velx * -0.8;
        if (posx <= 0) {
            posx = 1;
        } else {
            posx = screen.width - 51;
        }

    }
    velx += accx;
    if (accx < 0.5 || -0.5 <= accx) {
        accx = 0;
    } else {
        accx = accx / 1.1;
    }
    if (velx != 0) {
        //alert('trying');
        player.style.left = (posx + velx) + 'px';
        posx += velx;
    }

    if (posy <= 0 || posy >= screen.availHeight - 98) {
        accy = accy * -1;
        vely = vely * -0.8;
        if (posy <= 0) {
            posy = 1;
        } else {
            //posy = screen.availHeight - 51;
        }

    }
    vely += accy;
    if (accy < 0.5 || -0.5 <= accy) {
        accy = 0;
    } else {
        accy = accy / 1.1;
    }
    if (vely != 0) {
        //alert('trying');
        player.style.top = (posy + vely) + 'px';
        posy += vely;
    }

    if (playerControllable == true) {
        //alert('test');
        setTimeout(playerController, 16);
    }
}