
let objektek = []; //Minden benne van, még a tile-k is.
let ujObjektej = [] //csak az újonnan létrehozott objektek vannak benne
let enemyk = []
let kari = null;
//globális elérés érdekében
let kurzor = "cursor";
let vaszon = document.getElementById("canvas")
let menuBox =document.createElement("div")
let menu = document.getElementById("menu")
let itemBox = document.createElement("div");
let itemListaDiv = document.createElement("div")
let exits = 0;
let global_wall = "fal4.png";
let global_enemy ="enemy.png";
let global_exit ="exit.png"
let global_lada ="lada.png"
let global_penz ="penz.png"
let global_ruha = "ruha.png"
let global_fegyver = "kard.png"
let global_kulcs = "kulcs.png"


class Objekt {
    constructor(x,y,w=60,h=60,texture="nincs") {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.div = document.createElement("div")
        this.div.style.width = this.width;
        this.div.style.height = this.height;
        this.div.style.left = x;
        this.div.style.top = y;
        this.div.style.position = "absolute"
        this.div.style.zIndex = 100
        this.div.style.opacity = 0.1;
        this.atributumok = null;
        this.texture = texture
        this.div.style.border = "1px solid black"
        objektek.push(this)
    }
    textureBeallit(obj,texture) {
    obj.div.style.backgroundImage = "url(../Textures/"+texture+")"
    }
    menuLista() {
        if(this.atributumok != null) {
        menuBox.remove();
        menuBox =document.createElement("div")
        for(let i in this.atributumok) {
            let p = document.createElement("p")
            p.innerText = i+": ";
            let input = document.createElement("input")
            let t_name = document.createElement("span")
        
            if(i == "Textúra") {
                t_name.innerText = this.atributumok[i]
                input.setAttribute("type","file")
                input.addEventListener("change",()=>{
                     let split = input.value.split("\\")
                    let texture =split[split.length-1];
                    this.atributumok[i] = texture;
                    t_name.innerText = this.atributumok[i]
                    this.textureBeallit(this,texture)

                })
            }else {
                input.value = this.atributumok[i]
            
                input.addEventListener("input",()=>{
                    this.atributumok[i] = input.value
                })
            }
            p.appendChild(t_name)
            p.appendChild(input)
            menuBox.appendChild(p);
            menu.appendChild(menuBox)
        }
    }
    }

}

class Tile extends Objekt {
    constructor(x,y,w=60,h=60){
        super(x,y,w,h) 
    }
}
class Wall extends Objekt{
        constructor(x,y,texture=global_wall,titkos=false) {
            super(x,y)
            this.div.style.backgroundColor = "yellow"
            this.div.style.zIndex = 1
            this.div.style.opacity = 1;
            this.texture = texture
            this.div.style.backgroundImage = "url(../Textures/"+this.texture+")"
            this.titkos = (titkos == "true")
            if(this.texture != "nincs") {
                this.div.style.border = "none"
            }
            this.atributumok = {
                "Titkos": this.titkos,
                "Textúra": this.texture
            }
            ujObjektej.push(this)
        
        }
}
    
class Enemy extends Objekt{
        constructor(x,y,nev="Béla",dmg=3,hp =15,speed=1, drop = 3,texture=global_enemy) {
            super(x,y)
            this.div.style.backgroundColor = "red"
            this.div.style.zIndex = 1
            this.div.style.opacity = 1;
            this.nev = nev;
            this.texture = texture
            this.dmg = dmg;
            this.hp = hp;
            this.drop = drop,
            this.div.style.backgroundImage = "url(../Textures/"+this.texture+")"
            this.speed = speed
            if(this.texture != "nincs") {
                this.div.style.border = "none"
            }
            this.atributumok = {
                "Név": this.nev,
                "Sebzés": this.dmg,
                "Hp": this.hp,
                "Sebesség": this.speed,
                "Pénz": this.drop,
                "Textúra": this.texture
            }
            ujObjektej.push(this)
        }
    
        atrUpdate() {
            this.atributumok = {
                "Név": this.nev,
                "Sebzés": this.dmg,
                "Hp": this.hp,
                "Sebesség": this.speed,
                "Pénz": this.drop,
                "Textúra": this.texture
            }
}
}

