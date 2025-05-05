
let url = new URLSearchParams(window.location.search)
let palyaNev = url.get("palyaNev")
let objektek = [];
let enemyk = []
let kari = null;
let palyak = []
let aktualPalya = palyaNev;
if(aktualPalya == undefined) {
    aktualPalya = "spawn"
}
let uzenet = null;
let arus_megjelenitve = false
let palyanevek = ["spawn","ds1-1","ds1-2","ds1-3","ds1-4","ds1-oands","ds1-6","ds1-sanct","ds1-kali","ds1-arti","ds1-manus","ds1-dlcloot","ds2-1","ds2-2","ds2-csiga","ds2-3","ds2-throne","ds2-boss","ds2-jeges","ds2-merges","ds2-merges-duo","ds2-merges-sith","ds2-tuzes","ds2-tuzes-trio1","ds2-tuzes-trio2","ds2-tuzes-trio3","ds2-tuzes-weeb","ds3-kezdo","ds3-cinder","ds3-gale","ds3-friza","ds3-placeholder","ds3-tancos","ds3-dlc","ds3-lootroom","finale","boss","ending"]
//TODO: MEGOLDANI HOGY A ENEMYKNEK LEGYEN 2 FÉLE DIVÜK, 1 A COLLISION, 1 A IMG ÉS HITBOX, legyen egy max méret képeknél(nagy meló hanyagold máskorrax)
//Boss ládákra valami layer hogy tudassuk a játékossal nem elég sima kulcs hozzá,
class Palya  {
    constructor(nev,palyaString) {
        this.nev = nev
        this.palyaObjekt = [];
        this.palyaEnemyk = []
        this.palyaString = palyaString;
        palyak[this.nev] = this
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
                if(obj instanceof Ajto) {
                    obj.boundDiv.style.display ="none"
                }
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
                if(obj instanceof Ajto) {
                    obj.boundDiv.style.display ="block"
                }
               // $(".spawnexit").each(function(){$(this).css("z-index",100)})
            }
           
            if(obj instanceof Exit) {
       
                let offset = (obj.width-50)/2
                if(kari == null) {//kezdeti létrehozás
                    if(obj.id == 0 && obj.location == "spawn" || obj.id == 0 && palyaNev != undefined) {
                  
                        kari = new Karakter("Sándor",obj.x+offset, obj.y+offset)
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
                
            }
        }
    }

