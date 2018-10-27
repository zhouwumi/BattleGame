class DamageCalculateFactory {

	
	private static _instance:DamageCalculateFactory = null;

	public static get instance():DamageCalculateFactory
	{
		if(!DamageCalculateFactory._instance){
			DamageCalculateFactory._instance = new DamageCalculateFactory();
		}
		return DamageCalculateFactory._instance;
	}

	private type2Calculator:Object = null;
	public constructor() {
		this.type2Calculator = {};
		this.type2Calculator[DamageCalculateType.Normal] = DamageNormalCalculator;
	}

	public getCalculator(type:DamageCalculateType):DamageBaseCalculator
	{
		let clz = this.type2Calculator[type];
		let instance:DamageBaseCalculator = new clz() as DamageBaseCalculator;
		return instance
	}

}