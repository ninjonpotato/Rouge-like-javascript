class Enemy {
		constructor(x,y,hp=100,nev="Béla",dmg=3,sebesseg=1,penz=1,texture,palya,kulcsos="") {
			this.x = x;
			this.y = y;
			this.nev = nev;
			this.hp = hp
			this.penz = penz;
			this.width = 55;
			this.height = 55;
			this.collisionWidth = 55
			this.collisionHeight = 55
			this.agroRange = 300;
			this.div = document.createElement("div")
			this.div.style.width = this.width 
			this.div.style.height = this.height 
			this.div.style.position = "absolute"
			this.div.setAttribute("class","enemyDiv")
			this.div.style.backgroundColor = "transparent"
			this.div.style.left = this.x;
			this.div.style.top = this.y;
			this.div.style.zIndex = 3
			this.hitlayer = document.createElement("div")
			this.hitlayer.style.width = this.width
			this.hitlayer.style.height = this.height
			this.hitlayer.style.backgroundColor = "white"
			this.hitlayer.style.opacity = "0"
			this.div.appendChild(this.hitlayer)
			this.vaszon =document.getElementById("canvas")
			this.vaszon.appendChild(this.div)

			this.palya = palya
			this.palya.palyaObjekt.push(this)	
			this.palya.palyaEnemyk.push(this)
			this.texture = texture
			this.tamad = false;
			this.dmg = dmg; 
			this.atkDelay = 600; //milisec lehessen editorban állítnani
			this.box = document.createElement("div")
			this.hitMeret = 25; //20
			 this.div.style.backgroundImage = `url(Textures/${this.texture})`
			//this.box.style.backgroundColor = "green"
			this.box.style.position = "absolute"
			this.box.style.zIndex = 3
			this.vaszon.appendChild(this.box)
			this.statD = document.createElement("div")
			this.statD.style.width = 1000
			
			this.hpD = document.createElement("p");
			this.nevD = document.createElement("p");
			this.div.appendChild(this.statD);

			this.statD.appendChild(this.hpD);
			this.statD.appendChild(this.nevD);
			this.statD.style.left = (this.width/2)-1000/2
			this.statD.style.top = -0.5*this.height
			this.statD.style.position = "absolute"
			//this.statD.style.textAlign ="center"
			this.statD.setAttribute("class","enemyStatDiv")
			this.hpD.innerText = this.hp
			this.nevD.innerText = this.nev
			//this.hpD.style.backgroundColor = "white"
			this.hpD.style.width = "fit-content"
			//this.nevD.style.backgroundColor = "white"
			this.nevD.style.width = "fit-content"

			this.sebesseg = sebesseg;
			this.menetel = false
			this.mozoghat = true;
			this.iranyok = [false,false,false,false]
			this.lookIrany = "up"
			this.zuhan = false
			this.kulcsos = kulcsos
			this.deg = 0;
			//4 irányba hitbox
			this.hitboxok = []
			this.hitIndex = 0
			this.hitboxMaker(1)
			this.hitboxMaker(2)
			this.hitboxMaker(3)
			this.hitboxMaker(4)	
			this.rotInt = 0
			this.forgatasok = [15*this.sebesseg,-15*this.sebesseg]
					setInterval(()=>{
						if(this.menetel) {
						this.div.style.transform = 'rotate('+this.forgatasok[this.rotInt]+'deg)';
						if(this.rotInt >= this.forgatasok.length-1){this.rotInt = 0;}else {this.rotInt++;}
				
					}
						
					},200)


		}
		hitboxMaker(irany) {
			let box = document.createElement("div")
			let imgbox = document.createElement("div")
			box.style.position = "absolute"
			box.style.zIndex = 10
			imgbox.style.position = "absolute"
			imgbox.style.zIndex = 9

			switch(irany) { //fel
				case 1:
					box.style.width = this.width
					box.style.height = this.hitMeret
					box.style.top = this.y-this.height
					box.style.left = this.x
					//box.style.backgroundColor = "blue"

					imgbox.style.width = this.width
					imgbox.style.height = this.width
					imgbox.style.top = this.y-this.height
					imgbox.style.left = this.x
				//	imgbox.style.backgroundColor="red"
					box.setAttribute("name",irany)

					break;
				case 2:
					box.style.width = this.hitMeret
					box.style.height = this.height
					box.style.transform = "rotate(270deg)"
				//	box.style.backgroundColor="red"
					box.style.top = this.y
					box.style.left = this.x-this.width

					imgbox.style.width =this.width
					imgbox.style.height = this.height
					imgbox.style.transform = "rotate(270deg)"
					//imgbox.style.backgroundColor="red"
					imgbox.style.top = this.y
					imgbox.style.left = this.x-this.width

					box.setAttribute("name",irany)
					break;
				case 3:
					box.style.width = this.width
					box.style.height = this.hitMeret
					box.style.transform = "rotate(180deg)"
				//	box.style.backgroundColor="green"
					box.style.top = this.y
					box.style.left = this.x+this.width


					imgbox.style.width = this.width
					imgbox.style.height = this.height
					imgbox.style.transform = "rotate(180deg)"
					//	box.style.backgroundColor="green"
					imgbox.style.top = this.y
					imgbox.style.left = this.x+this.width

					box.setAttribute("name",irany)
					break;
				case 4:
					box.style.width = this.hitMeret
					box.style.height = this.height
					box.style.top = this.height+this.y
					box.style.transform = "rotate(90deg)"
				//	box.style.backgroundColor="yellow"
					box.style.left = this.x

					imgbox.style.width = this.width
					imgbox.style.height = this.height
					imgbox.style.top = this.height+this.y
					imgbox.style.transform = "rotate(90deg)"
				//	box.style.backgroundColor="yellow"
					imgbox.style.left = this.x

					box.setAttribute("name",irany)
					break;
			}
			this.vaszon.appendChild(box)
			this.vaszon.appendChild(imgbox)
			this.hitboxok.push({hit:box, img:imgbox})
		}

		attack() {
			//TODO, VALAMIÉRT A HALÁL UTÁN IS TUDNAK SEBEZNI!!! LEHET NEM TÖRLŐDIK AZ ÖSSZES ÜTÉS
				let box = null;
				this.tamad = true
				for(let b of this.hitboxok) {
					let xx = parseInt(b.hit.style.left.split("px")[0]);
					let yy = parseInt(b.hit.style.top.split("px")[0]);
					let ww = parseInt(b.hit.style.width.split("px")[0])
					let hh =parseInt(b.hit.style.height.split("px")[0])
					let h = new Hitbox(xx,yy,ww,hh)
					if(this.hp > 0 ){
					if(aabbCollision(kari,h)) {	
						b.img.style.backgroundImage = "url(Textures/enemy_utes.gif)"
						kari.sebzodik(this.dmg);
						playSound("player_damaged")
						setTimeout(() => {
							this.tamad = false
							b.img.style.backgroundImage = ""
						}
							,this.atkDelay)
							break;
					}else {
						setTimeout(() => {
							this.tamad = false
							b.img.style.backgroundImage = ""
						}
							,this.atkDelay)	
					}
				}
				}
				if(box != null) {
					this.attackTimeout(box)
				}
				
			
		}
		stunned() {
			this.mozoghat = false;
			setTimeout(()=> {
				this.mozoghat = true;
				
				},300)
		}

		hitboxUpdate(irany,melyik,x,y,w,h) {
			if(melyik == "hit"){
				this.hitboxok[irany-1].hit.style.left = x 
				this.hitboxok[irany-1].hit.style.top = y 
				this.hitboxok[irany-1].hit.style.width =w 
				this.hitboxok[irany-1].hit.style.height =h 
			}else {

				this.hitboxok[irany-1].img.style.left = x 
				this.hitboxok[irany-1].img.style.top = y 
				this.hitboxok[irany-1].img.style.width =w 
				this.hitboxok[irany-1].img.style.height =h 
			}


			
		}

		isCollision(irany,lokes) {
			//left
			irany == 1
			for(let obj of this.palya.palyaObjekt) {
				//Átadni az imaget
				if(aabbCollision(this, obj)) {
					if (obj instanceof Wall || (obj instanceof Enemy && obj != this)) {
						if(lokes > 0) { 
						if(irany == 0) {this.y -= lokes}
						if(irany == 1) {this.x-= lokes}
						if(irany == 2) {this.y += lokes}
						if(irany == 3) {this.x+= lokes}
						}
						if(irany == 0) {this.y += this.sebesseg}
						if(irany == 1) {this.x += this.sebesseg	}
						if(irany == 2) {this.y -= this.sebesseg}
						if(irany == 3) {this.x -= this.sebesseg}

					}
					if(obj instanceof Tile) {
						if(obj.isVoid && this.hp > 0) {
							this.atiranyit(obj.x, obj.y)
							obj.div.style.backgroundImage="url(Textures/eses.gif)"
							this.sebzodik(this.hp);
							this.zuhan = true
							setTimeout(()=>{	
								this.zuhan = false;
								obj.div.style.backgroundImage="url(Textures/void.png)"
							},800)
				
						}
					} 

				}
			}
		}
		atiranyit(x,y) {
			this.x = x;
			this.y = y;
			this.div.style.left = this.x;
			this.div.style.top = this.y
		}
		left(lokes= 0) {
			this.iranyok[1] = true
			this.iranyok[3] = false
			if(lokes == 0) {this.x -= this.sebesseg}
			else {
				this.x += lokes	
			}
			this.isCollision(1,lokes)
			this.div.style.left = this.x;
			
		}
		right(lokes=0){
			this.iranyok[3] = true
			this.iranyok[1] = false
			if(lokes == 0) {
				this.x += this.sebesseg
			} else {
				this.x -= lokes
			}
			this.isCollision(3,lokes)
			this.div.style.left = this.x;
		
		}
		up(lokes=0) {
			this.iranyok[0] = true
			this.iranyok[2] = false
			if(lokes == 0) {
				this.y -= this.sebesseg
			} else {
				this.y += lokes
			}
			this.isCollision(0,lokes)
			this.div.style.top = this.y;
		
		}
		down(lokes=0) {
			this.iranyok[2] = true
			this.iranyok[0] = false
			if(lokes == 0) {
				this.y += this.sebesseg
			} else {
			this.y -= lokes;
			}
			
			this.isCollision(2,lokes)
			this.div.style.top = this.y
			

		}
		mozog() {
			this.hitboxUpdate(1,"hit",this.x,this.y-this.hitMeret, this.width,this.hitMeret)
			this.hitboxUpdate(2,"hit",this.x-this.hitMeret,this.y , this.hitMeret,this.height)		
			this.hitboxUpdate(3,"hit",this.x,this.y+this.height, this.width,this.hitMeret)
			this.hitboxUpdate(4,"hit",this.x+this.width,this.y , this.hitMeret,this.height)
			
			this.hitboxUpdate(1,"img",this.x,this.y-this.height, this.width, this.height)
			this.hitboxUpdate(2,"img",this.x- this.height,this.y ,  this.height,this.height)		
			this.hitboxUpdate(3,"img",this.x,this.y+this.height, this.width, this.height)
			this.hitboxUpdate(4,"img",this.x+this.width,this.y , this.height,this.height)

			if(kari != null && this.mozoghat) {
				if(agroRangeben(this,kari,(this.hitMeret+this.width)-10) ) {
					let esely = 0.5;

					if(this.tamad==false) {
						if(Math.random() <= esely) {
							this.attack()
						}
					}
				}
				//Itt történik a mozgás
				if(agroRangeben(this,kari,this.agroRange) && agroRangeben(this,kari,this.width) == false) {
				this.menetel = true;
					if(this.x > kari.x) {
						this.left();
					}
					if(this.x < kari.x) {
						this.right();
					}
					if(this.y > kari.y) {
						this.up();
					}
					if(this.y < kari.y) {
						this.down();
					}
				}else {
					this.div.style.backgroundImage = `url(Textures/${this.texture})`
					this.menetel = false;
				}
			}	
		}
		sebzodik(dmg){
			playSound("hitEnemy")
			this.hitlayer.style.opacity = "1"
			this.hp -= dmg;
			this.stunned()
			if(this.hp <= 0) {this.die();}
			this.updateInfo();
			setTimeout(()=>{

			this.hitlayer.style.opacity = "0"
			},50)

		}
		die() {
			for(let b of this.hitboxok) {
				b.hit.remove()
				b.img.remove()
			}
			//this.penz==0
			if(true) {	
				for(let i = 0; i < Math.max(10,Math.random()*100); i++) {
					new Coin(this.x+Math.floor(Math.random()*30)+10,this.y+Math.floor(Math.random()*30)+10,1,this.palya)
				}
			//	new Coin(this.x+Math.floor(Math.random()*30)+10,this.y+Math.floor(Math.random()*30)+10,1,this.palya)
			}
			if(this.kulcsos != ""){
				new Kulcs(this.x,this.y,this.kulcsos,"../Textures/kulcs.png",this.palya,true)
			}
			let log = document.getElementById("logContent")
     	   	let t = document.createElement("p")
       		t.innerText = "Megölted: "+this.nev
      		log.appendChild(t)
			log.scrollTop = log.scrollHeight;
			playSound("enemy_damaged")
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