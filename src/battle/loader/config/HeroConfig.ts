class HeroConfig {

	public id:number;
	public key:string;
	public name:string;
	public animation:string;
	public attackDistance:number;
	public allSkills:Array<number> = [];
	public fightSkills:Array<number> = [];
	public buffSkills:Array<number> = [];
	public searchScope:number = 0; //搜索范围
	public maxHp:number = 0;
	public speed:number = 0;

	public criticalHitRate:number = 0;//暴击率
	public criticalDefenceRate:number = 0;//防暴击率
	public damageReduceRate:number = 0;//伤害减免率
	public criticalHurt:number = 0;//暴击伤害
	public damageReduce:number = 0;//伤害减免

	public fightPower:number = 0;
	public attackInterval:number = 0;//攻击间隔

	public constructor(_heroConfig:Object) {
		this.id = _heroConfig["id"];
		this.key = _heroConfig["key"];
		this.name = _heroConfig["name"];
		this.animation = _heroConfig["animation"];
		this.attackDistance = _heroConfig["attack_distance"];
		this.allSkills = _heroConfig["skills"] as Array<number>;
		let self = this;
		this.allSkills.forEach(function(skillId:number,index:number){
			let skillBattleConfig = BattleConfigLoader.instance.getSkillBattleConfig(self.id,skillId)
			if(skillBattleConfig.isAttack){
				self.fightSkills.push(skillId)
			}else if(skillBattleConfig.isBuff){
				self.buffSkills.push(skillId)
			}
		},this)
		this.searchScope =  _heroConfig["searchScope"] || 300;
		this.maxHp =  _heroConfig["maxHp"] || 100;
		this.speed = _heroConfig["speed"] || 4;

		this.criticalHitRate = _heroConfig["criticalHitRate"] || 0;
		this.criticalDefenceRate = _heroConfig["criticalDefenceRate"] || 0;
		this.damageReduceRate = _heroConfig["damageReduceRate"] || 0;
		this.criticalHurt = _heroConfig["criticalHurt"] || 0;
		this.damageReduce = _heroConfig["damageReduce"] || 0;

		this.fightPower = _heroConfig["fightPower"] || 0;
		this.attackInterval = _heroConfig["attack_interval"] || 2000;
	}

}