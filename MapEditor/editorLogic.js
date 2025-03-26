
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
let global_wall = "fal4.png";
let global_enemy ="enemy.png";
let global_exit ="exit.png"
let global_lada ="lada.png"
let global_penz ="penz.png"
let global_ruha = "ruha.png"
let global_fegyver = "kard.png"
let global_kulcs = "kulcs.png"
let global_uzenet = "uzenet.png"
let global_arus = "arus.png"
let global_csempe = "padlo2.png"
let last_attrib = null
let last_obj = null

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
        this.div.style.zIndex = 2
        this.div.style.opacity = 0.1;
        this.atributumok = null;
        this.texture = texture
        this.disabled = []
        this.div.style.border = "1px solid black"
        objektek.push(this)

        this.div.addEventListener("click",()=>{ //A rácsoknak adunk kattintás eventet 
            let o = kivalaszott(kurzor,this.x,this.y)
            if(o instanceof Objekt) {
                vaszon.appendChild(o.div)
            }
    
        })


    }
    textureBeallit(obj,texture) {
    if(obj instanceof Tile) {
        global_csempe = texture
    }
    obj.div.style.backgroundImage = "url(../Textures/"+texture+")"
    }

    lastAtribBeallit() {
        last_attrib = this.atributumok
        last_obj = this
      //  this.textureBeallit(this,last_attrib["Textúra"])
    }
    atribMeghiv() {
        if(last_attrib != null && last_obj.constructor.name == this.constructor.name) {
            this.atributumok = last_attrib
            this.textureBeallit(this,last_attrib["Textúra"])
            this.menuLista()
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
            if(this.disabled != undefined && this.disabled.length >= 1) {
               if(this.disabled.includes(i)) {
                input.disabled = true
               }
            }
            if(i == "Textúra") {
                t_name.innerText = this.atributumok[i]
                input.setAttribute("type","file")
                input.addEventListener("change",()=>{
                     let texture =input.files[0].name
                    this.atributumok[i] = texture;
                    t_name.innerText = this.atributumok[i]
                    this.textureBeallit(this,texture)
                    this.lastAtribBeallit()

                })
            }else {
                input.value = this.atributumok[i]
            
                input.addEventListener("input",()=>{
                    this.atributumok[i] = input.value
                    this.lastAtribBeallit()
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
    constructor(x,y,isBedrok = "true",texture = global_csempe,isVoid = "false"){
        super(x,y,60,60,texture)
        this.div.style.opacity = 1
        this.div.style.border = "none";
        this.div.style.zIndex = 1
        this.texture = texture;
        this.isBedrok = (isBedrok == "true");
        this.isVoid = (isVoid == "true")
        this.disabled.push("Alapkő");
  //          this.div.style.backgroundColor = "green"
        this.div.style.backgroundImage = "url(../Textures/"+this.texture+")"
        this.atributumok = {
            "Alapkő": this.isBedrok,
            "Mélység": this.isVoid,
            "Textúra": this.texture
        }
        this.atribMeghiv()
    }

}
class Wall extends Objekt{
        constructor(x,y,texture=global_wall,titkos=false) {
            super(x,y)
          //  this.div.style.backgroundColor = "yellow"
            this.div.style.zIndex = 2
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
            this.atribMeghiv()
             
        
        }
}

class Uzenet extends Objekt{
    constructor(x,y,msg="üdv", texture=global_uzenet) {
        super(x,y)
     //   this.div.style.backgroundColor = "yellow"
        this.div.style.zIndex = 1
        this.div.style.opacity = 1;
        this.texture = texture
        this.div.style.backgroundImage = "url(../Textures/"+this.texture+")"
        this.msg = msg;
        if(this.texture != "nincs") {
            this.div.style.border = "none"
        }
        this.atributumok = {
            "Üzenet": this.msg, 
            "Textúra": this.texture
        }
         
        this.atribMeghiv()
    
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
             
            this.atribMeghiv()
        }
    
}

class Lada extends Objekt{ 
    //x,y,dmg = 3, range=0,speed=0,nev="Fegyver",textura=global_fegyver,manual = true
    constructor(x,y,item = new Fegyver(0,0,0,0,0,"Fegyómegyó",global_fegyver,false),texture = global_lada,kulcsos = false, isRandom = false) {
        super(x,y)
        //this.div.style.backgroundColor = "gray"
        this.div.style.zIndex = 1
        this.div.style.opacity = 1;
        this.item = item;
        this.isRandom = isRandom;
        this.texture = texture;
        this.kulcsos = kulcsos;

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
         
        this.atribMeghiv()
    }

    menuLista() {
        if(this.atributumok != null) {
        menuBox.remove();
        let itemDiv = document.createElement("div");
        itemDiv.style.border = "1px solid black"
        itemDiv.style.textAlign = "center"
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
                    let texture =input.files[0].name
                    this.atributumok[i] = texture;
                    t_name.innerText = this.atributumok[i]
                    this.div.style.backgroundImage = "url(../Textures/"+texture+")"
                })
            }else {
                input.value = this.atributumok[i]
                input.addEventListener("input",()=>{
                    this.atributumok[i] = input.value
                })
            }
            if(i == "Item") {
                let p = document.createElement("p")
                p.innerHTML = "Tartalma"
                itemDiv.append(p)
                for(let atr in this.item.atributumok) {
                    let p = document.createElement("p")
                    p.innerText = atr+":";
                    let input = document.createElement("input")
                    input.value = this.item.atributumok[atr]
                    input.disabled = true
                    p.appendChild(input)
                    itemDiv.append(p)
            }
            menuBox.appendChild(itemDiv)
        }else {
            p.appendChild(t_name)
            p.appendChild(input)
            menuBox.appendChild(p);
        }


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
                    alert(itemekNagylistaja[i].nev)
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
                           // this.atrUpdate()
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
    atrUpdate() {
        this.atributumok = {
            "Kulcsos":this.kulcsos,
            "Item":this.item.nev,
            "Random": this.isRandom,
            "Textúra": this.texture
        }
    }
    //Sajátnál
    itemListaBox(parent,tipus,) {
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
                    if(input.id =="Textúra") {
                        input.setAttribute("type","file")
                    }else {
                        input.setAttribute("type","text")
                    }
                
                }
                p.appendChild(input);
                itemListaDiv.remove();
                itemListaDiv.appendChild(p)
            }
        let save = document.createElement("button")
        save.innerText = "Mentés!"

        save.addEventListener("click",()=>{
            if(tipus == "fegyver") {
                let nev = document.getElementById("Név").value
                let dmg =  document.getElementById("Sebzés").value
                let range = document.getElementById("Range növelés").value
                let speed = document.getElementById("Ütés sebesség").value
                let texture = document.getElementById("Textúra").files[0].name
                this.item = new Fegyver(0,0,dmg,range,speed,nev,texture,false);
            }
            if(tipus == "ruha") {/*
                 "Név":this.nev,
            "Védelem":this.ved,
            "Sebesség növelés":this.speed,
            "Méret növelés": this.meret,
            "Textúra": this.texture
                */
                let nev = document.getElementById("Név").value
                let ved =  document.getElementById("Védelem").value
                let speed = document.getElementById("Sebesség növelés").value
                let meret = document.getElementById("Méret növelés").value
                let texture = document.getElementById("Textúra").value
                this.item = new Ruha(0,0,ved,speed,meret,nev,texture,false);

            }
            this.atrUpdate()
            this.menuLista();
   

        })
        
        itemListaDiv.appendChild(save)
        parent.appendChild(itemListaDiv);
    }

}

class Arus extends Objekt {
    constructor(x,y,items = [{"item":new Fegyver(),"ar":10},{"item":new Ruha(),"ar":10}],nev="Marika néni", texture = global_arus, selfImg="nagyi.png") {
        super(x,y)
        this.items = items;
        this.nev = nev
     //   this.div.style.backgroundColor = "purple"
        this.div.style.zIndex = 1
        this.div.style.opacity = 1;
        this.texture = texture
        this.selfImg = selfImg;
        this.div.style.backgroundImage = "url(../Textures/"+this.texture+")"
        if(this.texture != "nincs") {
            this.div.style.border = "none"
        }
        this.atributumok = {
            "Név": this.nev,
            "Önarc kép": this.selfImg,
            "Áruk": this.items,
            "Textúra": this.texture
        }
         
        this.atribMeghiv()
    }

    ermeIkon(parent) {
        let ikon = document.createElement("div")
        ikon.setAttribute("class","arusIkon")
        ikon.style.backgroundImage = `url(../Textures/${global_penz})`
        parent.appendChild(ikon)

    }

    add_item_selector(parent,tipus) {
        //beirjuk az itemhez illő adatokat + ár és a mentéssel beleteszi az items tömbbe
         parent.innerHTML = "";
        let div = document.createElement("div")
        div.setAttribute("class","add_item_selector")
        let item = null;
        if(tipus == "fegyver") {
            item = new Fegyver();
        }
        if(tipus == "ruha") {
            item = new Ruha();
        }

        for(let atr in item.atributumok) {
            let p = document.createElement("label")
            p.innerText = atr+":";
            let input = document.createElement("input")
            input.setAttribute("id",atr)
            if(!isNaN(item.atributumok[atr])) {
                input.setAttribute("type","number")
                p.appendChild(input);
            }else {
                if(atr == "Textúra") {
                    p.innerText = atr;
                    input.setAttribute("type","file")
                    let img = document.createElement("img")

                    img.setAttribute("alt","Kép helye")
                    input.addEventListener("change",()=>{
                        img.setAttribute("src",`../Textures/${input.files[0].name}`)
                    })
                    p.setAttribute("for",atr)
                    p.setAttribute("class","inputHide")
                    p.appendChild(img)
                    div.appendChild(input);
                   
                    
                }else {
                    input.setAttribute("type","text")
                    p.appendChild(input);
                }

            }
            
            div.append(p)
        }
        let arText = document.createElement("label")
        arText.innerText ="Ár:"
        let arInput = document.createElement("input")
        arInput.setAttribute("type","number");
        arText.appendChild(arInput)
        div.append(arText)
        let save = document.createElement("button")
    
        save.addEventListener("click",()=>{
            let texture;
            if(document.getElementById("Textúra").files == undefined) {
                texture = document.getElementById("Textúra").files[0].name;
            }
            let ar = arInput.value
             if(tipus == "fegyver") {
                if(document.getElementById("Textúra").files == undefined) {
                    texture = global_fegyver
                }
                let nev = document.getElementById("Név").value
                let dmg =  document.getElementById("Sebzés").value
                let range = document.getElementById("Range növelés").value
                let speed = document.getElementById("Ütés sebesség").value
                item = new Fegyver(0,0,dmg,range,speed,nev,texture,false);
               
             }
             if(tipus == "ruha") {
                if(document.getElementById("Textúra").files == undefined) {
                    texture = global_ruha
                }
                let nev = document.getElementById("Név").value
                let dmg =  document.getElementById("Védelem").value
                let range = document.getElementById("Sebesség növelés").value
                let speed = document.getElementById("Méret növelés").value
                item = new Ruha(0,0,dmg,range,speed,nev,texture,false);
               
             }
             this.items.push({item,ar})
             this.menuLista();
        })
        save.innerText="Hozzáad"
        div.appendChild(save)
        parent.appendChild(div)

    }

    arsu_add_item(parent) {
        let div = document.createElement("div") // fő doboz
        div.style.position = "absolute"
        div.setAttribute("class","aru_add_div")

        //Opciók
        let opcio = document.createElement("input")
        opcio.setAttribute("type","radio")
        opcio.setAttribute("name","opcio")

        let label = document.createElement("label")
        opcio.setAttribute("type","radio")
        opcio.setAttribute("name","opcio")
        let itemDiv = document.createElement("div")
        //fegyver opcio
        label.innerText="Fegyver"
        opcio.addEventListener("change",()=>{
           this.add_item_selector(itemDiv,"fegyver")
        })
        label.appendChild(opcio)
        div.appendChild(label)
        //ruha opcio
        label = document.createElement("label")
        label.innerText="Ruha"
        opcio = document.createElement("input")
        opcio.setAttribute("type","radio")
        opcio.setAttribute("name","opcio")

        opcio.addEventListener("change",()=>{
            this.add_item_selector(itemDiv,"ruha")
        })
        label.appendChild(opcio)
        div.appendChild(label)

        div.appendChild(itemDiv)
        parent.appendChild(div)
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
                    let texture =input.files[0].name
                    this.atributumok[i] = texture;
                    t_name.innerText = this.atributumok[i]
                    this.textureBeallit(this,texture)

                }) 
                p.appendChild(t_name)
                p.appendChild(input)
                menuBox.appendChild(p);
            }else if(i == "Áruk") {
                let aruDiv = document.createElement("div");
                if(this.items.length > 0) {
                   
                    aruDiv.style.border = "1px solid black"
                    aruDiv.style.textAlign = "center"
                    aruDiv.setAttribute("class","aruDiv")
                    aruDiv.appendChild(p);
                    let index = 0;
                    //Felsoroljuk a benne lévő tárgyakat
                    for(let termek of this.items) {
                        let item = termek.item
                        let ar = termek.ar
                        let pNev = document.createElement("p")
                        pNev.innerText = item.nev + ": "
                        if(item instanceof Fegyver) {
                            pNev.innerText += `🗡️: ${item.dmg} dmg`
                        }
                        if(item instanceof Ruha) {
                            pNev.innerText += `🛡️: ${item.ved}`
                        }
                        let span = document.createElement("span")
                        span.style.display = "block"
                        
                        pNev.appendChild(span)
                        span.innerText = `Ára: ${ar} `
                        this.ermeIkon(span)
                        let torol = document.createElement("span")
                        torol.innerText = "-"
                        torol.setAttribute("class","torolButton")
                        torol.setAttribute("id",index);
                        torol.addEventListener("click",()=>{
                          this.items.splice(parseInt(torol.getAttribute("id")),1)
                
                          this.menuLista()
                            
                        })
                        pNev.appendChild(torol)
                        aruDiv.appendChild(pNev)
                        index++;
                    }
                    let add = document.createElement("button")
                    add.innerText="Áru Hozzáadás"
                    add.addEventListener("click",()=>{this.arsu_add_item(menuBox)})
                    aruDiv.appendChild(add);
                    menuBox.appendChild(aruDiv);
                }else {
                    let add = document.createElement("button")
                    add.innerText="Áru Hozzáadás"
                    add.addEventListener("click",()=>{this.arsu_add_item(menuBox)})
                    aruDiv.appendChild(add);
                    menuBox.appendChild(aruDiv);
                }
               
            }
            else if(i == "Önarc kép") {
                let img = document.createElement("label")
                let p = document.createElement("p")
                p.innerText = "Boltos képe: "
                img.style.width = 50;
                img.style.height = 50
                img.style.display = "inline-block"
                img.style.cursor = "pointer"
                input.setAttribute("type","file")
                input.style.display = "none"
                input.setAttribute("id","selfImg")
                input.addEventListener("change",()=>{
                    let texture =input.files[0].name
                    this.atributumok[i] = texture;
                    this.selfImg =texture
                  img.style.backgroundImage = `url(../Textures/${texture})`

                }) 
                img.setAttribute("for","selfImg")
                img.style.backgroundImage = `url(../Textures/${this.selfImg})`
                p.appendChild(img);
                p.appendChild(input);
                menuBox.appendChild(p)
              
            }
             else {
                input.value = this.atributumok[i]
                input.addEventListener("input",()=>{
                    this.atributumok[i] = input.value
                })
                p.appendChild(t_name)
                p.appendChild(input)
                menuBox.appendChild(p);
            }

            menu.appendChild(menuBox)
          

        }
    }

}

}