    palyaKeszitesFajlbol(palyaText) {
        if(palyaText != undefined){
            let palyaTomb = palyaText.split("\n") //felszeleteljük sorokra
        for(let obj of palyaTomb) {
            let objAtr = obj.split("|");
            let objType = objAtr[0].split(",")
            let type = objType[0].trim()
            let x =  Math.ceil(parseFloat(objType[1]));//eredeti x
            let y =  Math.ceil(parseFloat(objType[2])); //eredeti y
            if(x%60 != 0) {x-=x%60}
            if(y%60 != 0) {y-=y%60}
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

           
            let objekt = null;
            if(type == "fegyver" || type=="ruha" || type =="kulcs" || type=="penz") {  
                let objParam = objAtr[1].split(",")
                let nev = objParam[0];
                let dmg = parseFloat(objParam[1]);
                let range = parseFloat(objParam[2]);
                let speed = parseFloat(objParam[3]);
                let hang = objParam[4]
                let textura = objParam[5];
      
                if(type=="fegyver") {
                    objekt = new Fegyver(x,y,nev,dmg,range,speed,textura,this)
                    }
                if(type=="ruha") {objekt = new Ruha(x,y,nev,dmg,range,speed,textura,this)}
                if(type=="kulcs") {
                    let textura = objParam[1];
                    objekt = new Kulcs(x,y,nev,textura,this)
                }
                if(type=="penz") {
                    let ertek = parseFloat(objParam[0]);
                    objekt = new Coin(x,y,ertek,this)
                }
                
            }
            
            if(type == "wall" || type=="lada" || type =="exit" || type=="enemy" || type=="uzenet" || type=="arus" || type=="tile" || type=="ajto") {   
                if(type=="wall") {
                    let objParam = objAtr[1].split(",");
                    let titkos = objParam[0];
                    let textura = objParam[1];
                    objekt = new Wall(x,y,titkos,textura,this)}
                if(type=="ajto") {
                    let objParam = objAtr[1].split(",");
                    let kulcsId = objParam[0];
                    let textura = objParam[1];
                    objekt = new Ajto(x,y,kulcsId,textura,this)}
                 if(type=="tile") {
                    //tile,240,120,|false,false,padlo1.png
                    let objParam = objAtr[1].split(",");
                    let isBedrock = objParam[0];
                    let isVoid = objParam[1];
                    let textura = objParam[3];
                        objekt = new Tile(x,y,isBedrock,textura,this,isVoid)}
                if(type=="uzenet") {
                    
                        let objParam = objAtr[1].split(",");
                        let msg = ""
                        for(let i=0; i < objParam.length-1; i++) {
                            msg+=objParam[i]
                        }
                        let textura = objParam[objParam.length-1];;
                        objekt = new Uzenet(x,y,msg,textura,this)
                    }
                if(type=="lada") {
                    let objParam = objAtr[1].split(",");
                    let kulcsos = objParam[0]
                    let random = objParam[2];
                    let kulcsId = objParam[3];
                    let texture = objParam[4];
                    let itemType= objParam[5];
                    itemType.trim()
                    if(itemType == "fegyver" || itemType=="ruha") {
                        let item = null;
                        let itemParam = objAtr[2].split(",")
                        let nev = itemParam[0];
                        let dmg = parseFloat(itemParam[1]);
                        let range = parseFloat(itemParam[2]);
                        let speed = parseFloat(itemParam[3]);
                        let hang = itemParam[4];
                        let item_textura = itemParam[5];
                        if(itemType=="fegyver") {
                            item = new Fegyver(-1,-1,nev,dmg,range,speed,item_textura,this)}
                          if(itemType=="ruha") {item = new Ruha(-1,-1,nev,dmg,range,speed,item_textura,this)}
                        //random most nem csinál semmit
                        objekt = new Lada(x,y,item,kulcsos,texture,random, this,kulcsId)
                    }
                   
                }
                if(type == "arus") {
            
                    let items =[];
                    let params = objAtr[objAtr.length-1].split(",")
                    let nev = params[0]
                    let selfimg = params[1]
                    let hang = params[2]
                    let texture = params[3]
                    for(let i in objAtr) {
                        if(i > 0 && i < objAtr.length-1) {
    
                            let aru = objAtr[i].split(",")
                            let tipus = aru[0];
                            let nev = aru[1];
                            let dmg = parseFloat(aru[2]);
                            let range = parseFloat(aru[3]);
                            let speed = parseFloat(aru[4]);
                            let hang = aru[5]
                            let texture = aru[6]
                            let ar =  parseFloat(aru[7])
                            let db =  parseFloat(aru[8])
                            let item = null;
                            if(tipus == "fegyver") {
                                item = new Fegyver(-1,-1,nev,parseFloat(dmg),range,speed,texture,this)
                            }
                            if(tipus == "ruha") {
                                item = new Ruha(-1,-1,nev,parseFloat(dmg),range,speed,texture,true,this)
                            }
                            if(item != null) {
                                items.push({"item":item,"ar":ar,"db":db})
                            }
                    }
                }
                objekt = new Arus(x,y,items,nev,texture,this,selfimg);
            }

                if(type=="exit") {
                    let objParam = objAtr[1].split(",")
                  
                    let loc = objParam[1];
                    let id = parseInt(objParam[0]);
                    let locDoor = parseInt(objParam[2]);
                    let textura = objParam[3];
                    
                    objekt = new Exit(x,y,loc,id,locDoor,textura,this)
                    }
                if(type=="enemy") {
                        let objParam = objAtr[1].split(",")
                        let nev = objParam[0]
                        let dmg = parseFloat(objParam[1])
                        let hp= parseFloat(objParam[2])
                        let sebesseg = parseFloat(objParam[3])
                        let penz =  parseFloat(objParam[4])
                        let kulcsos = objParam[6]
                        let texture = objParam[7]
                        let hang = objParam[5]
                        let offset = (60-55)/2
                        objekt = new Enemy(x+offset,y+offset,hp,nev,dmg,sebesseg,penz,texture,this,kulcsos)
        
                }
            }
            this.hide()
        }
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
        felvett_coin+= parseFloat(obj.ertek);
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
            for(let i = 0; i < objektek.length; i++) {
                let o = objektek[i]
                if(o.x == obj.x && o.y == obj.y) {
                    objektek.splice(i,1)
                }
          
            }
            
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

let prefix = "../Sounds/"

const audioFiles = {
    coin: prefix+'pickupCoin.wav',
    hitEnemy: prefix+'hitEnemy.wav',
    player_damaged: prefix+'player_damaged.wav',
    enemy_damaged: prefix+"enemy_damaged.wav",
    utes: prefix+'utes.wav',
    cantOpen:prefix+'cantOpen.wav',
    openChest:prefix+"openChest.wav",
    pickupRuha:prefix+"pickupRuha.wav",
    pickupFegyver:prefix+"pickupFegyver.wav",
    pickupKey:prefix+"pickupKey.wav",
    walk:prefix+"walk.wav",
    gameMusic:prefix+"gameMusic.wav",
    openDoor:prefix+"openDoor.wav",
    openUzenet: prefix+"openUzenet.wav",
    openArus:prefix+"openArus.wav",
    buyAru:prefix+"buyAru.wav",
    cantBuy:prefix+"cantBuy.wav",
    win: prefix+"win.wav",
    cheers:prefix+"cheers.wav"

  };
  let audioBuffers = {};
  let audioCtx;
  let activeSources = {}; // Aktív lejátszók tárolása
  
  async function loadAllSounds() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  
    const entries = Object.entries(audioFiles);
  
    for (const [key, url] of entries) {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await audioCtx.decodeAudioData(arrayBuffer);
      audioBuffers[key] = buffer;
    }
  
    
  }
  
  function playSound(name, loop = false, volume = 0.1) {
    const buffer = audioBuffers[name];
    if (!buffer) {
      console.warn(`A ${name} hang nincs betöltve.`);
      return;
    }
  
    if (activeSources[name]) {
      activeSources[name].source.stop();
      delete activeSources[name];
    }
  
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.loop = loop;
  
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = volume; // Itt állítjuk be a hangerőt
  
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
  
    source.start();
  
    // Tároljuk a lejátszót és a gainNode-ot is, ha később állítani akarod
    activeSources[name] = { source, gainNode };
  }
  
  
  function stopSound(name) {
    if (activeSources[name]) {
        console.log(activeSources)
      activeSources[name].source.stop();
      delete activeSources[name];
    } else {
      console.warn(`A(z) ${name} hang nincs aktív lejátszásban.`);
    }
  }
  
  window.addEventListener('DOMContentLoaded', async () => {
    await loadAllSounds();
    playSound("gameMusic", true);
  
  });
  

let olvas = false;
let xm = 0;
let ym = 0;
let le = 0.99;
let bgMusicPlaying = false

document.body.addEventListener("keydown",function(e) {   

rendez()
if(e.key == "w" || e.key == "W") {
    kari.iranyok[0] = true
    kari.mozog = true
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
    let canOpen = false
    for(let obj of objektek) {
        if(obj instanceof Ajto) {
            let ajtoBox = new Hitbox(obj.hitX, obj.hitY, obj.width, obj.height)
            if(aabbCollision(ajtoBox, kari)) {
                if(obj.kulcsId != "" && obj.nyitva == false) {
                    for(let k of kari.kulcsok) {
                        if(k.nev == obj.kulcsId) {
                            canOpen = true
                        
                            obj.kinyit();
                            break;
    
                        }
                    }
                    if(canOpen==false) {
                        playSound("cantOpen")
                
                    }
                }
            }
            
        }


    if(aabbCollision(obj, kari)) { 
        if(obj instanceof Lada) {
            if(obj.nyitva == false) {
                if(obj.kulcsos) {
                    if(obj.kulcsId != "") {
                        for(let k of kari.kulcsok) {
                            if(k.nev == obj.kulcsId) {
                                canOpen = true

                                obj.kinyit();

                            }
                        }
                        if(canOpen==false) {
                            playSound("cantOpen")
                        }
                    }
                    else if(obj.vanEkulcs(kari)) {
                        obj.kinyit();
                        kari.infoUpdate();
                    }else {
                        playSound("cantOpen")
                     
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
let kariLastX = 0
let kariLastY = 0
setInterval(()=>{
    if(kari.zuhan == false){
        kariLastX = kari.x
        kariLastY = kari.y
    }

},1000)
setInterval(()=>{

    if(kari != null && kari.zuhan == false&& (kari.iranyok[0] ||kari.iranyok[1] ||kari.iranyok[2]||kari.iranyok[3])){
    playSound("walk");}
  
},300)
setInterval(function(){
if(kari != null && kari.zuhan == false) {   
if(kari.iranyok[0]) {kari.up(); if(kari.nezesNyomva == false) {kari.nezesIrany="ArrowUp";}}
if(kari.iranyok[1]) {kari.left(); if(kari.nezesNyomva == false) {kari.nezesIrany="ArrowLeft";}}
if(kari.iranyok[2]) {kari.down(); if(kari.nezesNyomva == false) {kari.nezesIrany="ArrowDown";}}
if(kari.iranyok[3]) {kari.right(); if(kari.nezesNyomva == false){ kari.nezesIrany="ArrowRight";}}
//Ha az ajtó rossz helyre dob megtörténhet hogy egy exit eltünik
kari.look(kari.nezesIrany)

}
for(let enemy of enemyk) {
    if(enemy.zuhan == false) {
        enemy.mozog()
    }

}
},10)

//Ajtók zárása

setInterval(()=> {
    for(let e of objektek) {
        if(e instanceof Exit) {
            e.lockdown()
        }
    }
},100)

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
            

            if(location == "ending") {
                $("#win").css("background-image","url(textures/victory.png)")
                stopSound("gameMusic")
                playSound("win")
                playSound("cheers")
                kari = null
                source = activeSources["win"].source
                setTimeout(()=>{window.location.href = "index.html"},source.buffer["duration"]*1000)
                console.log(source)
            
            }else {
            palyak[aktualPalya].hide();
            aktualPalya = location
            palyak[aktualPalya].show(doorID);
        }

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
        console.log('Nincs elindítva a szerver! vagy valami más...')
        console.log(error)
}
}
function palyaKeszito(palyaNev,palyaString) {
new Palya(palyaNev,palyaString)
}

//music offolásra lehetőség,