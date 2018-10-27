class DamageResult {
	private _damage:number = 0;
	private _isCriticalHit:boolean = false;

	public constructor(_damage:number,_isCriticalHit:boolean) {
		this._damage = _damage;
		this._isCriticalHit = _isCriticalHit;
	}

	public get damage():number
	{
		return this._damage;
	}

	public get isCriticalHit():boolean
	{
		return this._isCriticalHit;
	}
}