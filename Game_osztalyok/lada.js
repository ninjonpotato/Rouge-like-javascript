class Lada {
    constructor(x,y,item,kulcsos=false,texture="nincs",random="false", palya,kulcsId="") {
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.item = item
        this.texture = texture;
        this.palya = palya
        this.div = document.createElement("div")
        this.vaszon =document.getElementById("canvas")
		this.vaszon.appendChild(this.div)
        this.div.style.width = this.width
        this.div.style.height = this.height
        this.div.style.position = "absolute"
        this.div.style.zIndex = "10"
        this.div.setAttribute("class","obj")
        //this.div.style.backgroundColor = "red"
        //this.div.style.border = "2px solid black"
        this.div.style.left = this.x
        this.div.style.top = this.y
        //this.div.innerText = "Láda"
        this.div.style.backgroundImage=`url(Textures/${this.texture})`
        this.nyitva = false
        this.palya.palyaObjekt.push(this)
        this.random = random
        this.kulcsId = kulcsId
        this.kulcsos = (kulcsos == "true");
    }

    vanEkulcs(kari) {
       if(kari.kulcs > 0) {
        if(this.kulcsId == "") {kari.kulcs--;}

        return true;
       }
       playSound("cantOpen")
       return false;
    }
    kinyit() {
        if(this.nyitva == false) {
        this.nyitva = true;
        playSound("openChest")
        this.div.style.backgroundImage =`url(Textures/nyitott.png)`
        this.item.kirajzol(this.x,this.y,this);
        
    }
    }
}