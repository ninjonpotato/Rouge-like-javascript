class Enemy {
		constructor(x,y,hp=100,nev="Béla",dmg=3,sebesseg=1,penz=1,texture,palya) {
			this.x = x;
			this.y = y;
			this.nev = nev;
			this.hp = hp
			this.penz = penz;
			this.width = 55;
			this.height = 55;
			this.agroRange = 300;
			this.div = document.createElement("div")
			this.div.style.width = this.width 
			this.div.style.height = this.height 
			this.div.style.position = "absolute"
			this.div.style.backgroundColor = "blue"
			this.div.style.left = this.x;
			this.div.style.top = this.y;
			//this.div.innerText = this.nev;
			this.vaszon =document.getElementById("canvas")
			this.vaszon.appendChild(this.div)

			this.palya = palya
			this.palya.palyaObjekt.push(this)	
			this.palya.palyaEnemyk.push(this)
			this.texture = texture
			this.tamad = false;
			this.dmg = dmg; 
			this.atkDelay = 300; //milisec lehessen editorban állítnani
			this.box = document.createElement("div")
			this.hitMeret = 30;
			this.div.style.backgroundImage = `url(Textures/${this.texture})`
			this.box.style.backgroundColor = "green"
			this.box.style.position = "absolute"
			this.vaszon.appendChild(this.box)

			this.hpD = document.createElement("p");
			this.nevD = document.createElement("p");
			this.div.appendChild(this.hpD);
			this.div.appendChild(this.nevD);
			this.hpD.innerText = this.hp
			this.hpD.setAttribute("class","enemy-hp")
			this.nevD.innerText = this.nev
			this.nevD.style.left = (this.width-1000)/2
			this.nevD.setAttribute("class","enemy-nev")
			this.sebesseg = sebesseg;

			this.mozoghat = true;
			this.iranyok = [false,false,false,false]
		}
		attack() {
			if(this.box != null) {
				this.tamad = true
				this.box.style.backgroundColor = "grey"
				if(kari.x < this.x) {
					this.hitboxUpdate(this.x-this.hitMeret,this.y , this.hitMeret,this.height)	
				}else if(kari.x >= this.x) {
					this.hitboxUpdate(this.x+this.width,this.y , this.hitMeret,this.height)
				}else if(kari.y < this.y) {
					this.hitboxUpdate(this.x,this.y-this.hitMeret, this.width,this.hitMeret)
				}else if(kari.y > this.y) {
					this.hitboxUpdate(this.x,this.y+this.height, this.width,this.hitMeret)
				}
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

		left(lokes= 0) {
			if(lokes == 0) {this.x -= this.sebesseg}
			else {
				this.x+= lokes
				
			}
			for(let obj of this.palya.palyaObjekt) {
				if(aabbCollision(this, obj)) {
					if (obj instanceof Wall) {
						if(lokes > 0) {
							this.x -= lokes
						}
						this.x += this.sebesseg	
					}

				}
			}
				this.div.style.left = this.x;
				this.hitboxUpdate(this.x-this.hitMeret,this.y , this.hitMeret,this.height)			
		}
		right(lokes=0){
			if(lokes == 0) {
				this.x += this.sebesseg
			} else {
				this.x -= lokes
			}
			
			for(let obj of this.palya.palyaObjekt) {
					if(aabbCollision(this, obj)) {
						if (obj instanceof Wall) {
							if(lokes > 0) {
								this.x += lokes
							}
							this.x -= this.sebesseg
						}
					}
				}
			this.div.style.left = this.x;
			this.hitboxUpdate(this.x+this.width,this.y , this.hitMeret,this.height)
		}
		up(lokes=0) {
			
			if(lokes == 0) {
				this.y -= this.sebesseg
			} else {
				this.y += lokes
			}
			for(let obj of this.palya.palyaObjekt) {
					if(aabbCollision(this, obj)) {
						if (obj instanceof Wall) {
							if(lokes > 0) {
								this.y -= lokes
							}
							this.y += this.sebesseg
						}
					}
			}
			this.div.style.top = this.y;
			this.hitboxUpdate(this.x,this.y-this.hitMeret, this.width,this.hitMeret)
		}
		down(lokes=0) {
			if(lokes == 0) {
				this.y += this.sebesseg
			} else {
			this.y -= lokes;
			}
			
			for(let obj of this.palya.palyaObjekt) {
					if(aabbCollision(this, obj)) {
						if (obj instanceof Wall) {
							if(lokes > 0) {
								this.y += lokes
							}
							this.y -= this.sebesseg
						}
					}
			}
			this.hitboxUpdate(this.x,this.y+this.height, this.width,this.hitMeret)
			this.div.style.top = this.y
		}
		mozog() {

			if(kari != null && this.mozoghat) {
				if(agroRangeben(this,kari,(this.hitMeret+this.width)-10) ) {
					let esely = 0.5;
					if(this.tamad==false) {
						if(Math.random() <= esely) {
							this.attack()
						}
					}
				}
				//Ne álljanak beléd
				if(agroRangeben(this,kari,this.agroRange) && agroRangeben(this,kari,this.width) == false) {
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
		sebzodik(dmg){
			this.hp -= dmg;
			if(this.hp <= 0) {this.die();}
			this.updateInfo();
		}
		die() {
			this.box.remove()
			this.box = null
			let rand = Math.random();
			if(this.penz == 0) {
				for(let i = 0; i < 3; i++) {
					new Coin(this.x+Math.floor(Math.random()*30)+10,this.y+Math.floor(Math.random()*30)+10,1,this.palya)
				}
			}else {
				for(let i = 0; i < this.penz; i++) {
					new Coin(this.x+Math.floor(Math.random()*30)+10,this.y+Math.floor(Math.random()*30)+10,1,this.palya)
				}
			}
			
			
			torol(this) 
		}
		visszalok(lokes,irany) {
			if(irany == 2) { //bal nézünk
				this.right(lokes)
			}
			if(irany == 1) { //fel
				this.down(lokes)
			}
			if(irany == 3) { //le
				this.up(lokes)
			}
			if(irany == 4) { //jobb
				this.left(lokes)
			}
		}
		updateInfo() {
			this.hpD.innerText = this.hp
		}
	}