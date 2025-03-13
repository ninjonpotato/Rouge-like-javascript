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
            ujObjektej.push(this)
        
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
            ujObjektej.push(this)
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
        if(x != 0 && y != 0) {
        super(x+30/2,y+30/2,30,30)
    }else {
        super(0,0,0,0)
    }
         this.div.style.backgroundColor = "brow"
         this.div.style.zIndex = 1
         this.div.style.opacity = 1;
         this.nev = nev;
         this.texture = "nincs"
         this.atributumok = {
            "Név":this.nev,
            "Textúra":this.texture
         }
         ujObjektej.push(this)
    }
}

class Kulcs extends Item{
    constructor(x,y) {
        super(x,y)
         this.div.style.backgroundColor = "cyan"   
    }
}


class Fegyver extends Item{
    constructor(x,y,dmg = 3,nev="Fegyver") {
        super(x,y,nev)
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
    constructor(x,y,ved = 3,nev = "Ruha") {
        super(x,y,nev)
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

class Lada extends Objekt{
    constructor(x,y,item = new Item()) {
        super(x,y)
        this.div.style.backgroundColor = "gray"
        this.div.style.zIndex = 1
        this.div.style.opacity = 1;
        this.item = item;
        this.isRandom = false;
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

    menuLista() {
        this.atrUpdate()

        if(this.atributumok != null) {
        menuBox.remove();
        menuBox =document.createElement("div")
        for(let i in this.atributumok) {
            let p = document.createElement("p")
            p.innerText = i+": ";
            let input = document.createElement("input")
            input.value = this.atributumok[i]
            if(i == "Item") {
                input.disabled = true
            }
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
    constructor(x,y,id="0",location="0") { //id alapján tudjuk majd megadni hogy hova vigyen minket
        super(x,y)
        this.div.style.backgroundColor = "black"
        this.div.style.opacity = 1;
        this.location = location
        this.atributumok = {
            "id":exits,
            "location":this.location
         }
         exits++;
    }
    atrUpdate() {
        this.atributumok = {
            "id":exits,
            "location":this.location
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
            if(i == "id") {
                input.disabled = true;
            }
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