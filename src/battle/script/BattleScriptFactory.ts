class BattleScriptFactory {

	public static createScript(entity:BaseEntity,animationPlayer:BattleAnimationPlayer,buffConfig:Object):BaseScript
	{
		let cls_str = buffConfig["type"];
		let cls = egret.getDefinitionByName(cls_str);
		let scriptInstance = new cls(entity,animationPlayer) as BaseScript;
		scriptInstance.setParams(buffConfig)
		return scriptInstance
	}
	
}