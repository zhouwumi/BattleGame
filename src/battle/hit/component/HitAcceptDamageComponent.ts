class HitAcceptDamageComponent extends BaseHitComponent{

	public constructor() {
		super();
	}

	public hit(hitResult:HitResult):boolean
	{
		let attackEntity = hitResult.attackEntity;
		let defenceEntity = hitResult.defenceEntity;
		defenceEntity.entityModel.hp -= Math.floor(hitResult.damageResult.damage);
		return true;
	}
}