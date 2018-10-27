enum Direction{
	RIGHT = 1,  //向右
	LEFT//向左
};

enum DragonBonesAnimationTypes{
	Hero = 1,//角色
	Remote,//远程
	Buff,  //buff光效
}

enum EntityType {
    Hero = 1, //英雄
    Remote, //远程
}

enum TeamType{
	Team_Me = 1, //我方
	Team_Enemy, //敌方
	Team_Neutral,//中立
}

enum RemoteType{
	Precise_Position = 1, //精确位置的
	Move_Target,//朝对象打过去
	Spring,
}

enum BufferTypes{
	Promote = 1,//增强
	Weaken//减弱
}

enum AvatarLayer{
	Buff_Background = 1, //buff背景层
	Body = 2,//身体层
	Buff_Preground = 3, //buff前景层

	Max = 3
}

class FlyNumberType{
	public static Big_Up = "bigup";
	public static Up = "up";
}

enum DamageCalculateType{
	Normal = 1
}

enum DamageType{
	Normal = 1,
	Critical
}