class Exit extends Objekt {
    constructor(x,y,location=0,id=0, texture=global_exit,isSpawn=true,elozoPalya=null) { //id alapján tudjuk majd megadni hogy hova vigyen minket
        super(x,y)
      //  this.div.style.backgroundColor = "black"
        this.div.style.opacity = 1;
        this.location = location
        this.id = id;
        this.texture = texture
        this.isSpawn = isSpawn;
        this.div.style.backgroundImage = "url(../Textures/"+this.texture+")"
        this.div.style.border = ""
        this.elozoPalya = elozoPalya
        this.atributumok = {
            "id":this.id,
            "location":this.location,
            "előző szoba":this.elozoPalya,
            "Spanw hely": this.isSpawn,
            "Textúra": this.texture
         }  
          
         this.atribMeghiv()
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
          
         this.atribMeghiv()
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
         this.atribMeghiv()
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
         this.atribMeghiv()
      
    }
}


class Fegyver extends Item{
    constructor(x,y,dmg = 3, range=0,speed=0,nev="Fegyver",textura=global_fegyver,manual = true) {
        super(x,y,nev,manual)
       // this.div.style.backgroundColor = "red"
        this.dmg = dmg;
        this.range = range;
        this.speed = speed;
        this.texture = textura
        if(this.texture != "nincs") {
            this.div.style.border = "none"
        }
        this.div.style.backgroundImage = "url(../Textures/"+this.texture+")"
        this.atributumok = {
            "Név":this.nev,
            "Sebzés":this.dmg,
            "Range növelés":this.range,
            "Ütés sebesség": this.speed,
            "Textúra": this.texture,
         }
         this.atribMeghiv()
    }
}

