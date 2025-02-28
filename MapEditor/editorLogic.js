
let objektek = [];
let ujObjektej = []
let enemyk = []
let kari = null;
let kurzor = "cursor";
let vaszon = document.getElementById("canvas")
let menuBox =document.createElement("div")
let menu = document.getElementById("menu")
let itemBox = document.createElement("div");
let itemListaDiv = document.createElement("div")
class Objekt {
    constructor(x,y,w=60,h=60) {
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
        this.div.style.border = "1px solid black"
        this.div.style.zIndex = 100
        this.div.style.opacity = 0.1;
        this.atributumok = null;
        objektek.push(this)
        ujObjektej.push(this)
    }
    menuLista() {
        if(this.atributumok != null) {
        menuBox.remove();
        menuBox =document.createElement("div")
        for(let i in this.atributumok) {
            let p = document.createElement("p")
            p.innerText = i+": ";
            let input = document.createElement("input")
            input.value = this.atributumok[i]
            input.addEventListener("input",()=>{
                this.atributumok[i] = input.value
            })
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
    constructor(x,y) {
        super(x,y)
        this.div.style.backgroundColor = "yellow"
        this.div.style.zIndex = 1
        this.div.style.opacity = 1;
        this.texture = "nincs"
        this.atributumok = {
            "Textúra": this.texture,
        }
    
    }
}

class Enemy extends Objekt{
    constructor(x,y,nev="Béla",dmg=3,hp = 100) {
        super(x,y)
        this.div.style.backgroundColor = "red"
        this.div.style.zIndex = 1
        this.div.style.opacity = 1;
        this.nev = nev;
        this.dmg = dmg;
        this.hp = hp;
        this.atributumok = {
            "Név": this.nev,
            "Sebzés": this.dmg,
            "Hp": this.hp
        }
    }

    atrUpdate() {
        this.atributumok = {
            "Név": this.nev,
            "Sebzés": this.dmg,
            "Hp": this.hp
        }
    }

}


class Item extends Objekt{
    constructor(x = 0,y = 0,nev = "Item") {
        super(x+30/2,y+30/2,30,30)
         this.div.style.backgroundColor = "brow"
         this.div.style.zIndex = 1
         this.div.style.opacity = 1;
         this.nev = nev;
         this.texture = "nincs"
         this.atributumok = {
            "Név":this.nev,
            "Textúra":this.texture
         }
    }
}

class Kulcs extends Item{
    constructor(x,y) {
        super(x,y)
         this.div.style.backgroundColor = "cyan"   
    }
}
class Fegyver extends Item{
    constructor(x,y,dmg = 3) {
        super(x,y)
         this.div.style.backgroundColor = "red"
         this.dmg = dmg;
         this.atributumok = {
            "Név":this.nev,
            "Sebzés":this.dmg
         }
    }

    atrUpdate() {
        this.atributumok = {
            "Név":this.nev,
            "Sebzés":this.dmg
        }
    }
}

class Ruha extends Item{
    constructor(x,y,ved = 3) {
        super(x,y)
        this.div.style.backgroundColor = "yellow"
        this.ved = ved;
        this.atributumok = {
            "Név":this.nev,
            "Védelem":this.ved
         }
    }
    atrUpdate() {
        this.atributumok = {
           "Név":this.nev,
        "Védelem":this.ved
        }
    }
}

class Hit {
    constructor(x,y,w,h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;

    }
}

class Lada extends Objekt{
    constructor(x,y,item = new Item()) {
        super(x,y)
        this.div.style.backgroundColor = "gray"
        this.div.style.zIndex = 1
        this.div.style.opacity = 1;
        this.item = item;
        this.atributumok = {
            "Kulcsos":false,
            "Item":this.item.nev
        }
    }

    atrUpdate() {
        this.atributumok = {
            "Kulcsos":false,
            "Item":this.item.nev
        }
    }

    menuLista() { //LÁDA
        this.atrUpdate()

        if(this.atributumok != null) {
        menuBox.remove();
        menuBox =document.createElement("div")
        for(let i in this.atributumok) {
            let p = document.createElement("p")
            p.innerText = i+": ";
            let input = document.createElement("input")
            input.value = this.atributumok[i]
            input.addEventListener("input",()=>{
                this.atributumok[i] = input.value
            })
            p.appendChild(input)
            menuBox.appendChild(p);
            menu.appendChild(menuBox)
        }
        //box
        let button = document.createElement("button");
        button.innerText = "Add(+) item"
        button.addEventListener("click",()=> {
            try {
               
            }
            catch(DOMException) {
                console.log("DOM hiba")
            }
         
            this.itemAddBox()
        })
        menuBox.appendChild(button); //kilehet választani egy listábol az itemeket, vagy saját, vagy random(ilyenkor a listából választ véletlenszerűen pálya betöltéskor)
        //checkbox- random, a többit kizárja
        //input- saját item, meg kell adni hogy micsoda(ruha,fegyver,kulcs), ekkor a megfelelő attributum lista feljönne
        //lista- a szerver betölti ebbe az itemeket ás abból lehet választani, csak nevek lennének itt, rájuk kattintva bejön az inputot megvalósítás, csak az értékeket nem lehet változtatni. / vagy a listában lenne pl: Az utolsó kidertojás (25 védelem )
    }
    }

    itemAddBox() {
         /*
        -Legördülő lista(saját,létező,random)-
        -checkbox(ruha,fegyver)-
        */
        //Átdolgozni, a listákat iegy egy külön függvénybe tenni mert ez pokol
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
            valasztodiv = document.createElement("div")
            if(typeLista.value == "sajat") {
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
            item.nev = document.getElementById("Név").value
            item.seb = document.getElementById("Sebzés").value
            this.item = item;

        })
        
        parent.appendChild(itemListaDiv);
        parent.appendChild(save)
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
    objektek = objektek.filter(item => item !== obj);
}

let nyomva = 0;
let ucso = null;
//Mozgatás megvalósítása
vaszon.addEventListener("mousedown",(ev)=>{ //Itt figyelni hogy ne lehessen Tile-t mozgatni.
    nyomva = 2;
    let e = new Hit(ev.clientX,ev.clientY,1,1)
    if(kurzor == "cursor") {
        setTimeout(()=>{
            if(nyomva != 1) {
                for(let o of objektek) {
                    if(aabbCollision(o,e)) {
                        if(o.div.id != "tile") {
                            ucso = o; //Itt a baj, ha nincs semmi sem benne akkor a tile lesz az utolsó.
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
     ucso.div.remove();
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


function kivalaszott(id,x,y) {
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
        case "delete":
            return obj = "delete"
        default:
            return  obj = "cursor"
    }
}

/*TODO:
-ELMENTÉS, LEC FAKIN GÓÓÓÓÓ,
Jelenleg az objektumok tartalmazzák az összes tile-t, és utána az elemeket amiket betettünk, ez maradhat így.
fájl felépítése:
type (ez pl fal, tile,enemy,item)
Név:x,y,...

Enemy esetében:
Béla,x,y,dmg,seb,méret(?)
*/
function kivalaszt(i) {
    kurzor = i;
}

//Pálya elkészítése, valahogy legyen dinamikusabb
        let x = 0;
        let y = 0;
        let w = 60;
        let h = 60;
 for(let i = 0; i < 10; i++) {
    for(let j = 0; j < 15; j++) {
        let tile =  new Tile(x,y,w,h);
        tile.div.setAttribute("id","tile")
        tile.div.addEventListener("click",(e)=>{
            let o = kivalaszott(kurzor,tile.x,tile.y)
            if(o instanceof Objekt) {
                vaszon.appendChild(o.div)
            }
 
        })
       vaszon.appendChild(tile.div)
        x+=w;
            }
        x= 0;
        y+= h;
    }


    //Mentés résznél majd az objektek és enemy tömböt kell elküldeni, a szerver majd lekezeli.
let button = document.getElementById("save");
button.addEventListener("click",()=> {

    fetch('/mentes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({message: "üzenet jött"})
      })
      .then(response => response.json()) //Válaszüzenet átalakítása
      .then(data => alert(data.message))
      .catch(error => alert('Nincs elindítva a szerver! vagy valami más...'));
})