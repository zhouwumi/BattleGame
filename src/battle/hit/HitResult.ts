class HitResult {
	public attackEntity:FightEntity;
	public defenceEntity:FightEntity;
	public damageData:DamageData;
	public skillId:number;
	public isSuccessHit:boolean = false;
	public damageResult:DamageResult;

	public constructor() {
	}
}