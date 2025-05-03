class Exit {
    constructor(x,y,location=0,id=0,locDoor,texture="nincs",palya,kulcsos=true) {
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
			this.lockdownLayer = document.createElement("div")
			this.lockdownLayer.style.width = this.width
			this.lockdownLayer.style.height = this.height
			this.lockdownLayer.style.backgroundImage = 'url("Textures/zar.png")'
			this.lockdownLayer.style.opacity = 0;
			this.div.style.left = this.x;
			this.div.style.top = this.y;
			this.div.appendChild(this.lockdownLayer)
			this.vaszon =document.getElementById("canvas")
			this.vaszon.appendChild(this.div)
			this.palya.palyaObjekt.push(this)
			this.isHasznalhato = true
			this.kulcsos= kulcsos
			this.isZarva = false
			
    }

/*

MŰKÖDÉSE:
Első ajtó: id,melyik indexű szoba, azon szoba melyik indexű szobája pl: 1,1,1
Második ajtó: id, melyik indexű szoba, azon melyik ajtaja 0,0,1
*/
lockdown() {
	this.isZarva = false;
	this.lockdownLayer.style.opacity = 0;
for(let e of enemyk) {
	if (e instanceof Enemy) {
		if(e.hp >0) {
			this.isZarva = true;
			this.lockdownLayer.style.opacity = 1;

		}
	}
}
}
vanEkulcs() {
	if(kari.kulcs > 0) {
	 kari.kulcs--;
	 kari.infoUpdate()
	 return true;
	}
	playSound("cantOpen")
	return false;
 }


	betoltes() { //Jatékos ezt hívja meg, itt döntődik el melyik pálya töltődik be.
		if(this.isHasznalhato && this.isZarva==false) {
			betoltesEsMegjelenites(this.location, this.locDoor);
		}
	}
}