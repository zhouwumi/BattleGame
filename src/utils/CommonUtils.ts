/**
 * 通用的工具类
 */
class CommonUtils {

	public static stage:egret.Stage = null;

	public static createDragonBones(draonBonesName:string,armatureName:string = ""):db.DragonBonesAnimation
	{
		
		let animation = new db.DragonBonesAnimation(draonBonesName,armatureName);
		return animation;
	}

}