class Lada extends Objekt{
    constructor(x,y,item = new Item(0,0,"LadaItem"),texture = global_lada,kulcsos = false, isRandom = false) {
        super(x,y)
        this.div.style.backgroundColor = "gray"
        this.div.style.zIndex = 1
        this.div.style.opacity = 1;
        this.item = item;
        this.isRandom = isRandom;
        this.texture = texture;
        this.kulcsos = kulcsos
        this.div.style.backgroundImage = "url(../Textures/"+this.texture+")"
        if(this.texture != "nincs") {
            this.div.style.border = "none"
        }
        this.atributumok = {
            "Kulcsos":this.kulcsos,
            "Item":this.item.nev,
            "Random": this.isRandom,
            "Textúra": this.texture
        }
        ujObjektej.push(this)
    }

    atrUpdate() {
        this.atributumok = {
            "Kulcsos":this.kulcsos,
            "Item":this.item.nev,
            "Random": this.isRandom,
            "Textúra": this.texture
        }
    }

    menuLista() {
        this.atrUpdate()
        if(this.atributumok != null) {
        menuBox.remove();
        menuBox =document.createElement("div")
        for(let i in this.atributumok) {
            let p = document.createElement("p")
            p.innerText = i+": ";
            let input = document.createElement("input")
            let t_name = document.createElement("span")
            if(i == "Textúra") {
                t_name.innerText = this.atributumok[i]
                input.setAttribute("type","file")
                input.addEventListener("change",()=>{
                     let split = input.value.split("\\")
                    let texture =split[split.length-1];
                    this.atributumok[i] = texture;
                    t_name.innerText = this.atributumok[i]
                    this.div.style.backgroundImage = "url("+texture+")"
                })
            }else {
                input.value = this.atributumok[i]
                input.addEventListener("input",()=>{
                    this.atributumok[i] = input.value
                })
            }
            if(i == "Item") {
                input.disabled = true
            }
            p.appendChild(t_name)
            p.appendChild(input)
            menuBox.appendChild(p);
            menu.appendChild(menuBox)
        }
        //box
        let button = document.createElement("button");
        button.innerText = "Add(+) item"
        button.addEventListener("click",()=> {
            this.itemAddBox()
        })
        menuBox.appendChild(button);}
    }

