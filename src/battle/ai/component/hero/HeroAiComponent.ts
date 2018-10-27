class HeroAiComponent extends BaseAIComponent{

	public constructor(entity:HeroEntity) {
		super(entity)
		this.registerAiState(BattleStateType.IDLE,new BattleHeroIdleState(this));
		this.registerAiState(BattleStateType.MOVE,new BattleHeroMoveState(this));
		this.registerAiState(BattleStateType.ATTACK,new BattleHeroAttackState(this));
		this.registerAiState(BattleStateType.DEAD,new BattleHeroDeadState(this));
	}

	public get battleEntity():HeroEntity
	{
		return this._battleEntity as HeroEntity
	}


	public moveToTarget(target:HeroEntity):void
	{
		this.changeState(BattleStateType.MOVE);
		
		if(this.battleState){
			(this.battleState as BattleHeroMoveState).setTarget(target);
		}
	}

	public attackTarget(target:HeroEntity):void
	{
		this.changeState(BattleStateType.ATTACK);
		if(this.battleState){
			(this.battleState as BattleHeroAttackState).setTarget(target);
		}
	}
}