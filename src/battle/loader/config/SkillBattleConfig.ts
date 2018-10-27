class SkillBattleConfig {
	public id:number;
	public action:string;
	public isAttack:boolean;//是否是攻击动作
	public isBuff:boolean;//是否是攻击动作
	public frameCounts:number;//持续时间
	public frameScripts:Object;
	public startScripts:Array<Object>;
	public endScripts:Array<Object>;
	public defenceBoxs:Array<DecisionBox>;
	public attackBoxs:Array<DecisionBox>;

	public damageConfig:DamageConfig;

	public constructor(skillConfig) {
		this.id = skillConfig["id"];
		this.action = skillConfig["action"]
		this.isAttack = skillConfig["isAttack"] || false
		this.isBuff = skillConfig["isBuff"] || false
		this.frameCounts = skillConfig["duration"] || 0
		this.frameScripts = {};
		this.startScripts = [];
		this.endScripts = [];
		if(skillConfig["scripts"]){
			this.frameScripts = skillConfig["scripts"]["frames"] || {}
			this.startScripts = skillConfig["scripts"]["start"] || []
			this.endScripts = skillConfig["scripts"]["end"] || []
		}

		this.defenceBoxs = [];
		this.attackBoxs = [];
		let self = this;
		let defenceConfigs:Array<Object> = skillConfig["defencebox"] || [];
		defenceConfigs.forEach(function(defenceConfig:Object,index:number){
			let decisionBox = new DecisionBox(defenceConfig,DecisionBox.DecisionBoxType_Defence);
			self.defenceBoxs.push(decisionBox);
		})

		let attackConfigs:Array<Object> = skillConfig["attackbox"] || [];
		attackConfigs.forEach(function(attackConfig:Object,index:number){
			let attackBox = new DecisionBox(attackConfig,DecisionBox.DecisionBoxType_Attack);
			self.attackBoxs.push(attackBox);
		})

		this.damageConfig = new DamageConfig(skillConfig["damage"] || {});
	}
}

class DamageConfig
{
	private _damageRate:number;
	private _damageAppend:number;

	public constructor(config:Object)
	{
		this._damageRate = config["damageRate"] || 1;
		this._damageAppend = config["damageAppend"] || 0
	}

	public get damageRate():number
	{
		return this._damageRate;
	}

	public get damageAppend():number
	{
		return this._damageAppend;
	}
}