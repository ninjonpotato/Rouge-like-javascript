class Exit {
    constructor(x,y,location=0,id=0,texture="nincs",isSpawn=false) {
            this.x = x;
			this.y = y;
			this.texture = texture
			this.width = 60;
			this.height = 60;
            this.location = location;
            this.id = id;
			this.isSpawn = (isSpawn == "true");
			this.div = document.createElement("div")
			this.div.style.width = this.width;
			this.div.style.height = this.height
			this.div.style.position = "absolute"
			this.div.style.backgroundImage=`url(Textures/${this.texture})`
			this.div.style.left = this.x;
			this.div.style.top = this.y;
			this.vaszon =document.getElementById("canvas")
			this.vaszon.appendChild(this.div)
			objektek.push(this)
    }
}