class Ajto {
    constructor(x,y,kulcsId,texture,palya) {
  
    
        this.width = 80;
        this.height = 80;
        this.boundWidth = 60
        this.boundHeight = 60
        let offset = 30
        this.x = x
        this.y = y
        this.hitX = this.x-(this.width-this.boundWidth)/2
        this.hitY = this.y-(this.height-this.boundHeight)/2
        this.kulcsId = kulcsId
        this.palya = palya
        this.texture = texture;
        this.nyitva = false
        this.div = document.createElement("div") //ez a terület amire lépve interaktálunk az ajtóval
        this.boundDiv = document.createElement("div") //ez a box ami az ajtó collisionje
        this.vaszon =document.getElementById("canvas")
		this.vaszon.appendChild(this.div)
        this.vaszon.appendChild(this.boundDiv)

        this.div.style.width = this.width
        this.div.style.height = this.height
        this.div.style.position = "absolute"
        this.div.style.zIndex = "10"
        this.div.setAttribute("class","obj")
      //  this.div.style.backgroundColor = "red"
        this.div.style.left = this.hitX
        this.div.style.top = this.hitY;


        this.boundDiv.style.width = this.boundWidth
        this.boundDiv.style.height = this.boundHeight
        this.boundDiv.style.position = "absolute"
      //  this.boundDiv.style.backgroundColor = "blue"
        this.boundDiv.style.zIndex = "10"
        this.boundDiv.setAttribute("class","obj")
        this.boundX = this.x
        this.boundY = this.y
        this.boundDiv.style.left = this.boundX
        this.boundDiv.style.top = this.boundY
        this.boundDiv.style.backgroundImage=`url(Textures/${this.texture})`

        this.palya.palyaObjekt.push(this)

    }

    kinyit() {
        playSound("openChest")
        this.nyitva = true
          this.boundDiv.style.backgroundImage=""
    }
}