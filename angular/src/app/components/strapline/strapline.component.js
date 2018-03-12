'use strict';

class Strapline {
    constructor($timeout) {
        this.$timeout = $timeout;
        this.line = `Our average time from pickup to drop-off`;
        this.init();
    }

    init() {
        this.codeletters = "&#*+%?£@§$";
        this.lineInxex = 0;
        this.current_length = 0;
        this.fadeBuffer = false;
        this.tagLines = [
                "Our average time from pickup to drop-off",
                "Quicker than your commute",
                "Slow and steady wins the race - not someone from Repairly",
                "Recently compared to the Hadron Collider",
                "Repairly representative spotted in Bugatti Veyron, Feb 2016",
                "Usain Bolt, team leader at Repairly",
                "So fast it'll blow your socks off"];
        this.$timeout(this.animateIn.bind(this), 100);
    };

    generateRandomString(length) {
        let random_text = '';
        while (random_text.length < length) {
            random_text += this.codeletters.charAt(Math.floor(Math.random() * this.codeletters.length));
        }
        return random_text;
    };

    animateIn() {
        if (this.current_length < this.tagLines[this.lineInxex].length) {
            this.current_length = this.current_length + 2;
            if (this.current_length > this.tagLines[this.lineInxex].length) {
                this.current_length = this.tagLines[this.lineInxex].length;
            }
            this.line = this.generateRandomString(this.current_length);
            this.$timeout(this.animateIn.bind(this), 20);
        } else {
            this.$timeout(this.animateFadeBuffer.bind(this), 20);
        }
    };

    animateFadeBuffer() {
        if (this.fadeBuffer === false) {
            this.fadeBuffer = [];
            for (let i = 0; i < this.tagLines[this.lineInxex].length; i++) {
                this.fadeBuffer.push({
                    c: (Math.floor(Math.random() * 12)) + 1,
                    l: this.tagLines[this.lineInxex].charAt(i)
                });
            }
        }

        let do_cycles = false;
        let line = '';

        for (let i = 0; i < this.fadeBuffer.length; i++) {
            let fader = this.fadeBuffer[i];
            if (fader.c > 0) {
                do_cycles = true;
                fader.c--;
                line += this.codeletters.charAt(Math.floor(Math.random() * this.codeletters.length));
            } else {
                line += fader.l;
            }
        }
        this.line = line;

        if (do_cycles) {
            this.$timeout(this.animateFadeBuffer.bind(this), 50);
        } else {
            this.$timeout(this.cycleText.bind(this), 2000);
        }
    };

    cycleText() {
        this.lineInxex = this.lineInxex + 1;
        if (this.lineInxex >= this.tagLines.length) {
            this.lineInxex = 0;
        }

        this.current_length = 0;
        this.fadeBuffer = false;
        this.line = "";

        this.$timeout(this.animateIn.bind(this), 200);
    };
}

Strapline.$inject = ['$timeout'];

export const strapline = {
  controller: Strapline,
  templateUrl: require('ngtemplate!./strapline.html')
};