    itemAddBox() {
        itemBox = document.createElement("div");
        itemBox.style.position = "absolute";
        itemBox.setAttribute("id","itemBox");
        let w = 200;
        let h = 200;
        let typeLista = document.createElement("select");
        let sajat = document.createElement("option");
        let letezo = document.createElement("option");
        let random = document.createElement("option");


        sajat.innerText = "Saját item"
        sajat.value = "sajat"
        letezo.innerText = "Létező item"
        letezo.value = "letezo"
        random.innerText = "Random item"
        random.value = "random"
        let placeholder = document.createElement("option");
        placeholder.innerText = "Item";
        typeLista.appendChild(placeholder)
        typeLista.appendChild(sajat)
        typeLista.appendChild(letezo)
        typeLista.appendChild(random)
        let valasztodiv = document.createElement("div")
        typeLista.addEventListener("change",()=>{
            valasztodiv.remove();
            itemListaDiv.remove()
            valasztodiv = document.createElement("div")
            if(typeLista.value == "sajat") {
                this.isRandom = false;
                let radiok = [];
                //Választható gombok
                let radio = document.createElement("input")
                radio.setAttribute("type","radio")
                radio.setAttribute("name","itemTipus")
                radio.setAttribute("value","fegyver")
                let label = document.createElement("label")
                label.innerText="Fegyver: "
                label.appendChild(radio);
                valasztodiv.appendChild(label);
                radiok.push(radio)

                radio = document.createElement("input")
                radio.setAttribute("type","radio")
                radio.setAttribute("name","itemTipus")
                radio.setAttribute("value","ruha")
                label = document.createElement("label")
                label.innerText="Ruha: "
                label.appendChild(radio);
                valasztodiv.appendChild(label);
                radiok.push(radio)
                itemBox.appendChild(valasztodiv)
                //item listájának felsorolása
                for(let gomb of radiok) {
                    gomb.addEventListener("change",()=>{
                        itemListaDiv.remove()
                        this.itemListaBox(valasztodiv,gomb.value);
                    })
                }
            }
             //TODO MEGCSINÁLNI HOGY LISTÁBÓL LEHESSEN VÁLASZTANI, A RANDOM OPCIÓ MEG VÉLETLENSZERŰEN VÁLASZT A LISTÁBÓL
            //valasztodiv
            if(typeLista.value == "letezo") {
                this.isRandom = false;
                let lista = document.createElement("select");
                for(let i = 0; i < itemekNagylistaja.length; i++) {
                    let opc = document.createElement("option");
                    opc.value = itemekNagylistaja[i].nev;
                    opc.innerText = itemekNagylistaja[i].nev;
                    lista.appendChild(opc) //kiválasztáskor irja ki a hozzá tartozó tulajdonságokat, ezeket ne lehessen módosítani.
                    //alapból így írja a ládára kattintáskor hogy milyen item van benne, ne csak a nevét hanem egy tulajdonság listát is.
                }

                lista.addEventListener("change",()=>{
                    let item = null;
                    itemListaDiv.remove()
                    itemListaDiv = document.createElement("div")
                    for(let j of itemekNagylistaja) {
                        if(j.nev == lista.value) {item = j;}
                    }
                    for(let j in item.atributumok) {
                        let p = document.createElement("p");
                        let input = document.createElement("input")
                        p.innerText = j+": ";
                        input.value = item.atributumok[j];
                        input.disabled = true;
                        if(!isNaN(item.atributumok[j])) {
                            input.setAttribute("type","number")
                        }else {
                            input.setAttribute("type","text")
                        }
                        p.appendChild(input)
                        itemListaDiv.appendChild(p)
                    }
                    itemBox.appendChild(itemListaDiv);

                    let save = document.createElement("button")
                    save.innerText = "Mentés!"
            
                    save.addEventListener("click",()=>{
                            this.item = item;
                            this.menuLista();
                    })
                    
                    itemListaDiv.appendChild(save)
                })
                valasztodiv.appendChild(lista);
                itemBox.appendChild(valasztodiv)
                
            }
            
            if(typeLista.value == "random") {
                this.isRandom = true;
             /* this.item = itemekNagylistaja[Math.floor(Math.random()*itemekNagylistaja.length)]
              this.menuLista();*/
            }

        }) 
        itemBox.style.width = w;
        itemBox.style.height = h
        itemBox.style.marginTop= 20;
        itemBox.style.marginLeft = 20
        itemBox.style.border = "2px solid black"
        itemBox.remove();
        itemBox.appendChild(typeLista);
        menuBox.appendChild(itemBox);
    }

    itemListaBox(parent,tipus) {
        itemListaDiv = document.createElement("div")
        let item;
        if(tipus =="fegyver") {
            item = new Fegyver();
        }
        if(tipus =="ruha") {
            item = new Ruha();
        }

            for(let atr in item.atributumok) {
                let p = document.createElement("p")
                p.innerText = atr+":";
                let input = document.createElement("input")
                input.setAttribute("id",atr)
                if(!isNaN(item.atributumok[atr])) {
                    input.setAttribute("type","number")
                }else {
                    input.setAttribute("type","text")
                }
                p.appendChild(input);
                itemListaDiv.remove();
                itemListaDiv.appendChild(p)
            }
        let save = document.createElement("button")
        save.innerText = "Mentés!"

        save.addEventListener("click",()=>{
            if(tipus == "fegyver") {
                item.nev = document.getElementById("Név").value
                item.seb = document.getElementById("Sebzés").value
                this.item = item;
            }
            if(tipus == "ruha") {
                item.nev = document.getElementById("Név").value
                item.seb = document.getElementById("Védelem").value
                this.item = item;
            }
            this.menuLista();

        })
        
        itemListaDiv.appendChild(save)
        parent.appendChild(itemListaDiv);
    }

}

