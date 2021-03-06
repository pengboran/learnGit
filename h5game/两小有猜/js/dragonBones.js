var __extends = this && this.__extends || function(t, e) {
		function i() {
			this.constructor = t
		}
		for(var a in e) e.hasOwnProperty(a) && (t[a] = e[a]);
		t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype, new i)
	},
	dragonBones;
! function(t) {
	var e = function() {
		function t() {}
		return t.hasArmature = function(e) {
			return t._armatures.indexOf(e) >= 0
		}, t.addArmature = function(e) {
			e && t._armatures.indexOf(e) < 0 && t._armatures.push(e)
		}, t.removeArmature = function(e) {
			if(e) {
				var i = t._armatures.indexOf(e);
				i >= 0 && t._armatures.splice(i, 1)
			}
		}, t.PI_D = 2 * Math.PI, t.PI_H = Math.PI / 2, t.PI_Q = Math.PI / 4, t.ANGLE_TO_RADIAN = Math.PI / 180, t.RADIAN_TO_ANGLE = 180 / Math.PI, t.SECOND_TO_MILLISECOND = 1e3, t.NO_TWEEN = 100, t.VERSION = "4.7.2", t.debug = !1, t.debugDraw = !1, t._armatures = [], t
	}();
	t.DragonBones = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function() {
		function t() {
			this.hashCode = t._hashCode++
		}
		return t._returnObject = function(e) {
			var i = String(e.constructor),
				a = null == t._maxCountMap[i] ? t._defaultMaxCount : t._maxCountMap[i],
				n = t._poolsMap[i] = t._poolsMap[i] || [];
			if(n.length < a) {
				if(!(n.indexOf(e) < 0)) throw new Error;
				n.push(e)
			}
		}, t.setMaxCount = function(e, i) {
			if((i < 0 || i != i) && (i = 0), e) {
				var a = String(e);
				t._maxCountMap[a] = i;
				var n = t._poolsMap[a];
				n && n.length > i && (n.length = i)
			} else {
				t._defaultMaxCount = i;
				for(var a in t._poolsMap)
					if(null != t._maxCountMap[a]) {
						t._maxCountMap[a] = i;
						var n = t._poolsMap[a];
						n.length > i && (n.length = i)
					}
			}
		}, t.clearPool = function(e) {
			if(void 0 === e && (e = null), e) {
				var i = t._poolsMap[String(e)];
				i && i.length && (i.length = 0)
			} else
				for(var a in t._poolsMap) {
					var i = t._poolsMap[a];
					i.length = 0
				}
		}, t.borrowObject = function(e) {
			var i = t._poolsMap[String(e)];
			if(i && i.length) return i.pop();
			var a = new e;
			return a._onClear(), a
		}, t.prototype.returnToPool = function() {
			this._onClear(), t._returnObject(this)
		}, t._hashCode = 0, t._defaultMaxCount = 5e3, t._maxCountMap = {}, t._poolsMap = {}, t
	}();
	t.BaseObject = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function(t) {
		function e() {
			t.call(this)
		}
		return __extends(e, t), e.prototype._onClear = function() {
			this._isCompleted = !1, this._currentPlayTimes = -1, this._currentTime = -1, this._timeline = null, this._isReverse = !1, this._hasAsynchronyTimeline = !1, this._frameRate = 0, this._keyFrameCount = 0, this._frameCount = 0, this._position = 0, this._duration = 0, this._animationDutation = 0, this._timeScale = 1, this._timeOffset = 0, this._currentFrame = null, this._armature = null, this._animationState = null
		}, e.prototype._onUpdateFrame = function(t) {}, e.prototype._onArriveAtFrame = function(t) {}, e.prototype._setCurrentTime = function(t) {
			var e = this,
				i = 0;
			if(1 == e._keyFrameCount && this != e._animationState._timeline) e._isCompleted = !0, i = 1;
			else if(e._hasAsynchronyTimeline) {
				var a = e._animationState.playTimes,
					n = a * e._duration;
				t *= e._timeScale, 0 != e._timeOffset && (t += e._timeOffset * e._animationDutation), a > 0 && (t >= n || t <= -n) ? (e._isCompleted = !0, i = a, t = t < 0 ? 0 : e._duration) : (e._isCompleted = !1, t < 0 ? (i = Math.floor(-t / e._duration), t = e._duration - -t % e._duration) : (i = Math.floor(t / e._duration), t %= e._duration), a > 0 && i > a && (i = a)), t += e._position
			} else e._isCompleted = e._animationState._timeline._isCompleted, i = e._animationState._timeline._currentPlayTimes;
			return e._currentPlayTimes = i, e._currentTime != t && (e._isReverse = e._currentTime > t && e._currentPlayTimes == i, e._currentTime = t, !0)
		}, e.prototype.fadeIn = function(t, e, i, a) {
			this._armature = t, this._animationState = e, this._timeline = i;
			var n = this == this._animationState._timeline;
			this._hasAsynchronyTimeline = n || this._animationState.animationData.hasAsynchronyTimeline, this._frameRate = this._armature.armatureData.frameRate, this._keyFrameCount = this._timeline.frames.length, this._frameCount = this._animationState.animationData.frameCount, this._position = this._animationState._position, this._duration = this._animationState._duration, this._animationDutation = this._animationState.animationData.duration, this._timeScale = n ? 1 : 1 / this._timeline.scale, this._timeOffset = n ? 0 : this._timeline.offset
		}, e.prototype.fadeOut = function() {}, e.prototype.update = function(t) {
			var e = this;
			if(!e._isCompleted && e._setCurrentTime(t)) {
				var i = e._keyFrameCount > 1 ? Math.floor(e._currentTime * e._frameRate) : 0,
					a = e._timeline.frames[i];
				e._currentFrame != a && (e._currentFrame = a, e._onArriveAtFrame(!0)), e._onUpdateFrame(!0)
			}
		}, e
	}(t.BaseObject);
	t.TimelineState = e;
	var i = function(e) {
		function i() {
			e.call(this)
		}
		return __extends(i, e), i._getEasingValue = function(t, e) {
			if(t <= 0) return 0;
			if(t >= 1) return 1;
			var i = 1;
			if(e > 2) return t;
			if(e > 1) i = .5 * (1 - Math.cos(t * Math.PI)), e -= 1;
			else if(e > 0) i = 1 - Math.pow(1 - t, 2);
			else if(e >= -1) e *= -1, i = Math.pow(t, 2);
			else {
				if(!(e >= -2)) return t;
				e *= -1, i = Math.acos(1 - 2 * t) / Math.PI, e -= 1
			}
			return(i - t) * e + t
		}, i._getCurveEasingValue = function(t, e) {
			if(t <= 0) return 0;
			if(t >= 1) return 1;
			for(var i = 0, a = 0, n = 0, r = e.length; n < r; n += 2)
				if(i = e[n], a = e[n + 1], i >= t) {
					if(0 == n) return a * t / i;
					var s = e[n - 2],
						o = e[n - 1];
					return o + (a - o) * (t - s) / (i - s)
				}
			return a + (1 - a) * (t - i) / (1 - i)
		}, i.prototype._onClear = function() {
			e.prototype._onClear.call(this), this._tweenProgress = 0, this._tweenEasing = t.DragonBones.NO_TWEEN, this._curve = null
		}, i.prototype._onArriveAtFrame = function(e) {
			var i = this;
			i._tweenEasing = i._currentFrame.tweenEasing, i._curve = i._currentFrame.curve, (i._keyFrameCount <= 1 || i._currentFrame.next == i._timeline.frames[0] && (i._tweenEasing != t.DragonBones.NO_TWEEN || i._curve) && i._animationState.playTimes > 0 && i._animationState.currentPlayTimes == i._animationState.playTimes - 1) && (i._tweenEasing = t.DragonBones.NO_TWEEN, i._curve = null)
		}, i.prototype._onUpdateFrame = function(e) {
			var a = this;
			a._tweenEasing != t.DragonBones.NO_TWEEN ? (a._tweenProgress = (a._currentTime - a._currentFrame.position + a._position) / a._currentFrame.duration, 0 != a._tweenEasing && (a._tweenProgress = i._getEasingValue(a._tweenProgress, a._tweenEasing))) : a._curve ? (a._tweenProgress = (a._currentTime - a._currentFrame.position + a._position) / a._currentFrame.duration, a._tweenProgress = i._getCurveEasingValue(a._tweenProgress, a._curve)) : a._tweenProgress = 0
		}, i.prototype._updateExtensionKeyFrame = function(t, e, i) {
			var a = 0;
			if(t.type == e.type)
				for(var n = 0, r = t.tweens.length; n < r; ++n) {
					var s = e.tweens[n] - t.tweens[n];
					i.tweens[n] = s, 0 != s && (a = 2)
				}
			if(0 == a) {
				i.type != t.type && (a = 1, i.type = t.type), i.tweens.length != t.tweens.length && (a = 1, i.tweens.length = t.tweens.length), i.keys.length != t.keys.length && (a = 1, i.keys.length = t.keys.length);
				for(var n = 0, r = t.keys.length; n < r; ++n) {
					var o = t.keys[n];
					i.keys[n] != o && (a = 1, i.keys[n] = o)
				}
			}
			return a
		}, i
	}(e);
	t.TweenTimelineState = i
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function(e) {
		function i() {
			e.call(this), this._animations = {}, this._animationNames = [], this._animationStates = []
		}
		return __extends(i, e), i._sortAnimationState = function(t, e) {
			return t.layer > e.layer ? 1 : -1
		}, i.toString = function() {
			return "[class dragonBones.Animation]"
		}, i.prototype._onClear = function() {
			for(var t in this._animations) delete this._animations[t];
			for(var t = 0, e = this._animationStates.length; t < e; ++t) this._animationStates[t].returnToPool();
			this.timeScale = 1, this._animationStateDirty = !1, this._timelineStateDirty = !1, this._armature = null, this._isPlaying = !1, this._time = 0, this._lastAnimationState = null, this._animationNames.length = 0, this._animationStates.length = 0
		}, i.prototype._fadeOut = function(t, e, i, a, n) {
			var r = 0,
				s = this._animationStates.length,
				o = null;
			switch(a) {
				case 1:
					for(; r < s; ++r) o = this._animationStates[r], o.layer == e && o.fadeOut(t, n);
					break;
				case 2:
					for(; r < s; ++r) o = this._animationStates[r], o.group == i && o.fadeOut(t, n);
					break;
				case 4:
					for(; r < s; ++r) o = this._animationStates[r], o.fadeOut(t, n), 0 == t ? o.returnToPool() : o.fadeOut(t, n);
					0 == t && (this._animationStates.length = 0);
					break;
				case 3:
					for(; r < s; ++r) o = this._animationStates[r], o.layer == e && o.group == i && o.fadeOut(t, n)
			}
		}, i.prototype._updateFFDTimelineStates = function() {
			for(var t = 0, e = this._animationStates.length; t < e; ++t) this._animationStates[t]._updateFFDTimelineStates()
		}, i.prototype._advanceTime = function(t) {
			var e = this;
			if(e._isPlaying) {
				t < 0 && (t = -t);
				var i = e._animationStates.length;
				if(1 == i) {
					var a = e._animationStates[0];
					a._isFadeOutComplete ? (a.returnToPool(), e._animationStates.length = 0, e._animationStateDirty = !0, e._lastAnimationState = null) : (e._timelineStateDirty && a._updateTimelineStates(), a._advanceTime(t, 1, 0))
				} else if(i > 1)
					for(var n = e._animationStates[0]._layer, r = 1, s = 0, o = 1, l = 0, h = 0; l < i; ++l) {
						var a = e._animationStates[l];
						a._isFadeOutComplete ? (h++, a.returnToPool(), e._animationStateDirty = !0, e._lastAnimationState == a && (e._lastAnimationState = l - h >= 0 ? e._animationStates[l - h] : null)) : (h > 0 && (e._animationStates[l - h] = a), n != a._layer && (n = a._layer, s >= r ? r = 0 : r -= s, s = 0), e._timelineStateDirty && a._updateTimelineStates(), a._advanceTime(t, r, o), 0 != a._weightResult && (s += a._weightResult, o++)), l == i - 1 && h > 0 && (e._animationStates.length -= h)
					}
				e._timelineStateDirty = !1
			}
		}, i.prototype.reset = function() {
			for(var t = 0, e = this._animationStates.length; t < e; ++t) this._animationStates[t].returnToPool();
			this._isPlaying = !1, this._lastAnimationState = null, this._animationStates.length = 0
		}, i.prototype.stop = function(t) {
			if(void 0 === t && (t = null), t) {
				var e = this.getState(t);
				e && e.stop()
			} else this._isPlaying = !1
		}, i.prototype.play = function(t, e) {
			void 0 === t && (t = null), void 0 === e && (e = -1);
			var i = null;
			if(t) i = this.fadeIn(t, 0, e, 0, null, 4);
			else if(this._lastAnimationState) this._isPlaying && (this._lastAnimationState.isPlaying || this._lastAnimationState.isCompleted) ? i = this.fadeIn(this._lastAnimationState.name, 0, e, 0, null, 4) : (this._isPlaying = !0, this._lastAnimationState.play());
			else {
				var a = this._armature.armatureData.defaultAnimation;
				a && (i = this.fadeIn(a.name, 0, e, 0, null, 4))
			}
			return i
		}, i.prototype.fadeIn = function(e, a, n, r, s, o, l, h, _, u) {
			void 0 === a && (a = -1), void 0 === n && (n = -1), void 0 === r && (r = 0), void 0 === s && (s = null), void 0 === o && (o = 3), void 0 === l && (l = !1), void 0 === h && (h = !0), void 0 === _ && (_ = !0), void 0 === u && (u = !0);
			var f = this._animations[e];
			if(!f) return this._time = 0, console.warn("Non-existent animation.", "DragonBones: " + this._armature.armatureData.parent.name, "Armature: " + this._armature.name, "Animation: " + e), null;
			this._time != this._time && (this._time = 0), this._isPlaying = !0, (a != a || a < 0) && (a = this._lastAnimationState ? f.fadeInTime : 0), n < 0 && (n = f.playTimes), this._fadeOut(a, r, s, o, _), this._lastAnimationState = t.BaseObject.borrowObject(t.AnimationState), this._lastAnimationState._layer = r, this._lastAnimationState._group = s, this._lastAnimationState.additiveBlending = l, this._lastAnimationState.displayControl = h, this._lastAnimationState._fadeIn(this._armature, f.animation || f, e, n, f.position, f.duration, this._time, 1 / f.scale, a, u), this._animationStates.push(this._lastAnimationState), this._animationStateDirty = !0, this._time = 0, this._animationStates.length > 1 && this._animationStates.sort(i._sortAnimationState);
			for(var m = this._armature.getSlots(), c = 0, p = m.length; c < p; ++c) {
				var d = m[c];
				if(d.inheritAnimation) {
					var g = d.childArmature;
					g && g.animation.hasAnimation(e) && !g.animation.getState(e) && g.animation.fadeIn(e)
				}
			}
			return 0 == a && this._armature.advanceTime(0), this._lastAnimationState
		}, i.prototype.gotoAndPlayByTime = function(t, e, i) {
			return void 0 === e && (e = 0), void 0 === i && (i = -1), this._time = e, this.fadeIn(t, 0, i, 0, null, 4)
		}, i.prototype.gotoAndPlayByFrame = function(t, e, i) {
			void 0 === e && (e = 0), void 0 === i && (i = -1);
			var a = this._animations[t];
			return a && (this._time = a.duration * e / a.frameCount), this.fadeIn(t, 0, i, 0, null, 4)
		}, i.prototype.gotoAndPlayByProgress = function(t, e, i) {
			void 0 === e && (e = 0), void 0 === i && (i = -1);
			var a = this._animations[t];
			return a && (this._time = a.duration * Math.max(e, 0)), this.fadeIn(t, 0, i, 0, null, 4)
		}, i.prototype.gotoAndStopByTime = function(t, e) {
			void 0 === e && (e = 0);
			var i = this.gotoAndPlayByTime(t, e, 1);
			return i && i.stop(), i
		}, i.prototype.gotoAndStopByFrame = function(t, e) {
			void 0 === e && (e = 0);
			var i = this.gotoAndPlayByFrame(t, e, 1);
			return i && i.stop(), i
		}, i.prototype.gotoAndStopByProgress = function(t, e) {
			void 0 === e && (e = 0);
			var i = this.gotoAndPlayByProgress(t, e, 1);
			return i && i.stop(), i
		}, i.prototype.getState = function(t) {
			for(var e = 0, i = this._animationStates.length; e < i; ++e) {
				var a = this._animationStates[e];
				if(a.name == t) return a
			}
			return null
		}, i.prototype.hasAnimation = function(t) {
			return null != this._animations[t]
		}, Object.defineProperty(i.prototype, "isPlaying", {
			get: function() {
				return this._animationStates.length > 1 ? this._isPlaying && !this.isCompleted : this._lastAnimationState ? this._isPlaying && this._lastAnimationState.isPlaying : this._isPlaying
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "isCompleted", {
			get: function() {
				if(this._lastAnimationState) {
					if(!this._lastAnimationState.isCompleted) return !1;
					for(var t = 0, e = this._animationStates.length; t < e; ++t)
						if(!this._animationStates[t].isCompleted) return !1;
					return !0
				}
				return !1
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "lastAnimationName", {
			get: function() {
				return this._lastAnimationState ? this._lastAnimationState.name : null
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "lastAnimationState", {
			get: function() {
				return this._lastAnimationState
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "animationNames", {
			get: function() {
				return this._animationNames
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "animations", {
			get: function() {
				return this._animations
			},
			set: function(t) {
				if(this._animations != t) {
					for(var e in this._animations) delete this._animations[e];
					if(this._animationNames.length = 0, t)
						for(var e in t) this._animations[e] = t[e], this._animationNames.push(e)
				}
			},
			enumerable: !0,
			configurable: !0
		}), i.prototype.gotoAndPlay = function(t, e, i, a, n, r, s, o, l) {
			void 0 === e && (e = -1), void 0 === i && (i = -1), void 0 === a && (a = -1), void 0 === n && (n = 0), void 0 === r && (r = null), void 0 === s && (s = 3), void 0 === o && (o = !0), void 0 === l && (l = !0);
			var h = this.fadeIn(t, e, a, n, r, s, !1, !0, o, l);
			return h && i && i > 0 && (h.timeScale = h.totalTime / i), h
		}, i.prototype.gotoAndStop = function(t, e) {
			return void 0 === e && (e = 0), this.gotoAndStopByTime(t, e)
		}, Object.defineProperty(i.prototype, "animationList", {
			get: function() {
				return this._animationNames
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "animationDataList", {
			get: function() {
				for(var t = [], e = 0, i = this._animationNames.length; e < i; ++e) t.push(this._animations[this._animationNames[e]]);
				return t
			},
			enumerable: !0,
			configurable: !0
		}), i
	}(t.BaseObject);
	t.Animation = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function(e) {
		function i() {
			e.call(this), this._boneMask = [], this._boneTimelines = [], this._slotTimelines = [], this._ffdTimelines = [], this.autoTween = !1
		}
		return __extends(i, e), i.toString = function() {
			return "[class dragonBones.AnimationState]"
		}, i.prototype._onClear = function() {
			for(var t = 0, e = this._boneTimelines.length; t < e; ++t) this._boneTimelines[t].returnToPool();
			for(var t = 0, e = this._slotTimelines.length; t < e; ++t) this._slotTimelines[t].returnToPool();
			for(var t = 0, e = this._ffdTimelines.length; t < e; ++t) this._ffdTimelines[t].returnToPool();
			this.displayControl = !0, this.additiveBlending = !1, this.actionEnabled = !1, this.playTimes = 1, this.timeScale = 1, this.weight = 1, this.autoFadeOutTime = -1, this.fadeTotalTime = 0, this._isFadeOutComplete = !1, this._layer = 0, this._position = 0, this._duration = 0, this._weightResult = 0, this._fadeProgress = 0, this._group = null, this._timeline && (this._timeline.returnToPool(), this._timeline = null), this._isPlaying = !0, this._isPausePlayhead = !1, this._isFadeOut = !1, this._fadeTime = 0, this._time = 0, this._name = null, this._armature = null, this._animationData = null, this._boneMask.length = 0, this._boneTimelines.length = 0, this._slotTimelines.length = 0, this._ffdTimelines.length = 0
		}, i.prototype._advanceFadeTime = function(e) {
			var i = this;
			e < 0 && (e = -e), i._fadeTime += e;
			var a = 0;
			if(a = i._fadeTime >= i.fadeTotalTime ? i._isFadeOut ? 0 : 1 : i._fadeTime > 0 ? i._isFadeOut ? 1 - i._fadeTime / i.fadeTotalTime : i._fadeTime / i.fadeTotalTime : i._isFadeOut ? 1 : 0, i._fadeProgress != a) {
				i._fadeProgress = a;
				var n = i._armature._display;
				if(i._fadeTime <= e)
					if(i._isFadeOut) {
						if(n.hasEvent(t.EventObject.FADE_OUT)) {
							var r = t.BaseObject.borrowObject(t.EventObject);
							r.animationState = this, i._armature._bufferEvent(r, t.EventObject.FADE_OUT)
						}
					} else if(n.hasEvent(t.EventObject.FADE_IN)) {
					var s = t.BaseObject.borrowObject(t.EventObject);
					s.animationState = this, i._armature._bufferEvent(s, t.EventObject.FADE_IN)
				}
				if(i._fadeTime >= i.fadeTotalTime)
					if(i._isFadeOut) {
						if(i._isFadeOutComplete = !0, n.hasEvent(t.EventObject.FADE_OUT_COMPLETE)) {
							var o = t.BaseObject.borrowObject(t.EventObject);
							o.animationState = this, i._armature._bufferEvent(o, t.EventObject.FADE_OUT_COMPLETE)
						}
					} else if(i._isPausePlayhead = !1, n.hasEvent(t.EventObject.FADE_IN_COMPLETE)) {
					var l = t.BaseObject.borrowObject(t.EventObject);
					l.animationState = this, i._armature._bufferEvent(l, t.EventObject.FADE_IN_COMPLETE)
				}
			}
		}, i.prototype._isDisabled = function(t) {
			return !(this.displayControl && (!t.displayController || t.displayController == this._name || t.displayController == this._group))
		}, i.prototype._fadeIn = function(e, a, n, r, s, o, l, h, _, u) {
			this._armature = e, this._animationData = a, this._name = n, this.actionEnabled = i.stateActionEnabled, this.playTimes = r, this.timeScale = h, this.fadeTotalTime = _, this._position = s, this._duration = o, this._time = l, this._isPausePlayhead = u, 0 == this.fadeTotalTime && (this._fadeProgress = .999999), this._timeline = t.BaseObject.borrowObject(t.AnimationTimelineState), this._timeline.fadeIn(this._armature, this, this._animationData, this._time), this._updateTimelineStates()
		}, i.prototype._updateTimelineStates = function() {
			var e = this._time;
			this._animationData.hasAsynchronyTimeline || (e = this._timeline._currentTime);
			for(var i = {}, a = {}, n = 0, r = this._boneTimelines.length; n < r; ++n) {
				var s = this._boneTimelines[n];
				i[s.bone.name] = s
			}
			for(var o = this._armature.getBones(), n = 0, r = o.length; n < r; ++n) {
				var l = o[n],
					h = l.name,
					_ = this._animationData.getBoneTimeline(h);
				if(_ && this.containsBoneMask(h)) {
					var s = i[h];
					s ? delete i[h] : (s = t.BaseObject.borrowObject(t.BoneTimelineState), s.bone = l, s.fadeIn(this._armature, this, _, e), this._boneTimelines.push(s))
				}
			}
			for(var n in i) {
				var s = i[n];
				s.bone.invalidUpdate(), this._boneTimelines.splice(this._boneTimelines.indexOf(s), 1), s.returnToPool()
			}
			for(var n = 0, r = this._slotTimelines.length; n < r; ++n) {
				var u = this._slotTimelines[n];
				a[u.slot.name] = u
			}
			for(var f = this._armature.getSlots(), n = 0, r = f.length; n < r; ++n) {
				var m = f[n],
					c = m.name,
					p = m.parent.name,
					d = this._animationData.getSlotTimeline(c);
				if(d && this.containsBoneMask(p) && !this._isFadeOut) {
					var u = a[c];
					u ? delete a[c] : (u = t.BaseObject.borrowObject(t.SlotTimelineState), u.slot = m, u.fadeIn(this._armature, this, d, e), this._slotTimelines.push(u))
				}
			}
			for(var n in a) {
				var u = a[n];
				this._slotTimelines.splice(this._slotTimelines.indexOf(u), 1), u.returnToPool()
			}
			this._updateFFDTimelineStates()
		}, i.prototype._updateFFDTimelineStates = function() {
			var e = this._time;
			this._animationData.hasAsynchronyTimeline || (e = this._timeline._currentTime);
			for(var i = {}, a = 0, n = this._ffdTimelines.length; a < n; ++a) {
				var r = this._ffdTimelines[a];
				i[r.slot.name] = r
			}
			for(var s = this._armature.getSlots(), a = 0, n = s.length; a < n; ++a) {
				var o = s[a],
					l = o.name,
					h = o.parent.name;
				if(o._meshData) {
					var _ = o.displayIndex,
						u = _ < o._displayDataSet.displays.length ? o._displayDataSet.displays[_].mesh : null;
					if(o._meshData == u) {
						var f = this._animationData.getFFDTimeline(this._armature._skinData.name, l, _);
						if(f && this.containsBoneMask(h)) {
							var r = i[l];
							r && r._timeline == f ? delete i[l] : (r = t.BaseObject.borrowObject(t.FFDTimelineState), r.slot = o, r.fadeIn(this._armature, this, f, e), this._ffdTimelines.push(r))
						} else {
							for(var m = 0, c = o._ffdVertices.length; m < c; ++m) o._ffdVertices[m] = 0;
							o._ffdDirty = !0
						}
					}
				}
			}
			for(var a in i) {
				var r = i[a];
				this._ffdTimelines.splice(this._ffdTimelines.indexOf(r), 1), r.returnToPool()
			}
		}, i.prototype._advanceTime = function(t, e, i) {
			var a = this;
			if(a._advanceFadeTime(t), t *= a.timeScale, 0 != t && a._isPlaying && !a._isPausePlayhead && (a._time += t), a._weightResult = a.weight * a._fadeProgress * e, 0 != a._weightResult) {
				var n = a._fadeProgress >= 1 && 0 == i && a._armature.cacheFrameRate > 0,
					r = a._animationData.cacheTimeToFrameScale,
					s = !0,
					o = !0,
					l = 2 * r;
				if(l = n ? Math.floor(a._time * l) / l : a._time, a._timeline.update(l), a._animationData.hasAsynchronyTimeline || (l = a._timeline._currentTime), n) {
					var h = Math.floor(a._timeline._currentTime * r);
					if(a._armature._cacheFrameIndex == h) s = !1, o = !1;
					else {
						if(a._armature._cacheFrameIndex = h, a._armature._animation._animationStateDirty) {
							a._armature._animation._animationStateDirty = !1;
							for(var _ = 0, u = a._boneTimelines.length; _ < u; ++_) {
								var f = a._boneTimelines[_];
								f.bone._cacheFrames = f._timeline.cachedFrames
							}
							for(var _ = 0, u = a._slotTimelines.length; _ < u; ++_) {
								var m = a._slotTimelines[_];
								m.slot._cacheFrames = m._timeline.cachedFrames
							}
						}
						a._animationData.cachedFrames[h] ? o = !1 : a._animationData.cachedFrames[h] = !0
					}
				} else a._armature._cacheFrameIndex = -1;
				if(s) {
					if(o)
						for(var _ = 0, u = a._boneTimelines.length; _ < u; ++_) a._boneTimelines[_].update(l);
					for(var _ = 0, u = a._slotTimelines.length; _ < u; ++_) a._slotTimelines[_].update(l);
					for(var _ = 0, u = a._ffdTimelines.length; _ < u; ++_) a._ffdTimelines[_].update(l)
				}
			}
			a.autoFadeOutTime >= 0 && a._fadeProgress >= 1 && a._timeline._isCompleted && a.fadeOut(a.autoFadeOutTime)
		}, i.prototype.play = function() {
			this._isPlaying = !0
		}, i.prototype.stop = function() {
			this._isPlaying = !1
		}, i.prototype.fadeOut = function(t, e) {
			if(void 0 === e && (e = !0), (t < 0 || t != t) && (t = 0), this._isPausePlayhead = e, this._isFadeOut) {
				if(t > t - this._fadeTime) return
			} else {
				this._isFadeOut = !0, (0 == t || this._fadeProgress <= 0) && (this._fadeProgress = 1e-6);
				for(var i = 0, a = this._boneTimelines.length; i < a; ++i) this._boneTimelines[i].fadeOut();
				for(var i = 0, a = this._slotTimelines.length; i < a; ++i) this._slotTimelines[i].fadeOut()
			}
			this.displayControl = !1, this.fadeTotalTime = this._fadeProgress > 1e-6 ? t / this._fadeProgress : 0, this._fadeTime = this.fadeTotalTime * (1 - this._fadeProgress)
		}, i.prototype.containsBoneMask = function(t) {
			return !this._boneMask.length || this._boneMask.indexOf(t) >= 0
		}, i.prototype.addBoneMask = function(t, e) {
			void 0 === e && (e = !0);
			var i = this._armature.getBone(t);
			if(i) {
				if(this._boneMask.indexOf(t) < 0 && this._animationData.getBoneTimeline(t) && this._boneMask.push(t), e)
					for(var a = this._armature.getBones(), n = 0, r = a.length; n < r; ++n) {
						var s = a[n],
							o = s.name;
						this._boneMask.indexOf(o) < 0 && this._animationData.getBoneTimeline(o) && i.contains(s) && this._boneMask.push(o)
					}
				this._updateTimelineStates()
			}
		}, i.prototype.removeBoneMask = function(t, e) {
			void 0 === e && (e = !0);
			var i = this._boneMask.indexOf(t);
			if(i >= 0 && this._boneMask.splice(i, 1), e) {
				var a = this._armature.getBone(t);
				if(a)
					for(var n = this._armature.getBones(), r = 0, s = n.length; r < s; ++r) {
						var o = n[r],
							l = o.name,
							h = this._boneMask.indexOf(l);
						h >= 0 && a.contains(o) && this._boneMask.splice(h, 1)
					}
			}
			this._updateTimelineStates()
		}, i.prototype.removeAllBoneMask = function() {
			this._boneMask.length = 0, this._updateTimelineStates()
		}, Object.defineProperty(i.prototype, "layer", {
			get: function() {
				return this._layer
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "group", {
			get: function() {
				return this._group
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "name", {
			get: function() {
				return this._name
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "animationData", {
			get: function() {
				return this._animationData
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "isCompleted", {
			get: function() {
				return this._timeline._isCompleted
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "isPlaying", {
			get: function() {
				return this._isPlaying && !this._timeline._isCompleted
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "currentPlayTimes", {
			get: function() {
				return this._timeline._currentPlayTimes
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "totalTime", {
			get: function() {
				return this._duration
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "currentTime", {
			get: function() {
				return this._timeline._currentTime
			},
			set: function(t) {
				(t < 0 || t != t) && (t = 0);
				var e = this._timeline._currentPlayTimes - (this._timeline._isCompleted ? 1 : 0);
				if(t = t % this._duration + e * this._duration, this._time != t) {
					this._time = t, this._timeline.setCurrentTime(this._time);
					for(var i = 0, a = this._boneTimelines.length; i < a; ++i) this._boneTimelines[i]._isCompleted = !1;
					for(var i = 0, a = this._slotTimelines.length; i < a; ++i) this._slotTimelines[i]._isCompleted = !1;
					for(var i = 0, a = this._ffdTimelines.length; i < a; ++i) this._ffdTimelines[i]._isCompleted = !1
				}
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "clip", {
			get: function() {
				return this._animationData
			},
			enumerable: !0,
			configurable: !0
		}), i.stateActionEnabled = !0, i
	}(t.BaseObject);
	t.AnimationState = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function(e) {
		function i() {
			e.call(this)
		}
		return __extends(i, e), i.toString = function() {
			return "[class dragonBones.AnimationTimelineState]"
		}, i.prototype._onClear = function() {
			e.prototype._onClear.call(this), this._isStarted = !1
		}, i.prototype._onCrossFrame = function(e) {
			var i = this;
			if(this._animationState.actionEnabled)
				for(var a = e.actions, n = 0, r = a.length; n < r; ++n) i._armature._bufferAction(a[n]);
			for(var s = i._armature._display, o = e.events, n = 0, r = o.length; n < r; ++n) {
				var l = o[n],
					h = "";
				switch(l.type) {
					case 10:
						h = t.EventObject.FRAME_EVENT;
						break;
					case 11:
						h = t.EventObject.SOUND_EVENT
				}
				if((11 == l.type ? this._armature._eventManager : s).hasEvent(h)) {
					var _ = t.BaseObject.borrowObject(t.EventObject);
					_.animationState = i._animationState, _.frame = e, l.bone && (_.bone = i._armature.getBone(l.bone.name)), l.slot && (_.slot = i._armature.getSlot(l.slot.name)), _.name = l.name, _.data = l.data, i._armature._bufferEvent(_, h)
				}
			}
		}, i.prototype.fadeIn = function(t, i, a, n) {
			e.prototype.fadeIn.call(this, t, i, a, n), this._currentTime = n
		}, i.prototype.update = function(e) {
			var i = this,
				a = i._currentTime,
				n = i._currentPlayTimes;
			if(!i._isCompleted && i._setCurrentTime(e)) {
				var r = i._armature._display;
				if(!i._isStarted && (i._isStarted = !0, r.hasEvent(t.EventObject.START))) {
					var s = t.BaseObject.borrowObject(t.EventObject);
					s.animationState = i._animationState, i._armature._bufferEvent(s, t.EventObject.START)
				}
				if(i._keyFrameCount) {
					var o = i._keyFrameCount > 1 ? Math.floor(i._currentTime * i._frameRate) : 0,
						l = i._timeline.frames[o];
					if(i._currentFrame != l)
						if(i._keyFrameCount > 1) {
							var h = i._currentFrame;
							if(i._currentFrame = l, !h) {
								var _ = Math.floor(a * i._frameRate);
								h = i._timeline.frames[_], i._isReverse || (a <= h.position || n != i._currentPlayTimes) && (h = h.prev)
							}
							if(i._isReverse)
								for(; h != l;) i._onCrossFrame(h), h = h.prev;
							else
								for(; h != l;) h = h.next, i._onCrossFrame(h)
						} else i._currentFrame = l, i._onCrossFrame(i._currentFrame)
				}
				if(n != i._currentPlayTimes) {
					if(r.hasEvent(t.EventObject.LOOP_COMPLETE)) {
						var s = t.BaseObject.borrowObject(t.EventObject);
						s.animationState = i._animationState, i._armature._bufferEvent(s, t.EventObject.LOOP_COMPLETE)
					}
					if(i._isCompleted && r.hasEvent(t.EventObject.COMPLETE)) {
						var s = t.BaseObject.borrowObject(t.EventObject);
						s.animationState = i._animationState, i._armature._bufferEvent(s, t.EventObject.COMPLETE)
					}
					i._currentFrame = null
				}
			}
		}, i.prototype.setCurrentTime = function(t) {
			this._setCurrentTime(t), this._currentFrame = null
		}, i
	}(t.TimelineState);
	t.AnimationTimelineState = e;
	var i = function(e) {
		function i() {
			e.call(this), this._transform = new t.Transform, this._currentTransform = new t.Transform, this._durationTransform = new t.Transform
		}
		return __extends(i, e), i.toString = function() {
			return "[class dragonBones.BoneTimelineState]"
		}, i.prototype._onClear = function() {
			e.prototype._onClear.call(this), this.bone = null, this._tweenTransform = 0, this._tweenRotate = 0, this._tweenScale = 0, this._boneTransform = null, this._originTransform = null, this._transform.identity(), this._currentTransform.identity(), this._durationTransform.identity()
		}, i.prototype._onArriveAtFrame = function(i) {
			var a = this;
			if(e.prototype._onArriveAtFrame.call(this, i), a._currentTransform.copyFrom(a._currentFrame.transform), a._tweenTransform = 1, a._tweenRotate = 1, a._tweenScale = 1, a._keyFrameCount > 1 && (a._tweenEasing != t.DragonBones.NO_TWEEN || a._curve)) {
				var n = a._currentFrame.next,
					r = n.transform;
				a._durationTransform.x = r.x - a._currentTransform.x, a._durationTransform.y = r.y - a._currentTransform.y, 0 == a._durationTransform.x && 0 == a._durationTransform.y || (a._tweenTransform = 2);
				var s = a._currentFrame.tweenRotate;
				if(s == s) {
					if(s)
						if(s > 0 ? r.skewY >= a._currentTransform.skewY : r.skewY <= a._currentTransform.skewY) {
							var o = s > 0 ? s - 1 : s + 1;
							a._durationTransform.skewX = r.skewX - a._currentTransform.skewX + t.DragonBones.PI_D * o, a._durationTransform.skewY = r.skewY - a._currentTransform.skewY + t.DragonBones.PI_D * o
						} else a._durationTransform.skewX = r.skewX - a._currentTransform.skewX + t.DragonBones.PI_D * s, a._durationTransform.skewY = r.skewY - a._currentTransform.skewY + t.DragonBones.PI_D * s;
					else a._durationTransform.skewX = t.Transform.normalizeRadian(r.skewX - a._currentTransform.skewX), a._durationTransform.skewY = t.Transform.normalizeRadian(r.skewY - a._currentTransform.skewY);
					0 == a._durationTransform.skewX && 0 == a._durationTransform.skewY || (a._tweenRotate = 2)
				} else a._durationTransform.skewX = 0, a._durationTransform.skewY = 0;
				a._currentFrame.tweenScale ? (a._durationTransform.scaleX = r.scaleX - a._currentTransform.scaleX, a._durationTransform.scaleY = r.scaleY - a._currentTransform.scaleY, 0 == a._durationTransform.scaleX && 0 == a._durationTransform.scaleY || (a._tweenScale = 2)) : (a._durationTransform.scaleX = 0, a._durationTransform.scaleY = 0)
			} else a._durationTransform.x = 0, a._durationTransform.y = 0, a._durationTransform.skewX = 0, a._durationTransform.skewY = 0, a._durationTransform.scaleX = 0, a._durationTransform.scaleY = 0
		}, i.prototype._onUpdateFrame = function(t) {
			var i = this;
			if(i._tweenTransform || i._tweenRotate || i._tweenScale) {
				e.prototype._onUpdateFrame.call(this, t);
				var a = 0;
				i._tweenTransform && (1 == i._tweenTransform ? (i._tweenTransform = 0, a = 0) : a = i._tweenProgress, i._animationState.additiveBlending ? (i._transform.x = i._currentTransform.x + i._durationTransform.x * a, i._transform.y = i._currentTransform.y + i._durationTransform.y * a) : (i._transform.x = i._originTransform.x + i._currentTransform.x + i._durationTransform.x * a, i._transform.y = i._originTransform.y + i._currentTransform.y + i._durationTransform.y * a)), i._tweenRotate && (1 == i._tweenRotate ? (i._tweenRotate = 0, a = 0) : a = i._tweenProgress, i._animationState.additiveBlending ? (i._transform.skewX = i._currentTransform.skewX + i._durationTransform.skewX * a, i._transform.skewY = i._currentTransform.skewY + i._durationTransform.skewY * a) : (i._transform.skewX = i._originTransform.skewX + i._currentTransform.skewX + i._durationTransform.skewX * a, i._transform.skewY = i._originTransform.skewY + i._currentTransform.skewY + i._durationTransform.skewY * a)), i._tweenScale && (1 == i._tweenScale ? (i._tweenScale = 0, a = 0) : a = i._tweenProgress, i._animationState.additiveBlending ? (i._transform.scaleX = i._currentTransform.scaleX + i._durationTransform.scaleX * a, i._transform.scaleY = i._currentTransform.scaleY + i._durationTransform.scaleY * a) : (i._transform.scaleX = i._originTransform.scaleX * (i._currentTransform.scaleX + i._durationTransform.scaleX * a), i._transform.scaleY = i._originTransform.scaleY * (i._currentTransform.scaleY + i._durationTransform.scaleY * a))), i.bone.invalidUpdate()
			}
		}, i.prototype.fadeIn = function(t, i, a, n) {
			e.prototype.fadeIn.call(this, t, i, a, n), this._originTransform = this._timeline.originTransform, this._boneTransform = this.bone._animationPose
		}, i.prototype.fadeOut = function() {
			this._transform.skewX = t.Transform.normalizeRadian(this._transform.skewX), this._transform.skewY = t.Transform.normalizeRadian(this._transform.skewY)
		}, i.prototype.update = function(t) {
			var i = this;
			e.prototype.update.call(this, t);
			var a = i._animationState._weightResult;
			if(a > 0) {
				0 == i.bone._blendIndex ? (i._boneTransform.x = i._transform.x * a, i._boneTransform.y = i._transform.y * a, i._boneTransform.skewX = i._transform.skewX * a, i._boneTransform.skewY = i._transform.skewY * a, i._boneTransform.scaleX = (i._transform.scaleX - 1) * a + 1, i._boneTransform.scaleY = (i._transform.scaleY - 1) * a + 1) : (i._boneTransform.x += i._transform.x * a, i._boneTransform.y += i._transform.y * a, i._boneTransform.skewX += i._transform.skewX * a, i._boneTransform.skewY += i._transform.skewY * a, i._boneTransform.scaleX += (i._transform.scaleX - 1) * a, i._boneTransform.scaleY += (i._transform.scaleY - 1) * a), i.bone._blendIndex++;
				i._animationState._fadeProgress < 1 && i.bone.invalidUpdate()
			}
		}, i
	}(t.TweenTimelineState);
	t.BoneTimelineState = i;
	var a = function(e) {
		function i() {
			e.call(this), this._color = new t.ColorTransform, this._durationColor = new t.ColorTransform
		}
		return __extends(i, e), i.toString = function() {
			return "[class dragonBones.SlotTimelineState]"
		}, i.prototype._onClear = function() {
			e.prototype._onClear.call(this), this.slot = null, this._colorDirty = !1, this._tweenColor = 0, this._slotColor = null, this._color.identity(), this._durationColor.identity()
		}, i.prototype._onArriveAtFrame = function(i) {
			var a = this;
			if(e.prototype._onArriveAtFrame.call(this, i), a._animationState._isDisabled(a.slot)) return a._tweenEasing = t.DragonBones.NO_TWEEN, a._curve = null, void(a._tweenColor = 0);
			if(a.slot._displayDataSet) {
				var n = a._currentFrame.displayIndex;
				a.slot.displayIndex >= 0 && n >= 0 ? a.slot._displayDataSet.displays.length > 1 && a.slot._setDisplayIndex(n) : a.slot._setDisplayIndex(n), a.slot._updateMeshData(!0)
			}
			if(a._currentFrame.displayIndex >= 0) {
				a._tweenColor = 0;
				var r = a._currentFrame.color;
				if(a._keyFrameCount > 1 && (a._tweenEasing != t.DragonBones.NO_TWEEN || a._curve)) {
					var s = a._currentFrame.next,
						o = s.color;
					r != o && s.displayIndex >= 0 && (a._durationColor.alphaMultiplier = o.alphaMultiplier - r.alphaMultiplier, a._durationColor.redMultiplier = o.redMultiplier - r.redMultiplier, a._durationColor.greenMultiplier = o.greenMultiplier - r.greenMultiplier, a._durationColor.blueMultiplier = o.blueMultiplier - r.blueMultiplier, a._durationColor.alphaOffset = o.alphaOffset - r.alphaOffset, a._durationColor.redOffset = o.redOffset - r.redOffset, a._durationColor.greenOffset = o.greenOffset - r.greenOffset, a._durationColor.blueOffset = o.blueOffset - r.blueOffset, 0 == a._durationColor.alphaMultiplier && 0 == a._durationColor.redMultiplier && 0 == a._durationColor.greenMultiplier && 0 == a._durationColor.blueMultiplier && 0 == a._durationColor.alphaOffset && 0 == a._durationColor.redOffset && 0 == a._durationColor.greenOffset && 0 == a._durationColor.blueOffset || (a._tweenColor = 2))
				}
				0 == a._tweenColor && (a._slotColor.alphaMultiplier == r.alphaMultiplier && a._slotColor.redMultiplier == r.redMultiplier && a._slotColor.greenMultiplier == r.greenMultiplier && a._slotColor.blueMultiplier == r.blueMultiplier && a._slotColor.alphaOffset == r.alphaOffset && a._slotColor.redOffset == r.redOffset && a._slotColor.greenOffset == r.greenOffset && a._slotColor.blueOffset == r.blueOffset || (a._tweenColor = 1))
			} else a._tweenEasing = t.DragonBones.NO_TWEEN, a._curve = null, a._tweenColor = 0
		}, i.prototype._onUpdateFrame = function(t) {
			var i = this;
			e.prototype._onUpdateFrame.call(this, t);
			var a = 0;
			if(i._tweenColor) {
				1 == i._tweenColor ? (i._tweenColor = 0, a = 0) : a = i._tweenProgress;
				var n = i._currentFrame.color;
				i._color.alphaMultiplier = n.alphaMultiplier + i._durationColor.alphaMultiplier * a, i._color.redMultiplier = n.redMultiplier + i._durationColor.redMultiplier * a, i._color.greenMultiplier = n.greenMultiplier + i._durationColor.greenMultiplier * a, i._color.blueMultiplier = n.blueMultiplier + i._durationColor.blueMultiplier * a, i._color.alphaOffset = n.alphaOffset + i._durationColor.alphaOffset * a, i._color.redOffset = n.redOffset + i._durationColor.redOffset * a, i._color.greenOffset = n.greenOffset + i._durationColor.greenOffset * a, i._color.blueOffset = n.blueOffset + i._durationColor.blueOffset * a, i._colorDirty = !0
			}
		}, i.prototype.fadeIn = function(t, i, a, n) {
			e.prototype.fadeIn.call(this, t, i, a, n), this._slotColor = this.slot._colorTransform
		}, i.prototype.fadeOut = function() {
			this._tweenColor = 0
		}, i.prototype.update = function(t) {
			var i = this;
			if(e.prototype.update.call(this, t), 0 != i._tweenColor || i._colorDirty) {
				if(i._animationState._weightResult > 0) {
					var a = i._animationState._fadeProgress;
					a < 1 ? (i._slotColor.alphaMultiplier += (i._color.alphaMultiplier - i._slotColor.alphaMultiplier) * a, i._slotColor.redMultiplier += (i._color.redMultiplier - i._slotColor.redMultiplier) * a, i._slotColor.greenMultiplier += (i._color.greenMultiplier - i._slotColor.greenMultiplier) * a, i._slotColor.blueMultiplier += (i._color.blueMultiplier - i._slotColor.blueMultiplier) * a, i._slotColor.alphaOffset += (i._color.alphaOffset - i._slotColor.alphaOffset) * a, i._slotColor.redOffset += (i._color.redOffset - i._slotColor.redOffset) * a, i._slotColor.greenOffset += (i._color.greenOffset - i._slotColor.greenOffset) * a, i._slotColor.blueOffset += (i._color.blueOffset - i._slotColor.blueOffset) * a, i.slot._colorDirty = !0) : i._colorDirty && (i._colorDirty = !1, i._slotColor.alphaMultiplier = i._color.alphaMultiplier, i._slotColor.redMultiplier = i._color.redMultiplier, i._slotColor.greenMultiplier = i._color.greenMultiplier, i._slotColor.blueMultiplier = i._color.blueMultiplier, i._slotColor.alphaOffset = i._color.alphaOffset, i._slotColor.redOffset = i._color.redOffset, i._slotColor.greenOffset = i._color.greenOffset, i._slotColor.blueOffset = i._color.blueOffset, i.slot._colorDirty = !0)
				}
			}
		}, i
	}(t.TweenTimelineState);
	t.SlotTimelineState = a;
	var n = function(e) {
		function i() {
			e.call(this), this._ffdVertices = []
		}
		return __extends(i, e), i.toString = function() {
			return "[class dragonBones.FFDTimelineState]"
		}, i.prototype._onClear = function() {
			e.prototype._onClear.call(this), this.slot = null, this._tweenFFD = 0, this._slotFFDVertices = null, this._durationFFDFrame && (this._durationFFDFrame.returnToPool(), this._durationFFDFrame = null), this._ffdVertices.length && (this._ffdVertices.length = 0)
		}, i.prototype._onArriveAtFrame = function(i) {
			var a = this;
			if(e.prototype._onArriveAtFrame.call(this, i), a._tweenFFD = 0, (a._tweenEasing != t.DragonBones.NO_TWEEN || a._curve) && (a._tweenFFD = a._updateExtensionKeyFrame(a._currentFrame, a._currentFrame.next, a._durationFFDFrame)), 0 == a._tweenFFD)
				for(var n = a._currentFrame.tweens, r = 0, s = n.length; r < s; ++r)
					if(a._slotFFDVertices[r] != n[r]) {
						a._tweenFFD = 1;
						break
					}
		}, i.prototype._onUpdateFrame = function(t) {
			var i = this;
			e.prototype._onUpdateFrame.call(this, t);
			var a = 0;
			if(0 != i._tweenFFD) {
				1 == i._tweenFFD ? (i._tweenFFD = 0, a = 0) : a = i._tweenProgress;
				for(var n = i._currentFrame.tweens, r = i._durationFFDFrame.tweens, s = 0, o = n.length; s < o; ++s) i._ffdVertices[s] = n[s] + r[s] * a;
				i.slot._ffdDirty = !0
			}
		}, i.prototype.fadeIn = function(i, a, n, r) {
			e.prototype.fadeIn.call(this, i, a, n, r), this._slotFFDVertices = this.slot._ffdVertices, this._durationFFDFrame = t.BaseObject.borrowObject(t.ExtensionFrameData), this._durationFFDFrame.tweens.length = this._slotFFDVertices.length, this._ffdVertices.length = this._slotFFDVertices.length;
			for(var s = 0, o = this._durationFFDFrame.tweens.length; s < o; ++s) this._durationFFDFrame.tweens[s] = 0;
			for(var s = 0, o = this._ffdVertices.length; s < o; ++s) this._ffdVertices[s] = 0
		}, i.prototype.update = function(t) {
			var i = this;
			e.prototype.update.call(this, t);
			var a = i._animationState._weightResult;
			if(a > 0) {
				if(0 == i.slot._blendIndex)
					for(var n = 0, r = i._ffdVertices.length; n < r; ++n) i._slotFFDVertices[n] = i._ffdVertices[n] * a;
				else
					for(var n = 0, r = i._ffdVertices.length; n < r; ++n) i._slotFFDVertices[n] += i._ffdVertices[n] * a;
				i.slot._blendIndex++;
				i._animationState._fadeProgress < 1 && (i.slot._ffdDirty = !0)
			}
		}, i
	}(t.TweenTimelineState);
	t.FFDTimelineState = n
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function() {
		function e() {
			this.time = (new Date).getTime() / t.DragonBones.SECOND_TO_MILLISECOND, this.timeScale = 1, this._animatebles = []
		}
		return Object.defineProperty(e, "clock", {
			get: function() {
				return e._clock || (e._clock = new e), e._clock
			},
			enumerable: !0,
			configurable: !0
		}), e.prototype.advanceTime = function(e) {
			if(e != e && (e = 0), e < 0 && (e = (new Date).getTime() / t.DragonBones.SECOND_TO_MILLISECOND - this.time), e *= this.timeScale, e < 0 ? this.time -= e : this.time += e, e) {
				for(var i = 0, a = 0, n = this._animatebles.length; i < n; ++i) {
					var r = this._animatebles[i];
					r ? (a > 0 && (this._animatebles[i - a] = r, this._animatebles[i] = null), r.advanceTime(e)) : a++
				}
				if(a > 0) {
					for(n = this._animatebles.length; i < n; ++i) {
						var r = this._animatebles[i];
						r ? this._animatebles[i - a] = r : a++
					}
					this._animatebles.length -= a
				}
			}
		}, e.prototype.contains = function(t) {
			return this._animatebles.indexOf(t) >= 0
		}, e.prototype.add = function(e) {
			e && this._animatebles.indexOf(e) < 0 && (this._animatebles.push(e), t.DragonBones.debug && e instanceof t.Armature && t.DragonBones.addArmature(e))
		}, e.prototype.remove = function(e) {
			var i = this._animatebles.indexOf(e);
			i >= 0 && (this._animatebles[i] = null, t.DragonBones.debug && e instanceof t.Armature && t.DragonBones.removeArmature(e))
		}, e.prototype.clear = function() {
			for(var t = 0, e = this._animatebles.length; t < e; ++t) this._animatebles[t] = null
		}, e._clock = null, e
	}();
	t.WorldClock = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function(e) {
		function i() {
			e.call(this), this.global = new t.Transform, this.origin = new t.Transform, this.offset = new t.Transform, this._globalTransformMatrix = new t.Matrix
		}
		return __extends(i, e), i.prototype._onClear = function() {
			this.userData = null, this.name = null, this.globalTransformMatrix = this._globalTransformMatrix, this.global.identity(), this.origin.identity(), this.offset.identity(), this._armature = null, this._parent = null, this._globalTransformMatrix.identity()
		}, i.prototype._setArmature = function(t) {
			this._armature = t
		}, i.prototype._setParent = function(t) {
			this._parent = t
		}, Object.defineProperty(i.prototype, "armature", {
			get: function() {
				return this._armature
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "parent", {
			get: function() {
				return this._parent
			},
			enumerable: !0,
			configurable: !0
		}), i
	}(t.BaseObject);
	t.TransformObject = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function(e) {
		function i() {
			e.call(this), this._bones = [], this._slots = [], this._actions = [], this._events = [], this.enableCache = !1
		}
		return __extends(i, e), i.toString = function() {
			return "[class dragonBones.Armature]"
		}, i.prototype._onClear = function() {
			for(var t = 0, e = this._bones.length; t < e; ++t) this._bones[t].returnToPool();
			for(var t = 0, e = this._slots.length; t < e; ++t) this._slots[t].returnToPool();
			for(var t = 0, e = this._events.length; t < e; ++t) this._events[t].returnToPool();
			this.userData = null, this._bonesDirty = !1, this._cacheFrameIndex = -1, this._armatureData = null, this._skinData = null, this._animation && (this._animation.returnToPool(), this._animation = null), this._display && (this._display._onClear(), this._display = null), this._parent = null, this._replacedTexture = null, this._eventManager = null, this._delayDispose = !1, this._lockDispose = !1, this._slotsDirty = !1, this._bones.length = 0, this._slots.length = 0, this._actions.length = 0, this._events.length = 0
		}, i.prototype._sortBones = function() {
			var t = this._bones.length;
			if(!(t <= 0)) {
				var e = this._bones.concat(),
					i = 0,
					a = 0;
				for(this._bones.length = 0; a < t;) {
					var n = e[i++];
					i >= t && (i = 0), this._bones.indexOf(n) >= 0 || (n.parent && this._bones.indexOf(n.parent) < 0 || n.ik && this._bones.indexOf(n.ik) < 0 || (n.ik && n.ikChain > 0 && n.ikChainIndex == n.ikChain ? this._bones.splice(this._bones.indexOf(n.parent) + 1, 0, n) : this._bones.push(n), a++))
				}
			}
		}, i.prototype._sortSlots = function() {}, i.prototype._doAction = function(t) {
			switch(t.type) {
				case 0:
					this._animation.play(t.data[0], t.data[1]);
					break;
				case 1:
					this._animation.stop(t.data[0]);
					break;
				case 2:
					this._animation.gotoAndPlayByTime(t.data[0], t.data[1], t.data[2]);
					break;
				case 3:
					this._animation.gotoAndStopByTime(t.data[0], t.data[1]);
					break;
				case 4:
					this._animation.fadeIn(t.data[0], t.data[1], t.data[2])
			}
		}, i.prototype._addBoneToBoneList = function(t) {
			this._bones.indexOf(t) < 0 && (this._bonesDirty = !0, this._bones.push(t), this._animation._timelineStateDirty = !0)
		}, i.prototype._removeBoneFromBoneList = function(t) {
			var e = this._bones.indexOf(t);
			e >= 0 && (this._bones.splice(e, 1), this._animation._timelineStateDirty = !0)
		}, i.prototype._addSlotToSlotList = function(t) {
			this._slots.indexOf(t) < 0 && (this._slotsDirty = !0, this._slots.push(t), this._animation._timelineStateDirty = !0)
		}, i.prototype._removeSlotFromSlotList = function(t) {
			var e = this._slots.indexOf(t);
			e >= 0 && (this._slots.splice(e, 1), this._animation._timelineStateDirty = !0)
		}, i.prototype._bufferAction = function(t) {
			this._actions.push(t)
		}, i.prototype._bufferEvent = function(t, e) {
			t.type = e, t.armature = this, this._events.push(t)
		}, i.prototype.dispose = function() {
			this._delayDispose = !0, !this._lockDispose && this._animation && this.returnToPool()
		}, i.prototype.advanceTime = function(e) {
			var i = this;
			if(!i._animation) throw new Error("The armature has been disposed.");
			var a = e * i._animation.timeScale;
			i._animation._advanceTime(a), i._bonesDirty && (i._bonesDirty = !1, i._sortBones()), i._slotsDirty && (i._slotsDirty = !1, i._sortSlots());
			for(var n = 0, r = i._bones.length; n < r; ++n) i._bones[n]._update(i._cacheFrameIndex);
			for(var n = 0, r = i._slots.length; n < r; ++n) {
				var s = i._slots[n];
				s._update(i._cacheFrameIndex);
				var o = s._childArmature;
				o && (s.inheritAnimation ? o.advanceTime(a) : o.advanceTime(e))
			}
			if(t.DragonBones.debugDraw && i._display._debugDraw(), !i._lockDispose) {
				if(i._lockDispose = !0, i._events.length > 0) {
					for(var n = 0, r = i._events.length; n < r; ++n) {
						var l = i._events[n];
						l.type == t.EventObject.SOUND_EVENT ? this._eventManager._dispatchEvent(l) : i._display._dispatchEvent(l), l.returnToPool()
					}
					i._events.length = 0
				}
				if(i._actions.length > 0) {
					for(var n = 0, r = i._actions.length; n < r; ++n) {
						var h = i._actions[n];
						if(h.slot) {
							var s = i.getSlot(h.slot.name);
							if(s) {
								var o = s._childArmature;
								o && o._doAction(h)
							}
						} else if(h.bone)
							for(var _ = 0, u = i._slots.length; _ < u; ++_) {
								var o = i._slots[_]._childArmature;
								o && o._doAction(h)
							} else this._doAction(h)
					}
					i._actions.length = 0
				}
				i._lockDispose = !1
			}
			i._delayDispose && i.returnToPool()
		}, i.prototype.invalidUpdate = function(t, e) {
			if(void 0 === t && (t = null), void 0 === e && (e = !1), t) {
				var i = this.getBone(t);
				if(i && (i.invalidUpdate(), e))
					for(var a = 0, n = this._slots.length; a < n; ++a) {
						var r = this._slots[a];
						r.parent == i && r.invalidUpdate()
					}
			} else {
				for(var a = 0, n = this._bones.length; a < n; ++a) this._bones[a].invalidUpdate();
				if(e)
					for(var a = 0, n = this._slots.length; a < n; ++a) this._slots[a].invalidUpdate()
			}
		}, i.prototype.getSlot = function(t) {
			for(var e = 0, i = this._slots.length; e < i; ++e) {
				var a = this._slots[e];
				if(a.name == t) return a
			}
			return null
		}, i.prototype.getSlotByDisplay = function(t) {
			if(t)
				for(var e = 0, i = this._slots.length; e < i; ++e) {
					var a = this._slots[e];
					if(a.display == t) return a
				}
			return null
		}, i.prototype.addSlot = function(t, e) {
			var i = this.getBone(e);
			if(!i) throw new Error;
			t._setArmature(this), t._setParent(i)
		}, i.prototype.removeSlot = function(t) {
			if(!t || t.armature != this) throw new Error;
			t._setParent(null), t._setArmature(null)
		}, i.prototype.getBone = function(t) {
			for(var e = 0, i = this._bones.length; e < i; ++e) {
				var a = this._bones[e];
				if(a.name == t) return a
			}
			return null
		}, i.prototype.getBoneByDisplay = function(t) {
			var e = this.getSlotByDisplay(t);
			return e ? e.parent : null
		}, i.prototype.addBone = function(t, e) {
			if(void 0 === e && (e = null), !t) throw new Error;
			t._setArmature(this), t._setParent(e ? this.getBone(e) : null)
		}, i.prototype.removeBone = function(t) {
			if(!t || t.armature != this) throw new Error;
			t._setParent(null), t._setArmature(null)
		}, i.prototype.replaceTexture = function(t) {
			this._replacedTexture = t;
			for(var e = 0, i = this._slots.length; e < i; ++e) this._slots[e].invalidUpdate()
		}, i.prototype.getBones = function() {
			return this._bones
		}, i.prototype.getSlots = function() {
			return this._slots
		}, Object.defineProperty(i.prototype, "name", {
			get: function() {
				return this._armatureData ? this._armatureData.name : null
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "armatureData", {
			get: function() {
				return this._armatureData
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "animation", {
			get: function() {
				return this._animation
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "display", {
			get: function() {
				return this._display
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "parent", {
			get: function() {
				return this._parent
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "cacheFrameRate", {
			get: function() {
				return this._armatureData.cacheFrameRate
			},
			set: function(t) {
				if(this._armatureData.cacheFrameRate != t) {
					this._armatureData.cacheFrames(t);
					for(var e = 0, i = this._slots.length; e < i; ++e) {
						var a = this._slots[e],
							n = a.childArmature;
						n && 0 == n.cacheFrameRate && (n.cacheFrameRate = t)
					}
				}
			},
			enumerable: !0,
			configurable: !0
		}), i.prototype.enableAnimationCache = function(t) {
			this.cacheFrameRate = t
		}, i.prototype.hasEventListener = function(t) {
			this._display.hasEvent(t)
		}, i.prototype.addEventListener = function(t, e, i) {
			this._display.addEvent(t, e, i)
		}, i.prototype.removeEventListener = function(t, e, i) {
			this._display.removeEvent(t, e, i)
		}, i.prototype.getDisplay = function() {
			return this._display
		}, i
	}(t.BaseObject);
	t.Armature = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function(e) {
		function i() {
			e.call(this), this._animationPose = new t.Transform, this._bones = [], this._slots = []
		}
		return __extends(i, e), i.toString = function() {
			return "[class dragonBones.Bone]"
		}, i.prototype._onClear = function() {
			e.prototype._onClear.call(this), this.inheritTranslation = !1, this.inheritRotation = !1, this.inheritScale = !1, this.ikBendPositive = !1, this.ikWeight = 0, this.length = 0, this._transformDirty = 2, this._blendIndex = 0, this._cacheFrames = null, this._animationPose.identity(), this._visible = !0, this._ikChain = 0, this._ikChainIndex = 0, this._ik = null, this._bones.length = 0, this._slots.length = 0
		}, i.prototype._updateGlobalTransformMatrix = function() {
			if(this._parent) {
				var t = this._parent.global.skewY,
					e = this._parent.globalTransformMatrix;
				if(this.inheritScale) this.inheritRotation || (this.global.skewX -= t, this.global.skewY -= t), this.global.toMatrix(this.globalTransformMatrix), this.globalTransformMatrix.concat(e), this.inheritTranslation || (this.globalTransformMatrix.tx = this.global.x, this.globalTransformMatrix.ty = this.global.y), this.global.fromMatrix(this.globalTransformMatrix);
				else {
					if(this.inheritTranslation) {
						var i = this.global.x,
							a = this.global.y;
						this.global.x = e.a * i + e.c * a + e.tx, this.global.y = e.d * a + e.b * i + e.ty
					}
					this.inheritRotation && (this.global.skewX += t, this.global.skewY += t), this.global.toMatrix(this.globalTransformMatrix)
				}
			} else this.global.toMatrix(this.globalTransformMatrix)
		}, i.prototype._computeIKA = function() {
			var t = this._ik.global,
				e = this.globalTransformMatrix.a * this.length,
				i = this.globalTransformMatrix.b * this.length,
				a = (Math.atan2(t.y - this.global.y, t.x - this.global.x) + this.offset.skewY - 2 * this.global.skewY + Math.atan2(i, e)) * this.ikWeight;
			this.global.skewX += a, this.global.skewY += a, this.global.toMatrix(this.globalTransformMatrix)
		}, i.prototype._computeIKB = function() {
			var t = this._parent.global,
				e = this._ik.global,
				i = this.globalTransformMatrix.a * this.length,
				a = this.globalTransformMatrix.b * this.length,
				n = i * i + a * a,
				r = Math.sqrt(n),
				s = this.global.x - t.x,
				o = this.global.y - t.y,
				l = s * s + o * o,
				h = Math.sqrt(l);
			s = e.x - t.x, o = e.y - t.y;
			var _ = s * s + o * o,
				u = Math.sqrt(_),
				f = 0;
			if(r + h <= u || u + r <= h || u + h <= r) f = Math.atan2(e.y - t.y, e.x - t.x) + this._parent.offset.skewY, r + h <= u || h < r && (f += Math.PI);
			else {
				var m = (l - n + _) / (2 * _),
					c = Math.sqrt(l - m * m * _) / u,
					p = t.x + s * m,
					d = t.y + o * m,
					g = -o * c,
					y = s * c;
				this.ikBendPositive ? (this.global.x = p - g, this.global.y = d - y) : (this.global.x = p + g, this.global.y = d + y), f = Math.atan2(this.global.y - t.y, this.global.x - t.x) + this._parent.offset.skewY
			}
			f = (f - t.skewY) * this.ikWeight, t.skewX += f, t.skewY += f, t.toMatrix(this._parent.globalTransformMatrix), this._parent._transformDirty = 1, this.global.x = t.x + Math.cos(t.skewY) * h, this.global.y = t.y + Math.sin(t.skewY) * h;
			var T = (Math.atan2(e.y - this.global.y, e.x - this.global.x) + this.offset.skewY - 2 * this.global.skewY + Math.atan2(a, i)) * this.ikWeight;
			this.global.skewX += T, this.global.skewY += T, this.global.toMatrix(this.globalTransformMatrix)
		}, i.prototype._setArmature = function(t) {
			if(this._armature != t) {
				this._ik = null;
				var e = null,
					i = null;
				if(this._armature && (e = this.getSlots(), i = this.getBones(), this._armature._removeBoneFromBoneList(this)), this._armature = t, this._armature && this._armature._addBoneToBoneList(this), e)
					for(var a = 0, n = e.length; a < n; ++a) {
						var r = e[a];
						r.parent == this && r._setArmature(this._armature)
					}
				if(i)
					for(var a = 0, n = i.length; a < n; ++a) {
						var s = i[a];
						s.parent == this && s._setArmature(this._armature)
					}
			}
		}, i.prototype._setIK = function(t, e, i) {
			if(t) {
				if(e == i) {
					var a = this._parent;
					if(e && a ? e = 1 : (e = 0, i = 0, a = this), a == t || a.contains(t)) t = null, e = 0, i = 0;
					else
						for(var n = t; n.ik && n.ikChain;) {
							if(a.contains(n.ik)) {
								t = null, e = 0, i = 0;
								break
							}
							n = n.parent
						}
				}
			} else e = 0, i = 0;
			this._ik = t, this._ikChain = e, this._ikChainIndex = i, this._armature && (this._armature._bonesDirty = !0)
		}, i.prototype._update = function(e) {
			var i = this;
			if(i._blendIndex = 0, e >= 0) {
				var a = i._cacheFrames[e];
				i.globalTransformMatrix == a ? i._transformDirty = 0 : a ? (i._transformDirty = 2, i.globalTransformMatrix = a) : 2 == i._transformDirty || i._parent && 0 != i._parent._transformDirty || i._ik && i.ikWeight > 0 && 0 != i._ik._transformDirty ? (i._transformDirty = 2, i.globalTransformMatrix = i._globalTransformMatrix) : i.globalTransformMatrix != i._globalTransformMatrix ? (i._transformDirty = 0, i._cacheFrames[e] = i.globalTransformMatrix) : (i._transformDirty = 2, i.globalTransformMatrix = i._globalTransformMatrix)
			} else(2 == i._transformDirty || i._parent && 0 != i._parent._transformDirty || i._ik && i.ikWeight > 0 && 0 != i._ik._transformDirty) && (i._transformDirty = 2, i.globalTransformMatrix = i._globalTransformMatrix);
			0 != i._transformDirty && (2 == i._transformDirty ? (i._transformDirty = 1, i.globalTransformMatrix == i._globalTransformMatrix && (i.global.x = i.origin.x + i.offset.x + i._animationPose.x, i.global.y = i.origin.y + i.offset.y + i._animationPose.y, i.global.skewX = i.origin.skewX + i.offset.skewX + i._animationPose.skewX, i.global.skewY = i.origin.skewY + i.offset.skewY + i._animationPose.skewY, i.global.scaleX = i.origin.scaleX * i.offset.scaleX * i._animationPose.scaleX, i.global.scaleY = i.origin.scaleY * i.offset.scaleY * i._animationPose.scaleY, i._updateGlobalTransformMatrix(), i._ik && i._ikChainIndex == i._ikChain && i.ikWeight > 0 && (i.inheritTranslation && i._ikChain > 0 && i._parent ? i._computeIKB() : i._computeIKA()), e >= 0 && !i._cacheFrames[e] && (i.globalTransformMatrix = t.BoneTimelineData.cacheFrame(i._cacheFrames, e, i._globalTransformMatrix)))) : i._transformDirty = 0)
		}, i.prototype.invalidUpdate = function() {
			this._transformDirty = 2
		}, i.prototype.contains = function(t) {
			if(t) {
				if(t == this) return !1;
				for(var e = t; e != this && e;) e = e.parent;
				return e == this
			}
			return !1
		}, i.prototype.getBones = function() {
			this._bones.length = 0;
			for(var t = this._armature.getBones(), e = 0, i = t.length; e < i; ++e) {
				var a = t[e];
				a.parent == this && this._bones.push(a)
			}
			return this._bones
		}, i.prototype.getSlots = function() {
			this._slots.length = 0;
			for(var t = this._armature.getSlots(), e = 0, i = t.length; e < i; ++e) {
				var a = t[e];
				a.parent == this && this._slots.push(a)
			}
			return this._slots
		}, Object.defineProperty(i.prototype, "ikChain", {
			get: function() {
				return this._ikChain
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "ikChainIndex", {
			get: function() {
				return this._ikChainIndex
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "ik", {
			get: function() {
				return this._ik
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "visible", {
			get: function() {
				return this._visible
			},
			set: function(t) {
				if(this._visible != t) {
					this._visible = t;
					for(var e = this._armature.getSlots(), i = 0, a = e.length; i < a; ++i) {
						var n = e[i];
						n._parent == this && n._updateVisible()
					}
				}
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "slot", {
			get: function() {
				for(var t = this._armature.getSlots(), e = 0, i = t.length; e < i; ++e) {
					var a = t[e];
					if(a.parent == this) return a
				}
				return null
			},
			enumerable: !0,
			configurable: !0
		}), i
	}(t.TransformObject);
	t.Bone = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function(e) {
		function i() {
			e.call(this), this._colorTransform = new t.ColorTransform, this._ffdVertices = [], this._replacedDisplayDataSet = [], this._localMatrix = new t.Matrix, this._displayList = [], this._meshBones = []
		}
		return __extends(i, e), i.prototype._onClear = function() {
			e.prototype._onClear.call(this);
			for(var i = [], a = 0, n = this._displayList.length; a < n; ++a) {
				var r = this._displayList[a];
				r != this._rawDisplay && r != this._meshDisplay && i.indexOf(r) < 0 && i.push(r)
			}
			for(var a = 0, n = i.length; a < n; ++a) {
				var r = i[a];
				r instanceof t.Armature ? r.dispose() : this._disposeDisplay(r)
			}
			this._meshDisplay && this._meshDisplay != this._rawDisplay && this._disposeDisplay(this._meshDisplay), this._rawDisplay && this._disposeDisplay(this._rawDisplay), this.inheritAnimation = !0, this.displayController = null, this._colorDirty = !1, this._ffdDirty = !1, this._blendIndex = 0, this._zOrder = 0, this._pivotX = 0, this._pivotY = 0, this._displayDataSet = null, this._meshData = null, this._childArmature = null, this._rawDisplay = null, this._meshDisplay = null, this._cacheFrames = null, this._colorTransform.identity(), this._ffdVertices.length = 0, this._replacedDisplayDataSet.length = 0, this._displayDirty = !1, this._blendModeDirty = !1, this._originDirty = !1, this._transformDirty = !1, this._displayIndex = 0, this._blendMode = 0, this._display = null, this._localMatrix.identity(), this._displayList.length = 0, this._meshBones.length = 0
		}, i.prototype._isMeshBonesUpdate = function() {
			for(var t = 0, e = this._meshBones.length; t < e; ++t)
				if(0 != this._meshBones[t]._transformDirty) return !0;
			return !1
		}, i.prototype._updatePivot = function(t, e, i) {
			if(this._pivotX = e.pivot.x, this._pivotY = e.pivot.y, e.isRelativePivot) {
				var a = this._armature.armatureData.scale,
					n = i.frame || i.region,
					r = n.width * a,
					s = n.height * a;
				i.rotated && (r = n.height, s = n.width), this._pivotX *= r, this._pivotY *= s
			}
			i.frame && (this._pivotX += i.frame.x, this._pivotY += i.frame.y), t && t != e && (this._pivotX += t.transform.x - e.transform.x, this._pivotY += t.transform.y - e.transform.y)
		}, i.prototype._updateDisplay = function() {
			var e = this._display || this._rawDisplay,
				i = this._childArmature;
			this._displayIndex >= 0 && this._displayIndex < this._displayList.length ? (this._display = this._displayList[this._displayIndex], this._display instanceof t.Armature ? (this._childArmature = this._display, this._display = this._childArmature._display) : this._childArmature = null) : (this._display = null, this._childArmature = null);
			var a = this._display || this._rawDisplay;
			if(a != e && (this._onUpdateDisplay(), e ? this._replaceDisplay(e) : this._addDisplay(), this._blendModeDirty = !0, this._colorDirty = !0), this._displayDataSet && this._displayIndex >= 0 && this._displayIndex < this._displayDataSet.displays.length && (this.origin.copyFrom(this._displayDataSet.displays[this._displayIndex].transform), this._originDirty = !0), this._updateMeshData(!1), a != this._rawDisplay && a != this._meshDisplay || this._updateFrame(), this._childArmature != i && (i && (i._parent = null, this.inheritAnimation && i.animation.reset()), this._childArmature && (this._childArmature._parent = this, this.inheritAnimation))) {
				if(0 == this._childArmature.cacheFrameRate) {
					var n = this._armature.cacheFrameRate;
					0 != n && (this._childArmature.cacheFrameRate = n)
				}
				var r = this._armature.armatureData.getSlot(this.name),
					s = r.actions.length > 0 ? r.actions : this._childArmature.armatureData.actions;
				if(s.length > 0)
					for(var o = 0, l = s.length; o < l; ++o) this._childArmature._bufferAction(s[o]);
				else this._childArmature.animation.play()
			}
		}, i.prototype._updateLocalTransformMatrix = function() {
			this.global.copyFrom(this.origin).add(this.offset).toMatrix(this._localMatrix)
		}, i.prototype._updateGlobalTransformMatrix = function() {
			this.globalTransformMatrix.copyFrom(this._localMatrix), this.globalTransformMatrix.concat(this._parent.globalTransformMatrix), this.global.fromMatrix(this.globalTransformMatrix)
		}, i.prototype._setArmature = function(t) {
			this._armature != t && (this._armature && this._armature._removeSlotFromSlotList(this), this._armature = t, this._onUpdateDisplay(), this._armature ? (this._armature._addSlotToSlotList(this), this._addDisplay()) : this._removeDisplay())
		}, i.prototype._updateMeshData = function(t) {
			var e = this._meshData,
				i = null;
			if(this._display && this._display == this._meshDisplay && this._displayIndex >= 0) {
				i = this._displayDataSet && this._displayIndex < this._displayDataSet.displays.length ? this._displayDataSet.displays[this._displayIndex].mesh : null;
				var a = this._displayIndex < this._replacedDisplayDataSet.length ? this._replacedDisplayDataSet[this._displayIndex] : null,
					n = a ? a.mesh : null;
				this._meshData = n || i
			} else this._meshData = null;
			if(this._meshData != e) {
				if(this._meshData && this._meshData == i) {
					if(this._meshData.skinned) {
						this._meshBones.length = this._meshData.bones.length;
						for(var r = 0, s = this._meshBones.length; r < s; ++r) this._meshBones[r] = this._armature.getBone(this._meshData.bones[r].name);
						for(var o = 0, r = 0, s = this._meshData.boneIndices.length; r < s; ++r) o += this._meshData.boneIndices[r].length;
						this._ffdVertices.length = 2 * o
					} else this._meshBones.length = 0, this._ffdVertices.length = this._meshData.vertices.length;
					for(var r = 0, s = this._ffdVertices.length; r < s; ++r) this._ffdVertices[r] = 0;
					this._ffdDirty = !0
				} else this._meshBones.length = 0, this._ffdVertices.length = 0;
				t && this._armature.animation._updateFFDTimelineStates()
			}
		}, i.prototype._update = function(e) {
			var i = this;
			if(i._blendIndex = 0, i._displayDirty && (i._displayDirty = !1, i._updateDisplay()), i._display && (i._blendModeDirty && (i._blendModeDirty = !1, i._updateBlendMode()), i._colorDirty && (i._colorDirty = !1, i._updateColor()), !i._meshData || ((i._ffdDirty || i._meshData.skinned && i._isMeshBonesUpdate()) && (i._ffdDirty = !1, i._updateMesh()), !i._meshData.skinned))) {
				if(i._originDirty && (i._originDirty = !1, i._transformDirty = !0, i._updateLocalTransformMatrix()), e >= 0) {
					var a = i._cacheFrames[e];
					i.globalTransformMatrix == a ? i._transformDirty = !1 : a ? (i._transformDirty = !0, i.globalTransformMatrix = a) : i._transformDirty || 0 != i._parent._transformDirty ? (i._transformDirty = !0, i.globalTransformMatrix = i._globalTransformMatrix) : i.globalTransformMatrix != i._globalTransformMatrix ? (i._transformDirty = !1, i._cacheFrames[e] = i.globalTransformMatrix) : (i._transformDirty = !0, i.globalTransformMatrix = i._globalTransformMatrix)
				} else(i._transformDirty || 0 != i._parent._transformDirty) && (i._transformDirty = !0, i.globalTransformMatrix = i._globalTransformMatrix);
				i._transformDirty && (i._transformDirty = !1, i.globalTransformMatrix == i._globalTransformMatrix && (i._updateGlobalTransformMatrix(), e >= 0 && !i._cacheFrames[e] && (i.globalTransformMatrix = t.SlotTimelineData.cacheFrame(i._cacheFrames, e, i._globalTransformMatrix))), i._updateTransform())
			}
		}, i.prototype._setDisplayList = function(e) {
			if(e && e.length > 0) {
				this._displayList.length != e.length && (this._displayList.length = e.length);
				for(var i = 0, a = e.length; i < a; ++i) {
					var n = e[i];
					n && n != this._rawDisplay && n != this._meshDisplay && !(n instanceof t.Armature) && this._displayList.indexOf(n) < 0 && this._initDisplay(n), this._displayList[i] = n
				}
			} else this._displayList.length > 0 && (this._displayList.length = 0);
			return this._displayIndex >= 0 && this._displayIndex < this._displayList.length ? this._displayDirty = this._display != this._displayList[this._displayIndex] : this._displayDirty = null != this._display, this._displayDirty
		}, i.prototype._setDisplayIndex = function(t) {
			return this._displayIndex != t && (this._displayIndex = t, this._displayDirty = !0, this._displayDirty)
		}, i.prototype._setBlendMode = function(t) {
			return this._blendMode != t && (this._blendMode = t, this._blendModeDirty = !0, !0)
		}, i.prototype._setColor = function(t) {
			return this._colorTransform.copyFrom(t), this._colorDirty = !0, !0
		}, i.prototype.invalidUpdate = function() {
			this._displayDirty = !0
		}, Object.defineProperty(i.prototype, "rawDisplay", {
			get: function() {
				return this._rawDisplay
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "MeshDisplay", {
			get: function() {
				return this._meshDisplay
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "displayIndex", {
			get: function() {
				return this._displayIndex
			},
			set: function(t) {
				this._setDisplayIndex(t) && this._update(-1)
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "displayList", {
			get: function() {
				return this._displayList.concat()
			},
			set: function(e) {
				var i = this._displayList.concat(),
					a = [];
				this._setDisplayList(e) && this._update(-1);
				for(var n = 0, r = i.length; n < r; ++n) {
					var s = i[n];
					s && s != this._rawDisplay && s != this._meshDisplay && this._displayList.indexOf(s) < 0 && a.indexOf(s) < 0 && a.push(s)
				}
				for(var n = 0, r = a.length; n < r; ++n) {
					var s = a[n];
					s instanceof t.Armature ? s.dispose() : this._disposeDisplay(s)
				}
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "display", {
			get: function() {
				return this._display
			},
			set: function(t) {
				if(this._display != t) {
					var e = this._displayList.length;
					if(this._displayIndex < 0 && 0 == e && (this._displayIndex = 0), !(this._displayIndex < 0)) {
						var i = this.displayList;
						e <= this._displayIndex && (i.length = this._displayIndex + 1), i[this._displayIndex] = t, this.displayList = i
					}
				}
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "childArmature", {
			get: function() {
				return this._childArmature
			},
			set: function(t) {
				this._childArmature != t && (t && t.display.advanceTimeBySelf(!1), this.display = t)
			},
			enumerable: !0,
			configurable: !0
		}), i.prototype.getDisplay = function() {
			return this._display
		}, i.prototype.setDisplay = function(t) {
			this.display = t
		}, i
	}(t.TransformObject);
	t.Slot = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function(t) {
		function e() {
			t.call(this)
		}
		return __extends(e, t), e.toString = function() {
			return "[class dragonBones.EventObject]"
		}, e.prototype._onClear = function() {
			this.type = null, this.name = null, this.data = null, this.armature = null, this.bone = null, this.slot = null, this.animationState = null, this.frame = null, this.userData = null
		}, e.START = "start", e.LOOP_COMPLETE = "loopComplete", e.COMPLETE = "complete", e.FADE_IN = "fadeIn", e.FADE_IN_COMPLETE = "fadeInComplete", e.FADE_OUT = "fadeOut", e.FADE_OUT_COMPLETE = "fadeOutComplete", e.FRAME_EVENT = "frameEvent", e.SOUND_EVENT = "soundEvent", e
	}(t.BaseObject);
	t.EventObject = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function() {
		function t(t, e, i, a, n, r, s, o) {
			void 0 === t && (t = 1), void 0 === e && (e = 1), void 0 === i && (i = 1), void 0 === a && (a = 1), void 0 === n && (n = 0), void 0 === r && (r = 0), void 0 === s && (s = 0), void 0 === o && (o = 0), this.alphaMultiplier = t, this.redMultiplier = e, this.greenMultiplier = i, this.blueMultiplier = a, this.alphaOffset = n, this.redOffset = r, this.greenOffset = s, this.blueOffset = o
		}
		return t.prototype.copyFrom = function(t) {
			this.alphaMultiplier = t.alphaMultiplier, this.redMultiplier = t.redMultiplier, this.greenMultiplier = t.greenMultiplier, this.blueMultiplier = t.blueMultiplier, this.alphaOffset = t.alphaOffset, this.redOffset = t.redOffset, this.redOffset = t.redOffset, this.greenOffset = t.blueOffset
		}, t.prototype.identity = function() {
			this.alphaMultiplier = this.redMultiplier = this.greenMultiplier = this.blueMultiplier = 1, this.alphaOffset = this.redOffset = this.greenOffset = this.blueOffset = 0
		}, t
	}();
	t.ColorTransform = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function() {
		function t(t, e, i, a, n, r) {
			void 0 === t && (t = 1), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === a && (a = 1), void 0 === n && (n = 0), void 0 === r && (r = 0), this.a = t, this.b = e, this.c = i, this.d = a, this.tx = n, this.ty = r
		}
		return t.prototype.copyFrom = function(t) {
			this.a = t.a, this.b = t.b, this.c = t.c, this.d = t.d, this.tx = t.tx, this.ty = t.ty
		}, t.prototype.identity = function() {
			this.a = this.d = 1, this.b = this.c = 0, this.tx = this.ty = 0
		}, t.prototype.concat = function(t) {
			var e = this.a,
				i = this.b,
				a = this.c,
				n = this.d,
				r = this.tx,
				s = this.ty,
				o = t.a,
				l = t.b,
				h = t.c,
				_ = t.d,
				u = t.tx,
				f = t.ty;
			this.a = e * o + i * h, this.b = e * l + i * _, this.c = a * o + n * h, this.d = a * l + n * _, this.tx = o * r + h * s + u, this.ty = _ * s + l * r + f
		}, t.prototype.invert = function() {
			var t = this.a,
				e = this.b,
				i = this.c,
				a = this.d,
				n = this.tx,
				r = this.ty,
				s = t * a - e * i;
			this.a = a / s, this.b = -e / s, this.c = -i / s, this.d = t / s, this.tx = (i * r - a * n) / s, this.ty = -(t * r - e * n) / s
		}, t.prototype.transformPoint = function(t, e, i, a) {
			void 0 === a && (a = !1), i.x = this.a * t + this.c * e, i.y = this.b * t + this.d * e, a || (i.x += this.tx, i.y += this.ty)
		}, t
	}();
	t.Matrix = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function() {
		function t(t, e) {
			void 0 === t && (t = 0), void 0 === e && (e = 0), this.x = t, this.y = e
		}
		return t.prototype.copyFrom = function(t) {
			this.x = t.x, this.y = t.y
		}, t.prototype.clear = function() {
			this.x = this.y = 0
		}, t
	}();
	t.Point = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function() {
		function t(t, e, i, a) {
			void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === a && (a = 0), this.x = t, this.y = e, this.width = i, this.height = a
		}
		return t.prototype.copyFrom = function(t) {
			this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height
		}, t.prototype.clear = function() {
			this.x = this.y = 0, this.width = this.height = 0
		}, t
	}();
	t.Rectangle = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function() {
		function t(t, e, i, a, n, r) {
			void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === a && (a = 0), void 0 === n && (n = 1), void 0 === r && (r = 1), this.x = t, this.y = e, this.skewX = i, this.skewY = a, this.scaleX = n, this.scaleY = r
		}
		return t.normalizeRadian = function(t) {
			return t = (t + Math.PI) % (2 * Math.PI), t += t > 0 ? -Math.PI : Math.PI
		}, t.prototype.toString = function() {
			return "[object dragonBones.Transform] x:" + this.x + " y:" + this.y + " skewX:" + 180 * this.skewX / Math.PI + " skewY:" + 180 * this.skewY / Math.PI + " scaleX:" + this.scaleX + " scaleY:" + this.scaleY
		}, t.prototype.copyFrom = function(t) {
			return this.x = t.x, this.y = t.y, this.skewX = t.skewX, this.skewY = t.skewY, this.scaleX = t.scaleX, this.scaleY = t.scaleY, this
		}, t.prototype.clone = function() {
			var e = new t;
			return e.copyFrom(this), e
		}, t.prototype.identity = function() {
			return this.x = this.y = this.skewX = this.skewY = 0, this.scaleX = this.scaleY = 1, this
		}, t.prototype.add = function(t) {
			return this.x += t.x, this.y += t.y, this.skewX += t.skewX, this.skewY += t.skewY, this.scaleX *= t.scaleX, this.scaleY *= t.scaleY, this
		}, t.prototype.minus = function(e) {
			return this.x -= e.x, this.y -= e.y, this.skewX = t.normalizeRadian(this.skewX - e.skewX), this.skewY = t.normalizeRadian(this.skewY - e.skewY), this.scaleX /= e.scaleX, this.scaleY /= e.scaleY, this
		}, t.prototype.fromMatrix = function(t) {
			var e = .25 * Math.PI,
				i = this.scaleX,
				a = this.scaleY;
			return this.x = t.tx, this.y = t.ty, this.skewX = Math.atan(-t.c / t.d), this.skewY = Math.atan(t.b / t.a), this.skewX != this.skewX && (this.skewX = 0), this.skewY != this.skewY && (this.skewY = 0), this.scaleY = this.skewX > -e && this.skewX < e ? t.d / Math.cos(this.skewX) : -t.c / Math.sin(this.skewX), this.scaleX = this.skewY > -e && this.skewY < e ? t.a / Math.cos(this.skewY) : t.b / Math.sin(this.skewY), i >= 0 && this.scaleX < 0 && (this.scaleX = -this.scaleX, this.skewY = this.skewY - Math.PI), a >= 0 && this.scaleY < 0 && (this.scaleY = -this.scaleY, this.skewX = this.skewX - Math.PI), this
		}, t.prototype.toMatrix = function(t) {
			return t.a = this.scaleX * Math.cos(this.skewY), t.b = this.scaleX * Math.sin(this.skewY), t.c = -this.scaleY * Math.sin(this.skewX), t.d = this.scaleY * Math.cos(this.skewX), t.tx = this.x, t.ty = this.y, this
		}, Object.defineProperty(t.prototype, "rotation", {
			get: function() {
				return this.skewY
			},
			set: function(t) {
				var e = t - this.skewY;
				this.skewX += e, this.skewY += e
			},
			enumerable: !0,
			configurable: !0
		}), t
	}();
	t.Transform = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function(t) {
		function e() {
			t.call(this), this.frames = []
		}
		return __extends(e, t), e.prototype._onClear = function() {
			for(var t = null, e = 0, i = this.frames.length; e < i; ++e) {
				var a = this.frames[e];
				t && a != t && t.returnToPool(), t = a
			}
			this.scale = 1, this.offset = 0, this.frames.length = 0
		}, e
	}(t.BaseObject);
	t.TimelineData = e;
	var i = function(e) {
		function i() {
			e.call(this), this.originTransform = new t.Transform, this.cachedFrames = []
		}
		return __extends(i, e), i.cacheFrame = function(e, i, a) {
			var n = e[i] = new t.Matrix;
			return n.copyFrom(a), n
		}, i.toString = function() {
			return "[class dragonBones.BoneTimelineData]"
		}, i.prototype._onClear = function() {
			e.prototype._onClear.call(this), this.bone = null, this.originTransform.identity(), this.cachedFrames.length = 0
		}, i.prototype.cacheFrames = function(t) {
			this.cachedFrames.length = 0, this.cachedFrames.length = t
		}, i
	}(e);
	t.BoneTimelineData = i;
	var a = function(e) {
		function i() {
			e.call(this), this.cachedFrames = []
		}
		return __extends(i, e), i.cacheFrame = function(e, i, a) {
			var n = e[i] = new t.Matrix;
			return n.copyFrom(a), n
		}, i.toString = function() {
			return "[class dragonBones.SlotTimelineData]"
		}, i.prototype._onClear = function() {
			e.prototype._onClear.call(this), this.slot = null, this.cachedFrames.length = 0
		}, i.prototype.cacheFrames = function(t) {
			this.cachedFrames.length = 0, this.cachedFrames.length = t
		}, i
	}(e);
	t.SlotTimelineData = a;
	var n = function(t) {
		function e() {
			t.call(this)
		}
		return __extends(e, t), e.toString = function() {
			return "[class dragonBones.FFDTimelineData]"
		}, e.prototype._onClear = function() {
			t.prototype._onClear.call(this), this.displayIndex = 0, this.skin = null, this.slot = null
		}, e
	}(e);
	t.FFDTimelineData = n
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function(t) {
		function e() {
			t.call(this), this.boneTimelines = {}, this.slotTimelines = {}, this.ffdTimelines = {}, this.cachedFrames = []
		}
		return __extends(e, t), e.toString = function() {
			return "[class dragonBones.AnimationData]"
		}, e.prototype._onClear = function() {
			t.prototype._onClear.call(this);
			for(var e in this.boneTimelines) this.boneTimelines[e].returnToPool(), delete this.boneTimelines[e];
			for(var e in this.slotTimelines) this.slotTimelines[e].returnToPool(), delete this.slotTimelines[e];
			for(var e in this.ffdTimelines) {
				for(var i in this.ffdTimelines[e])
					for(var a in this.ffdTimelines[e][i]) this.ffdTimelines[e][i][a].returnToPool();
				delete this.ffdTimelines[e]
			}
			this.hasAsynchronyTimeline = !1, this.frameCount = 0, this.playTimes = 0, this.position = 0, this.duration = 0, this.fadeInTime = 0, this.cacheTimeToFrameScale = 0, this.name = null, this.animation = null, this.cachedFrames.length = 0
		}, e.prototype.cacheFrames = function(t) {
			if(!this.animation) {
				var e = Math.max(Math.floor((this.frameCount + 1) * this.scale * t), 1);
				this.cacheTimeToFrameScale = e / (this.duration + 1e-6), this.cachedFrames.length = 0, this.cachedFrames.length = e;
				for(var i in this.boneTimelines) this.boneTimelines[i].cacheFrames(e);
				for(var i in this.slotTimelines) this.slotTimelines[i].cacheFrames(e)
			}
		}, e.prototype.addBoneTimeline = function(t) {
			if(!t || !t.bone || this.boneTimelines[t.bone.name]) throw new Error;
			this.boneTimelines[t.bone.name] = t
		}, e.prototype.addSlotTimeline = function(t) {
			if(!t || !t.slot || this.slotTimelines[t.slot.name]) throw new Error;
			this.slotTimelines[t.slot.name] = t
		}, e.prototype.addFFDTimeline = function(t) {
			if(!(t && t.skin && t.slot)) throw new Error;
			var e = this.ffdTimelines[t.skin.name] = this.ffdTimelines[t.skin.name] || {},
				i = e[t.slot.slot.name] = e[t.slot.slot.name] || {};
			if(i[t.displayIndex]) throw new Error;
			i[t.displayIndex] = t
		}, e.prototype.getBoneTimeline = function(t) {
			return this.boneTimelines[t]
		}, e.prototype.getSlotTimeline = function(t) {
			return this.slotTimelines[t]
		}, e.prototype.getFFDTimeline = function(t, e, i) {
			var a = this.ffdTimelines[t];
			if(a) {
				var n = a[e];
				if(n) return n[i]
			}
			return null
		}, e
	}(t.TimelineData);
	t.AnimationData = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function(e) {
		function i() {
			e.call(this), this.aabb = new t.Rectangle, this.bones = {}, this.slots = {}, this.skins = {}, this.animations = {}, this.actions = [], this._sortedBones = [], this._sortedSlots = [], this._bonesChildren = {}
		}
		return __extends(i, e), i._onSortSlots = function(t, e) {
			return t.zOrder > e.zOrder ? 1 : -1
		}, i.toString = function() {
			return "[class dragonBones.ArmatureData]"
		}, i.prototype._onClear = function() {
			for(var t in this.bones) this.bones[t].returnToPool(), delete this.bones[t];
			for(var t in this.slots) this.slots[t].returnToPool(), delete this.slots[t];
			for(var t in this.skins) this.skins[t].returnToPool(), delete this.skins[t];
			for(var t in this.animations) this.animations[t].returnToPool(), delete this.animations[t];
			for(var t = 0, e = this.actions.length; t < e; ++t) this.actions[t].returnToPool();
			this.frameRate = 0, this.type = 0, this.name = null, this.parent = null, this.userData = null, this.aabb.clear(), this.actions.length = 0, this.cacheFrameRate = 0, this.scale = 1;
			for(var t in this._bonesChildren) delete this._bonesChildren[t];
			this._boneDirty = !1, this._slotDirty = !1, this._defaultSkin = null, this._defaultAnimation = null, this._sortedBones.length = 0, this._sortedSlots.length = 0
		}, i.prototype._sortBones = function() {
			var t = this._sortedBones.length;
			if(!(t < 1)) {
				var e = this._sortedBones.concat(),
					i = 0,
					a = 0;
				for(this._sortedBones.length = 0; a < t;) {
					var n = e[i++];
					i >= t && (i = 0), this._sortedBones.indexOf(n) >= 0 || (n.parent && this._sortedBones.indexOf(n.parent) < 0 || n.ik && this._sortedBones.indexOf(n.ik) < 0 || (n.ik && n.chain > 0 && n.chainIndex == n.chain ? this._sortedBones.splice(this._sortedBones.indexOf(n.parent) + 1, 0, n) : this._sortedBones.push(n), a++))
				}
			}
		}, i.prototype._sortSlots = function() {
			this._sortedSlots.sort(i._onSortSlots)
		}, i.prototype.cacheFrames = function(t) {
			if(this.cacheFrameRate != t) {
				this.cacheFrameRate = t;
				var e = this.cacheFrameRate / this.frameRate;
				for(var i in this.animations) this.animations[i].cacheFrames(e)
			}
		}, i.prototype.addBone = function(t, e) {
			if(!t || !t.name || this.bones[t.name]) throw new Error;
			if(e) {
				var i = this.getBone(e);
				i ? t.parent = i : (this._bonesChildren[e] = this._bonesChildren[e] || []).push(t)
			}
			var a = this._bonesChildren[t.name];
			if(a) {
				for(var n = 0, r = a.length; n < r; ++n) a[n].parent = t;
				delete this._bonesChildren[t.name]
			}
			this.bones[t.name] = t, this._sortedBones.push(t), this._boneDirty = !0
		}, i.prototype.addSlot = function(t) {
			if(!t || !t.name || this.slots[t.name]) throw new Error;
			this.slots[t.name] = t, this._sortedSlots.push(t), this._slotDirty = !0
		}, i.prototype.addSkin = function(t) {
			if(!t || !t.name || this.skins[t.name]) throw new Error;
			this.skins[t.name] = t, this._defaultSkin || (this._defaultSkin = t)
		}, i.prototype.addAnimation = function(t) {
			if(!t || !t.name || this.animations[t.name]) throw new Error;
			this.animations[t.name] = t, this._defaultAnimation || (this._defaultAnimation = t)
		}, i.prototype.getBone = function(t) {
			return this.bones[t]
		}, i.prototype.getSlot = function(t) {
			return this.slots[t]
		}, i.prototype.getSkin = function(t) {
			return t ? this.skins[t] : this._defaultSkin
		}, i.prototype.getAnimation = function(t) {
			return t ? this.animations[t] : this._defaultAnimation
		}, Object.defineProperty(i.prototype, "sortedBones", {
			get: function() {
				return this._boneDirty && (this._boneDirty = !1, this._sortBones()), this._sortedBones
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "sortedSlots", {
			get: function() {
				return this._slotDirty && (this._slotDirty = !1, this._sortSlots()), this._sortedSlots
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "defaultSkin", {
			get: function() {
				return this._defaultSkin
			},
			enumerable: !0,
			configurable: !0
		}), Object.defineProperty(i.prototype, "defaultAnimation", {
			get: function() {
				return this._defaultAnimation
			},
			enumerable: !0,
			configurable: !0
		}), i
	}(t.BaseObject);
	t.ArmatureData = e;
	var i = function(e) {
		function i() {
			e.call(this), this.transform = new t.Transform
		}
		return __extends(i, e), i.toString = function() {
			return "[class dragonBones.BoneData]"
		}, i.prototype._onClear = function() {
			this.inheritTranslation = !1, this.inheritRotation = !1, this.inheritScale = !1, this.bendPositive = !1, this.chain = 0, this.chainIndex = 0, this.weight = 0, this.length = 0, this.name = null, this.parent = null, this.ik = null, this.transform.identity()
		}, i
	}(t.BaseObject);
	t.BoneData = i;
	var a = function(e) {
		function i() {
			e.call(this), this.actions = []
		}
		return __extends(i, e), i.generateColor = function() {
			return new t.ColorTransform
		}, i.toString = function() {
			return "[class dragonBones.SlotData]"
		}, i.prototype._onClear = function() {
			for(var t = 0, e = this.actions.length; t < e; ++t) this.actions[t].returnToPool();
			this.displayIndex = 0, this.zOrder = 0, this.blendMode = 0, this.name = null, this.parent = null, this.color = null, this.actions.length = 0
		}, i.DEFAULT_COLOR = new t.ColorTransform, i
	}(t.BaseObject);
	t.SlotData = a;
	var n = function(t) {
		function e() {
			t.call(this), this.slots = {}
		}
		return __extends(e, t), e.toString = function() {
			return "[class dragonBones.SkinData]"
		}, e.prototype._onClear = function() {
			for(var t in this.slots) this.slots[t].returnToPool(), delete this.slots[t];
			this.name = null
		}, e.prototype.addSlot = function(t) {
			if(!t || !t.slot || this.slots[t.slot.name]) throw new Error;
			this.slots[t.slot.name] = t
		}, e.prototype.getSlot = function(t) {
			return this.slots[t]
		}, e
	}(t.BaseObject);
	t.SkinData = n;
	var r = function(t) {
		function e() {
			t.call(this), this.displays = []
		}
		return __extends(e, t), e.toString = function() {
			return "[class dragonBones.SlotDisplayDataSet]"
		}, e.prototype._onClear = function() {
			for(var t = 0, e = this.displays.length; t < e; ++t) this.displays[t].returnToPool();
			this.slot = null, this.displays.length = 0
		}, e
	}(t.BaseObject);
	t.SlotDisplayDataSet = r;
	var s = function(e) {
		function i() {
			e.call(this), this.pivot = new t.Point, this.transform = new t.Transform
		}
		return __extends(i, e), i.toString = function() {
			return "[class dragonBones.DisplayData]"
		}, i.prototype._onClear = function() {
			this.isRelativePivot = !1, this.type = 0, this.name = null, this.texture = null, this.armature = null, this.mesh && (this.mesh.returnToPool(), this.mesh = null), this.pivot.clear(), this.transform.identity()
		}, i
	}(t.BaseObject);
	t.DisplayData = s;
	var o = function(e) {
		function i() {
			e.call(this), this.slotPose = new t.Matrix, this.uvs = [], this.vertices = [], this.vertexIndices = [], this.boneIndices = [], this.weights = [], this.boneVertices = [], this.bones = [], this.inverseBindPose = []
		}
		return __extends(i, e), i.toString = function() {
			return "[class dragonBones.MeshData]"
		}, i.prototype._onClear = function() {
			this.skinned = !1, this.slotPose.identity(), this.uvs.length = 0, this.vertices.length = 0, this.vertexIndices.length = 0, this.boneIndices.length = 0, this.weights.length = 0, this.boneVertices.length = 0, this.bones.length = 0, this.inverseBindPose.length = 0
		}, i
	}(t.BaseObject);
	t.MeshData = o
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function(t) {
		function e() {
			t.call(this), this.armatures = {}, this._armatureNames = []
		}
		return __extends(e, t), e.toString = function() {
			return "[class dragonBones.DragonBonesData]"
		}, e.prototype._onClear = function() {
			for(var t in this.armatures) this.armatures[t].returnToPool(), delete this.armatures[t];
			this.autoSearch = !1, this.frameRate = 0, this.name = null, this._armatureNames.length = 0
		}, e.prototype.getArmature = function(t) {
			return this.armatures[t]
		}, e.prototype.addArmature = function(t) {
			if(!t || !t.name || this.armatures[t.name]) throw new Error;
			this.armatures[t.name] = t, this._armatureNames.push(t.name), t.parent = this
		}, Object.defineProperty(e.prototype, "armatureNames", {
			get: function() {
				return this._armatureNames
			},
			enumerable: !0,
			configurable: !0
		}), e.prototype.dispose = function() {
			this.returnToPool()
		}, e
	}(t.BaseObject);
	t.DragonBonesData = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function(t) {
		function e() {
			t.call(this), this.data = []
		}
		return __extends(e, t), e.toString = function() {
			return "[class dragonBones.ActionData]"
		}, e.prototype._onClear = function() {
			this.type = 0, this.bone = null, this.slot = null, this.data.length = 0
		}, e
	}(t.BaseObject);
	t.ActionData = e;
	var i = function(t) {
		function e() {
			t.call(this)
		}
		return __extends(e, t), e.toString = function() {
			return "[class dragonBones.EventData]"
		}, e.prototype._onClear = function() {
			this.type = 10, this.name = null, this.data = null, this.bone = null, this.slot = null
		}, e
	}(t.BaseObject);
	t.EventData = i;
	var a = function(t) {
		function e() {
			t.call(this)
		}
		return __extends(e, t), e.prototype._onClear = function() {
			this.position = 0, this.duration = 0, this.prev = null, this.next = null
		}, e
	}(t.BaseObject);
	t.FrameData = a;
	var n = function(t) {
		function e() {
			t.call(this)
		}
		return __extends(e, t), e.samplingCurve = function(t, e) {
			if(0 == t.length || 0 == e) return null;
			var i = e + 2,
				a = 1 / i,
				n = new Array(2 * (i - 1));
			t = t.concat(), t.unshift(0, 0), t.push(1, 1);
			for(var r = 0, s = 0; s < i - 1; ++s) {
				for(var o = a * (s + 1); t[r + 6] < o;) r += 6;
				var l = t[r],
					h = t[r + 6],
					_ = (o - l) / (h - l),
					u = 1 - _,
					f = u * u,
					m = _ * _,
					c = u * f,
					p = 3 * _ * f,
					d = 3 * u * m,
					g = _ * m;
				n[2 * s] = c * l + p * t[r + 2] + d * t[r + 4] + g * h, n[2 * s + 1] = c * t[r + 1] + p * t[r + 3] + d * t[r + 5] + g * t[r + 7]
			}
			return n
		}, e.prototype._onClear = function() {
			t.prototype._onClear.call(this), this.tweenEasing = 0, this.curve = null
		}, e
	}(a);
	t.TweenFrameData = n;
	var r = function(t) {
		function e() {
			t.call(this), this.actions = [], this.events = []
		}
		return __extends(e, t), e.toString = function() {
			return "[class dragonBones.AnimationFrameData]"
		}, e.prototype._onClear = function() {
			t.prototype._onClear.call(this);
			for(var e = 0, i = this.actions.length; e < i; ++e) this.actions[e].returnToPool();
			for(var e = 0, i = this.events.length; e < i; ++e) this.events[e].returnToPool();
			this.actions.length = 0, this.events.length = 0
		}, e
	}(a);
	t.AnimationFrameData = r;
	var s = function(e) {
		function i() {
			e.call(this), this.transform = new t.Transform
		}
		return __extends(i, e), i.toString = function() {
			return "[class dragonBones.BoneFrameData]"
		}, i.prototype._onClear = function() {
			e.prototype._onClear.call(this), this.tweenScale = !1, this.tweenRotate = 0, this.transform.identity()
		}, i
	}(n);
	t.BoneFrameData = s;
	var o = function(e) {
		function i() {
			e.call(this)
		}
		return __extends(i, e), i.generateColor = function() {
			return new t.ColorTransform
		}, i.toString = function() {
			return "[class dragonBones.SlotFrameData]"
		}, i.prototype._onClear = function() {
			e.prototype._onClear.call(this), this.displayIndex = 0, this.zOrder = 0, this.color = null
		}, i.DEFAULT_COLOR = new t.ColorTransform, i
	}(n);
	t.SlotFrameData = o;
	var l = function(t) {
		function e() {
			t.call(this), this.tweens = [], this.keys = []
		}
		return __extends(e, t), e.toString = function() {
			return "[class dragonBones.ExtensionFrameData]"
		}, e.prototype._onClear = function() {
			t.prototype._onClear.call(this), this.type = 0, this.tweens.length = 0, this.keys.length = 0
		}, e
	}(n);
	t.ExtensionFrameData = l
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function() {
		function e() {
			this._data = null, this._armature = null, this._skin = null, this._slotDisplayDataSet = null, this._mesh = null, this._animation = null, this._timeline = null, this._isOldData = !1, this._isGlobalTransform = !1, this._isAutoTween = !1, this._animationTweenEasing = 0, this._timelinePivot = new t.Point, this._helpPoint = new t.Point, this._helpTransformA = new t.Transform, this._helpTransformB = new t.Transform, this._helpMatrix = new t.Matrix, this._rawBones = []
		}
		return e._getArmatureType = function(t) {
			switch(t.toLowerCase()) {
				case "stage":
				case "armature":
					return 0;
				case "movieclip":
					return 1;
				default:
					return 0
			}
		}, e._getDisplayType = function(t) {
			switch(t.toLowerCase()) {
				case "image":
					return 0;
				case "armature":
					return 1;
				case "mesh":
					return 2;
				default:
					return 0
			}
		}, e._getBlendMode = function(t) {
			switch(t.toLowerCase()) {
				case "normal":
					return 0;
				case "add":
					return 1;
				case "alpha":
					return 2;
				case "darken":
					return 3;
				case "difference":
					return 4;
				case "erase":
					return 5;
				case "hardlight":
					return 6;
				case "invert":
					return 7;
				case "layer":
					return 8;
				case "lighten":
					return 9;
				case "multiply":
					return 10;
				case "overlay":
					return 11;
				case "screen":
					return 12;
				case "subtract":
					return 13;
				default:
					return 0
			}
		}, e._getActionType = function(t) {
			switch(t.toLowerCase()) {
				case "play":
					return 0;
				case "stop":
					return 1;
				case "gotoandplay":
					return 2;
				case "gotoandstop":
					return 3;
				case "fadein":
					return 4;
				case "fadeout":
					return 5;
				default:
					return 4
			}
		}, e.prototype._getTimelineFrameMatrix = function(e, i, a, n) {
			var r = Math.floor(a * e.frameCount / e.duration);
			if(1 == i.frames.length || r >= i.frames.length) n.copyFrom(i.frames[0].transform);
			else {
				var s = i.frames[r],
					o = 0;
				s.tweenEasing != t.DragonBones.NO_TWEEN ? (o = (a - s.position) / s.duration, 0 != s.tweenEasing && (o = t.TweenTimelineState._getEasingValue(o, s.tweenEasing))) : s.curve && (o = (a - s.position) / s.duration, o = t.TweenTimelineState._getCurveEasingValue(o, s.curve));
				var l = s.next;
				n.x = l.transform.x - s.transform.x, n.y = l.transform.y - s.transform.y, n.skewX = t.Transform.normalizeRadian(l.transform.skewX - s.transform.skewX), n.skewY = t.Transform.normalizeRadian(l.transform.skewY - s.transform.skewY), n.scaleX = l.transform.scaleX - s.transform.scaleX, n.scaleY = l.transform.scaleY - s.transform.scaleY, n.x = s.transform.x + n.x * o, n.y = s.transform.y + n.y * o, n.skewX = s.transform.skewX + n.skewX * o, n.skewY = s.transform.skewY + n.skewY * o, n.scaleX = s.transform.scaleX + n.scaleX * o, n.scaleY = s.transform.scaleY + n.scaleY * o
			}
			n.add(i.originTransform)
		}, e.prototype._globalToLocal = function(t) {
			for(var e = [], i = t.sortedBones.concat().reverse(), a = 0, n = i.length; a < n; ++a) {
				var r = i[a];
				r.parent && (r.parent.transform.toMatrix(this._helpMatrix), this._helpMatrix.invert(), this._helpMatrix.transformPoint(r.transform.x, r.transform.y, this._helpPoint), r.transform.x = this._helpPoint.x, r.transform.y = this._helpPoint.y, r.transform.rotation -= r.parent.transform.rotation);
				for(var s in t.animations) {
					var o = t.animations[s],
						l = o.getBoneTimeline(r.name);
					if(l) {
						var h = r.parent ? o.getBoneTimeline(r.parent.name) : null;
						this._helpTransformB.copyFrom(l.originTransform), e.length = 0;
						for(var _ = 0, u = l.frames.length; _ < u; ++_) {
							var f = l.frames[_];
							e.indexOf(f) >= 0 || (e.push(f), h ? (this._getTimelineFrameMatrix(o, h, f.position, this._helpTransformA), f.transform.add(this._helpTransformB), this._helpTransformA.toMatrix(this._helpMatrix), this._helpMatrix.invert(), this._helpMatrix.transformPoint(f.transform.x, f.transform.y, this._helpPoint), f.transform.x = this._helpPoint.x, f.transform.y = this._helpPoint.y, f.transform.rotation -= this._helpTransformA.rotation) : f.transform.add(this._helpTransformB), f.transform.minus(r.transform), 0 == _ ? (l.originTransform.copyFrom(f.transform), f.transform.identity()) : f.transform.minus(l.originTransform))
						}
					}
				}
			}
		}, e.prototype._mergeFrameToAnimationTimeline = function(e, i, a) {
			var n = Math.floor(e * this._armature.frameRate),
				r = this._animation.frames;
			if(0 == r.length) {
				var s = t.BaseObject.borrowObject(t.AnimationFrameData);
				if(s.position = 0, this._animation.frameCount > 1) {
					r.length = this._animation.frameCount + 1;
					var o = t.BaseObject.borrowObject(t.AnimationFrameData);
					o.position = this._animation.frameCount / this._armature.frameRate, r[0] = s, r[this._animation.frameCount] = o
				}
			}
			var l = null,
				h = r[n];
			if(!h || 0 != n && r[n - 1] != h.prev) {
				l = t.BaseObject.borrowObject(t.AnimationFrameData), l.position = n / this._armature.frameRate, r[n] = l;
				for(var _ = n + 1, u = r.length; _ < u; ++_) h && r[_] == h && (r[_] = null)
			} else l = h;
			if(i)
				for(var _ = 0, u = i.length; _ < u; ++_) l.actions.push(i[_]);
			if(a)
				for(var _ = 0, u = a.length; _ < u; ++_) l.events.push(a[_]);
			for(var f = null, m = null, _ = 0, u = r.length; _ < u; ++_) {
				var c = r[_];
				c && m != c ? (m = c, f && (m.prev = f, f.next = m, f.duration = m.position - f.position), f = m) : r[_] = f
			}
			m.duration = this._animation.duration - m.position, m = r[0], f.next = m, m.prev = f
		}, e.parseDragonBonesData = function(e) {
			return t.ObjectDataParser.getInstance().parseDragonBonesData(e)
		}, e.parseTextureAtlasData = function(i, a) {
			void 0 === a && (a = 1);
			for(var n = {}, r = i[e.SUB_TEXTURE], s = 0, o = r.length; s < o; s++) {
				var l = r[s],
					h = l[e.NAME],
					_ = new t.Rectangle,
					u = null;
				_.x = l[e.X] / a, _.y = l[e.Y] / a, _.width = l[e.WIDTH] / a, _.height = l[e.HEIGHT] / a, e.FRAME_WIDTH in l && (u = new t.Rectangle, u.x = l[e.FRAME_X] / a, u.y = l[e.FRAME_Y] / a, u.width = l[e.FRAME_WIDTH] / a, u.height = l[e.FRAME_HEIGHT] / a), n[h] = {
					region: _,
					frame: u,
					rotated: !1
				}
			}
			return n
		}, e.DATA_VERSION_2_3 = "2.3", e.DATA_VERSION_3_0 = "3.0", e.DATA_VERSION_4_0 = "4.0", e.DATA_VERSION = "4.5", e.TEXTURE_ATLAS = "TextureAtlas", e.SUB_TEXTURE = "SubTexture", e.FORMAT = "format", e.IMAGE_PATH = "imagePath", e.WIDTH = "width", e.HEIGHT = "height", e.ROTATED = "rotated", e.FRAME_X = "frameX", e.FRAME_Y = "frameY", e.FRAME_WIDTH = "frameWidth", e.FRAME_HEIGHT = "frameHeight", e.DRADON_BONES = "dragonBones", e.ARMATURE = "armature", e.BONE = "bone", e.IK = "ik", e.SLOT = "slot", e.SKIN = "skin", e.DISPLAY = "display", e.ANIMATION = "animation", e.FFD = "ffd", e.FRAME = "frame", e.PIVOT = "pivot", e.TRANSFORM = "transform", e.AABB = "aabb", e.COLOR = "color", e.FILTER = "filter", e.VERSION = "version", e.IS_GLOBAL = "isGlobal", e.FRAME_RATE = "frameRate", e.TYPE = "type", e.NAME = "name", e.PARENT = "parent", e.LENGTH = "length", e.DATA = "data", e.DISPLAY_INDEX = "displayIndex", e.Z_ORDER = "z", e.BLEND_MODE = "blendMode", e.INHERIT_TRANSLATION = "inheritTranslation", e.INHERIT_ROTATION = "inheritRotation", e.INHERIT_SCALE = "inheritScale", e.TARGET = "target", e.BEND_POSITIVE = "bendPositive", e.CHAIN = "chain", e.WEIGHT = "weight", e.FADE_IN_TIME = "fadeInTime", e.PLAY_TIMES = "playTimes", e.SCALE = "scale", e.OFFSET = "offset", e.POSITION = "position", e.DURATION = "duration", e.TWEEN_EASING = "tweenEasing", e.TWEEN_ROTATE = "tweenRotate", e.TWEEN_SCALE = "tweenScale", e.CURVE = "curve", e.EVENT = "event", e.SOUND = "sound", e.ACTION = "action", e.ACTIONS = "actions", e.DEFAULT_ACTIONS = "defaultActions", e.X = "x", e.Y = "y", e.SKEW_X = "skX", e.SKEW_Y = "skY", e.SCALE_X = "scX", e.SCALE_Y = "scY", e.ALPHA_OFFSET = "aO", e.RED_OFFSET = "rO", e.GREEN_OFFSET = "gO", e.BLUE_OFFSET = "bO", e.ALPHA_MULTIPLIER = "aM", e.RED_MULTIPLIER = "rM", e.GREEN_MULTIPLIER = "gM", e.BLUE_MULTIPLIER = "bM", e.UVS = "uvs", e.VERTICES = "vertices", e.TRIANGLES = "triangles", e.WEIGHTS = "weights", e.SLOT_POSE = "slotPose", e.BONE_POSE = "bonePose", e.TWEEN = "tween", e.KEY = "key", e.COLOR_TRANSFORM = "colorTransform", e.TIMELINE = "timeline", e.PIVOT_X = "pX", e.PIVOT_Y = "pY", e.LOOP = "loop", e.AUTO_TWEEN = "autoTween", e.HIDE = "hide", e.RECTANGLE = "rectangle", e.ELLIPSE = "ellipse", e
	}();
	t.DataParser = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function(e) {
		function i() {
			e.call(this)
		}
		return __extends(i, e), i._getBoolean = function(t, e, i) {
			if(e in t) {
				var a = t[e],
					n = typeof a;
				if("boolean" == n) return a;
				if("string" != n) return !!a;
				switch(a) {
					case "0":
					case "NaN":
					case "":
					case "false":
					case "null":
					case "undefined":
						return !1;
					default:
						return !0
				}
			}
			return i
		}, i._getNumber = function(t, e, i) {
			if(e in t) {
				var a = t[e];
				return null == a || "NaN" == a ? i : +a || 0
			}
			return i
		}, i._getString = function(t, e, i) {
			return e in t ? String(t[e]) : i
		}, i._getParameter = function(t, e, i) {
			return t.length > e ? t[e] : i
		}, i.prototype._parseArmature = function(e, a) {
			var n = t.BaseObject.borrowObject(t.ArmatureData);
			if(n.name = i._getString(e, i.NAME, null), n.frameRate = i._getNumber(e, i.FRAME_RATE, this._data.frameRate) || this._data.frameRate, n.scale = a, i.TYPE in e && "string" == typeof e[i.TYPE] ? n.type = i._getArmatureType(e[i.TYPE]) : n.type = i._getNumber(e, i.TYPE, 0), this._armature = n, this._rawBones.length = 0, i.AABB in e) {
				var r = e[i.AABB];
				n.aabb.x = i._getNumber(r, i.X, 0), n.aabb.y = i._getNumber(r, i.Y, 0), n.aabb.width = i._getNumber(r, i.WIDTH, 0), n.aabb.height = i._getNumber(r, i.HEIGHT, 0)
			}
			if(i.BONE in e)
				for(var s = e[i.BONE], o = 0, l = s.length; o < l; ++o) {
					var h = s[o],
						_ = this._parseBone(h);
					n.addBone(_, i._getString(h, i.PARENT, null)), this._rawBones.push(_)
				}
			if(i.IK in e)
				for(var u = e[i.IK], o = 0, l = u.length; o < l; ++o) this._parseIK(u[o]);
			if(i.SLOT in e)
				for(var f = e[i.SLOT], m = 0, o = 0, l = f.length; o < l; ++o) n.addSlot(this._parseSlot(f[o], m++));
			if(i.SKIN in e)
				for(var c = e[i.SKIN], o = 0, l = c.length; o < l; ++o) n.addSkin(this._parseSkin(c[o]));
			if(i.ANIMATION in e)
				for(var p = e[i.ANIMATION], o = 0, l = p.length; o < l; ++o) n.addAnimation(this._parseAnimation(p[o]));
			return(i.ACTIONS in e || i.DEFAULT_ACTIONS in e) && this._parseActionData(e, n.actions, null, null), this._isOldData && this._isGlobalTransform && this._globalToLocal(n), this._armature = null, this._rawBones.length = 0, n
		}, i.prototype._parseBone = function(e) {
			var a = t.BaseObject.borrowObject(t.BoneData);
			return a.name = i._getString(e, i.NAME, null), a.inheritTranslation = i._getBoolean(e, i.INHERIT_TRANSLATION, !0), a.inheritRotation = i._getBoolean(e, i.INHERIT_ROTATION, !0), a.inheritScale = i._getBoolean(e, i.INHERIT_SCALE, !0), a.length = i._getNumber(e, i.LENGTH, 0) * this._armature.scale, i.TRANSFORM in e && this._parseTransform(e[i.TRANSFORM], a.transform), this._isOldData && (a.inheritScale = !1), a
		}, i.prototype._parseIK = function(t) {
			var e = this._armature.getBone(i._getString(t, i.BONE in t ? i.BONE : i.NAME, null));
			e && (e.ik = this._armature.getBone(i._getString(t, i.TARGET, null)), e.bendPositive = i._getBoolean(t, i.BEND_POSITIVE, !0), e.chain = i._getNumber(t, i.CHAIN, 0), e.weight = i._getNumber(t, i.WEIGHT, 1), e.chain > 0 && e.parent && !e.parent.ik ? (e.parent.ik = e.ik, e.parent.chainIndex = 0, e.parent.chain = 0, e.chainIndex = 1) : (e.chain = 0, e.chainIndex = 0))
		}, i.prototype._parseSlot = function(e, a) {
			var n = t.BaseObject.borrowObject(t.SlotData);
			return n.name = i._getString(e, i.NAME, null), n.parent = this._armature.getBone(i._getString(e, i.PARENT, null)), n.displayIndex = i._getNumber(e, i.DISPLAY_INDEX, 0), n.zOrder = i._getNumber(e, i.Z_ORDER, a), i.COLOR in e || i.COLOR_TRANSFORM in e ? (n.color = t.SlotData.generateColor(), this._parseColorTransform(e[i.COLOR] || e[i.COLOR_TRANSFORM], n.color)) : n.color = t.SlotData.DEFAULT_COLOR, i.BLEND_MODE in e && "string" == typeof e[i.BLEND_MODE] ? n.blendMode = i._getBlendMode(e[i.BLEND_MODE]) : n.blendMode = i._getNumber(e, i.BLEND_MODE, 0), (i.ACTIONS in e || i.DEFAULT_ACTIONS in e) && this._parseActionData(e, n.actions, null, null), this._isOldData && (i.COLOR_TRANSFORM in e ? (n.color = t.SlotData.generateColor(), this._parseColorTransform(e[i.COLOR_TRANSFORM], n.color)) : n.color = t.SlotData.DEFAULT_COLOR), n
		}, i.prototype._parseSkin = function(e) {
			var a = t.BaseObject.borrowObject(t.SkinData);
			if(a.name = i._getString(e, i.NAME, "__default") || "__default", i.SLOT in e) {
				this._skin = a;
				for(var n = e[i.SLOT], r = 0, s = 0, o = n.length; s < o; ++s) this._isOldData && this._armature.addSlot(this._parseSlot(n[s], r++)), a.addSlot(this._parseSlotDisplaySet(n[s]));
				this._skin = null
			}
			return a
		}, i.prototype._parseSlotDisplaySet = function(e) {
			var a = t.BaseObject.borrowObject(t.SlotDisplayDataSet);
			if(a.slot = this._armature.getSlot(i._getString(e, i.NAME, null)), i.DISPLAY in e) {
				var n = e[i.DISPLAY],
					r = a.displays;
				this._slotDisplayDataSet = a;
				for(var s = 0, o = n.length; s < o; ++s) r.push(this._parseDisplay(n[s]));
				this._slotDisplayDataSet = null
			}
			return a
		}, i.prototype._parseDisplay = function(e) {
			var a = t.BaseObject.borrowObject(t.DisplayData);
			if(a.name = i._getString(e, i.NAME, null), i.TYPE in e && "string" == typeof e[i.TYPE] ? a.type = i._getDisplayType(e[i.TYPE]) : a.type = i._getNumber(e, i.TYPE, 0), a.isRelativePivot = !0, i.PIVOT in e) {
				var n = e[i.PIVOT];
				a.pivot.x = i._getNumber(n, i.X, 0), a.pivot.y = i._getNumber(n, i.Y, 0)
			} else if(this._isOldData) {
				var r = e[i.TRANSFORM];
				a.isRelativePivot = !1, a.pivot.x = i._getNumber(r, i.PIVOT_X, 0) * this._armature.scale, a.pivot.y = i._getNumber(r, i.PIVOT_Y, 0) * this._armature.scale
			} else a.pivot.x = .5, a.pivot.y = .5;
			switch(i.TRANSFORM in e && this._parseTransform(e[i.TRANSFORM], a.transform), a.type) {
				case 0:
				case 1:
					break;
				case 2:
					a.mesh = this._parseMesh(e)
			}
			return a
		}, i.prototype._parseMesh = function(e) {
			var a = t.BaseObject.borrowObject(t.MeshData),
				n = e[i.VERTICES],
				r = e[i.UVS],
				s = e[i.TRIANGLES],
				o = Math.floor(n.length / 2),
				l = Math.floor(s.length / 3),
				h = new Array(this._armature.sortedBones.length);
			if(a.skinned = i.WEIGHTS in e && e[i.WEIGHTS].length > 0, a.uvs.length = 2 * o, a.vertices.length = 2 * o, a.vertexIndices.length = 3 * l, a.skinned) {
				if(a.boneIndices.length = o, a.weights.length = o, a.boneVertices.length = o, i.SLOT_POSE in e) {
					var _ = e[i.SLOT_POSE];
					a.slotPose.a = _[0], a.slotPose.b = _[1], a.slotPose.c = _[2], a.slotPose.d = _[3], a.slotPose.tx = _[4], a.slotPose.ty = _[5]
				}
				if(i.BONE_POSE in e)
					for(var u = e[i.BONE_POSE], f = 0, m = u.length; f < m; f += 7) {
						var c = u[f],
							p = h[c] = new t.Matrix;
						p.a = u[f + 1], p.b = u[f + 2], p.c = u[f + 3], p.d = u[f + 4], p.tx = u[f + 5], p.ty = u[f + 6], p.invert()
					}
			}
			for(var f = 0, d = 0, m = n.length; f < m; f += 2) {
				var g = f + 1,
					y = f / 2,
					T = a.vertices[f] = n[f] * this._armature.scale,
					v = a.vertices[g] = n[g] * this._armature.scale;
				if(a.uvs[f] = r[f], a.uvs[g] = r[g], a.skinned) {
					var b = e[i.WEIGHTS],
						D = b[d],
						O = a.boneIndices[y] = new Array(D),
						S = a.weights[y] = new Array(D),
						E = a.boneVertices[y] = new Array(2 * D);
					a.slotPose.transformPoint(T, v, this._helpPoint), T = a.vertices[f] = this._helpPoint.x, v = a.vertices[g] = this._helpPoint.y;
					for(var w = 0; w < D; ++w) {
						var A = d + 1 + 2 * w,
							c = b[A],
							x = this._rawBones[c],
							B = a.bones.indexOf(x);
						B < 0 && (B = a.bones.length, a.bones[B] = x, a.inverseBindPose[B] = h[c]), a.inverseBindPose[B].transformPoint(T, v, this._helpPoint), O[w] = B, S[w] = b[A + 1], E[2 * w] = this._helpPoint.x, E[2 * w + 1] = this._helpPoint.y
					}
					d += 2 * D + 1
				}
			}
			for(var f = 0, m = s.length; f < m; ++f) a.vertexIndices[f] = s[f];
			return a
		}, i.prototype._parseAnimation = function(e) {
			var a = t.BaseObject.borrowObject(t.AnimationData);
			a.name = i._getString(e, i.NAME, "__default") || "__default", a.frameCount = Math.max(i._getNumber(e, i.DURATION, 1), 1), a.position = i._getNumber(e, i.POSITION, 0) / this._armature.frameRate, a.duration = a.frameCount / this._armature.frameRate, a.playTimes = i._getNumber(e, i.PLAY_TIMES, 1), a.fadeInTime = i._getNumber(e, i.FADE_IN_TIME, 0), this._animation = a;
			var n = i._getString(e, i.ANIMATION, null);
			if(n) return a.animation = this._armature.getAnimation(n), a.animation, a;
			if(this._parseTimeline(e, a, this._parseAnimationFrame), i.BONE in e)
				for(var r = e[i.BONE], s = 0, o = r.length; s < o; ++s) a.addBoneTimeline(this._parseBoneTimeline(r[s]));
			if(i.SLOT in e)
				for(var l = e[i.SLOT], s = 0, o = l.length; s < o; ++s) a.addSlotTimeline(this._parseSlotTimeline(l[s]));
			if(i.FFD in e)
				for(var h = e[i.FFD], s = 0, o = h.length; s < o; ++s) a.addFFDTimeline(this._parseFFDTimeline(h[s]));
			if(this._isOldData) {
				if(this._isAutoTween = i._getBoolean(e, i.AUTO_TWEEN, !0), this._animationTweenEasing = i._getNumber(e, i.TWEEN_EASING, 0) || 0, a.playTimes = i._getNumber(e, i.LOOP, 1), i.TIMELINE in e) {
					for(var _ = e[i.TIMELINE], s = 0, o = _.length; s < o; ++s) a.addBoneTimeline(this._parseBoneTimeline(_[s]));
					for(var s = 0, o = _.length; s < o; ++s) a.addSlotTimeline(this._parseSlotTimeline(_[s]))
				}
			} else this._isAutoTween = !1, this._animationTweenEasing = 0;
			for(var s in this._armature.bones) {
				var u = this._armature.bones[s];
				if(!a.getBoneTimeline(u.name)) {
					var f = t.BaseObject.borrowObject(t.BoneTimelineData),
						m = t.BaseObject.borrowObject(t.BoneFrameData);
					f.bone = u, f.frames[0] = m, a.addBoneTimeline(f)
				}
			}
			for(var s in this._armature.slots) {
				var c = this._armature.slots[s];
				if(!a.getSlotTimeline(c.name)) {
					var p = t.BaseObject.borrowObject(t.SlotTimelineData),
						d = t.BaseObject.borrowObject(t.SlotFrameData);
					p.slot = c, d.displayIndex = c.displayIndex, c.color == t.SlotData.DEFAULT_COLOR ? d.color = t.SlotFrameData.DEFAULT_COLOR : (d.color = t.SlotFrameData.generateColor(), d.color.copyFrom(c.color)), p.frames[0] = d, a.addSlotTimeline(p), this._isOldData && (d.displayIndex = -1)
				}
			}
			return this._animation = null, a
		}, i.prototype._parseBoneTimeline = function(e) {
			var a = t.BaseObject.borrowObject(t.BoneTimelineData);
			a.bone = this._armature.getBone(i._getString(e, i.NAME, null)), this._parseTimeline(e, a, this._parseBoneFrame);
			for(var n = a.originTransform, r = null, s = 0, o = a.frames.length; s < o; ++s) {
				var l = a.frames[s];
				r ? r != l && l.transform.minus(n) : (n.copyFrom(l.transform), l.transform.identity(), 0 == n.scaleX && (n.scaleX = .001), 0 == n.scaleY && (n.scaleY = .001)), r = l
			}
			return 1 == a.scale && 0 == a.offset || (this._animation.hasAsynchronyTimeline = !0), this._isOldData && (i.PIVOT_X in e || i.PIVOT_Y in e) ? (this._timelinePivot.x = i._getNumber(e, i.PIVOT_X, 0), this._timelinePivot.y = i._getNumber(e, i.PIVOT_Y, 0)) : this._timelinePivot.clear(), a
		}, i.prototype._parseSlotTimeline = function(e) {
			var a = t.BaseObject.borrowObject(t.SlotTimelineData);
			return a.slot = this._armature.getSlot(i._getString(e, i.NAME, null)), this._parseTimeline(e, a, this._parseSlotFrame), 1 == a.scale && 0 == a.offset || (this._animation.hasAsynchronyTimeline = !0), a
		}, i.prototype._parseFFDTimeline = function(e) {
			var a = t.BaseObject.borrowObject(t.FFDTimelineData);
			a.skin = this._armature.getSkin(i._getString(e, i.SKIN, null)), a.slot = a.skin.getSlot(i._getString(e, i.SLOT, null));
			for(var n = i._getString(e, i.NAME, null), r = 0, s = a.slot.displays.length; r < s; ++r) {
				var o = a.slot.displays[r];
				if(o.mesh && o.name == n) {
					a.displayIndex = r, this._mesh = o.mesh;
					break
				}
			}
			return this._parseTimeline(e, a, this._parseFFDFrame), this._mesh = null, a
		}, i.prototype._parseAnimationFrame = function(e, a, n) {
			var r = t.BaseObject.borrowObject(t.AnimationFrameData);
			return this._parseFrame(e, r, a, n), (i.ACTION in e || i.ACTIONS in e) && this._parseActionData(e, r.actions, null, null), (i.EVENT in e || i.SOUND in e) && this._parseEventData(e, r.events, null, null), r
		}, i.prototype._parseBoneFrame = function(e, a, n) {
			var r = t.BaseObject.borrowObject(t.BoneFrameData);
			if(r.tweenRotate = i._getNumber(e, i.TWEEN_ROTATE, 0), r.tweenScale = i._getBoolean(e, i.TWEEN_SCALE, !0), this._parseTweenFrame(e, r, a, n), i.TRANSFORM in e) {
				var s = e[i.TRANSFORM];
				this._parseTransform(s, r.transform), this._isOldData && (this._helpPoint.x = this._timelinePivot.x + i._getNumber(s, i.PIVOT_X, 0), this._helpPoint.y = this._timelinePivot.y + i._getNumber(s, i.PIVOT_Y, 0), r.transform.toMatrix(this._helpMatrix), this._helpMatrix.transformPoint(this._helpPoint.x, this._helpPoint.y, this._helpPoint, !0), r.transform.x += this._helpPoint.x, r.transform.y += this._helpPoint.y)
			}
			var o = this._timeline.bone,
				l = [],
				h = [];
			if(i.ACTION in e || i.ACTIONS in e) {
				var _ = this._armature.getSlot(o.name);
				this._parseActionData(e, l, o, _)
			}
			return(i.EVENT in e || i.SOUND in e) && this._parseEventData(e, h, o, null), (l.length > 0 || h.length > 0) && this._mergeFrameToAnimationTimeline(r.position, l, h), r
		}, i.prototype._parseSlotFrame = function(e, a, n) {
			var r = t.BaseObject.borrowObject(t.SlotFrameData);
			if(r.displayIndex = i._getNumber(e, i.DISPLAY_INDEX, 0), this._parseTweenFrame(e, r, a, n), i.COLOR in e || i.COLOR_TRANSFORM in e ? (r.color = t.SlotFrameData.generateColor(), this._parseColorTransform(e[i.COLOR] || e[i.COLOR_TRANSFORM], r.color)) : r.color = t.SlotFrameData.DEFAULT_COLOR, this._isOldData) i._getBoolean(e, i.HIDE, !1) && (r.displayIndex = -1);
			else if(i.ACTION in e || i.ACTIONS in e) {
				var s = this._timeline.slot,
					o = [];
				this._parseActionData(e, o, s.parent, s), this._mergeFrameToAnimationTimeline(r.position, o, null)
			}
			return r
		}, i.prototype._parseFFDFrame = function(e, a, n) {
			var r = t.BaseObject.borrowObject(t.ExtensionFrameData);
			r.type = i._getNumber(e, i.TYPE, 0), this._parseTweenFrame(e, r, a, n);
			for(var s = e[i.VERTICES], o = i._getNumber(e, i.OFFSET, 0), l = 0, h = 0, _ = 0, u = this._mesh.vertices.length; _ < u; _ += 2)
				if(!s || _ < o || _ - o >= s.length ? (l = 0, h = 0) : (l = s[_ - o] * this._armature.scale, h = s[_ + 1 - o] * this._armature.scale), this._mesh.skinned) {
					this._mesh.slotPose.transformPoint(l, h, this._helpPoint, !0), l = this._helpPoint.x, h = this._helpPoint.y;
					for(var f = this._mesh.boneIndices[_ / 2], m = 0, c = f.length; m < c; ++m) {
						var p = f[m];
						this._mesh.inverseBindPose[p].transformPoint(l, h, this._helpPoint, !0), r.tweens.push(this._helpPoint.x, this._helpPoint.y)
					}
				} else r.tweens.push(l, h);
			return r
		}, i.prototype._parseTweenFrame = function(e, a, n, r) {
			this._parseFrame(e, a, n, r), a.duration > 0 ? (i.TWEEN_EASING in e ? a.tweenEasing = i._getNumber(e, i.TWEEN_EASING, t.DragonBones.NO_TWEEN) : this._isOldData ? a.tweenEasing = this._isAutoTween ? this._animationTweenEasing : t.DragonBones.NO_TWEEN : a.tweenEasing = t.DragonBones.NO_TWEEN, this._isOldData && 1 == this._animation.scale && 1 == this._timeline.scale && a.duration * this._armature.frameRate < 2 && (a.tweenEasing = t.DragonBones.NO_TWEEN), i.CURVE in e && (a.curve = t.TweenFrameData.samplingCurve(e[i.CURVE], r))) : (a.tweenEasing = t.DragonBones.NO_TWEEN, a.curve = null)
		}, i.prototype._parseFrame = function(t, e, i, a) {
			e.position = i / this._armature.frameRate, e.duration = a / this._armature.frameRate
		}, i.prototype._parseTimeline = function(e, a, n) {
			if(a.scale = i._getNumber(e, i.SCALE, 1), a.offset = i._getNumber(e, i.OFFSET, 0), this._timeline = a, i.FRAME in e) {
				var r = e[i.FRAME];
				if(r.length > 0)
					if(1 == r.length) a.frames.length = 1, a.frames[0] = n.call(this, r[0], 0, i._getNumber(r[0], i.DURATION, 1));
					else {
						a.frames.length = this._animation.frameCount + 1;
						for(var s = 0, o = 0, l = null, h = null, _ = 0, u = 0, f = a.frames.length; _ < f; ++_) {
							if(s + o <= _ && u < r.length) {
								var m = r[u++];
								s = _, o = i._getNumber(m, i.DURATION, 1), l = n.call(this, m, s, o), h && (h.next = l, l.prev = h, this._isOldData && h instanceof t.TweenFrameData && m[i.DISPLAY_INDEX] == -1 && (h.tweenEasing = t.DragonBones.NO_TWEEN)), h = l
							}
							a.frames[_] = l
						}
						l.duration = this._animation.duration - l.position, l = a.frames[0], h.next = l, l.prev = h, this._isOldData && h instanceof t.TweenFrameData && r[0][i.DISPLAY_INDEX] == -1 && (h.tweenEasing = t.DragonBones.NO_TWEEN)
					}
			}
			this._timeline = null
		}, i.prototype._parseActionData = function(e, a, n, r) {
			var s = e[i.ACTION] || e[i.ACTIONS] || e[i.DEFAULT_ACTIONS];
			if("string" == typeof s) {
				var o = t.BaseObject.borrowObject(t.ActionData);
				o.type = 4, o.bone = n, o.slot = r, o.data[0] = s, o.data[1] = -1, o.data[2] = -1, a.push(o)
			} else if(s instanceof Array)
				for(var l = 0, h = s.length; l < h; ++l) {
					var _ = s[l],
						u = _ instanceof Array,
						o = t.BaseObject.borrowObject(t.ActionData),
						f = u ? i._getParameter(_, 1, null) : i._getString(_, "gotoAndPlay", null);
					if(u) {
						var m = _[0];
						o.type = "string" == typeof m ? i._getActionType(m) : i._getParameter(_, 0, 4)
					} else o.type = 2;
					switch(o.type) {
						case 0:
							o.data[0] = f, o.data[1] = u ? i._getParameter(_, 2, -1) : -1;
							break;
						case 1:
							o.data[0] = f;
							break;
						case 2:
							o.data[0] = f, o.data[1] = u ? i._getParameter(_, 2, 0) : 0, o.data[2] = u ? i._getParameter(_, 3, -1) : -1;
							break;
						case 3:
							o.data[0] = f, o.data[1] = u ? i._getParameter(_, 2, 0) : 0;
							break;
						case 4:
							o.data[0] = f, o.data[1] = u ? i._getParameter(_, 2, -1) : -1, o.data[2] = u ? i._getParameter(_, 3, -1) : -1;
							break;
						case 5:
							o.data[0] = f, o.data[1] = u ? i._getParameter(_, 2, 0) : 0
					}
					o.bone = n, o.slot = r, a.push(o)
				}
		}, i.prototype._parseEventData = function(e, a, n, r) {
			if(i.SOUND in e) {
				var s = t.BaseObject.borrowObject(t.EventData);
				s.type = 11, s.name = e[i.SOUND], s.bone = n, s.slot = r, a.push(s)
			}
			if(i.EVENT in e) {
				var o = t.BaseObject.borrowObject(t.EventData);
				o.type = 10, o.name = e[i.EVENT], o.bone = n, o.slot = r, i.DATA in e && (o.data = e[i.DATA]), a.push(o)
			}
		}, i.prototype._parseTransform = function(e, a) {
			a.x = i._getNumber(e, i.X, 0) * this._armature.scale, a.y = i._getNumber(e, i.Y, 0) * this._armature.scale, a.skewX = i._getNumber(e, i.SKEW_X, 0) * t.DragonBones.ANGLE_TO_RADIAN, a.skewY = i._getNumber(e, i.SKEW_Y, 0) * t.DragonBones.ANGLE_TO_RADIAN, a.scaleX = i._getNumber(e, i.SCALE_X, 1), a.scaleY = i._getNumber(e, i.SCALE_Y, 1)
		}, i.prototype._parseColorTransform = function(t, e) {
			e.alphaMultiplier = .01 * i._getNumber(t, i.ALPHA_MULTIPLIER, 100), e.redMultiplier = .01 * i._getNumber(t, i.RED_MULTIPLIER, 100), e.greenMultiplier = .01 * i._getNumber(t, i.GREEN_MULTIPLIER, 100), e.blueMultiplier = .01 * i._getNumber(t, i.BLUE_MULTIPLIER, 100), e.alphaOffset = i._getNumber(t, i.ALPHA_OFFSET, 0), e.redOffset = i._getNumber(t, i.RED_OFFSET, 0), e.greenOffset = i._getNumber(t, i.GREEN_OFFSET, 0), e.blueOffset = i._getNumber(t, i.BLUE_OFFSET, 0)
		}, i.prototype.parseDragonBonesData = function(e, a) {
			if(void 0 === a && (a = 1), e) {
				var n = i._getString(e, i.VERSION, null);
				if(this._isOldData = n == i.DATA_VERSION_2_3 || n == i.DATA_VERSION_3_0, this._isOldData ? this._isGlobalTransform = i._getBoolean(e, i.IS_GLOBAL, !0) : this._isGlobalTransform = !1, n == i.DATA_VERSION || n == i.DATA_VERSION_4_0 || this._isOldData) {
					var r = t.BaseObject.borrowObject(t.DragonBonesData);
					if(r.name = i._getString(e, i.NAME, null), r.frameRate = i._getNumber(e, i.FRAME_RATE, 24) || 24, i.ARMATURE in e) {
						this._data = r;
						for(var s = e[i.ARMATURE], o = 0, l = s.length; o < l; ++o) r.addArmature(this._parseArmature(s[o], a));
						this._data = null
					}
					return r
				}
				throw new Error("Nonsupport data version.")
			}
			throw new Error("No data.")
		}, i.prototype.parseTextureAtlasData = function(e, a, n) {
			if(void 0 === n && (n = 0), !e) throw new Error("No data.");
			if(a.name = i._getString(e, i.NAME, null), a.imagePath = i._getString(e, i.IMAGE_PATH, null), n > 0 ? a.scale = n : n = a.scale = i._getNumber(e, i.SCALE, a.scale), n = 1 / n, i.SUB_TEXTURE in e)
				for(var r = e[i.SUB_TEXTURE], s = 0, o = r.length; s < o; ++s) {
					var l = r[s],
						h = a.generateTextureData();
					h.name = i._getString(l, i.NAME, null), h.rotated = i._getBoolean(l, i.ROTATED, !1), h.region.x = i._getNumber(l, i.X, 0) * n, h.region.y = i._getNumber(l, i.Y, 0) * n, h.region.width = i._getNumber(l, i.WIDTH, 0) * n, h.region.height = i._getNumber(l, i.HEIGHT, 0) * n;
					var _ = i._getNumber(l, i.FRAME_WIDTH, -1),
						u = i._getNumber(l, i.FRAME_HEIGHT, -1);
					_ > 0 && u > 0 && (h.frame = t.TextureData.generateRectangle(), h.frame.x = i._getNumber(l, i.FRAME_X, 0) * n, h.frame.y = i._getNumber(l, i.FRAME_Y, 0) * n, h.frame.width = _ * n, h.frame.height = u * n), a.addTexture(h)
				}
		}, i.getInstance = function() {
			return i._instance || (i._instance = new i), i._instance
		}, i._instance = null, i
	}(t.DataParser);
	t.ObjectDataParser = e
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function(t) {
		function e() {
			t.call(this), this.textures = {}
		}
		return __extends(e, t), e.prototype._onClear = function() {
			for(var t in this.textures) this.textures[t].returnToPool(), delete this.textures[t];
			this.autoSearch = !1, this.scale = 1, this.name = null, this.imagePath = null
		}, e.prototype.addTexture = function(t) {
			if(!t || !t.name || this.textures[t.name]) throw new Error;
			this.textures[t.name] = t, t.parent = this
		}, e.prototype.getTexture = function(t) {
			return this.textures[t]
		}, e
	}(t.BaseObject);
	t.TextureAtlasData = e;
	var i = function(e) {
		function i() {
			e.call(this), this.region = new t.Rectangle
		}
		return __extends(i, e), i.generateRectangle = function() {
			return new t.Rectangle
		}, i.prototype._onClear = function() {
			this.rotated = !1, this.name = null, this.frame = null, this.parent = null, this.region.clear()
		}, i
	}(t.BaseObject);
	t.TextureData = i
}(dragonBones || (dragonBones = {}));
var dragonBones;
! function(t) {
	var e = function() {
		function e(i) {
			void 0 === i && (i = null), this.autoSearch = !1, this._dataParser = null, this._dragonBonesDataMap = {}, this._textureAtlasDataMap = {}, this._dataParser = i, this._dataParser || (e._defaultParser || (e._defaultParser = new t.ObjectDataParser), this._dataParser = e._defaultParser)
		}
		return e.prototype._getTextureData = function(t, e) {
			var i = this._textureAtlasDataMap[t];
			if(i)
				for(var a = 0, n = i.length; a < n; ++a) {
					var r = i[a].getTexture(e);
					if(r) return r
				}
			if(this.autoSearch)
				for(var a in this._textureAtlasDataMap) {
					i = this._textureAtlasDataMap[a];
					for(var s = 0, o = i.length; s < o; ++s) {
						var l = i[s];
						if(l.autoSearch) {
							var r = l.getTexture(e);
							if(r) return r
						}
					}
				}
			return null
		}, e.prototype._fillBuildArmaturePackage = function(t, e, i, a) {
			if(t) {
				var n = this._dragonBonesDataMap[t];
				if(n) {
					var r = n.getArmature(e);
					if(r) return a.dataName = t, a.data = n, a.armature = r, a.skin = r.getSkin(i), a.skin || (a.skin = r.defaultSkin), !0
				}
			}
			if(!t || this.autoSearch)
				for(var s in this._dragonBonesDataMap) {
					var n = this._dragonBonesDataMap[s];
					if(!t || n.autoSearch) {
						var r = n.getArmature(e);
						if(r) return a.dataName = s, a.data = n, a.armature = r, a.skin = r.getSkin(i), a.skin || (a.skin = r.defaultSkin), !0
					}
				}
			return !1
		}, e.prototype._buildBones = function(e, i) {
			for(var a = e.armature.sortedBones, n = 0, r = a.length; n < r; ++n) {
				var s = a[n],
					o = t.BaseObject.borrowObject(t.Bone);
				o.name = s.name, o.inheritTranslation = s.inheritTranslation, o.inheritRotation = s.inheritRotation, o.inheritScale = s.inheritScale, o.length = s.length, o.origin.copyFrom(s.transform), s.parent ? i.addBone(o, s.parent.name) : i.addBone(o), s.ik && (o.ikBendPositive = s.bendPositive, o.ikWeight = s.weight, o._setIK(i.getBone(s.ik.name), s.chain, s.chainIndex))
			}
		}, e.prototype._buildSlots = function(t, e) {
			var i = t.skin,
				a = t.armature.defaultSkin,
				n = {};
			for(var r in a.slots) {
				var s = a.slots[r];
				n[s.slot.name] = s
			}
			if(i != a)
				for(var r in i.slots) {
					var s = i.slots[r];
					n[s.slot.name] = s
				}
			for(var o = t.armature.sortedSlots, r = 0, l = o.length; r < l; ++r) {
				var h = o[r],
					s = n[h.name];
				if(s) {
					var _ = this._generateSlot(t, s);
					_ && (_._displayDataSet = s, _._setDisplayIndex(h.displayIndex), _._setBlendMode(h.blendMode), _._setColor(h.color), _._replacedDisplayDataSet.length = _._displayDataSet.displays.length, e.addSlot(_, h.parent.name))
				}
			}
		}, e.prototype._replaceSlotDisplay = function(t, e, i, a) {
			if(a < 0 && (a = i.displayIndex), a >= 0) {
				var n = i.displayList;
				if(n.length <= a && (n.length = a + 1), i._replacedDisplayDataSet.length <= a && (i._replacedDisplayDataSet.length = a + 1), i._replacedDisplayDataSet[a] = e, 1 == e.type) {
					var r = this.buildArmature(e.name, t.dataName);
					n[a] = r
				} else e.texture || (e.texture = this._getTextureData(t.dataName, e.name)), e.mesh || a < i._displayDataSet.displays.length && i._displayDataSet.displays[a].mesh ? n[a] = i.MeshDisplay : n[a] = i.rawDisplay;
				i.displayList = n, i.invalidUpdate()
			}
		}, e.prototype.parseDragonBonesData = function(t, e) {
			void 0 === e && (e = null);
			var i = this._dataParser.parseDragonBonesData(t, 1);
			return this.addDragonBonesData(i, e), i
		}, e.prototype.parseTextureAtlasData = function(t, e, i, a) {
			void 0 === i && (i = null), void 0 === a && (a = 0);
			var n = this._generateTextureAtlasData(null, null);
			return this._dataParser.parseTextureAtlasData(t, n, a), this._generateTextureAtlasData(n, e), this.addTextureAtlasData(n, i), n
		}, e.prototype.getDragonBonesData = function(t) {
			return this._dragonBonesDataMap[t]
		}, e.prototype.addDragonBonesData = function(t, e) {
			if(void 0 === e && (e = null), !t) throw new Error;
			e = e || t.name, e ? this._dragonBonesDataMap[e] ? console.warn("Same name data.") : this._dragonBonesDataMap[e] = t : console.warn("Unnamed data.")
		}, e.prototype.removeDragonBonesData = function(e, i) {
			void 0 === i && (i = !0);
			var a = this._dragonBonesDataMap[e];
			if(a) {
				if(i) {
					if(t.DragonBones.debug)
						for(var n = 0, r = t.DragonBones._armatures.length; n < r; ++n) {
							var s = t.DragonBones._armatures[n];
							if(s.armatureData.parent == a) throw new Error("ArmatureData: " + s.armatureData.name + " DragonBonesData: " + e)
						}
					a.returnToPool()
				}
				delete this._dragonBonesDataMap[e]
			}
		}, e.prototype.getTextureAtlasData = function(t) {
			return this._textureAtlasDataMap[t]
		}, e.prototype.addTextureAtlasData = function(t, e) {
			if(void 0 === e && (e = null), !t) throw new Error;
			if(e = e || t.name) {
				var i = this._textureAtlasDataMap[e] = this._textureAtlasDataMap[e] || [];
				i.indexOf(t) < 0 && i.push(t)
			} else console.warn("Unnamed data.")
		}, e.prototype.removeTextureAtlasData = function(t, e) {
			void 0 === e && (e = !0);
			var i = this._textureAtlasDataMap[t];
			if(i) {
				if(e)
					for(var a = 0, n = i.length; a < n; ++a) i[a].returnToPool();
				delete this._textureAtlasDataMap[t]
			}
		}, e.prototype.clear = function(t) {
			void 0 === t && (t = !0);
			for(var e in this._dragonBonesDataMap) t && this._dragonBonesDataMap[e].returnToPool(), delete this._dragonBonesDataMap[e];
			for(var e in this._textureAtlasDataMap) {
				if(t)
					for(var i = this._textureAtlasDataMap[e], a = 0, n = i.length; a < n; ++a) i[a].returnToPool();
				delete this._textureAtlasDataMap[e]
			}
		}, e.prototype.buildArmature = function(t, e, i) {
			void 0 === e && (e = null), void 0 === i && (i = null);
			var a = {};
			if(this._fillBuildArmaturePackage(e, t, i, a)) {
				var n = this._generateArmature(a);
				return this._buildBones(a, n), this._buildSlots(a, n), n.advanceTime(0), n
			}
			return null
		}, e.prototype.copyAnimationsToArmature = function(e, i, a, n, r) {
			void 0 === a && (a = null), void 0 === n && (n = null), void 0 === r && (r = !0);
			var s = {};
			if(this._fillBuildArmaturePackage(n, i, a, s)) {
				var o = s.armature;
				if(r) e.animation.animations = o.animations;
				else {
					var l = {};
					for(var h in e.animation.animations) l[h] = e.animation.animations[h];
					for(var h in o.animations) l[h] = o.animations[h];
					e.animation.animations = l
				}
				if(s.skin) {
					for(var _ = e.getSlots(), u = 0, f = _.length; u < f; ++u)
						for(var m = _[u], c = m.displayList, p = 0, d = c.length; p < d; ++p) {
							var g = c[p];
							if(g instanceof t.Armature) {
								var y = s.skin.getSlot(m.name).displays;
								if(p < y.length) {
									var T = y[p];
									1 == T.type && this.copyAnimationsToArmature(g, T.name, a, n, r)
								}
							}
						}
					return !0
				}
			}
			return !1
		}, e.prototype.replaceSlotDisplay = function(t, e, i, a, n, r) {
			void 0 === r && (r = -1);
			var s = {};
			if(this._fillBuildArmaturePackage(t, e, null, s)) {
				var o = s.skin.getSlot(i);
				if(o)
					for(var l = 0, h = o.displays.length; l < h; ++l) {
						var _ = o.displays[l];
						if(_.name == a) {
							this._replaceSlotDisplay(s, _, n, r);
							break
						}
					}
			}
		}, e.prototype.replaceSlotDisplayList = function(t, e, i, a) {
			var n = {};
			if(this._fillBuildArmaturePackage(t, e, null, n)) {
				var r = n.skin.getSlot(i);
				if(r)
					for(var s = 0, o = 0, l = r.displays.length; o < l; ++o) {
						var h = r.displays[o];
						this._replaceSlotDisplay(n, h, a, s++)
					}
			}
		}, e.prototype.getAllDragonBonesData = function() {
			return this._dragonBonesDataMap
		}, e.prototype.getAllTextureAtlasData = function() {
			return this._textureAtlasDataMap
		}, e._defaultParser = null, e
	}();
	t.BaseFactory = e
}(dragonBones || (dragonBones = {})); /*  |xGv00|7604e9a90eb7951ee2df3e017c3ed615 */