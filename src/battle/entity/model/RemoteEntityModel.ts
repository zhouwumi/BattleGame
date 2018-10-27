class RemoteEntityModel extends ActorEntityModel{

	public hostTarget:BaseEntity; //释放远程的角色 
	
	public relativePoint:egret.Point;//打击的相对位置

	public maxSpringTimes:number;//弹射次数
	public duration:number;//如果此远程是loop，那么存在的时间是多长，默认是RemoteConfig中的配置，也可以主动设置此值
	
	public constructor() {
		super()
	}
}