class Exit extends Objekt {
    constructor(x,y,location="0",id=exits, texture=global_exit,isSpawn=true) { //id alapján tudjuk majd megadni hogy hova vigyen minket
        super(x,y)
      //  this.div.style.backgroundColor = "black"
        this.div.style.opacity = 1;
        this.location = location
        this.id = id;
        this.texture = texture
        this.isSpawn = isSpawn;
        this.div.style.backgroundImage = "url(../Textures/"+this.texture+")"
        this.div.style.border = ""
        this.atributumok = {
            "id":this.id,
            "location":this.location,
            "Spanw hely": this.isSpawn,
            "Textúra": this.texture
         }
         exits++;
         ujObjektej.push(this)
    }
    atrUpdate() {
        this.atributumok = {
            "id":this.id,
            "location":this.location,
            "isSpawn": this.isSpawn,
            "Textúra": this.texture
        }
    }

    menuLista() {
        if(this.atributumok != null) {
        menuBox.remove();
        menuBox =document.createElement("div")
        for(let i in this.atributumok) {
            let p = document.createElement("p")
            p.innerText = i+": ";
            let input = document.createElement("input")
            let t_name = document.createElement("span")
        
            if(i == "id") {
                input.disabled = true;
            }


            if(i == "Textúra") {
                t_name.innerText = this.atributumok[i]
                input.setAttribute("type","file")
                input.addEventListener("change",()=>{
                     let split = input.value.split("\\")
                    let texture =split[split.length-1];
                    this.atributumok[i] = texture;
                    t_name.innerText = this.atributumok[i]
                    this.textureBeallit(this,texture)
                })
            }else {
                input.value = this.atributumok[i]
                input.addEventListener("input",()=>{
                    this.atributumok[i] = input.value
                })
            }
            p.appendChild(t_name)
            p.appendChild(input)
            menuBox.appendChild(p);
            menu.appendChild(menuBox)
        }
    }
    }

}


class Item extends Objekt{
    constructor(x = 0,y = 0,nev = "Item",manual = true, texture  = "nincs") {
        if(x == 0 && y == 0) {
            super(0,0,0,0)
        }else { //850 0
            if(manual) {
                super(x+30/2,y+30/2,30,30)
            }else {
                super(x,y,30,30)
            }
        }
         this.div.style.backgroundColor = "brow"
         this.div.style.zIndex = 1
         this.div.style.opacity = 1;
         this.nev = nev;
         this.texture = texture;
         this.atributumok = {
            "Név":this.nev,
            "Textúra":this.texture
         }
         ujObjektej.push(this)
    }
}

class Kulcs extends Item{
    constructor(x,y,nev="kulcs",texture=global_kulcs,manual = true) {
        super(x,y,nev, manual)
        this.texture = texture;
        if(this.texture != "nincs") {
            this.div.style.border = "none"
        }
        this.div.style.backgroundImage = "url(../Textures/"+this.texture+")"
        this.atributumok = {
            "Név":this.nev,
            "Textúra":this.texture
         }
        // this.div.style.backgroundColor = "cyan"   
    }
}

class Penz extends Item{
    constructor(x,y,value=1,texture=global_penz,manual = true) {
        super(x,y,"pénz", manual, texture)
        this.texture = texture;
        this.value=value
        
        if(this.texture != "nincs") {
            this.div.style.border = "none"
        }
        this.div.style.backgroundImage = "url(../Textures/"+this.texture+")"
        this.atributumok = {
            "Érték":this.value,
            "Textúra":this.texture
         }
         if(texture == "nincs") {
            this.div.style.backgroundColor = "orange"  
         }
         
      
    }
}


class Fegyver extends Item{
    constructor(x,y,dmg = 3,nev="Fegyver",textura=global_fegyver,manual = true) {
        super(x,y,nev,manual)
       // this.div.style.backgroundColor = "red"
        this.dmg = dmg;
        this.texture = textura
        if(this.texture != "nincs") {
            this.div.style.border = "none"
        }
        this.div.style.backgroundImage = "url(../Textures/"+this.texture+")"
        this.atributumok = {
            "Név":this.nev,
            "Sebzés":this.dmg,
            "Textúra": this.texture,
         }
    }

