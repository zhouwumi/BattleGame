class HitCalculateComponent extends BaseHitComponent{

	public constructor() {
		super();
	}

	public hit(hitResult:HitResult):boolean
	{
		this.initDamageData(hitResult);
		DamageCalculateFactory.instance.getCalculator(hitResult.damageData.damageCalculatorType).calculate(hitResult);
		hitResult.isSuccessHit = hitResult.damageResult.damage != 0;
		return hitResult.isSuccessHit;
	}

	//暂时只支持英雄
	private initDamageData(hitResult:HitResult):void
	{
		let attackEntity = hitResult.attackEntity as HeroEntity;
		let skillConfig = BattleConfigLoader.instance.getSkillBattleConfig(attackEntity.heroConfig.id,hitResult.skillId);
		let damageData = new DamageData(skillConfig.damageConfig.damageAppend,skillConfig.damageConfig.damageRate);
		hitResult.damageData = damageData;
	}


}