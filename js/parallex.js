/**
 * demo1.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
{
	// Helper vars and functions.
	const extend = function(a, b) {
		for( let key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	};

	// https://stackoverflow.com/a/4819886
	function is_touch_device() {
	  return 'ontouchstart' in window || navigator.maxTouchPoints;
	};

	// from http://www.quirksmode.org/js/events_properties.html#position
	const getMousePos = function(ev) {
		let posx = 0;
		let posy = 0;
		if (!ev) ev = window.event;
		if (ev.pageX || ev.pageY) 	{
			posx = ev.pageX;
			posy = ev.pageY;
		}
		else if (ev.clientX || ev.clientY) 	{
			posx = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = ev.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		return { x : posx, y : posy };
	};

	const TiltObj = function(el, options) {
		this.el = el;
		this.options = extend({}, this.options);
		extend(this.options, options);
		this.DOM = {};
		this.DOM.img = this.el.querySelector('.parallex_img');
		this.DOM.title = this.el.querySelector('.parallex_title');
		this.DOM.desc = this.el.querySelector('.parallex_desc');
		

		if (is_touch_device()) {
			window.addEventListener("scroll", () => {
				requestAnimationFrame(() => {
					const percentScroll = window.pageYOffset/screen.height;
					this._layout(-percentScroll*1 + 0.5, -percentScroll*1 + 0.5);
				});
			});
		} else {
			this._initEvents();
		}
	};

	TiltObj.prototype.options = {
		movement: {
			img : { translation : {x: -15, y: -15} },
			title : { translation : {x: 20, y: -10} },
			desc : { translation : {x: 15, y: -15} },
		}
	};

	TiltObj.prototype._initEvents = function() {
		this.mouseenterFn = (ev) => {
			anime.remove(this.DOM.img);
			anime.remove(this.DOM.title);
			anime.remove(this.DOM.desc);
		};
		this.mousemoveFn = (ev) => {
			// Mouse position relative to the document.
			const mousepos = getMousePos(ev);
			// Document scrolls.
			const docScrolls = { left : document.body.scrollLeft + document.documentElement.scrollLeft, 
				                  top : document.body.scrollTop + document.documentElement.scrollTop };
			const bounds = this.el.getBoundingClientRect();
			// Mouse position relative to the main element (this.DOM.el).
			const relmousepos = { x : mousepos.x - bounds.left - docScrolls.left, y : mousepos.y - bounds.top - docScrolls.top };
			// Relative percentage
			const percentX = relmousepos.x/bounds.width;
			const percentY = relmousepos.y/bounds.height;
			requestAnimationFrame(() => this._layout(percentX, percentY));
		};
		this.mouseleaveFn = (ev) => {
			requestAnimationFrame(() => {
				this._animate([this.DOM.img, this.DOM.title, this.DOM.desc], 0, 0, 1500);
			});
		};
		this.el.addEventListener('mousemove', this.mousemoveFn)
		this.el.addEventListener('mouseenter', this.mouseenterFn);
		this.el.addEventListener('mouseleave', this.mouseleaveFn);
	};

	TiltObj.prototype._animate = function(target, x, y, duration) {
		return anime({
			targets: target,
			duration: duration,
			easing: 'easeOutElastic',
			elasticity: 400,
			translateX: x,
			translateY: y,
		});
	}

	TiltObj.prototype._layout = function(percentX, percentY) {
		// Movement settings for the animatable elements.
		const t = {
			img: this.options.movement.img.translation,
			title: this.options.movement.title.translation,
			desc: this.options.movement.desc.translation,
		};
			
		const transforms = {
			img : {
				x: (-2*percentX + 1) * t.img.x,
				y: (-2*percentY + 1) * t.img.y,
				//x: (-1*t.img.x - t.img.x) * percentX + t.img.x,
				//y: (-1*t.img.y - t.img.y) * percentY + t.img.y
			},
			title : {
				x: (-2*percentX +1) * t.title.x,
				y: (-2*percentY +1) * t.title.y,
				//x: (-1*t.title.x - t.title.x) * percentX + t.title.x,
				//y: (-1*t.title.y - t.title.y) * percentY + t.title.y
			},
			desc : {
				x: (-2*percentX + 1) * t.desc.x,
				y: (-2*percentY + 1) * t.desc.y,
				//x: (-1*t.desc.x - t.desc.x) * percentX + t.desc.x,
				//y: (-1*t.desc.y - t.desc.y) * percentY + t.desc.y
			}
		};

		//console.log('percentX: ' + percentX);
		//console.log('percentY: ' + percentY);

		this.DOM.img.style.WebkitTransform = this.DOM.img.style.transform =
			'translateX(' + transforms.img.x + 'px) translateY(' + transforms.img.y + 'px)';

		this.DOM.title.style.WebkitTransform = this.DOM.title.style.transform =
			'translateX(' + transforms.title.x + 'px) translateY(' + transforms.title.y + 'px)';

		this.DOM.desc.style.WebkitTransform = this.DOM.desc.style.transform =
			'translateX(' + transforms.desc.x + 'px) translateY(' + transforms.desc.y + 'px)';
	};

	function document_ready(fn) {
		if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
			fn();
		} else {
			document.addEventListener('DOMContentLoaded', fn);
		}
	}
	document_ready(function(){
		Array.from(document.querySelectorAll('.parallex_layout'))
		     .forEach(el => new TiltObj(el));
	});	
};