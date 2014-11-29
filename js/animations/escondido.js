function RotateElement(animation, pathStrings, gender, figure, rotateAngle) {
	RotateElement.superclass.constructor.apply(this, arguments);

	this.rotateAngle = rotateAngle;

	this.animationFunction = function(lengthMs, times) {
		this.animation.startPosFigure(this.figure, this.animation.startPos[this.position]);
		this.animation.animateFigureTime(this.figure, lengthMs, times * 6);
	}

	this.startAnimation = function(lengthS, times, startAngle, direction, delay, startPart, stopPart) {
		startPart = (typeof startPart === 'undefined') ? 0 : startPart;
		stopPart = (typeof stopPart === 'undefined') ? 1 : stopPart;
		var self = this;
		function startAnimationFunc() {
			var angle = startAngle;
			var startLen = self.pathLength * startPart;
			var stopLen = self.pathLength * stopPart;
			var angleSpeed = rotateAngle / (stopLen - startLen);

			function transformAtLength(length) {
				movePoint = self.path.getPointAtLength(length);
				self.animation.positionFigure(self.figure, movePoint.x, movePoint.y, angle - angleSpeed * (length - startLen));
			}

			transformAtLength(startLen);
			self.figure.attr({opacity: 1});

			self.animation.animations[self.animation.animations.length] = Snap.animate(startLen, stopLen, 
				function(value) {
					this.lastValue = value;
					transformAtLength(value);
				}, lengthS * 1000, mina.linear);

			self.animation.animateFigureTime(self.figure, lengthS * 1000, times);		
		}

		if ((!delay) || (delay <= 0)) {
			startAnimationFunc();		
		} else {
			this.animation.timeouts[this.animation.timeouts.length] = new Timer(startAnimationFunc, delay * 1000);
		}
	};
}
extend(RotateElement, SingleDanceAnimationElement);

function RotateDanceAnimationElement(animation, pathStrings, rotateAngle) {
	RotateDanceAnimationElement.superclass.constructor.apply(this, arguments);
	this.manDanceAnimationElement = new RotateElement(animation, pathStrings, "man", undefined, rotateAngle);
	this.womanDanceAnimationElement = new RotateElement(animation, pathStrings, "woman", undefined, rotateAngle);

	this.startAnimation = function(lengthS, times, startAngleMan, startAngleWoman, direction, delay, startPart, stopPart) {
		this.manDanceAnimationElement.startAnimation(lengthS, times, startAngleMan, direction, delay, startPart, stopPart);
		this.womanDanceAnimationElement.startAnimation(lengthS, times, startAngleWoman, direction, delay, startPart, stopPart);
	};

	this.fullAnimation = function(lengthS, times, startAngleMan, startAngleWoman, manPosition, direction, delay, startPart, stopPart) {

		this.fullAnimationFunc = function() {
			this.animation.clearPaths();
			this.drawPath(manPosition);
			this.startAnimation(lengthS, times, startAngleMan, startAngleWoman, direction, 0, startPart, stopPart);		
		}

		if ((!delay) || (delay <= 0)) {
			this.fullAnimationFunc();
		} else {
			this.animation.timeouts[this.animation.timeouts.length] = new Timer(function(self) {
				return function() {					
					self.fullAnimationFunc();
				};
			}(this), delay * 1000);
		}
	};
}
extend(RotateDanceAnimationElement, DanceAnimationElement);

