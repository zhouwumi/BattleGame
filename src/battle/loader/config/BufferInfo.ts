/**
 * buff配置
 */
class BufferInfo {
	public id:number;
	/** buff的增益和减益类型  参考BufferTypes*/
	public type:number;
	public name:string;
	/** 需要添加的buff光效 */
	public effectId:number;
	/**排斥的buff */
	public repellentBufferIds:Array<number>;//排斥的buff
	/**免疫的buff */
	public immuneBufferIds:Array<number>;//免疫的buf
	public isDisplay:boolean //是否显示
	public traitInfos:Array<any>; //特征信息
	public action:string;//动作名
	public animation:string;//动画名

	public constructor(bufferConfig)
	{
		this.id = bufferConfig["id"]
		this.type = bufferConfig["type"]
		this.name =  bufferConfig["name"]
		this.effectId = bufferConfig["effectId"]
		let ids = (bufferConfig["repellentIds"] as string).split(",");
		this.repellentBufferIds = [];
		let self = this
		ids.forEach(function(id:string,index:number){
			self.repellentBufferIds.push(parseInt(id));
		},this);
		ids = (bufferConfig["immuneIds"] as string).split(",");
		this.immuneBufferIds = [];
		ids.forEach(function(id:string,index:number){
			self.immuneBufferIds.push(parseInt(id));
		},this);
		this.isDisplay = bufferConfig["display"]
		this.traitInfos = bufferConfig["traits"] || [];
		this.action =  bufferConfig["action"] || "";
		this.animation =  bufferConfig["animation"] || "";
	}
}
