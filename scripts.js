//Initializes many variables
const newDiv = document.createElement('div');
var terrain = [];
var moveHorz = 0;
var moveVert = 0;
var playerControllable = true;

//Reads keystrokes
window.addEventListener('keydown', (event) => {
    //alert(event.keyCode);
    if (event.keyCode == 68) {
        moveHorz = 1;
    } else if (event.keyCode == 65) {
        moveHorz = -1;
    } else {
        moveHorz = 0;
    }
    if (event.keyCode == 83) {
        moveVert = -1;
    }
    if (event.keyCode == 87) {
        moveVert = 1;
    }
}, true)

//Initializes player character
var player = document.createElement('div', id='player')
player.style.position="absolute";
player.style.backgroundColor="black";
player.style.width="50px";
player.style.height="50px";
player.style.left= '10px';
player.style.top= 'calc(50vh - 25px)';

//Reads the file and stores it in variable file
var path = window.location.pathname;
var file = path.substring(path.lastIndexOf('/')+1);
file = file.substring(0, (file.length - 5));
//alert(file);

//Runs the correct script for each level
if (file == 'level1') {
    alert('nice');
    document.body.insertAdjacentElement('afterbegin', player);
    playerController();
    alert(player.style.width);
}

//Player controller function
function playerController() {
    if (moveHorz > 0) {
        alert('trying');
        player.style.left = player.style.left + moveHorz;
    }
    if (playerControllable == true) {
        setTimeout(playerController, 16);
    }
}