class BattleRemoteAvatar extends FightEntityAvatar{

	public constructor(entity:RemoteEntity) {
		super(entity);

		this._animationPlayer = new BattleAnimationPlayer(this,this.battleEntity.remoteConfig.key);
		this._animationPlayer.loadAnimation();

	}

	public viewReady():void
	{
		super.viewReady();
		this.anchorOffsetX = 0;
		this.anchorOffsetY = 0;
	}


	public get battleEntity():RemoteEntity
	{
		return this._entity as RemoteEntity
	}

	public doAction(actionName:string,isLoop:boolean = false)
	{
		if(this._animationPlayer.isDataReady){
			this._animationPlayer.play(actionName,isLoop ? 0:1);
		}
	}
}