    atrUpdate() {
        this.atributumok = {
            "Név":this.nev,
            "Sebzés":this.dmg,
            "Textúra": this.texture
        }
    }
}

class Ruha extends Item{
    constructor(x,y,ved = 3,nev = "Ruha",textura=global_ruha,manual = true) {
        super(x,y,nev,manual)
       // this.div.style.backgroundColor = "yellow"
        this.ved = ved;
        this.texture = textura
        if(this.texture != "nincs") {
            this.div.style.border = "none"
        }
        this.div.style.backgroundImage = "url(../Textures/"+this.texture+")"
        this.atributumok = {
            "Név":this.nev,
            "Védelem":this.ved,
            "Textúra": this.texture
         }
    }
    atrUpdate() {
        this.atributumok = {
           "Név":this.nev,
        "Védelem":this.ved,
        "Textúra": this.texture
        }
    }
}


//Ezt majd valahogy fel kell tölteni felgyverekkel, talán a pálya betöltésekor.
let itemekNagylistaja = [
    new Fegyver(0,0,30,"Giga-megyfegyver"),
    new Fegyver(0,0,15,"Mega-megyfegyver"),
    new Fegyver(0,0,7,"Sima-megyfegyver"),
    new Ruha(0,0,30,"Giga-hagymaruha"),
    new Ruha(0,0,15,"Mega-hagymaruha"),
    new Ruha(0,0,7,"Sima-hagymaruha"),
]

class Hit {
    constructor(x,y,w,h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

    }
}


function aabbCollision(A, B) {
    return (
        A.x <= B.x+ B.width && 
        A.x+A.width >= B.x && 
        A.y <= B.y + B.height &&
        A.y + A.height >= B.y
    )
}


function torol(obj) {
    if(obj instanceof Exit) {
        exits--;
    }
    objektek = objektek.filter(item => item !== obj);
    ujObjektej = ujObjektej.filter(item => item !== obj);
}

let nyomva = 0;
let ucso = null;   
vaszon.addEventListener("mousedown",(ev)=>{ 
    nyomva = 2;
    let e = new Hit(ev.clientX,ev.clientY,1,1)
    if(kurzor == "cursor") {
        setTimeout(()=>{
            if(nyomva != 1) {
                for(let o of objektek) {
                    if(aabbCollision(o,e)) {
                        if(o.div.id != "tile") {
                            ucso = o; 
                        }
                    }
                 }
                 if(ucso instanceof Tile) {
                    ucso = null;
                 }
                 nyomva = 2;
           
            }
        },100)
    }

})
vaszon.addEventListener("mousemove",(ev)=>{
    let e = new Hit(ev.clientX,ev.clientY,1,1)
        if(nyomva == 2 && ucso != null) {
            ucso.x = e.x-ucso.width/2
            ucso.y = e.y-ucso.height/2
            ucso.div.style.left = ucso.x
            ucso.div.style.top = ucso.y
            //Meghatározni melyik négyzethez van a legközelebb és abba beletenni.
        }
})
vaszon.addEventListener("mouseup",(ev)=>{

    if(nyomva == 2) {
    let e = new Hit(ev.clientX,ev.clientY,1,1)
    for(let o of objektek) {
        if(aabbCollision(o,e)) {
                if(!(ucso instanceof Tile)) {
                    if(ucso != null && o != null) {
                        if(ucso instanceof Item) {
                            ucso.x = o.x+ucso.width/2;
                            ucso.y = o.y+ucso.height/2;
                            ucso.div.style.left = ucso.x
                            ucso.div.style.top = ucso.y
                        }else {
                            ucso.x = o.x;
                            ucso.y = o.y;
                            ucso.div.style.left = ucso.x
                            ucso.div.style.top = ucso.y
                        }
                        
                        break;
                    }
               
          
            }
        }
     }
     nyomva = 1;
     ucso = null;
    }
     
})

