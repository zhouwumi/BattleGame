class RotationMoveTest extends egret.DisplayObjectContainer{

	private Animation_Width = 107;
	private Animation_Height = 80
	private animation:db.DragonBonesAnimation;
	private targetX:number
	private targetY:number
	private dirX:number
	private dirY:number
	private degree:number
	private isStart:boolean;
	private moveSpeed:number = 1;

	public constructor() {
		super();

		let shape = new egret.Shape();
		shape.graphics.beginFill(0xff0000,125);
		shape.graphics.drawRect(0,0,500,500);
		shape.graphics.endFill();

		let shape2 = new egret.Shape();
		shape2.graphics.beginFill(0x00ff00,125);
		shape2.graphics.drawRect(249,2,2,2);
		shape2.graphics.endFill();

		let shape3 = new egret.Shape();
		shape3.graphics.beginFill(0x00ff00,125);
		shape3.graphics.drawRect(249,498,2,2);
		shape3.graphics.endFill();

		this.addChild(shape);
		this.addChild(shape2);
		this.addChild(shape3);
		let animation = CommonUtils.createDragonBones("fish");
		this.addChild(animation);
		

		let shape4 = new egret.Shape();
		shape4.graphics.lineStyle(2, 0x00ff00);
		shape4.graphics.moveTo(0,this.Animation_Height/2 * -1)
		shape4.graphics.lineTo(0,this.Animation_Height/2)
		shape4.graphics.lineTo(this.Animation_Width,this.Animation_Height/2)
		shape4.graphics.lineTo(this.Animation_Width,this.Animation_Height/2 * -1)
		shape4.graphics.lineTo(0,this.Animation_Height/2 * -1)
		shape4.graphics.endFill();

		this.animation = animation;
		this.animation.addChild(shape4)
		this.isStart = false;

		this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this)
		
		animation.x = 250
		animation.y = 250;
		animation.scaleX = -1;
		animation.rotation = -3.770858837422278;

		//this.moveToPosition(250,0)  //完全正确   正上
		//this.moveToPosition(500,0)  //完全正确   右上
		//this.moveToPosition(500,500)  //完全正确 右下
		//this.moveToPosition(0,500)	//完全正确  左下
		//this.moveToPosition(0,100)	//完全正确  左上
		//this.moveToPosition(250,500)  //完全正确   正下
		//this.moveToPosition(500,250)   //完全正确  正右
		//this.moveToPosition(0,250)
	}

	private moveToPosition(x,y)
	{
		this.lineToEndPosition(this.animation.x,this.animation.y,x,y)
		this.targetX = x
		this.targetY = y//减去身高的一半，刚好打击在了身体中部
	//	console.log("进入了弹射过程,目标位置是",this.targetX,this.targetY);
		
		this.dirX = this.targetX - this.animation.x;
		this.dirY = this.targetY - this.animation.y;

		if(this.targetX == this.animation.x){
			this.degree = Math.PI/2;
		}else{
			this.degree = Math.atan(Math.abs(this.targetY - this.animation.y)/Math.abs(this.targetX - this.animation.x));
		}
		if(this.targetX == this.animation.x){
			this.animation.rotation = this.targetY > this.animation.y ? this.degree * 180/Math.PI : this.degree * 180/Math.PI * -1;
			this.animation.scaleX = 1
		}else if(this.targetX > this.animation.x){
			if(this.targetY > this.animation.y){
				this.animation.rotation = this.degree * 180/Math.PI;
			}else{
				this.animation.rotation = this.degree * 180/Math.PI * -1;
			}
			this.animation.scaleX = 1
		}else{
			if(this.targetY > this.animation.y){
				this.animation.rotation = this.degree * 180/Math.PI * -1
			}else{
				this.animation.rotation = this.degree * 180/Math.PI;
			}
			this.animation.scaleX = -1
		}
		console.log("#####moveToPosition#####",this.animation.scaleX)

		if(this.targetY > this.animation.y){
			this.targetY = this.targetY - this.Animation_Width * Math.sin(this.degree);
		}else{
			this.targetY = this.targetY + this.Animation_Width * Math.sin(this.degree);
		}
		
		if(this.targetX > this.animation.x){
			this.targetX = this.targetX  - this.Animation_Width * Math.cos(this.degree);
		}else{
			this.targetX = this.targetX  + this.Animation_Width * Math.cos(this.degree);
		}

		this.isStart = true;
	}

	private lineToEndPosition(x1,y1,x2,y2)
	{
		let shape5 = new egret.Shape();
		shape5.graphics.lineStyle(2, 0x00ff00);
		shape5.graphics.moveTo(x1,y1)
		shape5.graphics.lineTo(x2,y2)
		shape5.graphics.endFill();
		this.addChild(shape5)
	}

	private onEnterFrame():void
	{
		if(!this.isStart){
			return;
		}

		let isXEnd = this.dirX <= 0 && this.animation.x <= this.targetX || this.dirX >= 0 && this.animation.x >= this.targetX;
		let isYEnd = this.dirY <= 0 && this.animation.y <= this.targetY || this.dirY >= 0 && this.animation.y >= this.targetY;

		if(isXEnd && isYEnd)
		{
	//		console.log("########stateUpdate到达了目的地#########")
			return;
		}
		let nextX,nextY;
		if(this.targetX >= this.animation.x){
			nextX = this.animation.x + this.moveSpeed * Math.cos(this.degree);
			if(nextX >= this.targetX){
				nextX = this.targetX;
			}
		}else{
			nextX = this.animation.x - this.moveSpeed * Math.cos(this.degree);
			if(nextX <= this.targetX){
				nextX = this.targetX;
			}
		}

		if(this.targetY >= this.animation.y){
			nextY = this.animation.y + this.moveSpeed * Math.sin(this.degree);
			if(nextY >= this.targetY){
				nextY = this.targetY;
			}
		}else{
			nextY = this.animation.y - this.moveSpeed * Math.sin(this.degree);
		//	console.log("开始计算下一个y,往小的方向运动  前  ",this.moveSpeed * Math.sin(this.degree),nextY,this.animation.y)
			if(nextY <= this.targetY){
				nextY = this.targetY;
			}
		//	console.log("开始计算下一个y,往小的方向运动  后 ",this.moveSpeed * Math.sin(this.degree),nextY,this.animation.y,this.targetY)
		}

		
		isXEnd = this.dirX <= 0 && nextX <= this.targetX || this.dirX >= 0 && nextX >= this.targetX;
		isYEnd = this.dirY <= 0 && nextY <= this.targetY || this.dirY >= 0 && nextY >= this.targetY;

	//	console.log("远程当前目标为：",nextX,nextY,this.degree,Math.sin(this.degree),Math.cos(this.degree))
		if(isXEnd && isYEnd){
			nextX = this.targetX;
			nextY = this.targetY;
		}
		
		this.animation.x = nextX
		this.animation.y = nextY

//		console.log(this.animation.x,this.animation.y)
	}


}