class Tile {
    constructor(x,y,isBedrock,texture,palya,isVoid) {
        this.x = x;
        this.y = y;
        this.palya = palya
        this.texture = texture
        this.width = 60;
        this.height = 60;isBedrock
        this.isBedrock = (isVoid == "true")       
        this.isVoid = (isVoid == "true")
        this.div = document.createElement("div")
        this.div.style.width = this.width;
        this.div.style.height = this.height
        this.div.style.opacity = 1
        this.div.style.position = "absolute"
    //	this.div.style.backgroundColor = "yellow"
        this.div.style.backgroundImage=`url(Textures/${this.texture})`
        this.div.style.left = this.x;
        this.div.style.top = this.y;
        this.vaszon =document.getElementById("canvas")
        this.palya.palyaObjekt.push(this)
        this.vaszon.appendChild(this.div)

    }
}
