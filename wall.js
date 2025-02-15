	class Wall {
			constructor(x,y,type) {
			this.x = x;
			this.y = y;
			this.type = type //1 sima, 2 titkos
			this.width = 60;
			this.height = 60;
			this.div = document.createElement("div")
			this.div.style.width = this.width;
			this.div.style.height = this.height
			this.div.style.position = "absolute"
			this.div.style.backgroundColor = "yellow"
			this.div.style.left = this.x;
			this.div.style.top = this.y;
			this.vaszon =document.getElementById("canvas")
			this.vaszon.appendChild(this.div)
			objektek.push(this)
		}
	}