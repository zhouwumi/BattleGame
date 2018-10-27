class ActorEntity extends FightEntity{

	private _buffers:Array<BaseBuff>
	public constructor(model:BaseEntityModel){
		super(model)
		this._buffers = [];
	}


	public addBuff(bufferId:number,duration:number,attachHost:BaseEntity = null):boolean
	{
		if(this.checkIsRepellentBuffId(bufferId)){
			return false
		}

		for(let index = 0;index < this._buffers.length;index++)
		{
			let buffer = this._buffers[index]
			//console.log("addBuff  ",buffer.bufferInfo.id,bufferId,buffer.bufferInfo.id == bufferId)
			if(buffer.bufferInfo.id == bufferId)
			{
				buffer.duration = duration;
				return true;
			}
		}

		let newBuffer = BufferFactory.createBuffer(bufferId,duration);
		newBuffer.target = this;
		newBuffer.attachHost = attachHost;
		newBuffer.start();

		(this.view as ActorAvatar).addBuffView(bufferId)
		this._buffers.push(newBuffer);

		return  true;
	}

	public removeBuff(bufferId:number):boolean
	{
		for(let index = 0;index < this._buffers.length;index++)
		{
			let buffer = this._buffers[index]
			if(buffer.bufferInfo.id == bufferId)
			{
				buffer.stop();
				this._buffers.splice(index);
				(this.view as ActorAvatar).removeBuffer(bufferId)
				return true;
			}
		}
		return false;
	}

	public update():boolean
	{
		if(super.update()){
			this._buffers.forEach(function(buffer:BaseBuff,index:number){
				buffer.onEnterFrame();
			},this)
			return true;
		}
		
		return false;
	}

	/**
	 * 检查是否排斥某个buff
	 */
	private checkIsRepellentBuffId(bufferId:number):boolean
	{
		let self = this;
		for(let index = 0;index < this._buffers.length;index++)
		{
			let buffer = this._buffers[index]
			let repellentBufferIds = buffer.bufferInfo.repellentBufferIds
			if(repellentBufferIds.indexOf(bufferId)!= -1){
				return true
			}
		}
		return false;
	}

	public destory()
	{
		if(this._entityModel.isDead){
			return
		}
		super.destory();
		this._buffers.forEach(function(buffer:BaseBuff,index:number){
			buffer.stop();
		},this)
		this._buffers = [];
	}
}