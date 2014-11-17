var Art = cc.Menu.extend({
    no:null,
    src:null,
    originX:null,
    originY:null,
    ctor:function(no, src, parent) {
        var check, i, menuItem, size;

        size = cc.director.getWinSize();

        this.no = no;
        this.src = src;

        menuItem = new cc.MenuItemImage(this.src, this.src, function(sender) {
            var image;

            if(parent.isShow == true) {
                return;
            }

            parent.isShow = true;

            image = new cc.MenuItemImage(sender.parent.src, sender.parent.src, function(obj) {
                obj.stopAllActions();
                obj.runAction(new cc.Sequence( new cc.Spawn( new cc.FadeOut(1.5), new cc.ScaleTo(1.5, 0.3) ), new cc.CallFunc(function(target) {
                    target.parent.parent.isShow = false;
                    target.parent.removeFromParent();
                }, obj) ));
            }, sender);

            parent.image = new cc.Menu(image);
            parent.image.setPosition(sender.parent.originX, sender.parent.originY);
            //parent.image.opacity = 15;
            parent.image.scale = 0.3;
            parent.addChild(parent.image);

            parent.image.runAction(new cc.Spawn( new cc.FadeIn(1.5), new cc.ScaleTo(1.5, 1), new cc.MoveTo(1.5, cc.p(size.width / 2, size.height / 2)) ));
        }, this);

        cc.Menu.prototype.ctor.call(this, menuItem);
        this.opacity = 0;
        this.x = size.width / 2;
        this.y = size.height / 2;
        parent.addChild(this);

        this.originX = ( Math.random() * size.width * 0.75 ) + (size.width * 0.2) - (this.width / 2);
        this.originY = ( Math.random() * size.height * 0.75 ) + (size.height * 0.2) - (this.height / 2);

        do {
            check = false;

            for(i = 0;i < parent.arts.length;i++) {
                if(i != this.no) {
                    var rectA = cc.rect(this.originX, this.originY, this.getContentSize().width * 0.12, this.getContentSize().height * 0.12);
                    var rectB = cc.rect(parent.arts[i].originX, parent.arts[i].originY, parent.arts[i].width * 0.12, parent.arts[i].height * 0.12);

                    if(!((rectA.x + rectA.width < rectB.x) || (rectB.x + rectB.width < rectA.x) || (rectA.y + rectA.height < rectB.y) || (rectB.y + rectB.height < rectA.y))) {
                        this.originX = ( Math.random() * size.width * 0.75 ) + (size.width * 0.2) - (this.width / 2);
                        this.originY = ( Math.random() * size.height * 0.75 ) + (size.height * 0.2) - (this.height / 2);
                        check = true;
                    }
                }
            }
        } while(check == true)

        this.runAction(new cc.Sequence( new cc.DelayTime(3 + no * 4), new cc.FadeIn(1), new cc.DelayTime(1), new cc.Spawn( new cc.MoveTo(1.5, cc.p(this.originX, this.originY)), new cc.FadeTo(1.5, 100), new cc.ScaleTo(1.5, 0.3) ) ));
    },
    runFast: function() {
        this.stopAllActions();
        this.runAction(new cc.Spawn( new cc.MoveTo(0.5, cc.p(this.originX, this.originY)), new cc.FadeTo(0.5, 100), new cc.ScaleTo(0.5, 0.3) ) );
    }
});