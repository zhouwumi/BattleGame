class RemoteEntity extends FightEntity{

	private startTime:number = 0;
	private _remoteConfig:RemoteConfig = null;

	public constructor(model:BaseEntityModel,remoteConfig:RemoteConfig) {
		super(model);
		this.entityModel.entityType = EntityType.Remote;
		this._remoteConfig = remoteConfig;
		this.aiComponent = this.getAiComponent();
		this._view = new BattleRemoteAvatar(this);
		this.view.visible = false;
	//	this.view.scaleX = this._remoteConfig.scaleX;
	//	this.view.scaleY = this._remoteConfig.scaleY;
		RemoteEntityManager.instance.registerEntity(this);
	}

	public tryStartAi():boolean
	{
		if(super.tryStartAi()){
			this.startTime = egret.getTimer();
		}
		return false;
	}

	public update():boolean
	{
		if(super.update()){
			let duration = this.entityModel.duration || this.remoteConfig.duration || 0;
			if(duration <= 0){
				return true;
			}
			let curTime = egret.getTimer();
			if(curTime - this.startTime >= duration * 1000){
				this.aiComponent.stop();
				this.aiComponent.battleEntity.destory();
			}
			return true;
		}
		return false;
	}

	public destory()
	{
		if(this._entityModel.isDead){
			return;
		}
		console.log("######一个远程被释放了##########")
		super.destory();
		RemoteEntityManager.instance.removeEntity(this);
	}

	public get remoteConfig():RemoteConfig
	{
		return this._remoteConfig;
	}

	private getAiComponent():BaseAIComponent
	{
		if(this._remoteConfig.type == RemoteType.Precise_Position){
			return new RemotePositionAiComponent(this);
		}else if(this._remoteConfig.type == RemoteType.Move_Target){
			return new RemoteMoveTargetAiComponent(this);
		}else if(this._remoteConfig.type == RemoteType.Spring){
			return new RemoteSpingAiComponent(this);
		}
		return null;
	}


	public get entityModel():RemoteEntityModel
	{
		return this._entityModel as RemoteEntityModel;
	}
	
}