class EquipModel {
	
	public id:number = 0;
	public config:EquipConfig = null;
	public quality:number = 0;
	public star:number = 0;

	//以下这些属性都需要可以动态计算的
	public hp:number = 0;
	public fightValue = 0;
	public physicsDef:number = 0;
	public magicDef:number = 0;
	public physicsAttack:number = 0;
	public magicAttack:number = 0;
	public mp:number = 0;


	public constructor() {
	}
}