//精准打击目标
class RemotePositionState extends BaseAiState{

	private targetX:number = 0;
	private targetY:number = 0;

	public constructor(aiComponent:BaseAIComponent) {
		super(aiComponent);
	}


	public stateIn():void
	{
		this.aiComponent.battleEntity.view.visible = true;
		let thisEntity = this.aiComponent.battleEntity as RemoteEntity
		(thisEntity.view as BattleRemoteAvatar).doAction(thisEntity.remoteConfig.action,thisEntity.remoteConfig.isLoop);

		let target = thisEntity.entityModel.target || thisEntity.entityModel.hostTarget;
		this.targetX = target.entityModel.x;
		this.targetY = target.entityModel.y;
		if(thisEntity.entityModel.relativePoint){
			this.targetX += thisEntity.entityModel.relativePoint.x;
			this.targetY += thisEntity.entityModel.relativePoint.y;
		}
		this.aiComponent.battleEntity.entityModel.x = this.targetX;
		this.aiComponent.battleEntity.entityModel.y = this.targetY;
	}

	public stateOut()
	{
		let thisEntity = this.aiComponent.battleEntity as RemoteEntity
		if(thisEntity.entityModel.target && thisEntity.entityModel.target instanceof HeroEntity){
			(thisEntity.entityModel.target as HeroEntity).entityModel.hp -= 50;
		}
	}

}