/**
 * 层管理器
 */
class LayerManager {

	private static _instance:LayerManager = null;

	public static get instance():LayerManager
	{
		if(LayerManager._instance == null){
			LayerManager._instance = new LayerManager();
		}
		return LayerManager._instance;
	}

	public sceneDisplayObject:egret.DisplayObjectContainer = null;
	public activityDisplayObject:egret.DisplayObjectContainer = null;
	public activitySubLayers:Array<egret.DisplayObjectContainer> = null;

	public constructor() {
		this.sceneDisplayObject = new egret.DisplayObjectContainer();
		this.activityDisplayObject = new egret.DisplayObjectContainer();
		CommonUtils.stage.addChildAt(this.sceneDisplayObject,LayerCost.Layer_Scene);
		CommonUtils.stage.addChildAt(this.activityDisplayObject,LayerCost.Layer_Activity);

		this.activitySubLayers = [];

	}

	public getSceneLayer():egret.DisplayObjectContainer
	{
		return this.sceneDisplayObject;
	}

	public getActivityLayer():egret.DisplayObjectContainer
	{
		return this.activityDisplayObject;
	}

	public getActivitySubLayer(layer:number):egret.DisplayObjectContainer
	{
		if(layer <= 0 || layer > LayerCost.Layer_Scene_Max){
			return null;
		}

		let ret = this.activitySubLayers[layer]
		if(!ret){
			ret = new egret.DisplayObjectContainer();
			this.activityDisplayObject.addChildAt(ret,layer);
			this.activitySubLayers[layer] = ret;
		}

		return ret;
	}

	public clearAll():void
	{
		this.activityDisplayObject.removeChildren();
		this.sceneDisplayObject.removeChildren();
		this.activitySubLayers.length = 0;
	}

}