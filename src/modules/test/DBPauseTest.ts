/**
 * 龙骨动画暂停
 */
class DBPauseTest extends egret.DisplayObjectContainer{

	private dbAnimation:db.DragonBonesAnimation;
	private btnOperate:eui.Button;
	private isPlaying:boolean = true;
	public constructor() {
		super();
		this.once(egret.Event.ADDED_TO_STAGE,this.onAddStage,this);
		this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
	}

	private onEnterFrame(event:egret.Event):void
	{
	}

	private onAddStage(event:egret.Event):void
	{
		let animation = CommonUtils.createDragonBones("wuyazi");
		this.addChild(animation);
		animation.x = CommonUtils.stage.stageWidth/2;
		animation.y = CommonUtils.stage.stageHeight/2 -100;
		let self = this;
		animation.readyCallback = function(){
			animation.play("attack4",0);
		}
		
		this.dbAnimation = animation;


		let btnOperate = new eui.Button();
		btnOperate.label = "暂停"
		LayerManager.instance.getActivitySubLayer(LayerCost.Layer_Activity_UI).addChild(btnOperate);
		btnOperate.x = CommonUtils.stage.stageWidth - btnOperate.width - 100;
		btnOperate.y = CommonUtils.stage.stageHeight/2 - 50;
		btnOperate.touchEnabled = true;
		btnOperate.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClickOperate,this);
		this.btnOperate = btnOperate
	}

	private onClickOperate():void
	{
		if(!this.dbAnimation.isDataReady()){
			return;
		}
		
		if(this.isPlaying){
			this.isPlaying = false;
			this.btnOperate.label = "开始"
			egret.ticker.pause();
		}else{
			this.isPlaying = true;
			this.btnOperate.label = "暂停"
			egret.ticker.resume();
		}

	}
}