function EscondidoAnimation(id) {
	EscondidoAnimation.superclass.constructor.apply(this, arguments);

	this.width = 440;
	this.height = 440;
	this.startPos = {
		left: {x: 50, y: 390, angle: 225},
		top: {x: 50, y: 50, angle: 315},
		right: {x: 390, y: 50, angle: 45},
		bottom: {x: 390, y: 390, angle: 135}
	};

	this.giroElement = new DanceAnimationElement(this, 
		{left: "m 50,390 c 20,20 70,10 70,-30 0,-20 -20,-40 -40,-40 -40,0 -50,50 -30,70",
		right: "m 390,50 c -20,-20 -70,-10 -70,30 0,20 20,40 40,40 40,0 50,-50 30,-70"});

	this.vueltaElement = new VueltaElement(this,
		"m 50,390 c 30,30 160,0 250,-90 C 390,210 420,80 390,50 360,20 230,50 140,140 50,230 20,360 50,390 z");

	this.zapateoElement = new ZapateoElement(this);

	this.zarandeoElement = new ZarandeoElement(this,
		{left: "m 50,390 130,0 0,-130 -130,0 z",
		top: "m 50,50 0,130 130,0 0,-130 z",
		right: "m 390,50 -130,0 0,130 130,0 z",
		bottom: "m 390,390 0,-130 -130,0 0,130 z"});

	this.mediaVueltaElement = new DanceAnimationElement(this, 
		{left: "m 50,390 c 30,30 160,0 250,-90 90,-90 120,-220 90,-250",
		right: "M 390,50 C 360,20 230,50 140,140 50,230 20,360 50,390"});

	this.coronacionElement = new DanceAnimationElement(this, 
		{left: "m 50,390 c 30,20 110,-20 150,-60 40,-40 20,-110 -20,-110 -20,0 -40,10 -40,40 0,25 20,40 40,40 40,0 60,-30 50,-60",
		right: "m 390,50 c -30,-20 -110,20 -150,60 -40,40 -20,110 20,110 20,0 40,-10 40,-40 0,-25 -20,-40 -40,-40 -40,0 -60,30 -50,60"});

	this.esquinaElement = new RotateDanceAnimationElement(this,
		{left: "M 50,390 50,50",
		top: "m 50,50 340,0",
		right: "m 390,50 0,340",
		bottom: "M 390,390 50,390"}, 270);
	this.balanceo1Element = new DanceAnimationElement(this,
		{left: "M 50,50 70,30 50,50",
		top: "M 390,50 410,70 390,50",
		right: "m 390,390 -20,20 20,-20",
		bottom: "M 50,390 30,370 50,390"});
	this.balanceo2Element = new DanceAnimationElement(this,
		{left: "M 50,50 30,70 50,50",
		top: "M 390,50 370,30 390,50",
		right: "m 390,390 20,-20 -20,20",
		bottom: "M 50,390 70,410 50,390"});

	this.esquina = function(seconds, manPosition, times) {
		this.clearPaths();
		var partSeconds = seconds / 4;
		var firstPartSeconds = partSeconds * 2;
		var partTimes = times / 4;
		var manAngle = this.startPos[manPosition].angle;
		var womanAngle = this.startPos[getOppositePosition(manPosition)].angle;
		this.esquinaElement.drawPath(manPosition);
		this.balanceo1Element.drawPath(manPosition, true);
		this.balanceo2Element.drawPath(manPosition, true);

		this.balanceo1Element.setAngles(manAngle, womanAngle);
		this.balanceo2Element.setAngles(manAngle, womanAngle);
		this.balanceo1Element.easing = mina.easeout;
		this.balanceo2Element.easing = mina.easeout;

		this.esquinaElement.startAnimation(firstPartSeconds, partTimes * 2, manAngle, womanAngle);
		this.balanceo1Element.startAnimation(partSeconds, partTimes, this.DIRECTION_STRAIGHT_FORWARD, firstPartSeconds, 0, 1);
		this.balanceo2Element.startAnimation(partSeconds, partTimes, this.DIRECTION_STRAIGHT_FORWARD, firstPartSeconds + partSeconds, 0, 1);
	};

	this.vueltaGiro = function(seconds, manPosition, times) {		
		var firstPart = 6 / times;
		var secondPart = 2 / times;

		this.vueltaElement.fullAnimation(seconds * firstPart, times * firstPart, manPosition);
		this.giroElement.fullAnimation(seconds * secondPart, times * secondPart, manPosition, this.DIRECTION_FORWARD, seconds * firstPart);
	};

	this.zapateo = function(seconds, manPosition, times) {
		this.setAtStart(manPosition);
		this.zapateoElement.fullAnimation(seconds, times, manPosition);
	};

	this.zarandeo = function(seconds, manPosition, times) {
		this.setAtStart(manPosition);		
		this.clearPaths();
		this.zarandeoElement.drawPath(getOppositePosition(manPosition));
		if (times >= 8) {
			var partSeconds = seconds / 4;
			var partTimes = times / 4;
		} else {
			var partSeconds = seconds / 2;
			var partTimes = times / 2;			
		}
		this.zarandeoElement.startAnimation(partSeconds, partTimes, this.DIRECTION_FORWARD, 0, 0, 0.5);
		this.zarandeoElement.startAnimation(partSeconds, partTimes, this.DIRECTION_BACKWARD, partSeconds, 0.5, 1);
		if (times >= 8) {
			this.zarandeoElement.startAnimation(partSeconds, partTimes, this.DIRECTION_FORWARD, partSeconds * 2, 0, 0.5);
			this.zarandeoElement.startAnimation(partSeconds, partTimes, this.DIRECTION_BACKWARD, partSeconds * 3, 0.5, 1);
		}
	};

	this.mediaVuelta = function(seconds, manPosition, times) {
		this.mediaVueltaElement.fullAnimation(seconds, times, manPosition);
	};

	this.coronacion = function(seconds, manPosition, times) {
		this.coronacionElement.fullAnimation(seconds, times, manPosition);
	};
};
extend(EscondidoAnimation, DanceAnimation);