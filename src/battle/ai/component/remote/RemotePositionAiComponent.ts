class RemotePositionAiComponent extends BaseAIComponent{

	public constructor(entity:RemoteEntity) {
		super(entity)

		let moveState = new RemotePositionState(this)
		this.registerAiState(BattleStateType.MOVE,moveState);
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