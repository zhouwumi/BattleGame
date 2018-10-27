
class CommonUtilsTest extends egret.DisplayObjectContainer{
	public constructor() {
		super();
		this.once(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
	}

	private addToStage(event:egret.Event):void
	{
	//	RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.groupCompelete,this);
	//	RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.groupError,this);

	//	this.testDragonBones()
	//	this.testRotation();
		this.testDragonBonesEvent();
		
	}

	private testDragonBonesEvent():void
	{
		let dragonBonesAnimation = CommonUtils.createDragonBones("duanyu")
		dragonBonesAnimation.x = CommonUtils.stage.stageWidth/2;
		dragonBonesAnimation.y = CommonUtils.stage.stageHeight/2;
		this.addChild(dragonBonesAnimation)
		dragonBonesAnimation.readyCallback = function(){
			console.log("数据准备好了")
			dragonBonesAnimation.play("attack1");
		}
	}

	private testDragonBones():void
	{
		RES.loadGroup("wuyazi");
	}

	private testRotation():void
	{
		let animation = CommonUtils.createDragonBones("fish");
		this.addChild(animation);
	//	animation.x = CommonUtils.stage.stageWidth/2;
		animation.y = CommonUtils.stage.stageHeight/2;
		animation.readyCallback = function(){
			animation.play("animation",0)
		}
	//	animation.scaleX = -1;
	//	animation.rotation = 90;
	}


	private groupCompelete(event:RES.ResourceEvent):void
	{
		let groupName = event.groupName;
		if(groupName == "wuyazi" || groupName == "fish"){
			let animation = CommonUtils.createDragonBones(groupName);
			this.addChild(animation);
			animation.play(FightActions.ATTACK1);
			animation.x = this.stage.stageWidth/2
			animation.y = this.stage.stageHeight/2
			console.log(animation.display.animation.animationNames);
			animation.scaleX = animation.scaleY = 2
		}
	}

	private groupError(event:RES.ResourceEvent):void
	{
		console.log("load group error:  ",event.groupName);
	}

}