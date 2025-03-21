
	let url = new URLSearchParams(window.location.search)
	let palyaNev = url.get("palyaNev")
    console.log(palyaNev)
let objektek = [];
let enemyk = []
let kari = null;
let palyak = []
let aktualPalya = 0;
let uzenet = null;

class Palya  {
    constructor(nev,palyaString) {
        this.nev = nev
        this.palyaObjekt = [];
        this.palyaEnemyk = []
        this.palyaString = palyaString;
        palyak.push(this)
        this.palyaKeszitesFajlbol(palyaString)
        this.spawn = null;
        this.lastDoor = null;
    }
    hide() {
        
        for (let obj of this.palyaEnemyk) {
            if(obj.box != null) {
                obj.box.style.display = "none"
            }

         }
        for (let obj of this.palyaObjekt) {
            if(obj.div != null) {
                obj.div.style.display = "none"
            }
       
        }

    }
    show() {
        
        for (let obj of this.palyaEnemyk) {
            if( obj.box != null) {
                obj.box.style.display = "block"    
            }
       
         }
        for(let obj of this.palyaObjekt) {
            if(obj.div != null) {
                obj.div.style.display = "block";
            }
           
            if(obj instanceof Exit) {
                if(obj.isSpawn) {
                    this.spawn = obj
                    let offset = (obj.width-50)/2
                    if(kari == null) {
                        kari = new Karakter("Sándor",15,this.spawn.x+offset, this.spawn.y+offset)
                    }else {
                       //átrakjuk a karaktert az exit helyére
                        kari.atiranyit(this.spawn.x+offset, this.spawn.y+offset)
                    }
                    enemyk = this.palyaEnemyk
                    objektek = this.palyaObjekt
                    
                }
            }
        }
    }

    palyaKeszitesFajlbol(palyaText) { 
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
      
                if(type=="fegyver") {
                    objekt = new Fegyver(x,y,nev,dmg,textura,this)
                    }
                if(type=="ruha") {objekt = new Ruha(x,y,nev,dmg,textura,this)}
                if(type=="kulcs") {
                    let textura = objParam[1];
                    objekt = new Kulcs(x,y,nev,textura,this)
                }
                if(type=="penz") {
                    let ertek = objParam[0];
                    objekt = new Coin(x,y,ertek,this)
                }
                
            }
            
            if(type == "wall" || type=="lada" || type =="exit" || type=="enemy" || type=="uzenet") {   
                if(type=="wall") {
                    let objParam = objAtr[1].split(",");
                    let titkos = objParam[0];
                    let textura = objParam[1];
                    objekt = new Wall(x,y,titkos,textura,this)}
                if(type=="uzenet") {
                        let objParam = objAtr[1].split(",");
                        let msg = objParam[0];
                        let textura = objParam[1];
                        objekt = new Uzenet(x,y,msg,textura,this)
                    }
                if(type=="lada") {
                    let objParam = objAtr[1].split(",");
                    let kulcsos = objParam[0]
                    let random = objParam[2];
                    let texture = objParam[3];
                    let itemType= objParam[4];
                    itemType.trim()
                    if(itemType == "fegyver" || itemType=="ruha") {
                        let item = null;
                        let itemParam = objAtr[2].split(",")
                        let nev = itemParam[0];
                        let dmg = parseInt(itemParam[1]);
                        let item_textura = itemParam[2];
                        if(itemType=="fegyver") {
                            item = new Fegyver(-1,-1,nev,dmg,item_textura,this)}
                          if(itemType=="ruha") {item = new Ruha(-1,-1,nev,dmg,item_textura,this)}
                        //random most nem csinál semmit
                        objekt = new Lada(x,y,item,kulcsos,texture,random,this)
                    }
                   
                }
                if(type=="exit") {
                    let objParam = objAtr[1].split(",")
                    let loc = parseInt(objParam[0]);
                    let id = parseInt(objParam[1]);
                    let back = null;
                    if(objParam[2] != "null") {
                        back = parseInt(objParam[2]);
                    }
                     
                    let spawn = objParam[3];
                    let textura = objParam[4];
                    
                    objekt = new Exit(x,y,loc,id,textura,spawn,this,back)
                    }
                if(type=="enemy") {
                        let objParam = objAtr[1].split(",")
                        let nev = objParam[0]
                        let dmg = parseInt(objParam[1])
                        let hp= parseInt(objParam[2])
                        let sebesseg = parseInt(objParam[3])
                        let penz =  parseInt(objParam[4])
                        let texture = objParam[5]
                        let offset = (60-55)/2
                        objekt = new Enemy(x+offset,y+offset,hp,nev,dmg,sebesseg,penz,texture,this)
        
                }
            }
            this.hide()
        }
    }
}