vaszon.addEventListener("click",(ev)=>{
    let e = new Hit(ev.clientX,ev.clientY,1,1)

if(kurzor == "delete") {
    let ucso = null;
    for(let o of objektek) {
        if(aabbCollision(o,e)) {
            if(o.div.id != "tile") {
                ucso = o;
            }
        }
     }
     if(ucso instanceof Tile) {} else {ucso.div.remove();}
 
     torol(ucso);
}
if(kurzor == "cursor") {
    let ucso = null;
    for(let o of objektek) {
        if(aabbCollision(o,e)) {
            if(o.div.id != "tile") {
                ucso = o;
            
            }
        }else {o.div.setAttribute("id",null)}
     }
     if(ucso != null ) {
     ucso.div.setAttribute("id","kivalasztva")
     ucso.menuLista()
    }

    }
    
})


function kivalaszott(id,x,y) { //Ez felellős azért hogy oda tegyen új elemet ahova kattintunk
    switch(id) {
        case "Wall":
            return obj = new Wall(x,y)
        case "Ellen":
            return obj = new Enemy(x,y)
        case "Lada":
            return  obj = new Lada(x,y)
        case "Kulcs":
            return  obj = new Kulcs(x,y)
        case "Fegyver":
            return  obj = new Fegyver(x,y)           
        case "Ruha":
            return  obj = new Ruha(x,y)
         case "Exit":
            return  obj = new Exit(x,y)
        case "Penz":
            return  obj = new Penz(x,y)
        case "delete":
            return obj = "delete"
        default:
            return  obj = "cursor"
    }
}


function kivalaszt(i) { //Ezt a radio buttonok hivják meg
    kurzor = i;
}

function info() {


    alert(`
        Ez egy pálya készítő és szerkesztő program. a pályákat a Maps-be ment a megadott néven és onnan olvassa be.
        Textúrákat a Textures mappából olvassa be.
        A pályát egy szövegszerkesztővel meglehet nyitni.
        Tippek:
        -Ha több objektumot egymásra tettél, vagy csak arréb akarod mozgatni csak tartsd lenyomva a bal egérgombot és a kívánt helyen engedd el.
        -Használj exportot ha a pályát más néven szeretnéd elmenteni, használj mentést ha a meglévő néven akarod elmenteni.
        -Az alapértelmezett textúrákat a beállításokban tudod megváltoztatni TODO.
        `)
}

//Pálya elkészítése, valahogy legyen dinamikusabb
createGrid(10,15)
function createGrid(gridw,gridh) {

    let w = 60;
    let h = 60;
    let offsetX = (window.screen.width/2)-gridw*w+(1.5*w);
    let offsetY = (window.screen.height/2)-((gridh*h)/2)+1.5*w;
    let x = offsetX;
    let y = offsetY;

for(let i = 0; i < gridw; i++) {
for(let j = 0; j < gridh; j++) {
    let tile =  new Tile(x,y,w,h);
    tile.div.setAttribute("id","tile")
    //860px
    tile.div.addEventListener("click",()=>{ //A rácsoknak adunk kattintás eventet 
        let o = kivalaszott(kurzor,tile.x,tile.y)
        if(o instanceof Objekt) {
            vaszon.appendChild(o.div)
        }

    })
    if(i == 0 || j == 0 || i == gridw-1 || j == gridh-1) {
        let wall = new Wall(x,y)
        vaszon.appendChild(wall.div)
       }
   vaszon.appendChild(tile.div)
    x+=w;
        }
    x= offsetX;
    y+= h;
}

}
        
    let palyaNev = null;
