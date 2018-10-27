class CreateRemoteScript extends BaseScript{

	private remoteId:number;

	public constructor(entity:BaseEntity,animationPlayer:BattleAnimationPlayer) {
		super(entity,animationPlayer);
	}

	public setParams(params:Object):void
	{
		this.remoteId = params["id"]
		let thisEntity = this._entity as FightEntity;
		let target = (thisEntity.entityModel as ActorEntityModel).target
		RemoteEntityManager.instance.tryGenerateRemote(this.remoteId,target,thisEntity);
	}

}