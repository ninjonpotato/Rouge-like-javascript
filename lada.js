class Lada {
    constructor(x,y,item,kulcsos=false,texture="nincs",random="false") {
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.item = item
        this.texture = texture;
        this.div = document.createElement("div")
        this.vaszon =document.getElementById("canvas")
		this.vaszon.appendChild(this.div)
        this.div.style.width = this.width
        this.div.style.height = this.height
        this.div.style.position = "absolute"
        this.div.style.zIndex = "99"
       // this.div.style.backgroundColor = "gray"
        //this.div.style.border = "2px solid black"
        this.div.style.left = this.x
        this.div.style.top = this.y
        //this.div.innerText = "Láda"
        this.div.style.backgroundImage=`url(Textures/${this.texture})`
        this.nyitva = false
        objektek.push(this)
        this.random = random

        this.kulcsos = (kulcsos == "true");
    }

    vanEkulcs(kari) {
       if(kari.kulcs > 0) {
        kari.kulcs--;
        return true;
       }
       return false;
    }
    kinyit() {
        if(this.nyitva == false) {
        this.nyitva = true;
       // this.div.innerText += "Nyitva"
        this.div.style.backgroundImage =`url(Textures/nyitott.png)`
        this.item.kirajzol(this.x+(this.width-this.item.width)/2,this.y+(this.height-this.item.height)/2);
        
    }
    }
}