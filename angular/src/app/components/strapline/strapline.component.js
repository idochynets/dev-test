'use strict';

class Strapline {
	constructor($interval){
		this.$inreval = $interval;
		this.nextInetrval = 1000;
		this.nextIndex = 0;
		this.tagLines = [
			"Our average time from pickup to drop-off",
    		"Quicker than your commute",
			"Slow and steady wins the race - not someone from Repairly",
			"Recently compared to the Hadron Collider",
			"Repairly representative spotted in Bugatti Veyron, Feb 2016",
			"Usain Bolt, team leader at Repairly",
			"So fast it'll blow your socks off"];

		this.startInterval();
	}

	startInterval(){
		this.$inreval(() => {
			this.next();
		}, this.nextInetrval)
	}

	next() {
		this.line = this.tagLines[this.nextIndex % this.tagLines.length];
		this.nextIndex++;
	}
}

Strapline.$inject = ['$interval'];

export const strapline = {
  controller: Strapline,
  templateUrl: require('ngtemplate!./strapline.html')
}
