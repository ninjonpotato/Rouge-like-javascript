class Enemy {
		constructor(x,y,hp=100,nev="Béla") {
			this.x = x;
			this.y = y;
			this.nev = nev;
			this.hp = hp
			this.width = 60;
			this.height = 60;
			this.agroRange = 300;
			this.div = document.createElement("div")
			this.div.style.width = this.width 
			this.div.style.height = this.height 
			this.div.style.position = "absolute"
			this.div.style.backgroundColor = "blue"
			this.div.style.left = this.x;
			this.div.style.top = this.y;
			this.div.innerText = this.nev;
			this.vaszon =document.getElementById("canvas")
			this.vaszon.appendChild(this.div)
			objektek.push(this)

			this.tamad = false;
			this.dmg = 3;
			this.atkDelay = 300; //milisec
			this.box = document.createElement("div")
			this.hitMeret = 50;
			this.box.style.backgroundColor = "green"
			this.box.style.position = "absolute"
			this.vaszon.appendChild(this.box)

			this.hpD = document.createElement("p");
			this.div.appendChild(this.hpD);
			this.hpD.innerText = this.hp
			this.hpD.setAttribute("class","enemy-hp")
			this.sebesseg = 1;
			enemyk.push(this)

			this.mozoghat = true;
			this.iranyok = [false,false,false,false]
		}
		attack() {
			if(this.box != null) {
				this.tamad = true
				this.box.style.backgroundColor = "grey"
				let xx = parseInt(this.box.style.left.split("px")[0]);
				let yy = parseInt(this.box.style.top.split("px")[0]);
				let ww = parseInt(this.box.style.width.split("px")[0])
				let hh =parseInt(this.box.style.height.split("px")[0])
				let h = new Hitbox(xx,yy,ww,hh)
				if(aabbCollision(h,kari)) {
					kari.sebzodik(this.dmg);
				}
				setTimeout(() => {
					if(this.box != null) {
						this.box.style.backgroundColor = "green"
						this.tamad = false
					}
				},this.atkDelay)	
			}
		}
		stunned() {
			this.mozoghat = false;
			setTimeout(()=> {
				this.mozoghat = true;
				},100)
		}

		hitboxUpdate(x,y,w,h) {
			if(this.box != null) {
			this.box.style.left = x 
			this.box.style.top = y 
			this.box.style.width =w 
			this.box.style.height =h 
			}
			
		}
		left(lokes = 0) {
			if(lokes != 0) {
				this.x -= lokes
				this.div.style.left = this.x;
				for(let obj of objektek) {
					if(aabbCollision(this, obj)) {
						if (obj instanceof Wall) {
							while(!aabbCollision(this, obj)) {
								this.x += this.lokes
							}
							console.log("falban vagyok")
						}
					}
				}
				this.hitboxUpdate(this.x-this.hitMeret,this.y , this.hitMeret,this.height)
				this.stunned();
			}
			this.x -= this.sebesseg
			for(let obj of objektek) {
				if(aabbCollision(this, obj)) {
					if (obj instanceof Wall) {
						this.x += this.sebesseg	
					}
					break;
				}
			}
				this.div.style.left = this.x;
				this.hitboxUpdate(this.x-this.hitMeret,this.y , this.hitMeret,this.height)			
		}
		right(lokes = 0){
			if(lokes != 0) {
				this.x += lokes
				for(let obj of objektek) {
					if(aabbCollision(this, obj)) {
						if (obj instanceof Wall) {
							while(!aabbCollision(this, obj)) {
								this.x -= this.lokes
							}
						}
					}
				}
				this.div.style.left = this.x;
				this.hitboxUpdate(this.x+this.hitMeret,this.y , this.hitMeret,this.height)
				this.stunned();
				
			}else {
			this.x += this.sebesseg
			for(let obj of objektek) {
					if(aabbCollision(this, obj)) {
						if (obj instanceof Wall) {
							this.x -= this.sebesseg
						}
						break;
					}
				}
			this.div.style.left = this.x;
			this.hitboxUpdate(this.x+this.hitMeret,this.y , this.hitMeret,this.height)

			}
			
		}
		up(lokes = 0) {
			if(lokes != 0) {
				this.y -= lokes
				for(let obj of objektek) {
					if(aabbCollision(this, obj)) {
						if (obj instanceof Wall) {
							while(!aabbCollision(this, obj)) {
								this.y += this.lokes
							}
						
						}
						break;
					}
				}
				this.div.style.left = this.x;
				this.hitboxUpdate(this.x,this.y-this.hitMeret, this.width,this.hitMeret)
				this.stunned();
				
			}
			this.y -= this.sebesseg
			for(let obj of objektek) {
					if(aabbCollision(this, obj)) {
						if (obj instanceof Wall) {
							this.y += this.sebesseg
						}
					}
			}
			this.div.style.top = this.y;
			this.hitboxUpdate(this.x,this.y-this.hitMeret, this.width,this.hitMeret)
		}
		down(lokes = 0) {
			if(lokes != 0) {
				this.y += lokes
				for(let obj of objektek) {
					if(aabbCollision(this, obj)) {
						if (obj instanceof Wall) {
							while(!aabbCollision(this, obj)) {
								this.y -= this.sebesseg
							}
						}
						break;
					}
			}
				this.div.style.left = this.x;
				this.hitboxUpdate(this.x,this.y+this.hitMeret, this.width,this.hitMeret)
				this.stunned();
				
			}
			this.y += this.sebesseg
			for(let obj of objektek) {
					if(aabbCollision(this, obj)) {
						if (obj instanceof Wall) {
							this.y -= this.sebesseg
						}
					}
			}
			this.hitboxUpdate(this.x,this.y+this.hitMeret, this.width,this.hitMeret)
			this.div.style.top = this.y
		}
		mozog() {

			if(kari != null && this.mozoghat) {
				if(agroRangeben(this,kari,this.width*2)) {
					let esely = 0.7;
					if(this.tamad==false) {
						if(Math.random() >= esely) {
							this.attack()
						}
					}
				}
				//Ne álljanak beléd
				if(agroRangeben(this,kari,this.agroRange) && agroRangeben(this,kari,this.width+this.width/2) == false) {
					if(this.x > kari.x) {
						this.iranyok[1] = true;
						this.left();
					}else {this.iranyok[1] = false;}
					if(this.x < kari.x) {
						this.iranyok[3] = true;
						this.right();
					}else {this.iranyok[3] = false;}
					if(this.y > kari.y) {
						this.iranyok[0] = true;
						this.up();
					}else {this.iranyok[0] = false;}
					if(this.y < kari.y) {
						this.iranyok[2] = true;
						this.down();
					}else {this.iranyok[2] = false;}
					
				}
			}	
		}
		visszalok(lokes) {
			if(this.iranyok[0]) {this.up(lokes*-1)}
			if(this.iranyok[1]) {this.left(lokes*-1);}
			if(this.iranyok[2]) {this.down(lokes*-1)}
			if(this.iranyok[3]) {this.right(lokes*-1)}

		}
		sebzodik(dmg){
			this.hp -= dmg;
			if(this.hp <= 0) {this.die();}
			this.updateInfo();
		}
		die() {
			this.box.remove()
			this.box = null
			let rand = Math.random();
			if(rand < 0.4 && rand > 0.1) {
				new Coin(this.x+Math.floor(Math.random()*30)+10,this.y+Math.floor(Math.random()*30)+10,1)
			}
			else if(rand < 0.6) {
				new Coin(this.x+Math.floor(Math.random()*30)+10,this.y+Math.floor(Math.random()*30)+10,1)
				new Coin(this.x+Math.floor(Math.random()*30)+10,this.y+Math.floor(Math.random()*30)+10,1)
			}else if(rand < 0.9) {
				new Coin(this.x+Math.floor(Math.random()*30)+10,this.y+Math.floor(Math.random()*30)+10,1)
				new Coin(this.x+Math.floor(Math.random()*30)+10,this.y+Math.floor(Math.random()*30)+10,1)
				new Coin(this.x+Math.floor(Math.random()*30)+10,this.y+Math.floor(Math.random()*30)+10,1)
			}
			
			torol(this) 
		}
		updateInfo() {
			this.hpD.innerText = this.hp
		}
	}