
let objektek = [];
let ujObjektej = []
let enemyk = []
let kari = null;
let kurzor = "cursor";
let vaszon = document.getElementById("canvas")
menuBox =document.createElement("div")
menu = document.getElementById("menu")
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
    constructor(x,y,nev="Béla",dmg=3) {
        super(x,y)
        this.div.style.backgroundColor = "red"
        this.div.style.zIndex = 1
        this.div.style.opacity = 1;
        this.nev = nev;
        this.dmg = dmg;
        this.atributumok = {
            "Név": this.nev,
            "Sebzés": this.dmg
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
         this.atributumok = {
            "Név":this.nev
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
}

class Ruha extends Item{
    constructor(x,y,ved = 3) {
        super(x,y)
         this.div.style.backgroundColor = "yellow"
        this.ved = VideoFrame;
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
            "Item:":this.item.nev
        }

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

let nyomva = 2;
//Mozgatás megvalósítása
vaszon.addEventListener("mousedown",(ev)=>{
    nyomva = 2;
    let e = new Hit(ev.clientX,ev.clientY,1,1)
    if(kurzor == "cursor") {
        setTimeout(()=>{
            if(nyomva != 1) {
                let ucso = null;
                for(let o of objektek) {
                    if(aabbCollision(o,e)) {
                        if(o.div.id != "tile") {
                            ucso = o;
                        }
                    }
                 }
                 //mozgatás
                
                nyomva = 2;
           
            }
        },1000)
    }

})

vaszon.addEventListener("mouseup",()=>{
    nyomva = 1;
})

vaszon.addEventListener("click",(ev)=>{
    let e = new Hit(ev.clientX,ev.clientY,1,1)
    console.log(kurzor)

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
     ucso.div.setAttribute("id","kivalasztva")
     ucso.menuLista()
    }
    
})
function kivalaszott(id,x,y) { //Átdolgozni mert ez így nem egészen fasza,
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
-mozgatás, ELMENTÉS, LEC FAKIN GÓÓÓÓÓ,
    -megkeresni amelyt mozgatni akarunk
    -az egeren legyen rajta középpont szerint, ahol elengedtjük akkor a legközelebbi tile-ba essen bele.
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
        let x = 0;
        let y = 0;
        let w = 60;
        let h = 60;
 for(let i = 0; i < 10; i++) {
    for(let j = 0; j < 15; j++) {
        let tile =  new Objekt(x,y,w,h);
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