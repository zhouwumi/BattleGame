class BaseAIComponent {
	
	protected _battleEntity:BaseEntity = null;
	public battleState:BaseAiState = null;
	protected _aiStates:Object = null;
	public _currStateType:string = "";

	public constructor(entity:BaseEntity) {
		this._battleEntity = entity;
		this._aiStates = {};
	}

	public get battleEntity():BaseEntity
	{
		return this._battleEntity
	}
	
	public start()
	{
		this.changeState(BattleStateType.IDLE);
	}

	public stop()
	{
		if(this.battleState){
			this.battleState.stateOut();
			this.battleState = null;
		}
	}

	public registerAiState(stateType:string,aiState:BaseAiState)
	{
		this._aiStates[stateType] = aiState;
	}

	public getState(stateType:string):BaseAiState
	{
		return this._aiStates[stateType]
	}

	public update():void
	{
		if(this.battleState){
			this.battleState.stateUpdate();
		}
	}


	public changeState(state:string):void
	{
		if(this.battleState){
			this.battleState.stateOut();
		}
		this._currStateType = state;
		this.battleState = this._aiStates[state];
		if(this.battleState){
			this.battleState.stateIn();
		}
	}
}