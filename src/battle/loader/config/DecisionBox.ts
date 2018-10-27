class DecisionBox extends egret.HashObject{

	public static DecisionBoxType_Attack = 1;//攻击判定框
	public static DecisionBoxType_Defence = 2;//防御判定框

	public decisionType:number; //判定框类型
	public x:number;
	public y:number;
	public z:number; 
	public width:number;
	public height:number;
	public duration:number;
	public hitInterval:number;//碰撞间隔时间

	public entity:FightEntity = null;

	public constructor(decisionConfig:Object,decisionType:number)
	{
		super();
		this.x = decisionConfig["x"] || 0;
		this.y = decisionConfig["y"] || 0;
		this.z = decisionConfig["z"] || 50;
		this.width = decisionConfig["width"];
		this.height = decisionConfig["height"];
		this.duration = decisionConfig["duration"] || 1;
		this.hitInterval = decisionConfig["hitInterval"] || 3000;
		this.decisionType = decisionType;
	}

	public equalScope(targetBox:DecisionBox):boolean
	{
		return this.x == targetBox.x && this.y == targetBox.y && this.width == targetBox.width && this.height == targetBox.height && this.z == targetBox.z;
	}

	//判定框的x,y在中间底部，返回判定框的整个框范围
	public getLocalRectangle():egret.Rectangle
	{
		if(!this.entity){
			return new egret.Rectangle(); 
		}
		let thisScaleX = this.entity.entityModel.direction == Direction.LEFT ? -1:1;
		let thisCenterX = this.x * thisScaleX;
		let thisLeftX = thisCenterX - this.width/2;
		let thisTopY = this.y - this.height;

		return new egret.Rectangle(thisLeftX,thisTopY,this.width,this.height);
	}

	//获取判定框在全局的矩形区域
	public getGlobalRectangle():egret.Rectangle
	{
		if(!this.entity){
			return new egret.Rectangle(); 
		}
		let thisScaleX = this.entity.entityModel.direction == Direction.LEFT ? -1:1;
		let thisCenterPoint = this.entity.view.localToGlobal(this.x * thisScaleX,this.y);
		let thisLeftX = thisCenterPoint.x - this.width/2;
		let thisTopY = thisCenterPoint.y - this.height;

		return new egret.Rectangle(thisLeftX,thisTopY,this.width,this.height);
	}

	public static copyBox(box:DecisionBox):DecisionBox
	{
		
		let ret = new DecisionBox(box,box.decisionType);
		return ret;
	}

	//两个判定框是否平面相交
	public intersectDecisionBox(targetBox:DecisionBox):egret.Rectangle
	{
		if(!this.entity || !targetBox.entity){
			return new egret.Rectangle(0,0,0,0);
		}
		
		let thisRectangle = this.getGlobalRectangle();
		let targetRectangle = targetBox.getGlobalRectangle();
		let intersectionRect = thisRectangle.intersection(targetRectangle);
		if(intersectionRect.isEmpty() && this.entity.entityModel.x < targetBox.entity.entityModel.x){
		//	console.log("######矩形没相交##")
			//console.log("#####",intersectionRect,thisRectangle,targetRectangle,this.entity.entityModel.x,targetBox.entity.entityModel.x,this.x,targetBox.x,this.width,targetBox.width);	
		}else if(this.entity.entityModel.x < targetBox.entity.entityModel.x){
		//	console.log("######相交了##")
		}
		
		return intersectionRect
	}

}