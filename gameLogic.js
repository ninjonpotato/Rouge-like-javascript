
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
        objektek.push(this)
    }
}

function torol(obj) {
    let canvas = document.getElementById("canvas");
    obj.x = kari.x;
    obj.y = kari.y
    if(obj instanceof Coin) {
        kari.penz += obj.ertek
    }
    if(obj instanceof Kulcs) {
        kari.kulcs++;
    }
    if(obj instanceof Item) {
        kari.itemek.push(obj);
        if(obj instanceof Fegyver) {
            kari.dmg += obj.dmg
        }
        if(obj instanceof Ruha) {
            kari.hp += obj.hp
        }
       
    }
    
    
    rendez();
    obj.div.remove();
    objektek.shift();
    kari.infoUpdate()

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
if(e.key == "e" || e.key == "E") {
    for(let obj of objektek) {
    if(aabbCollision(obj, kari)) { 
        if(obj instanceof Lada) {
            if(obj.nyitva == false) {
                if(obj.kulcsos) {
                    if(obj.vanEkulcs(kari)) {
                        console.log("Kulcsal lett kinyitva")
                        obj.kinyit();
                        kari.infoUpdate();
                    }else {
                        console.log("nincs kulcsod")
                    }
                }else {
                    obj.kinyit();
                }
            }
           
        }
    }
}
    
}
//console.kog(e.key)

})

document.body.addEventListener("keyup",function(e) {
if(e.key == "w" || e.key == "W") {
    kari.iranyok[0] = false
    kari.karakter.style.backgroundImage = "url(Textures/elore.png)"
}
if(e.key == "a" || e.key == "A") {
kari.iranyok[1] = false
kari.karakter.style.backgroundImage = "url(Textures/jobbra.png)"
}
if(e.key == "s" || e.key == "S") {
    kari.iranyok[2] = false
     kari.karakter.style.backgroundImage = "url(Textures/hatra.png)"
}
if(e.key == "d" || e.key == "D") {
    kari.iranyok[3] = false
    kari.karakter.style.backgroundImage = "url(Textures/balra.png)"
}
})
//karakter mozgatás
setInterval(function(){
kari.look(kari.nezesIrany)
if(kari.iranyok[0]) {kari.up();
}
if(kari.iranyok[1]) {kari.left();}
if(kari.iranyok[2]) {kari.down();}
if(kari.iranyok[3]) {kari.right();}

for(let enemy of enemyk) {
enemy.mozog()
}
},10)



let palyaNev = "elsoPalya"
window.addEventListener("load",(event)=>{
    fetch('/beolvas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({palya: palyaNev})
      })
      .then(response => response.json()) //Válaszüzenet átalakítása
      .then(data => 
        {   
            palyaString = data.message;
            palyaKeszitesFajlbol(palyaString)
			if(kari == null) {
			kari = new Karakter("Sándor")
			}
            
        })
      .catch(error => alert('Nincs elindítva a szerver! vagy valami más...'));
})
kari = null;

function palyaKeszitesFajlbol(palyaText) { 
    let palyaTomb = palyaText.split("\n") //felszeleteljük sorokra
    for(let obj of palyaTomb) {
        let objAtr = obj.split("|");
        let objType = objAtr[0].split(",")
        let type = objType[0].trim()
        let x =  parseInt(objType[1])
        let y = parseInt(objType[2])
        let objekt = null;
        if(type == "fegyver" || type=="ruha" || type =="kulcs" || type=="penz") {  
            let objParam = objAtr[1].split(",")
            let nev = objParam[0];
            let dmg = parseInt(objParam[1]);
            let textura = objParam[2];
  
            if(type=="fegyver") {objekt = new Fegyver(x,y,nev,dmg,textura)}
            if(type=="ruha") {objekt = new Ruha(x,y,nev,dmg,textura)}
            if(type=="kulcs") {
                let textura = objParam[1];
                objekt = new Kulcs(x,y,nev,textura)
            }
            if(type=="penz") {
                let ertek = objParam[0];
                let textura = objParam[1];
                objekt = new Penz(x,y,ertek,textura,false)
            }
            
        }
        
        if(type == "wall" || type=="lada" || type =="exit" || type=="enemy") {   
            if(type=="wall") { let objParam = objAtr[1].split(",");let titkos = objParam[0]; let textura = objParam[1]; objekt = new Wall(x,y,titkos,textura)}
            if(type=="lada") {
                let objParam = objAtr[1].split(",");
                let kulcsos = objParam[0]
                let random = objParam[2];
                let texture = objParam[3];
                let itemType= objParam[4];
                itemType.trim()
				// constructor(x,y,item,kulcsos=false)
                if(itemType == "fegyver" || itemType=="ruha") {
                    let item = null;
                    let itemParam = objAtr[2].split(",")
                    let nev = itemParam[0];
                    let dmg = parseInt(itemParam[1]);
                    let item_textura = itemParam[2];
					if(itemType=="fegyver") {
						item = new Fegyver(-1,-1,nev,dmg,item_textura)}
                  	if(itemType=="ruha") {item = new Ruha(-1,-1,nev,dmg,item_textura)}
                    //random most nem csinál semmit
					objekt = new Lada(x,y,item,kulcsos,texture,random)
                }
               
            }
            if(type=="exit") {
                let objParam = objAtr[1].split(",")
                let loc = parseInt(objParam[0]);
                let id = parseInt(objParam[1]);
				let spawn = objParam[2];
                let textura = objParam[3];
                
               	objekt = new Exit(x,y,loc,id,textura,spawn)
				if(kari == null) {
					if(objekt.isSpawn) {
                        let offestX = (objekt.width-50)/2
    
				kari = new Karakter("Sándor",15,x+offestX,y+offestX)
					}
				}
            	}
            if(type=="enemy") {
                //enemy,660,540,|Béla,3,100,9,300,enemy.png
                let objParam = objAtr[1].split(",")
                let nev = objParam[0]
                let dmg = parseInt(objParam[1])
                let hp= parseInt(objParam[2])
                let sebesseg = parseInt(objParam[3])
                let penz =  parseInt(objParam[4])
                let texture = objParam[5]
                objekt = new Enemy(x,y,hp,nev,dmg,sebesseg,penz,texture)

            }
        }
    } 
}
//Az exiteket össze lehessen kötni más pályákkal:
// a) az összes pályát betöltjük b) akkor töltünk be következő pályát, amikor egy exitre lépünk
//lehetséges problémák:hogyan töltök be úgy pályákat, hogy ne legyen minden egymásra dobálva?
//Csináli egy pálya osztályt ami a pályához tartozó objektetek tartalmazza. így könnyű őket linkelni.
//Legyen egy index.html ami a főmenü, onna ellehessen indítani 3 módot
//-Kampány, endless, mapMaker