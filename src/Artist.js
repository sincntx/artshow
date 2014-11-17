var Artist = cc.Menu.extend({
    menu:null,
    no:null,
    id:null,
    name:null,
    contents:null,
    position:null,
    ctor:function(no, id, name, contents, src, parent) {
        var menuItem, size, x, y;

        size = cc.director.getWinSize();

        if(no < 4) {
            x = ( no + 1) * (size.width / 5);
            y = 2 * (size.height / 3);
        }
        else {
            x = ( no - 3 ) * (size.width / 5);
            y = 1 * (size.height / 3);
        }

        this.no = no;
        this.id = id;
        this.name = name;
        this.contents = contents;
        this.src = src;
        this.position = cc.p(x, y);

        menuItem = new cc.MenuItemImage(src, src, function (sender) {
            if(this.parent.isShow == true) {
                return;
            }

            sender.runAction(new cc.Sequence(new cc.ScaleTo(1.2, 1.5), new cc.ScaleTo(1.2, 1)));
                this.parent.showInfo(this);
            }, this);

        cc.Menu.prototype.ctor.call(this, menuItem);

        this.setAnchorPoint(cc.p(0, 0));
        this.opacity = 0;
        this.scale = 3;
        this.x = size.width / 2;
        this.y = size.height / 2;
        parent.addChild(this);

        this.runAction( new cc.Sequence( new cc.DelayTime(1 + no * 0.5), new cc.Spawn(new cc.MoveTo(1.5, this.position), new cc.FadeIn(1.5), new cc.ScaleTo(1.5, 1) ), new cc.FadeTo(1, 100) ) );
    },
    runFast:function() {
        this.stopAllActions();
        this.runAction( new cc.Sequence( new cc.Spawn( new cc.MoveTo(0.5, this.position), new cc.FadeIn(0.5), new cc.ScaleTo(0.5, 1) ), new cc.FadeTo(0.5, 100) ) );
    }
});