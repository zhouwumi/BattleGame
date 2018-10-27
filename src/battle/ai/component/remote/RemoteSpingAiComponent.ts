class RemoteSpingAiComponent extends BaseAIComponent{

	private _cacheSpringTargets:any = null;

	public constructor(entity:RemoteEntity) {
		super(entity)
		this._cacheSpringTargets = {};
		this.registerAiState(BattleStateType.IDLE,new RemoteSpingIdleState(this));
		this.registerAiState(BattleStateType.MOVE,new RemoteSpingMoveState(this));
		this.registerAiState(BattleStateType.DEAD,new RemoteDeadState(this));
	}

	public start()
	{
		this.changeState(BattleStateType.IDLE);
	}

	public get battleEntity():RemoteEntity
	{
		return this._battleEntity as RemoteEntity
	}

	public clearState():void
	{
		this.battleState = null
	}

	public springNext():void
	{
		this.changeState(BattleStateType.IDLE);
	}

	public isTargetHasBeSpring(entity:BaseEntity):boolean
	{
		return this._cacheSpringTargets[entity.hashCode] == true;
	}

	public cacheTarget(entity:BaseEntity):void
	{
		this._cacheSpringTargets[entity.hashCode] = true;
	}
}