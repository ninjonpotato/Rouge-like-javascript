class Exit {
    constructor(x,y,location=0,id=0,texture="nincs",isSpawn=false,palya,elozoPalya) {
            this.x = x;
			this.y = y;
			this.palya = palya
			this.texture = texture
			this.width = 60;
			this.height = 60;
            this.location = location;
            this.id = id;
			this.elozoPalya = elozoPalya
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
			this.palya.palyaObjekt.push(this)
			this.isHasznalhato = false
			this.belepes = false
			
    }




	betoltes() {
			if(aktualPalya != this.location) {
				betoltesEsMegjelenites(this.location);
			}
			else {
				if(this.isHasznalhato && this.elozoPalya != null) {
					console.log(this.isHasznalhato + " " + this.elozoPalya)
					betoltesEsMegjelenites(this.elozoPalya);
					setTimeout(()=>{
						this.isHasznalhato = false
						
					},300)
				}else {
						setTimeout(()=>{
							if(aabbCollision(kari,this) == false) {
								this.isHasznalhato = true 
							}
						},300)
				}
			}
	}
}