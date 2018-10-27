class BattleMapView extends egret.DisplayObjectContainer{

	public static Background_Scale = 1.4;

	public static Min_Scroll_X:number = 200;

	public static Background_Static:number = 1;//静态背景
	public static Background_Move:number = 2;//动态

	public static Background_Center:number = 2;//动态--动态移动背景
	public static Background_Entity:number = 3;//动态--实体层
	public static Fly_Number:number = 4;//动态--飘数字
	public static Top_UI:number = 5;//顶层ui
	public static Top_Animation:number = 6;//顶层动画
	
	private static Buttom_Png_Count:number = 1;
	private static Center_Png_Count:number = 2;

	private staticBackgroundContainer:egret.DisplayObjectContainer = null; //不动的背景层
	private moveContainer:egret.DisplayObjectContainer = null;  //会滚动的层

	private moveBackgroundContainer:egret.DisplayObjectContainer = null;//滚动的背景层
	private entityContainer:egret.DisplayObjectContainer = null;//实体层
	private flyNumberContainer:egret.DisplayObjectContainer = null;
	private topUiContainer:egret.DisplayObjectContainer = null;
	private topAnimationContainer:egret.DisplayObjectContainer = null;

	private backgroundButtomPngs:Array<egret.Bitmap> = null;
	private backgroundCenterPngs:Array<egret.Bitmap> = null;

	private currentMapOffsetX:number = 0;
	private preHeroX:number = 0;

	public constructor() {
		super();

		this.staticBackgroundContainer = new egret.DisplayObjectContainer();
		this.addChildAt(this.staticBackgroundContainer,BattleMapView.Background_Static);

		this.moveContainer = new egret.DisplayObjectContainer();
		this.addChildAt(this.moveContainer,BattleMapView.Background_Move);

		this.moveBackgroundContainer = new egret.DisplayObjectContainer();
		this.moveContainer.addChildAt(this.moveBackgroundContainer,BattleMapView.Background_Center);
		this.entityContainer = new egret.DisplayObjectContainer();
		this.moveContainer.addChildAt(this.entityContainer,BattleMapView.Background_Entity);
		this.flyNumberContainer = new egret.DisplayObjectContainer();
		this.moveContainer.addChildAt(this.flyNumberContainer,BattleMapView.Fly_Number);
		this.topUiContainer = new egret.DisplayObjectContainer();
		this.moveContainer.addChildAt(this.topUiContainer,BattleMapView.Top_UI);
		this.topAnimationContainer = new egret.DisplayObjectContainer();
		this.moveContainer.addChildAt(this.topAnimationContainer,BattleMapView.Top_Animation);

		this.backgroundButtomPngs = [];
		this.backgroundCenterPngs = [];
		for(let i = 0;i<BattleMapView.Buttom_Png_Count;i++)
		{
			let background = this.createBackground("bg_410006_jpg");
			this.staticBackgroundContainer.addChild(background);
			this.backgroundButtomPngs.push(background);
			background.width = CommonUtils.stage.stageWidth;
			background.scaleY = BattleMapView.Background_Scale;
			background.y = 0;
			background.x = i * background.width;
			background.touchEnabled = true;
		}

		for(let i = 0;i<BattleMapView.Center_Png_Count;i++)
		{
			let background = this.createBackground("410006_png");
			this.moveBackgroundContainer.addChild(background);
			this.backgroundCenterPngs.push(background);
			background.scaleY = BattleMapView.Background_Scale;
			background.x = i * background.width;
			background.touchEnabled = true;
			background.y = CommonUtils.stage.stageHeight - background.scaleY * background.height;
		}

		this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);

	}

	private onEnterFrame():void
	{
		let myEntity = HeroEntityManager.instance.getMyEntity();
		if(myEntity){
			this.adjustPosition(myEntity.entityModel.x);
		}
	}

	private createBackground(name:string):egret.Bitmap
	{
		let mapTexture = RES.getRes(name);
		let mapBackground = new egret.Bitmap();
		mapBackground.texture = mapTexture;
		return mapBackground;
	}

	public adjustPosition(minHeroX:number):void
	{
		if(this.preHeroX == 0){
			this.preHeroX = minHeroX;
		}
		let deltaX = minHeroX - this.preHeroX;
		this.preHeroX = minHeroX;
		if(minHeroX < CommonUtils.stage.stageWidth/2){
			return;
		}
		
		if(deltaX < 0){
			return;
		}
		
		this.currentMapOffsetX += deltaX;
		this.moveContainer.x = this.currentMapOffsetX * -1;

		let background = this.backgroundCenterPngs[0];
		let globalPoint = background.parent.localToGlobal(background.x,background.y)
		if(globalPoint.x + background.width < 0){
			background.x = this.backgroundCenterPngs[1].x + this.backgroundCenterPngs[1].width;
			this.backgroundCenterPngs.shift();
			this.backgroundCenterPngs.push(background);
			console.log("出现了翻转");
		}

	}

	public addEntity(entity:BaseEntity):void
	{	
		if(!entity){
			return;
		}
		this.entityContainer.addChild(entity.view);
	}

	public flyNumber(entity:BaseEntity,deltaHp:number,flyType:string = FlyNumberType.Up,damageType:DamageType = DamageType.Normal):void
	{
		let linkName = "";
		let pre = ""
		let typePrefix = ""
		if(deltaHp == 0){
			return
		}else if(deltaHp > 0){
			linkName = "add_";
			pre = "+"
		}else if(deltaHp < 0){
			if(damageType == DamageType.Normal){
				linkName = "reduce_";
				pre = "-"
			}else if(damageType == DamageType.Critical){
				console.log("#######是暴击########")
				linkName = "reduce_";
				typePrefix = "reduce_暴";
			}
		}
		let numberContainer = NumberContainerPool.instance.getNumberContainer(linkName);
		this.flyNumberContainer.addChild(numberContainer);
		numberContainer.setNumber(pre + Math.floor(Math.abs(deltaHp)).toString(),typePrefix);
		
		if(flyType == FlyNumberType.Big_Up){
			DisplayUtil.flyNumber_bigUp(numberContainer,entity);
		}else if(flyType == FlyNumberType.Up){
			DisplayUtil.flyNumber_up(numberContainer,entity);
		}
		
	}

	public playBattleSuccess():void
	{

	}

	public playBattleFail():void
	{
		let animation = CommonUtils.createDragonBones("zdshibai");
		
		if(animation.isDataReady()){
			animation.x = this.currentMapOffsetX + CommonUtils.stage.stageWidth/2;
			animation.y = CommonUtils.stage.stageHeight/2;
			this.topAnimationContainer.addChild(animation);
			animation.play("1",1);
			return;
		}
		let self = this
		animation.readyCallback = function(){
			animation.x = self.currentMapOffsetX + CommonUtils.stage.stageWidth/2;
			animation.y = CommonUtils.stage.stageHeight/2;
			self.topAnimationContainer.addChild(animation);
			animation.play("1",1);
		}
	}
}