class DamageNormalCalculator extends DamageBaseCalculator{
	
	private _isMe:boolean = false;
	public constructor() {
		super();
	}

	public calculate(hitResult:HitResult):void
	{
		this._isMe = hitResult.attackEntity.entityModel.teamType == TeamType.Team_Me;
		let isCriticalRate = this.computeIsCriticalHit(hitResult.attackEntity.entityModel.fightProperty.criticalHitRate,hitResult.defenceEntity.entityModel.fightProperty.criticalDefenceRate);
		let damage = this.computeDamage(hitResult,hitResult.damageData,isCriticalRate);
		damage *= this.getRandom();
		hitResult.damageResult = new DamageResult(Math.floor(damage),isCriticalRate);
	}

	private computeIsCriticalHit(criticalHitRate:number, antiCriticalHitRate:number):boolean {
		let criticalRate:number = criticalHitRate * (1 - antiCriticalHitRate);
		return Math.random() < criticalRate;
	}

	private  computeDamage(hitResult:HitResult, damageData:DamageData, isCriticalHit:boolean):number{
		var damageReduceRate:number = 1 - hitResult.defenceEntity.entityModel.fightProperty.damageReduceRate;
		var damage:number = (hitResult.attackEntity.entityModel.fightPower * damageData.damageRate + damageData.damageAppend) * damageReduceRate;
		if(isCriticalHit == true){
			damage *= (2 + hitResult.attackEntity.entityModel.fightProperty.criticalHurt / Math.pow(10, 2)) ;
		}
		damage -= damageData.damageRate * hitResult.defenceEntity.entityModel.fightProperty.damageReduce;
		if(damage < 0){
			damage = 0;
		}
		return damage;
	}

	private getRandom():number
	{
		var random:number = Math.random() * 1 / 10;
		return 95/ Math.pow(10, 2) + random;
	}
}