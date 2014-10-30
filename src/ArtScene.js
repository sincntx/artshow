var ArtLayer = cc.Layer.extend({
    musicSetting : null,
    musicMenu : null,
    isShow: true,
    arts: null,
    image:null,
    ctor:function () {
        var artist, i, count, size, skipItem, skipMenu, musicItem, closeItem, closeMenu;

        this._super();

        size = cc.director.getWinSize();

        this.arts = [];

        artist = cc.sys.localStorage.getItem("artshow_artist");

        for(i = 0;i < res.length;i++) {
            if(res[i].artist == artist) {
                this.arts.push(new Art(this.arts.length, res[i].src, this));
            }
        }

        closeItem = new cc.MenuItemImage("res/prev.png", "res/prev.png", function () {
            scene = new PeopleScene();
            cc.director.runScene(new cc.TransitionShrinkGrow(1, scene));
        }, this);
        closeItem.setScale(0.5);

        closeMenu = new cc.Menu(closeItem);
        closeMenu.setPosition( size.width * ( 9 / 10 ) , size.height * ( 9 / 10 ) );
        this.addChild(closeMenu);
        closeMenu.setOpacity(0);
        closeMenu.runAction( new cc.Sequence(new cc.DelayTime(1.5), new cc.FadeIn(1.5) ) );

        skipItem = new cc.MenuItemImage("res/skip.png", "res/skip.png", function (obj) {
            for(i = 0;i < this.arts.length;i++) {
                this.arts[i].runFast();
            }

            this.isShow = false;
            obj.parent.removeFromParent();
        }, this);

        skipItem.setScale(0.6);
        skipMenu = new cc.Menu(skipItem);
        skipMenu.setPosition( size.width * ( 9 / 10 ) - (size.width / 5) , size.height * ( 9 / 10 ) );
        this.addChild(skipMenu);

        skipMenu.setOpacity(0);
        skipMenu.runAction( new cc.Sequence( new cc.DelayTime(1.5), new cc.FadeIn(1.5), new cc.DelayTime(artist.length * 7.5), new cc.FadeOut(1), new cc.CallFunc( function(obj) {
            this.isShow = false;
            obj.removeFromParent();
        }, this ) ) );

        this.musicSetting = cc.sys.localStorage.getItem('artshow_music');

        if(this.musicSetting != 0) {
            musicItem = cc.MenuItemImage.create("res/sound.png", "res/sound.png", function () {
                this.musicSetting = 0;
                cc.sys.localStorage.setItem('artshow_music', 0);
                cc.audioEngine.stopMusic();
                this.musicClick();
            }, this);
        }
        else {
            musicItem = cc.MenuItemImage.create("res/mute.png", "res/mute.png", function () {
                this.musicSetting = 1;
                cc.sys.localStorage.setItem('artshow_music', 1);
                cc.audioEngine.playMusic("res/back.ogg", true);
                this.musicClick();
            }, this);
        }

        musicItem.setScale(0.6);
        this.musicMenu = new cc.Menu(musicItem);
        this.musicMenu.setPosition( size.width * ( 9 / 10 ) - (size.width / 10) , size.height * ( 9 / 10 ) );

        this.addChild(this.musicMenu);

        this.musicMenu.setOpacity(0);
        this.musicMenu.runAction( new cc.Sequence(new cc.DelayTime(1.5), new cc.FadeIn(1.5) ) );

        // Android Only
        /*
        if (cc.sys.capabilities.hasOwnProperty('keyboard')) {
            cc.eventManager.addListener(cc.EventListener.create({
                event: cc.EventListener.KEYBOARD,
                onKeyReleased: function(keyCode, event){
                    if (keyCode == cc.KEY.back) {
                        scene = new PeopleScene();
                        cc.director.runScene(new cc.TransitionShrinkGrow(1, scene));
                    }
                }
            }), this);
        }
        */

        return true;
    },
    musicClick:function() {
        var size, musicItem;

        size = cc.director.getWinSize();

        this.musicMenu.removeFromParent();

        if(this.musicSetting != 0) {
            musicItem = cc.MenuItemImage.create("res/sound.png", "res/sound.png", function () {
                this.musicSetting = 0;
                cc.sys.localStorage.setItem('artshow_music', 0);
                cc.audioEngine.stopMusic();
                this.musicClick();
            }, this);
        }
        else {
            musicItem = cc.MenuItemImage.create("res/mute.png", "res/mute.png", function () {
                this.musicSetting = 1;
                cc.sys.localStorage.setItem('artshow_music', 1);
                cc.audioEngine.playMusic("res/back.ogg", true);
                this.musicClick();
            }, this);
        }

        musicItem.setScale(0.6);
        this.musicMenu = new cc.Menu(musicItem);
        this.musicMenu.setPosition( size.width * ( 9 / 10 ) - (size.width / 10) , size.height * ( 9 / 10 ) );
        this.addChild(this.musicMenu);
    }
});

var ArtScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new ArtLayer();
        this.addChild(layer);
    }
});