let save = document.getElementById("save");
save.addEventListener("click",()=> {
    if(save.value=="export") {
    palyaNev = prompt("Fájl név")
    }else {
        if(palyaNev == null) {
            palyaNev = prompt("Fájl név")
        }
    }
   
   let objektLista = [];
   for(i in ujObjektej) {
    let obj = ujObjektej[i]
        let type = "";
        if(ujObjektej[i] instanceof Fegyver) {type="fegyver"}
        if(ujObjektej[i] instanceof Ruha) {type="ruha"}
        if(ujObjektej[i] instanceof Kulcs) {type="kulcs"}
        if(ujObjektej[i] instanceof Wall) {type="wall"}
        if(ujObjektej[i] instanceof Enemy) {type="enemy"}
        if(ujObjektej[i] instanceof Lada) {type="lada"}
        if(ujObjektej[i] instanceof Exit) {type="exit"}
        if(ujObjektej[i] instanceof Penz) {type="penz"}
        if(type == "lada") {
            let itemType = ""
            if(obj.item instanceof Fegyver) {itemType = "fegyver"} else {itemType = "ruha"}
            objektLista.push({
                "type":type,
                "x":obj.x,
                "y":obj.y,
                "atributumok":obj.atributumok,
                "itemtype":itemType,
                "itemAtib":obj.item.atributumok
            })
        }else {
            if(type != "")
            objektLista.push({              
                "type":type,
                "x":obj.x,
                "y":obj.y,
                "atributumok":obj.atributumok
            })
        }
     
   }
    fetch('/mentes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({message: objektLista, palya_name: palyaNev})
      })
      .then(response => response.json()) //Válaszüzenet átalakítása
      .then(data => alert(data.message))
      .catch(error => alert('Nincs elindítva a szerver! vagy valami más...'+error));

})

let load = document.getElementById("loadFile");
//window.addEventListener("load",(event)=>{ hasznalhato majd a játékban pályák betöltésére. :)
load.addEventListener("change",(event)=>{
    let palyaSplit = load.value.split("\\")
    palyaNev = palyaSplit[palyaSplit.length-1]
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
            
        })
      .catch(error => alert('Nincs elindítva a szerver! vagy valami más...'));
})

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
  
            if(type=="fegyver") {objekt = new Fegyver(x,y,dmg,nev,textura,false)}
            if(type=="ruha") {objekt = new Ruha(x,y,dmg,nev,textura,false)}
            if(type=="kulcs") {
                let textura = objParam[1];
                objekt = new Kulcs(x,y,nev,textura,false)
            }
            if(type=="penz") {
                let ertek = objParam[0];
                let textura = objParam[1];
                objekt = new Penz(x,y,ertek,textura,false)
            }


            vaszon.appendChild(objekt.div)
        }
        if(type == "wall" || type=="lada" || type =="exit" || type=="enemy") {   
            if(type=="wall") { 
                //wall,500,100,|false,fal4.png
                let objParam = objAtr[1].split(",");
                let titkos = objParam[0];
                let textura = objParam[1];
                objekt = new Wall(x,y,textura,titkos)}
            if(type=="lada") {
                let objParam = objAtr[1].split(",");
                let kulcsos = objParam[0]
                let random = objParam[2];
                let texture = objParam[3];
                let itemType= objParam[4];
                itemType.trim()
                if(itemType == "fegyver" || itemType=="ruha") {
                    let item = null;
                    console.log("fegyveren belul")
                    let itemParam = objAtr[2].split(",")
                    let nev = itemParam[0];
                    let dmg = parseInt(itemParam[1]);
                    let item_textura = itemParam[2];
                    if(itemType=="fegyver") {item = new Fegyver(0,0,dmg,nev,item_textura,false)}
                    if(itemType=="ruha") {item = new Ruha(0,0,dmg,nev,item_textura,false)}
                    objekt = new Lada(x,y,item,texture,kulcsos,random)
                }
               
            }
            if(type=="exit") {
                let objParam = objAtr[1].split(",")
                let loc = parseInt(objParam[0]);
                let id = parseInt(objParam[1]);
                let spawn = objParam[2];
                let textura = objParam[3];
                objekt = new Exit(x,y,loc,id,textura,spawn)    //Ha több spawn van azt majd lekell kezelni.
            }
            if(type=="enemy") {
                //enemy,660,540,|Béla,3,100,9,300,enemy.png
                let objParam = objAtr[1].split(",")
                let nev = objParam[0]
                let dmg = objParam[1]
                let hp= objParam[2]
                let sebesseg = objParam[3]
                let penz = objParam[4]
                let texture = objParam[5]
                objekt = new Enemy(x,y,nev,dmg,hp,sebesseg, penz,texture)

            }
            vaszon.appendChild(objekt.div)
        }
 
    }

}