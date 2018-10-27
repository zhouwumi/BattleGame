class RemoteEntityTest extends egret.DisplayObjectContainer{

	public constructor() {
		super();
		this.once(egret.Event.ADDED_TO_STAGE,this.onAddStage,this);
	}

	private onAddStage(event:egret.Event):void
	{
		let remoteEntity = RemoteEntityManager.instance.tryGenerateRemote(20002,null,null);
		remoteEntity.entityModel.x = CommonUtils.stage.stageWidth/2;
		remoteEntity.entityModel.y = CommonUtils.stage.stageHeight/2 -200;
		this.addChild(remoteEntity.view)
		egret.setTimeout(function(){
			remoteEntity.view.visible = true;
			remoteEntity.view.bodyAnimation.visible = true;
			remoteEntity.view.animationPlayer.play("animation")
		},this,2000)
	}
}