class Ruha extends Item{
    constructor(x,y,ved = 3,speed=0, meret=0,nev = "Ruha",textura=global_ruha,manual = true) {
        super(x,y,nev,manual)
       // this.div.style.backgroundColor = "yellow"
        this.ved = ved;
        this.texture = textura
        this.speed = speed;
        this.meret = meret;
        if(this.texture != "nincs") {
            this.div.style.border = "none"
        }
        this.div.style.backgroundImage = "url(../Textures/"+this.texture+")"
        this.atributumok = {
            "Név":this.nev,
            "Védelem":this.ved,
            "Sebesség növelés":this.speed,
            "Méret növelés": this.meret,
            "Textúra": this.texture
         }
         this.atribMeghiv()
    }
}

//Ezt majd valahogy fel kell tölteni felgyverekkel, talán a pálya betöltésekor.
let itemekNagylistaja = [
    new Fegyver(0,0,30,30,20,"Giga-megyfegyver"),
    new Fegyver(0,0,20,20,10,"Mega-megyfegyver"),
    new Fegyver(0,0,10,10,5,"Sima-megyfegyver"),
    new Ruha(0,0,30,30,20,"Giga-hagymaruha"),
    new Ruha(0,0,20,20,10,"Mega-hagymaruha"),
    new Ruha(0,0,10,10,0,"Sima-hagymaruha"),
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
    objektek = objektek.filter(item => item !== obj);
   // ujObjektej = ujObjektej.filter(item => item !== obj);
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
                        if(o.div.id != "tile") { //ne lehessen az alapgrid elemeket mozgatni
                            ucso = o; 
                       }
                    }
                 }
                 if(ucso instanceof Tile) {
                    if(ucso.isBedrok) {
                    ucso = null;
                     }
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
                if(!(ucso instanceof Tile)) { //ha nem tile,
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
            }else {
                if(ucso.isBedrok == false) {
                    ucso.x = o.x;
                    ucso.y = o.y;
                    ucso.div.style.left = ucso.x
                    ucso.div.style.top = ucso.y
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
     if(ucso instanceof Tile) {
        if(ucso.isBedrok == false) {
            ucso.div.remove();
        }
     } else {ucso.div.remove();}
 
     torol(ucso);
}
if(kurzor == "cursor") {
    let ucso = null;
    for(let o of objektek) {
        if(aabbCollision(o,e)) {
                ucso = o;            
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
        case "Arus":
                return  obj = new Arus(x,y)
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
        case "Msg":
            return  obj = new Uzenet(x,y)
        case "Tile":
            return  obj = new Tile(x,y,false);
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
let offsetX = 0;
let offsetY = 0;
createGrid(15,10)

function createGrid(gridw,gridh) {
    vaszon.innerHTML = ""
    objektek = []
    let w = 60;
    let h = 60;
    let gridSzelesseg = w*gridw
    let gridMagassag = h*gridh*2-window.screen.availHeight
    offsetX =(window.screen.width-gridSzelesseg)/2
    offsetY =((window.screen.height-gridMagassag)/4)
    let x = offsetX;
    let y = offsetY;

for(let i = 0; i < gridh; i++) {
for(let j = 0; j < gridw; j++) {
    let tile =  new Tile(x,y,"true","padlo1.png");
    if(i == 0 || j == 0 || i == gridh-1 || j == gridw-1) { //szélére falak
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
let save = document.getElementsByClassName("save");

function mentes(palyaNev) {
    let objektLista = [];
    for(i in objektek) {
     let obj = objektek[i]
         let type = "";
         obj.x -= offsetX;
         obj.y -= offsetY
        type = objektek[i].constructor.name.toLowerCase() //Az objekt osztályának lekérése
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
         }
         else if(type == "arus") {
            let onylAru ={ ...obj.atributumok }
            let tombNoAru = { ...obj.atributumok  }
            delete tombNoAru["Áruk"];
            delete onylAru["Név"];
            delete onylAru["Textúra"];
            delete onylAru["Önarc kép"];
           // (onylAru)
            let elem = 
            {
                "type":type,
                "x":obj.x,
                "y":obj.y,
                "aruk": []
            }
            for(let aruk in onylAru) { //item, ar
                let aruTomb = onylAru[aruk]
                for(let i in aruTomb) {
                    let aru = aruTomb[i]
                    let item = aru.item
                    let ar = aru.ar
                    let tipus = "";
                    if(item instanceof Fegyver) {tipus ="fegyver"}
                    if(item instanceof Ruha) {tipus ="ruha"}
                    elem["aruk"].push(tipus)
                    elem["aruk"].push(item.atributumok)
                    elem["aruk"].push(ar)

                }
              
            }
            //elem["aruk"]
            (elem["aruk"])
            elem["atributumok"] = tombNoAru
            objektLista.push(elem)
         }
         else {
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
       .catch(error => alert(`A mentés során hiba keletkezett: ${palyaNev}`+error));
       
       for(i in objektek) {
        let obj = objektek[i]

            obj.x += offsetX;
            obj.y += offsetY
        }

 
}

save[0].addEventListener("click",()=> {
        if(palyaNev == null) {
            palyaNev = prompt("Fájl név")
        }
        mentes(palyaNev)
})

save[1].addEventListener("click",()=> {
    palyaNev = prompt("Fájl név")
    mentes(palyaNev)
})

let betolt = document.getElementById("betolt");
function iranyit() {
    if(palyaNev == null) {
        let inpt = document.createElement("input");
        inpt.setAttribute("type","file")
        inpt.addEventListener("change",()=>{
             window.location.href = `../gama.html?palyaNev=${inpt.files[0].name}`
        })
        inpt.click()


}else {
window.location.href = `../gama.html?palyaNev=${palyaNev}`
}
}


let load = document.getElementById("loadFile");
load.addEventListener("change",(event)=>{
    palyaNev = load.files[0].name
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
      .catch(error => alert('Nincs elindítva a szerver! vagy valami más...'+error));
})

function palyaKeszitesFajlbol(palyaText) { 
    for(let obj of objektek) {
        if(!(obj instanceof Tile)) {
            obj.div.remove()
        }
    }
    enemyk = []
    ujObjektej = []
    let palyaTomb = palyaText.split("\n") //felszeleteljük sorokra
    for(let obj of palyaTomb) {
        let objAtr = obj.split("|");
        let objType = objAtr[0].split(",")

        let type = objType[0].trim()
        let x =  parseInt(objType[1])+offsetX
        let y = parseInt(objType[2])+offsetY
        if(x - offsetX < 0 && y-offsetY < 0) {
            x = 0;
            y = 0;
        }
        let objekt = null;
        if(type == "fegyver" || type=="ruha" || type =="kulcs" || type=="penz") {  
            let objParam = objAtr[1].split(",")
            let nev = objParam[0];
            let dmg = parseInt(objParam[1]);
            let range = parseInt(objParam[2]);
            let delay = parseInt(objParam[3]);
            let textura = objParam[4];
  
            if(type=="fegyver") {objekt = new Fegyver(x,y,dmg,range,delay,nev,textura,false)}
            if(type=="ruha") {objekt = new Ruha(x,y,dmg,range,delay,nev,textura,false)}
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
        if(type == "wall" || type=="lada" || type =="exit" || type=="enemy" || type=="uzenet" || type=="arus" || type=="tile") {   
            if(type=="wall") { 
                //wall,500,100,|false,fal4.png
                let objParam = objAtr[1].split(",");
                let titkos = objParam[0];
                let textura = objParam[1];
                objekt = new Wall(x,y,textura,titkos)}
            if(type=="tile") {
                let objParam = objAtr[1].split(",");
                let alap = objParam[0];
                let mely = objParam[1];
                let textura = objParam[2];
                objekt = new Tile(x,y,alap,textura,mely)}

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
                    if(itemType == "fegyver") {
                        item = new Fegyver(0,0,dmg,range,speed,nev,item_textura,true)
                    }
                    if(itemType == "ruha") {
                        item = new Ruha(0,0,dmg,range,speed,nev,item_textura,true)
                    }
                    objekt = new Lada(x,y,item,texture,kulcsos,random)
                }
               
            }
            if(type=="exit") {
                let objParam = objAtr[1].split(",")
                let loc = parseInt(objParam[0]);
                let id = parseInt(objParam[1]);
                let elozo = objParam[2];
                let spawn = objParam[3];
                let textura = objParam[4];
                objekt = new Exit(x,y,loc,id,textura,spawn,elozo) 
            }
            if(type=="uzenet") {
                //wall,500,100,|false,fal4.png
                let objParam = objAtr[1].split(",");
                let msg = objParam[0];
                let textura = objParam[1];
                objekt = new Uzenet(x,y,msg,textura)
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
            if(type == "arus") {
                let items =[];
                let params = objAtr[objAtr.length-1].split(",")
                let nev = params[0]
                let texture = params[1]
                let selfImg = params[2]
                for(let i in objAtr) {
                    if(i > 0 && i < objAtr.length-1) {

                        let aru = objAtr[i].split(",")
                        let tipus = aru[0];
                        let nev = aru[1];
                        let dmg = aru[2];
                        let speed = aru[3];
                        let range = aru[4]
                        let texture = aru[5]
                        let ar =  parseInt(aru[6])
                        let item = null;


                        if(tipus == "fegyver") {
                            item = new Fegyver(0,0,parseInt(dmg),speed,range,nev,texture,true)
                        }
                        if(tipus == "ruha") {
                            item = new Ruha(0,0,parseInt(dmg),speed,range,nev,texture,true)
                        }
                        if(item != null) {
                            items.push({"item":item,"ar":ar})
                        }
                }
            }
            objekt = new Arus(x,y,items,nev,selfImg,texture);
        }
            vaszon.appendChild(objekt.div)
        }
 
    }
    }

//Láda megjavítása
//árus létrehozás