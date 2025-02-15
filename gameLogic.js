
let objektek = [];
let enemyk = []
let kari = null;


function aabbCollision(A, B) {
	    return (
			A.x <= B.x+ B.width && 
			A.x+A.width >= B.x && 
			A.y <= B.y + B.height &&
			A.y + A.height >= B.y
	    )
	}
function agroRangeben(A,B,r) {
		let Akx = A.x + A.width/2 //A középpont x
		let Aky = A.y + A.height/2 //A középpont y
		let Bkx = B.x + B.width/2
		let Bky =B.y + B.height/2
		return (
			Math.sqrt((Akx-Bkx)** 2 +(Aky - Bky) **2) <= r
		)
}

class Hitbox {
    constructor(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height
    }
}

function torol(obj) {
    let canvas = document.getElementById("canvas");
    obj.x = kari.x;
    obj.y = kari.y
    if(obj instanceof Felveheto) {
        kari.penz += obj.ertek
        kari.infoUpdate()
    }
    rendez();
    obj.div.remove();
    objektek.shift();

}

function rendez() {
objektek.sort((a, b) => {
const tavA = Math.sqrt((a.x - kari.x) ** 2 + (a.y - kari.y) ** 2);
const tavB = Math.sqrt((b.x - kari.x) ** 2 + (b.y - kari.y) ** 2);
return tavA - tavB;
});
}
document.body.addEventListener("keydown",function(e) {
rendez()

if(e.key == "w" || e.key == "W") {
    kari.iranyok[0] = true
}
if(e.key == "ArrowUp" || e.key == "ArrowDown" || e.key == "ArrowLeft" || e.key == "ArrowRight") {
    kari.nezesIrany = e.key;
}

if(e.key == "a" || e.key == "A") {
kari.iranyok[1] = true
}
if(e.key == "s" || e.key == "S") {
    kari.iranyok[2] = true
}
if(e.key == "d" || e.key == "D") {
    kari.iranyok[3] = true
}
if(e.key == " ") {
    if(kari.tamad == false) {kari.attack()}
    
}
//console.kog(e.key)

})

document.body.addEventListener("keyup",function(e) {
if(e.key == "w" || e.key == "W") {
    kari.iranyok[0] = false
}
if(e.key == "a" || e.key == "A") {
kari.iranyok[1] = false
}
if(e.key == "s" || e.key == "S") {
    kari.iranyok[2] = false
}
if(e.key == "d" || e.key == "D") {
    kari.iranyok[3] = false
}
})
setInterval(function(){
kari.look(kari.nezesIrany)
if(kari.iranyok[0]) {kari.up();}
if(kari.iranyok[1]) {kari.left();}
if(kari.iranyok[2]) {kari.down();}
if(kari.iranyok[3]) {kari.right();}
for(let enemy of enemyk) {
enemy.mozog()
}
},10)