//globálok, mindig az aktuális pálya van bennük.

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
//pick up szöveg
function torol(obj) {


    let text = document.createElement("p")
    text.setAttribute("class","pick-up")
    let span = document.createElement("span")
    span.setAttribute("class","pick-up-number")
    text.style.top = -30;
    let textMeret = 100;
    obj.x = kari.x;
    obj.y = kari.y


    if(obj instanceof Coin) {
        extMeret = 100;
        kari.penz += parseInt(obj.ertek)
        span.innerText = obj.ertek
        text.innerText = "+"
        text.appendChild(span)
        text.innerHTML += " pénz"
        text.style.width = textMeret
        text.style.left = (0 - textMeret)/2+kari.width/2
        kari.karakter.appendChild(text)
       
    }
    if(obj instanceof Item) {
        textMeret = 200;
        kari.itemek.push(obj);
        text.innerText = "Felvetted: "+obj.nev
        text.style.top = -65;
        if(obj instanceof Kulcs) {
            text.innerText = "+1 kulcs"
            text.style.top = -30;
            kari.kulcs++;
        }
        if(obj instanceof Fegyver) {
            kari.dmg += obj.dmg
            span.innerText = obj.dmg;
            if(obj.dmg > 0) {
                text.innerText += "\nSebzésed nőtt: +"
                text.appendChild(span)
            }else {
                text.innerText += "\nSebzésed csökkent: "
            }
            text.appendChild(span)
        }
        if(obj instanceof Ruha) {
            kari.hp += obj.hp
            span.innerText = obj.hp;
            if(obj.hp > 0) {
                text.innerText += "\nVédelmed nőtt: +"
            }else {
                text.innerText += "\nVédelmed csökkent: "
            }
            text.appendChild(span)
        }
        text.style.width = textMeret
        text.style.left = (0 - textMeret)/2+kari.width/2
        kari.karakter.appendChild(text)
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
let olvas = false;
document.body.addEventListener("keydown",function(e) {
rendez()

if(e.key == "w" || e.key == "W") {
    kari.iranyok[0] = true
}
if(e.key == "ArrowUp" || e.key == "ArrowDown" || e.key == "ArrowLeft" || e.key == "ArrowRight") {
    kari.nezesIrany = e.key;
    kari.nezesNyomva = true;
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
    if(uzenet != null) {
        uzenet.bezar();
    }

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

})

document.body.addEventListener("keyup",function(e) {

 if(e.key == "ArrowUp" || e.key == "ArrowDown" || e.key == "ArrowLeft" || e.key == "ArrowRight") {
        kari.nezesNyomva = false;
}

if(e.key == "w" || e.key == "W") {
    kari.iranyok[0] = false
    kari.karakter.style.backgroundImage = "url(Textures/elore.png)"
}
if(e.key == "a" || e.key == "A") {
kari.iranyok[1] = false
kari.karakter.style.backgroundImage = "url(Textures/balra.png)"
}
if(e.key == "s" || e.key == "S") {
    kari.iranyok[2] = false
     kari.karakter.style.backgroundImage = "url(Textures/hatra.png)"
}
if(e.key == "d" || e.key == "D") {
    kari.iranyok[3] = false
    kari.karakter.style.backgroundImage = "url(Textures/jobbra.png)"
}

})
//karakter mozgatás
setInterval(function(){
    if(kari != null) {
kari.look(kari.nezesIrany)
if(kari.iranyok[0]) {kari.up();}
if(kari.iranyok[1]) {kari.left();}
if(kari.iranyok[2]) {kari.down();}
if(kari.iranyok[3]) {kari.right();}
    }
for(let enemy of enemyk) {
enemy.mozog()
}
},10)

let palyanevek = ["palya1","palya2","palya3","palya4","palya5"]

class Lock {
    constructor() {
      this.locked = false;
    }
  
    async acquire() {
      while (this.locked) {
        await new Promise(resolve => setTimeout(resolve, 10)); // Várakozás
      }
      this.locked = true;
    }
  
    release() {
      this.locked = false;
    }}
const lock = new Lock();
let betoltve = false;

async function betoltesEsMegjelenites(index) {
        await lock.acquire();
        try {
            if(!betoltve) {
                if(palyaNev != null) {
                    await palyaBeolvas(palyaNev);
                }else {
                    for(let nevek of palyanevek) {
                        await palyaBeolvas(nevek);
                    }
                }

            betoltve = true;
        }
            
        } finally{
            palyak[aktualPalya].hide();
            aktualPalya = index
            palyak[aktualPalya].show(); 
            lock.release();
        }

}

betoltesEsMegjelenites(aktualPalya);

function palyaAktival(index) {
objektek = palyak[index].palyaObjekt
enemyk = palyak[index].enemyk
}

async function palyaBeolvas(palyaNev) {

    try {
        //elküldjük a pályanevet
        let response =  await fetch('/beolvas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ palya: palyaNev })
        });
        //Megoldani hogy egy pályát ki és be lehessen kapcsolni, bekapcsoláskor minden megjelenjen, kikapcsoláskor minden eltűnjön.
        let data = await response.json(); //fogadjuk a beolvasott stringet
        let palyaString = data.message;
        palyaKeszito(palyaNev,palyaString); //Elkészítjük vele a pályát
    
    } catch(error) {
        alert('Nincs elindítva a szerver! vagy valami más...' + error)
}
}

function palyaKeszito(palyaNev,palyaString) {
new Palya(palyaNev,palyaString)
}

//Árusok!!!
//karaktert lekicsinyíteni / vagy mindent felnagyítani
//Valahogy megoldani hogy ahoz az ajtóhoz tegyen vissza ahonnan bejöttünk
//Szebb UI, effectek amikor megsebődünk
//momentum
//hangok