
let url = new URLSearchParams(window.location.search)
let palyaNev = url.get("palyaNev")
let objektek = [];
let enemyk = []
let kari = null;
let palyak = []
let aktualPalya = 0;
let uzenet = null;
let arus_megjelenitve = false;
class Palya  {
    constructor(nev,palyaString) {
        this.nev = nev
        this.palyaObjekt = [];
        this.palyaEnemyk = []
        this.palyaString = palyaString;
        palyak.push(this)
        this.palyaKeszitesFajlbol(palyaString)
        //beállítjuk a spawnt, de ez csak akkor kell ha ez az első szoba, utána ez legyen null, csak ajtóhoz dobjon.
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
    show(doorID) {
        
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

                let offset = (obj.width-50)/2
                if(kari == null) {//kezdeti létrehozás
                    if(obj.id == 0 && obj.location == 0) {
                        kari = new Karakter("Sándor",15,obj.x+offset, obj.y+offset)
                    }
                }else {
                   //a karakter a megadott id-hez irányítsa.
                   if(obj.id == doorID && obj.location != aktualPalya) {
                    obj.isHasznalhato = false;
                    kari.atiranyit(obj.x+offset, obj.y+offset)
                    setInterval(()=>
                        {
                            if(!aabbCollision(obj,kari)) {
                                obj.isHasznalhato = true; //ha nem állunk az ajtóban.
                            }
                          
                        },1000)
                   }
                }

                enemyk = this.palyaEnemyk
                objektek = this.palyaObjekt
                /*
                if(obj.isSpawn) {
                    this.spawn = obj
                    let offset = (obj.width-50)/2
                    if(kari == null) {
                        kari = new Karakter("Sándor",15,this.spawn.x+offset, this.spawn.y+offset)
                    }else {
                       //átrakjuk a karaktert az exit helyére
                        kari.atiranyit(this.spawn.x+offset, this.spawn.y+offset) //A spawn változzon meg, amikor átmegyünk egy ajtón
                    }
                    enemyk = this.palyaEnemyk
                    objektek = this.palyaObjekt
                    
                }*/
            }
        }
    }

    palyaKeszitesFajlbol(palyaText) { 
        let palyaTomb = palyaText.split("\n") //felszeleteljük sorokra
        for(let obj of palyaTomb) {
            let objAtr = obj.split("|");
            let objType = objAtr[0].split(",")
            let type = objType[0].trim()
            let x = parseInt(objType[1]);//eredeti x
            let y = parseInt(objType[2]); //eredeti y
            let w = 60;
            let h = 60;
            //valahogy számolja ki mekkora a pálya szélessége és magassága, 60x60 a négyzetek beégetett mérete
            let gridSzelesseg = w*15
            let gridMagassag = h*10*2-window.innerHeight
            let offsetX =(window.innerWidth-gridSzelesseg)/2
            let offsetY =((window.innerHeight-gridMagassag)/4)
            if(!(x < 0 && y < 0)) { //a nem kirajzoldanó itemek a 0-0 ba kerülnek.
                x+= offsetX
                y+= offsetY
            }

            //parseInt(objType[1])-
           
            let objekt = null;
            if(type == "fegyver" || type=="ruha" || type =="kulcs" || type=="penz") {  
                let objParam = objAtr[1].split(",")
                let nev = objParam[0];
                let dmg = parseInt(objParam[1]);
                let range = parseInt(objParam[2]);
                let speed = parseInt(objParam[3]);
                let textura = objParam[4];
      
                if(type=="fegyver") {
                    objekt = new Fegyver(x,y,nev,dmg,range,speed,textura,this)
                    }
                if(type=="ruha") {objekt = new Ruha(x,y,nev,dmg,range,speed,textura,this)}
                if(type=="kulcs") {
                    let textura = objParam[1];
                    objekt = new Kulcs(x,y,nev,textura,this)
                }
                if(type=="penz") {
                    let ertek = objParam[0];
                    objekt = new Coin(x,y,ertek,this)
                }
                
            }
            
            if(type == "wall" || type=="lada" || type =="exit" || type=="enemy" || type=="uzenet" || type=="arus" || type=="tile") {   
                if(type=="wall") {
                    let objParam = objAtr[1].split(",");
                    let titkos = objParam[0];
                    let textura = objParam[1];
                    objekt = new Wall(x,y,titkos,textura,this)}
                 if(type=="tile") {
                    //tile,240,120,|false,false,padlo1.png
                    let objParam = objAtr[1].split(",");
                    let isBedrock = objParam[0];
                    let isVoid = objParam[1];
                    let textura = objParam[2];
                        objekt = new Tile(x,y,isBedrock,textura,this,isVoid)}
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
                        let range = parseInt(itemParam[2]);
                        let speed = parseInt(itemParam[3]);
                        let item_textura = itemParam[4];
                        if(itemType=="fegyver") {
                            item = new Fegyver(-1,-1,nev,dmg,range,speed,item_textura,this)}
                          if(itemType=="ruha") {item = new Ruha(-1,-1,nev,dmg,range,speed,item_textura,this)}
                        //random most nem csinál semmit
                        objekt = new Lada(x,y,item,kulcsos,texture,random,this)
                    }
                   
                }
                if(type == "arus") {
            
                    let items =[];
                    let params = objAtr[objAtr.length-1].split(",")
                    let nev = params[0]
                    let selfimg = params[1]
                    let texture = params[2]
                    for(let i in objAtr) {
                        if(i > 0 && i < objAtr.length-1) {
    
                            let aru = objAtr[i].split(",")
                            let tipus = aru[0];
                            let nev = aru[1];
                            let dmg = parseInt(aru[2]);
                            let range = parseInt(aru[3]);
                            let speed = parseInt(aru[4]);
                            let texture = aru[5]
                            let ar =  parseInt(aru[6])
                            let item = null;
                            if(tipus == "fegyver") {
                                item = new Fegyver(-1,-1,nev,parseInt(dmg),range,speed,texture,this)
                            }
                            if(tipus == "ruha") {
                                item = new Ruha(-1,-1,nev,parseInt(dmg),range,speed,texture,true,this)
                            }
                            if(item != null) {
                                items.push({"item":item,"ar":ar})
                            }
                    }
                }
                objekt = new Arus(x,y,items,nev,texture,this,selfimg);
            }

                if(type=="exit") {
                    let objParam = objAtr[1].split(",")
                    let loc = parseInt(objParam[0]);
                    let id = parseInt(objParam[1]);
                    let locDoor = parseInt(objParam[2]);
                    let textura = objParam[3];
                    
                    objekt = new Exit(x,y,id,loc,locDoor,textura,this)
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

function aabbCollision(A, B) { //amint
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
let felvett_coin = 0;
let isPenz = false;
//pick up szöveg
let szamlalo = 0;
setInterval(()=>{
    if(isPenz) {
        szamlalo++;
        if(szamlalo == 2) 
            {
                let log = document.getElementById("logContent")
                let t = document.createElement("p")
                t.innerText = `+${felvett_coin} pénz`;
                log.appendChild(t);felvett_coin = 0;
                log.scrollTop = log.scrollHeight;
            }


    }

},1000)





function torol(obj,vasarolt = false) {
    let text = document.createElement("p")
    text.setAttribute("class","pick-up")
    let span = document.createElement("span")
    span.setAttribute("class","pick-up-number")
    text.style.top = -30;
    let textMeret = 100;
    obj.x = kari.x;
    obj.y = kari.y 
    isPenz = false;


    kari.picupItem(obj)
    if(obj instanceof Coin) {
        isPenz = true;
        szamlalo = 0;
        felvett_coin+= parseInt(obj.ertek);
        textMeret = 100;
        span.innerText = felvett_coin
        text.innerText = "+"
         span.style.color = "orange"
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
            let span = document.createElement("span")
            span.innerText = "\n+1"
            span.style.color = "grey"
            text.appendChild(span)
            span = document.createElement("span")
            span.innerText+= " kulcs"
            text.appendChild(span)
            text.style.top = -30;
        }
        if(obj instanceof Fegyver) {
            span.innerText = obj.dmg;
            span.style.color = "orange"
            if(obj.dmg > 0) {
                text.innerText += "\nSebzésed nőtt: +"
                text.appendChild(span)
            }else {
                text.innerText += "\nSebzésed csökkent: "
            }
            text.appendChild(span)
        }
        if(obj instanceof Ruha) {
                span.innerText = obj.hp;
                span.style.color = "red"
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

            let log = document.getElementById("logContent")
            let t = document.createElement("p")
            t.innerText = text.innerText
            log.appendChild(t)
            log.scrollTop = log.scrollHeight;
    }

    rendez();
        obj.div.remove(); //töröljük a divet
        if(!(objektek[0] instanceof Arus)){
            objektek.shift()
        }
    
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
                       // console.log("Kulcsal lett kinyitva")
                        obj.kinyit();
                        kari.infoUpdate();
                    }else {
                      //  console.log("nincs kulcsod")
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
    if(kari != null && kari.zuhan == false) {
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

let palyanevek = ["a","b"]

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

async function betoltesEsMegjelenites(location, doorID) {
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
            aktualPalya = location
            palyak[aktualPalya].show(doorID); 
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


//Valahogy megoldani hogy ahoz az ajtóhoz tegyen vissza ahonnan bejöttünk
//Szebb UI, effectek amikor megsebődünk
//momentum
//hangok
