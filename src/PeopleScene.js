var PeopleLayer = cc.Layer.extend({
    musicSetting : null,
    musicMenu : null,
    isShow: true,
    artist : null,
    ctor:function () {
        var i, size, skipItem, skipMenu, musicItem;
        var ArtistInfo = {
            "davinci" : {
                "name" : "Leonardo da Vinci",
                "desc" : 'Leonardo di ser Piero da Vinci(15 April 1452 – 2 May 1519) was an Italian polymath, painter, sculptor, architect, musician, mathematician, engineer, inventor, anatomist, geologist, cartographer, botanist, and writer. He is widely considered to be one of the greatest painters of all time and perhaps the most diversely talented person ever to have lived.',
                "src" : "res/artist/davinci.png"
            },
            "turner" : {
                "name" : "Joseph Mallord William Turner",
                "desc" : "Joseph Mallord William Turner(baptised 14 May 1775 – 19 December 1851) was an English Romantic landscape painter, water-colourist, and printmaker. Turner was considered a controversial figure in his day, but is now regarded as the artist who elevated landscape painting to an eminence rivalling history painting.",
                "src" : "res/artist/turner.png"
            },
            "gogh" : {
                "name" : "Vincent Willem van Gogh",
                "desc" : "Vincent Willem van Gogh(30 March 1853 – 29 July 1890) was a Post-Impressionist painter of Dutch origin whose work—notable for its rough beauty, emotional honesty, and bold color—had a far-reaching influence on 20th-century art.",
                "src" : "res/artist/gogh.png"
            },
            "klimt" : {
                "name": "Gustav Klimt",
                "desc": "Gustav Klimt(July 14, 1862 – February 6, 1918) was an Austrian symbolist painter and one of the most prominent members of the Vienna Secession movement. Klimt is noted for his paintings, murals, sketches, and other objets d'art.",
                "src": "res/artist/klimt.png"
            },
            "manet" : {
                "name" : "Édouard Manet",
                "desc" : "Édouard Manet(23 January 1832 – 30 April 1883) was a French painter. He was one of the first 19th-century artists to paint modern life, and a pivotal figure in the transition from Realism to Impressionism.",
                "src" : "res/artist/manet.png"
            },
            "millet" : {
                "name" : "Jean-François Millet",
                "desc" : "Jean-François Millet(October 4, 1814 – January 20, 1875) was a French painter and one of the founders of the Barbizon school in rural France. Millet is noted for his scenes of peasant farmers; he can be categorized as part of the Realism art movement.",
                "src" : "res/artist/millet.png"
            },
            "rembrandt" : {
                "name" : "Rembrandt Harmenszoon van Rijn",
                "desc" : "Rembrandt Harmenszoon van Rijn(15 July 1606[1] – 4 October 1669) was a Dutch painter and etcher. He is generally considered one of the greatest painters and printmakers in European art and the most important in Dutch history.",
                "src" : "res/artist/rembrandt.png"
            },
            "rubens" : {
                "name" : "Peter Paul Rubens",
                "desc" : "Sir Peter Paul Rubens(28 June 1577 – 30 May 1640), was a Flemish Baroque painter, and a proponent of an extravagant Baroque style that emphasised movement, colour, and sensuality. He is well known for his Counter-Reformation altarpieces, portraits, landscapes, and history paintings of mythological and allegorical subjects.",
                "src" : "res/artist/rubens.png"
            }
        };

        this._super();

        this.artist = [];

        size = cc.director.getWinSize();

        skipItem = new cc.MenuItemImage("res/skip.png", "res/skip.png", function (obj) {
            var i, length;

            length = this.artist.length;

            for(i = 0;i < length;i++) {
                this.artist[i].runFast();
            }

            this.isShow = false;
            obj.removeFromParent();
        }, this);

        skipItem.setScale(0.6);
        skipMenu = new cc.Menu(skipItem);
        skipMenu.setPosition( size.width * ( 9 / 10 ) - (size.width / 10) , size.height * ( 9 / 10 ) );
        this.addChild(skipMenu);

        skipMenu.setOpacity(0);
        skipMenu.runAction( new cc.Sequence( new cc.DelayTime(1.5), new cc.FadeIn(1.5), new cc.DelayTime(2), new cc.FadeOut(1), new cc.CallFunc( function(obj) {
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
        this.musicMenu.setPosition( size.width * ( 9 / 10 ) , size.height * ( 9 / 10 ) );
        this.addChild(this.musicMenu);

        this.musicMenu.setOpacity(0);
        this.musicMenu.runAction( new cc.Sequence(new cc.DelayTime(1.5), new cc.FadeIn(1.5) ) );

        for(i in ArtistInfo) {
            this.artist.push(new Artist(this.artist.length, i, ArtistInfo[i].name, ArtistInfo[i].desc, ArtistInfo[i].src, this));
        }

        // Android Only
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
    },
    showInfo:function(artist) {
        var size, layer, mainImage, mainMenuItem, nameLabel, contentLabel, click, animation;

        this.isShow = true;

        size = cc.director.getWinSize();

        layer = new cc.Layer();
        layer.setPosition(0, 0);

        mainMenuItem = new cc.MenuItemImage(artist.src, artist.src, function () {
                var scene;
                cc.sys.localStorage.setItem("artshow_artist", artist.id);
                scene = new ArtScene();
                cc.director.runScene(new cc.TransitionShrinkGrow(1, scene));
            }, this);

        mainImage = new cc.Menu(mainMenuItem);
        layer.addChild(mainImage);
        mainImage.runAction(new cc.FadeIn(1));
        mainImage.setPosition(size.width / 4, size.height / 2);

        click = new cc.Sprite("res/click1.png");
        click.setScale(0.8);
        click.setPosition(size.width / 5.5, size.height / 2.8);
        layer.addChild(click);
        animation = new cc.Animation();
        animation.addSpriteFrameWithFile("res/click1.png");
        animation.addSpriteFrameWithFile("res/click2.png");
        animation.setDelayPerUnit(1 / 3);
        click.runAction( cc.animate(animation).repeatForever() );

        nameLabel = new cc.LabelTTF(artist.name, "Tahoma", 20);
        nameLabel.setPosition(size.width / 4, size.height / 4);
        nameLabel.runAction(new cc.FadeIn(1));
        layer.addChild(nameLabel);

        contentLabel = new cc.LabelTTF(artist.contents, "Tahoma", 16, cc.size(size.width / 2, size.height / 3), cc.TEXT_ALIGNMENT_LEFT);
        contentLabel.setAnchorPoint(0, 0.5);
        contentLabel.setPosition(size.width / 2.5, size.height / 2);
        contentLabel.runAction(new cc.FadeIn(1));
        layer.addChild(contentLabel);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function() {
                layer.runAction(new cc.Sequence( new cc.ScaleTo(1, 0.1), new cc.CallFunc(function(sender) {
                    sender.parent.isShow = false;
                    sender.removeFromParent();
                }, layer) ) );

                return false;
            }
        }, layer);

        this.addChild(layer);
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
        this.musicMenu.setPosition( size.width * ( 9 / 10 ) , size.height * ( 9 / 10 ) );
        this.addChild(this.musicMenu);
    }
});

var PeopleScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PeopleLayer();
        this.addChild(layer);
    }
});