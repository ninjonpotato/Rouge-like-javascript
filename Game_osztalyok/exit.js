class Exit {
    constructor(x,y,location=0,id=0,locDoor,texture="nincs",palya) {
            this.x = x;
			this.y = y;
			this.palya = palya
			this.texture = texture
			this.width = 60;
			this.height = 60;
            this.location = location;
            this.id = id;
			this.locDoor = locDoor
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
			this.isHasznalhato = true
			
    }


	betoltes() { //Jatékos ezt hívja meg, itt döntődik el melyik pálya töltődik be.
		if(this.isHasznalhato) {betoltesEsMegjelenites(this.location, this.locDoor)}
		 //meghívja a pálya show és hide-ját
		//Ha rélépünk egy exitre akkor dobjon át a másik szobába.
		//Mindig csak ajtóhoz dobjon,


/*
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
				*/
	}
}