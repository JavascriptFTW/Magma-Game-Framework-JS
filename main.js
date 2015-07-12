var MAGMAGAME = (function() {

	var dat = {
		pub:{

		},
		priv:{
			loopIndex: {},
			loops: [],
			refreshInterval: 17,
			date:new Date(),
			now: (new Date()).now(),
		},
	}

	function Loop(id, cfg) {
		this.loopID = id;
		this.dcallback = cfg.callback;
		this.dinterval = cfg.interval;
		this.lastRun = -Infinity;
		this.active = true;

		dat.pub.loops.push(this);
	};

	Loop.prototype = {
		run: function() {
			if (dat.priv.now - this.lastRun > this.dinterval && this.active) {
				this.lastRun = dat.priv.date.now();
				this.dcallback.call();
			}
		},
	};

	dat.pub.loop = function(id) {
		if (dat.priv.loopIndex[id] !== undefined) {
			return dat.priv.loops[dat.priv.loopIndex[id]];
		}
		var ret = {};

		ret.create = function(cfg) {
			dat.priv.loopIndex[id] = dat.priv.loops.length;
			return new Loop(id, cfg);
		};

		return ret;
	};

	function update() {
		dat.priv.now = dat.priv.date.now();
		for (var i = 0; i < dat.priv.loops.length; i ++) {
			loops[i].run();
		}
		setTimeout(update, dat.priv.refreshInterval);
	};

	update();

	return dat.pub;

})();