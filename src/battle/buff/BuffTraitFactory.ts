class BuffTraitFactory {

	public static createBuffTrait(buffTraitInfo):BaseTrait
	{
		let cls_str = buffTraitInfo["cls"];
		let cls = egret.getDefinitionByName(cls_str);
		let traitInstance = new cls(buffTraitInfo) as BaseTrait;
		return traitInstance;
	}
	
}