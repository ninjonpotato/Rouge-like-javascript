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
        this.vasarloMenumaxHeight = 300
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
         console.log("Árus"+ this.nev)
         if(this.items.length > 0) {
        for(let aru in this.items) {
            let item = this.items[aru].item
          
            let ar = this.items[aru].ar
            let db = this.items[aru].db
            
           let aruP = document.createElement("p")
           aruP.innerText = item.nev + "\n" //maga a teljes áru
           aruP.setAttribute("class","aru")
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
          
            buy.setAttribute("class","button") 
            buy.addEventListener("click",()=>{
                console.log("Kiválaszottad: "+buy.getAttribute("id"))
                this.vasarlas(buy.getAttribute("id"),aruDiv)
            })
            let dbP = document.createElement("p")
            dbP.innerHTML = "Készleten:"+db+" db";
            dbP.setAttribute("class","db")
            aruP.appendChild(aruStat)
            aruP.appendChild(dbP)
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
         this.vasarloMenu.style.height = this.vasarloMenumaxHeight
  
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
    item.db--
    torol(item.item)
   }

   vasarlas(index,div) {
    let item = this.items[index]
    if(kari.penz >= item.ar) 
        {
            playSound("buyAru")
            this.aruHozzaadas(index)
            kari.vasarol(item.ar)
            if(item.db <=0) {
                this.items.splice(index,1)
                if(this.items.length <= 0) {
                        this.vasarloMenu.innerHTML = "";
                        this.arusMenu()
                      }else {
                        let d = $(div).children(".aru")
                    d.each(function(i){if(i == index) {$(this).remove();
                        let dbut = $(div).find(".aru p button")
                        console.log(dbut)
                        dbut.each(function(i){
                            console.log(i)
                          $(this).attr("id",i)
                        })
                     }})
                        
                      }
                     

        
                
            }else {
                let dbP = $(div).children(".aru").children(".db")
                dbP.each(function(i){
                    if(i == index) {
                        $(this).text("Készleten: "+item.db+" db")}
                    })
            }
               
            

            //this.vasarloMenu.innerHTML = "";
           // this.arusMenu()
        }else{
            playSound("cantBuy")
        //alert("Sajnos nincs elég pénzed")
    } 
  
   }
   



}   