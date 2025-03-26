class Arus {
    constructor(x,y,items,nev, texture,palya,selfImg) {
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.items = items
        this.texture = texture;
        this.palya = palya
        this.nev = nev
        this.div = document.createElement("div")
        this.vaszon =document.getElementById("canvas")
		this.vaszon.appendChild(this.div)
        this.div.style.width = this.width
        this.div.style.height = this.height
        this.div.style.position = "absolute"
        this.div.style.zIndex = "10"
        this.selfImg = selfImg
        this.div.setAttribute("class","obj")
       // this.div.style.backgroundColor = "gray"
        //this.div.style.border = "2px solid black"
        this.div.style.left = this.x
        this.div.style.top = this.y
        this.div.style.backgroundImage=`url(Textures/${this.texture})`
        this.palya.palyaObjekt.push(this)

        //Arus menu
        this.vasarloMenu = document.createElement("div")
        this.vasarloMenu.style.display = "none"
        this.vasarloMenu.setAttribute("class","vasarloMenu")
        this.arusMenu()
        this.vaszon.append(this.vasarloMenu);
        this.megjelenit = false
    }

    arusMenu() {
        let imgDiv = document.createElement("div")
        let img = document.createElement("img");
        img.setAttribute("src",`Textures/${this.selfImg}`)
         //Ebbe soroljuk fel az árukat
         imgDiv.appendChild(img)
         this.vasarloMenu.appendChild(imgDiv)
        let arusP = document.createElement("p")
        arusP.innerText = this.nev
        imgDiv.appendChild(arusP)

         let aruDiv = document.createElement("div")
         arusP = document.createElement("p")
         arusP.innerText = "Áruk"
         aruDiv.appendChild(arusP)
         //Áruk felsorolása
         if(this.items.length > 0) {
        for(let aru in this.items) {
            let item = this.items[aru].item
            console.log(item)
            let ar = this.items[aru].ar
            
           let aruP = document.createElement("p")
           aruP.innerText = item.nev + "\n"
           let aruStat =  document.createElement("p")
           if(item instanceof Fegyver) {
            aruStat.innerText += `Sebzés: ${item.dmg}\n`
            }
            if(item instanceof Ruha) {
                aruStat.innerText += `Védelem: ${item.hp}\n`
            }
            aruStat.innerText += `Ár: ${ar}`
            let ikon = document.createElement("img")
            ikon.style.width = 20
            ikon.style.height= 20
            ikon.setAttribute("src","Textures/penz.png")
            ikon.style.position = "relative"
            ikon.style.top = 3
            aruStat.appendChild(ikon)
            let buy = document.createElement("button")
            buy.innerText = "Vásárlás"
            buy.setAttribute("id",aru) 
            buy.addEventListener("click",()=>{
                this.vasarlas(buy.getAttribute("id"))
            })
            aruP.appendChild(aruStat)
            aruDiv.appendChild(aruP)
            aruStat.appendChild(buy)
        }
    }else {
        arusP = document.createElement("p")
         arusP.innerText = "Kifogytunk."
         aruDiv.appendChild(arusP)
    }
        this.vasarloMenu.appendChild(aruDiv)
    }


    showAru() {
        this.megjelenit = true;
        this.vasarloMenu.style.display = "flex"
         this.vasarloMenu.style.animationName = "arus-megjelen"
         this.vasarloMenu.style.animationDuration = "1s"
         this.vasarloMenu.style.height = 150
  
    }
    hideAru() {
        this.vasarloMenu.style.overflow = "hidden"
          this.vasarloMenu.style.animationName = "arus-bezar"
        this.vasarloMenu.style.animationDuration = "0.5s"
          this.vasarloMenu.style.height = 0
          this.megjelenit = false;
            setTimeout(()=>{
                if(this.megjelenit == false) {
                   this.vasarloMenu.style.display = "none"
                }
                },500)
        


      /*  this.vasarloMenu.style.animationName = "arus-bezar"
         this.vasarloMenu.style.animationDuration = "0.5s"
        this.vasarloMenu.style.height = 0;*/
   }

   aruHozzaadas(index) {
    let item = this.items[index]
    item.item.x = kari.x;
    item.item.y = kari.y
    torol(item.item)
   }

   vasarlas(index) {
    let item = this.items[index]
    if(kari.penz >= item.ar) 
        {
            this.aruHozzaadas(index)
            kari.vasarol(item.ar)
            this.items.splice(index,1)
            this.vasarloMenu.innerHTML = "";
            this.arusMenu()
        }else{
        alert("Sajnos nincs elég pénzed")
    } 
  
   }
   



}   