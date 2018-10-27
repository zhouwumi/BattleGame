class HitShowBubbleComponent extends BaseHitComponent {

	public constructor() {
		super();
	}

	public hit(hitResult:HitResult):boolean
	{
		if(hitResult.damageResult.damage == 0){
			return false;
		}
		let defenceEntity = hitResult.defenceEntity;
		let damageType = hitResult.damageResult.isCriticalHit ? DamageType.Critical:DamageType.Normal;
		battleScene.mapView.flyNumber(defenceEntity,hitResult.damageResult.damage * -1,FlyNumberType.Up,damageType);
		return true;
	}
}