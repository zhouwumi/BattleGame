class RemoteMoveTargetAiComponent extends BaseAIComponent{

	public constructor(entity:RemoteEntity) {
		super(entity)

		this.registerAiState(BattleStateType.MOVE,new RemoteMoveTargetState(this));
		this.registerAiState(BattleStateType.DEAD,new RemoteDeadState(this));
	}

	public start()
	{
		this.changeState(BattleStateType.MOVE);
	}

	public get battleEntity():RemoteEntity
	{
		return this._battleEntity as RemoteEntity
	}

}