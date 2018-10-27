class ActorEntityModel extends FightEntityModel{
	
	protected _target:FightEntity; //打击的目标,如果没有就是自身
	protected _lastTarget:FightEntity;//上次打击的目标
	
	public constructor() {
		super()
	}

	public set target(__target:FightEntity)
	{
		this._target = __target
	}

	public get target():FightEntity
	{
		return this._target
	}

	public set lastTarget(_lastTarget:FightEntity)
	{
		this._lastTarget = _lastTarget
	}

	public get lastTarget():FightEntity
	{
		return this._lastTarget
	}


}