class RemoteConfig {

	/*
	 "key":"long",
        "name":"俯冲",
        "animation":"long",
        "type":"target",
        "actions":["1"]
	*/

	public id:number;
	public key:string;//远程key
	public name:string;
	public animation:string;//远程动画名 
	public type:number;//远程类型
	public action:string = "";//远程动作
	public isLoop:boolean = false;  //是否循环播放
	public moveSpeed:number = 0; //移动速度
	public duration:number = -1;//如果是loop,默认动画持续时间为-1,永久持续下去
	public scaleX:number = 1;
	public scaleY:number = 1;
	public maxSpringTimes:number = 1;
	public width:number = 0;
	public height:number = 0;

	public constructor(_remoteConfig:Object) {
		this.id = _remoteConfig["id"]
		this.key = _remoteConfig["key"];
		this.name = _remoteConfig["name"];
		this.animation = _remoteConfig["animation"];
		this.type = _remoteConfig["type"];
		this.action = _remoteConfig["actions"];
		this.isLoop = _remoteConfig["isLoop"];
		this.moveSpeed = _remoteConfig["moveSpeed"];
		this.duration = _remoteConfig["duration"] || -1;
		this.scaleX = _remoteConfig["scaleX"] || 1;
		this.scaleY = _remoteConfig["scaleY"] || 1;
		this.maxSpringTimes = _remoteConfig["maxSpringTimes"] || 1;
		this.width = _remoteConfig["width"] || 0;
		this.height = _remoteConfig["height"] || 0;
	}

}