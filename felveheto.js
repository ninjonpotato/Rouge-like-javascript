	class Felveheto{
		constructor(x,y) {
		this.x = x;
		this.y = y;
		this.width = 30;
		this.height = 30;
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

    class Coin extends Felveheto {
		constructor(x,y,ertek) {
			super(x,y);
			this.ertek = ertek;
		}
	}