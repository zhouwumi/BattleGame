class BufferFactory {
	/**
	 * 创建buff
	 */
	public static createBuffer(bufferId:number,duration:number,params:Object = null):BaseBuff
	{
		let bufferInfo = BattleConfigLoader.instance.getBufferInfo(bufferId);
		let buffer = new BaseBuff(bufferInfo,duration,params);
		return buffer
	}
}