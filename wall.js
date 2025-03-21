	class Wall {
			constructor(x,y,titkos=false,texture,palya) {
			this.x = x;
			this.y = y;
			this.palya = palya
			this.texture = texture
			this.titkos = (titkos == "false")
			this.width = 60;
			this.height = 60;
			this.div = document.createElement("div")
			this.div.style.width = this.width;
			this.div.style.height = this.height
			this.div.style.position = "absolute"
			this.div.setAttribute("class","fal")
		//	this.div.style.backgroundColor = "yellow"
			this.div.style.backgroundImage=`url(Textures/${this.texture})`
			this.div.style.left = this.x;
			this.div.style.top = this.y;
			this.vaszon =document.getElementById("canvas")
			this.palya.palyaObjekt.push(this)
			this.vaszon.appendChild(this.div)
		}
	}