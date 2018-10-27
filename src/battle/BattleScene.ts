let battleScene:BattleScene = null;
class BattleScene{


	private backgroundLayer:egret.DisplayObjectContainer = null;
	private isMoving:boolean = false;

	private heroMaxX:number = 0;
	private btnNext:eui.Button = null;
	public mapView:BattleMapView = null;

	private entitys:Array<HeroEntity> = null;

	private static _instance:BattleScene = null;

	public static get instance():BattleScene{
		if(BattleScene._instance == null){
			BattleScene._instance = new BattleScene();
		}
		return BattleScene._instance;
	}

	public constructor() {
		this.entitys = [];
		battleScene = this;
	}

	public enterIn():void
	{
		LayerManager.instance.clearAll();

		this.mapView = new BattleMapView();
		LayerManager.instance.getSceneLayer().addChild(this.mapView);

		
		RoundManager.instance.loadRound(1);
		RoundManager.instance.gotoNextRound();
		if(1 == 1){
			return;
		}

		let btnNext = new eui.Button();
		btnNext.label = "停止"
		LayerManager.instance.getActivitySubLayer(LayerCost.Layer_Activity_UI).addChild(btnNext);
		btnNext.x = CommonUtils.stage.stageWidth - btnNext.width - 100;
		btnNext.y = CommonUtils.stage.stageHeight/2 -200;
		btnNext.touchEnabled = true;
		this.btnNext = btnNext;
		btnNext.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickNext,this);

		let btnRole = new eui.Button();
		btnRole.label = "生成角色"
		LayerManager.instance.getActivitySubLayer(LayerCost.Layer_Activity_UI).addChild(btnRole);
		btnRole.x = CommonUtils.stage.stageWidth - btnNext.width - 100;
		btnRole.y = CommonUtils.stage.stageHeight/2 - 300;
		btnRole.touchEnabled = true;
		btnRole.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickRole,this);

		let btnLook = new eui.Button();
		btnLook.label = "查看角色状态"
		LayerManager.instance.getActivitySubLayer(LayerCost.Layer_Activity_UI).addChild(btnLook);
		btnLook.x = CommonUtils.stage.stageWidth - btnNext.width - 100;
		btnLook.y = CommonUtils.stage.stageHeight/2 - 400;
		btnLook.touchEnabled = true;
		btnLook.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickLook,this);

	}

	private onClickLook():void
	{
		
		let entitys = HeroEntityManager.instance.entitys;
		console.log("onClickLook  ",entitys.length)
		entitys.forEach(function(entity:HeroEntity,index:number,entitys:Array<HeroEntity>){
			console.log(entity.aiComponent._currStateType)
		},this)

	}

	private onClickNext(event:TouchEvent):void
	{
		if(this.isMoving == false){
			this.isMoving = true;
			this.btnNext.label = "开始";
			HeroEntityManager.instance.pause();
			RemoteEntityManager.instance.pause();
			DBAnimationManager.instance.pause();
		}else{
			this.isMoving = false;
			this.btnNext.label = "停止"
			HeroEntityManager.instance.resume();
			RemoteEntityManager.instance.resume();
			DBAnimationManager.instance.resume();
		}
		
	}

	private onClickRole(event:TouchEvent):void
	{
		/*
		let newEntity = new HeroEntity()
		newEntity.x = 100;
		newEntity.y = CommonUtils.stage.stageHeight - 400;
		newEntity.TeamType = TeamType.Team_Me;
		this.mapView.addEntity(newEntity);
		this.entitys.push(newEntity);

		let newEntity2 = new HeroEntity()
		newEntity2.x = CommonUtils.stage.stageWidth - 100;
		newEntity2.y = CommonUtils.stage.stageHeight - 400;
		newEntity2.TeamType = TeamType.Team_Enemy;
		this.mapView.addEntity(newEntity2);
		this.entitys.push(newEntity2);
*/
		if(HeroEntityManager.instance.getMyEntity()){
			let newEntity = HeroEntityManager.instance.tryGenerateEmemy(TeamType.Team_Enemy);
			this.mapView.addEntity(newEntity);
			this.entitys.push(newEntity);
		}else{
			console.log("######没有我方角色#########")
			let newEntity = HeroEntityManager.instance.tryGenerateEmemy(TeamType.Team_Enemy);
			this.mapView.addEntity(newEntity);
			this.entitys.push(newEntity);
			newEntity = HeroEntityManager.instance.tryGenerateEmemy(TeamType.Team_Me);
			this.mapView.addEntity(newEntity);
			this.entitys.push(newEntity);
		}
	}

	public enterOut():void
	{
		LayerManager.instance.clearAll();
	}

}