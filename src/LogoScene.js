var LogoLayer = cc.Layer.extend({
    ctor:function () {
        var logo, musicSetting, size;

        this._super();

        size = cc.director.getWinSize();

        musicSetting = cc.sys.localStorage.getItem('artshow_music');

        if(musicSetting != 0) {
            cc.audioEngine.setMusicVolume(0.5);
            cc.audioEngine.playMusic("res/back.ogg", true);
        }

        logo = new cc.Sprite("res/artshowlogo.png");
        logo.setPosition(size.width / 2, size.height / 2);
        logo.setScale(0.7);
        logo.setOpacity(0);
        this.addChild(logo);

        logo.runAction( new cc.Sequence( new cc.FadeIn(1), new cc.DelayTime(1), new cc.FadeOut(1), new cc.CallFunc( function() {
            var scene = new PeopleScene();
            cc.director.runScene(scene);
        }, this) ) );

        // Android only
        /*
        if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
            cc.eventManager.addListener(cc.EventListener.create({
                event: cc.EventListener.KEYBOARD,
                onKeyReleased: function(keyCode, event){
                    if (keyCode == cc.KEY.back) {
                        cc.director.end();
                    }
                }
            }), this);
        }
        */

        return true;
    }
});

var LogoScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new LogoLayer();
        this.addChild(layer);
    }
});