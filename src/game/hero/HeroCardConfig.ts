class HeroCardConfig {

	public id:number = 0;
	public name:string = "";
	public description:string = "";
	public stanceConfig:StanceConfig;
	public equipConfigs:Array<EquipConfig> = null//装备的基础信息 EquipConfig
	public skillIds:Array<number> = null //有哪些技能


	public constructor() {
	}
}