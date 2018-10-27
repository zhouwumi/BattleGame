//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

var global_notice_count = 0;
var __global__ = this;

class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView: LoadingUI;
    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //Config loading process interface
        //设置加载进度界面
        // this.loadingView = new LoadingUI();
        // this.stage.addChild(this.loadingView);
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");

        CommonUtils.stage = this.stage;
        LayerManager.instance;
    }
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        console.log("onConfigComplete",event.itemsTotal, event.itemsLoaded,event.groupName);
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        let theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }
    private isThemeLoadEnd: boolean = false;
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }
    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            // this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
            BattleConfigLoader.instance;
        }
    }
    private createScene() {
        if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
        //    this.startCreateScene();
        //    this.startCreateScene2();
            this.startCreateScene3();
        }
    }

    private thisSky:egret.Bitmap;
    private thisSkyTexture:egret.Texture;
    private startCreateScene3() {

        let buttomMask = new egret.Shape();
        buttomMask.graphics.beginFill(0x000000, 0.5);
        buttomMask.graphics.drawRect(0, 0, 40, 20);
        buttomMask.graphics.endFill();
        this.addChild(buttomMask)

       // let sky = this.createBitmapByName("bg_jpg");
        var texture = RES.getRes('role_bg_up_png');
        let sky = new egret.Bitmap(texture);
        sky.name = 'sky';
       // sky.cacheAsBitmap = true;
        // sky.fillMode = egret.BitmapFillMode.;
        // sky.width = this.stage.stageWidth;
        // sky.height = this.stage.stageHeight/2;
        this.addChild(sky);
        sky.pixelHitTest = true;
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        // sky.width = stageW;
        // sky.height = stageH;
        this.thisSky = sky;
        this.thisSkyTexture = this.thisSky.texture;

        


        

        let button = new eui.Button();
        button.label = "Click!";
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick2, this);

        console.log('###displayList###', sky['$displayList'], sky['$parentDisplayList']);

        var tx:egret.TextField = new egret.TextField;
        tx.width = 400;
        tx.x = 10;
        tx.y = 10;
        tx.textColor = 0;
        tx.size = 20;
        tx.fontFamily = "微软雅黑";
        tx.textAlign = egret.HorizontalAlign.CENTER;
        tx.textFlow = <Array<egret.ITextElement>>[
            {text: "妈妈再也不用担心我在", style: {"size": 12}}
            , {text: "Egret", style: {"textColor": 0x336699, "size": 60, "strokeColor": 0x6699cc, "stroke": 2}}
            , {text: "里说一句话不能包含各种", style: {"fontFamily": "楷体"}}
            , {text: "五", style: {"textColor": 0xff0000}}
            , {text: "彩", style: {"textColor": 0x00ff00}}
            , {text: "缤", style: {"textColor": 0xf000f0}}
            , {text: "纷", style: {"textColor": 0x00ffff}}
            , {text: "、\n"}
            , {text: "大", style: {"size": 36}}
            , {text: "小", style: {"size": 6}}
            , {text: "不", style: {"size": 16}}
            , {text: "一", style: {"size": 24}}
            , {text: "、"}
            , {text: "格", style: {"italic": true, "textColor": 0x00ff00}}
            , {text: "式", style: {"size": 16, "textColor": 0xf000f0}}
            , {text: "各", style: {"italic": true, "textColor": 0xf06f00}}
            , {text: "样", style: {"fontFamily": "楷体"}}
            , {text: ""}
            , {text: "的文字了！"}
        ];
        this.addChild( tx );
    }

    private onButtonClick2(e: egret.TouchEvent) {
       /* if(this.thisSky.texture == null){
            this.thisSky.texture = this.thisSkyTexture;
            console.log('#####1#', this.thisSky.width,this.thisSky.height)
        }else{
            this.thisSky.texture = null;
            console.log('#####2#', this.thisSky.width,this.thisSky.height)
        }*/
        console.log(this.thisSky.$hitTest(40,20));
    }

    private onTouchbegin():void
    {
        console.log("#########onTouchbegin######3")
    }

    private startCreateScene2():void
    {
        let buttomMask = new egret.Shape();
        buttomMask.graphics.beginFill(0x000000, 0.5);
        buttomMask.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
        buttomMask.graphics.endFill();
        this.addChild(buttomMask)
        console.log(this.stage.stageWidth, this.stage.stageHeight)


        let startTexture = RES.getRes("btn_start_png");
        let startBitmap = new egret.Bitmap();
        startBitmap.texture = startTexture;
        this.addChild(startBitmap);
        startBitmap.x = this.stage.width/2;
        startBitmap.y = this.stage.height/2;
        startBitmap.touchEnabled = true;
        startBitmap.addEventListener(egret.TouchEvent.TOUCH_TAP,function(){
            BattleScene.instance.enterIn();
        }.bind(this),this);

        buttomMask.touchEnabled = true;
        buttomMask.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchbegin,this);

      //  let barTest = new GameProgressBarTest();
     //   this.addChild(barTest);

     //   let bitmapFontTest = new BitmapFontTest();
     //   this.addChild(bitmapFontTest);
        
       // let moveTest = new RotationMoveTest();
      //  this.addChild(moveTest);

        let utilsTest = new CommonUtilsTest();
        this.addChild(utilsTest);

        egret.callLater(function(){
            let noticeView = new NoticeView();
            ModalViewManager.instance.addView(noticeView);
        }, this);
        
     //   let dbPauseTest = new DBPauseTest();
    //    this.addChild(dbPauseTest);

        var str = '(function(_super){ function TestTest(){_super.call(this);} return TestTest;})(eui.Skin)';
        __global__['TestTest'] = eval(str);
        
        console.log('TestTest ==  nil', window.hasOwnProperty('TestTest'));

        RES.getResByUrl('https://www.baidu.com/img/bd_logo1.png?where=super', function(){
            console.log("load baidu logo compelete");
        },this,RES.ResourceItem.TYPE_IMAGE);

        var url = "resource/test";
        console.log("indexof data:",url.indexOf("data:"),egret.web['Html5Capatibility']._canUseBlob);

        RES.getResAsync("commonGroup_json", function(res:any, key:any){
            if(res)
            {
                if(egret.is(res, 'egret.SpriteSheet'))
                {
                    let spriteSheet = res as egret.SpriteSheet;
                    if(spriteSheet.hasOwnProperty('_bitmapX'))
                    {
                        let bitmapX = spriteSheet['_bitmapX'];
                    }

                    if(spriteSheet.hasOwnProperty('_bitmapY'))
                    {
                        let bitmapY = spriteSheet['_bitmapY'];
                    }
                    let sprite_texture = spriteSheet.$texture;
                    let texture_bitmapX = sprite_texture['_bitmapX'];
                    let texture_bitmapY = sprite_texture['_bitmapY'];

                     let texture_offsetX = sprite_texture['_offsetX'];
                    let texture_offsetY = sprite_texture['_offsetY'];
                }
            }
        }, this);

        var texture = RES.getRes('role_bg_up_png');
        var bitmap = new egret.Bitmap(texture);

        this.addChild(bitmap);


        var texture2 = RES.getRes('checkbox_select_disabled_png');
        var bitmap2 = new egret.Bitmap(texture2);

        this.addChild(bitmap2);
        bitmap2.x = this.stage.stageWidth / 2;

        let topMask = new egret.Shape();
        topMask.graphics.beginFill(0xff0000, 0.5);
        topMask.graphics.drawRect(0, 0, 50, 50);
        topMask.graphics.endFill();
        this.addChild(topMask);

    };


    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event: RES.ResourceEvent): void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            // this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateScene(): void {
        let sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        let topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);

        let icon: egret.Bitmap = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;

        let line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);


        let colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);

        let textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;

        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description_json", this.startAnimation, this);

        let button = new eui.Button();
        button.label = "Click!";
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);

        
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }

    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        let panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    }


    
}
