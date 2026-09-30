// ShutterMath engine - photography exposure math. Pure functions, no DOM.
(function (root) {
  'use strict';

  // Exposure Value at ISO 100: EV = log2(N^2 / t). N = f-number, t = seconds.
  function ev100(aperture, shutterSec) {
    if (aperture <= 0 || shutterSec <= 0) throw new Error('aperture and shutter must be positive');
    return Math.log2(aperture * aperture / shutterSec);
  }

  // EV adjusts with ISO: EV at ISO S = EV100 - log2(S/100).
  function evAtIso(aperture, shutterSec, iso) {
    if (iso <= 0) throw new Error('iso must be positive');
    return ev100(aperture, shutterSec) - Math.log2(iso / 100);
  }

  // Shutter seconds needed for a target EV at given aperture and ISO.
  function shutterForEv(ev, aperture, iso) {
    if (aperture <= 0 || iso <= 0) throw new Error('aperture and iso must be positive');
    return (iso / 100) * aperture * aperture / Math.pow(2, ev);
  }

  // ND filter: new shutter = base * 2^stops.
  function ndShutter(baseSec, stops) {
    if (baseSec <= 0) throw new Error('base shutter must be positive');
    return baseSec * Math.pow(2, stops);
  }

  // ND strength needed to stretch base shutter to target.
  function ndStopsFor(baseSec, targetSec) {
    if (baseSec <= 0 || targetSec <= 0) throw new Error('shutters must be positive');
    return Math.log2(targetSec / baseSec);
  }

  // 500 rule: longest shutter (seconds) before stars trail. crop = sensor crop factor.
  function starTrail(focalMm, crop) {
    if (focalMm <= 0 || crop <= 0) throw new Error('focal and crop must be positive');
    return 500 / (focalMm * crop);
  }

  // Equivalent exposure helpers: keep EV, change one leg.
  // New shutter when ISO changes: t2 = t1 * (iso1 / iso2).
  function shutterForIsoChange(shutterSec, isoFrom, isoTo) {
    if (shutterSec <= 0 || isoFrom <= 0 || isoTo <= 0) throw new Error('positive values only');
    return shutterSec * (isoFrom / isoTo);
  }

  // New aperture when shutter changes: N2 = N1 * sqrt(t2 / t1).
  function apertureForShutterChange(aperture, shutterFrom, shutterTo) {
    if (aperture <= 0 || shutterFrom <= 0 || shutterTo <= 0) throw new Error('positive values only');
    return aperture * Math.sqrt(shutterTo / shutterFrom);
  }

  // Full stops between two shutter speeds.
  function stopsBetween(t1, t2) {
    if (t1 <= 0 || t2 <= 0) throw new Error('positive values only');
    return Math.log2(t2 / t1);
  }

  // Friendly shutter label: '1/125 s' or '8.2 s' or '2 min 4 s'.
  function fmtShutter(sec) {
    if (sec < 0.5) return '1/' + Math.round(1 / sec) + ' s';
    if (sec < 60) return (Math.round(sec * 10) / 10) + ' s';
    var m = Math.floor(sec / 60), s = Math.round(sec % 60);
    if (s === 60) { m += 1; s = 0; }
    return m + ' min ' + s + ' s';
  }

  var api = {
    ev100: ev100,
    evAtIso: evAtIso,
    shutterForEv: shutterForEv,
    ndShutter: ndShutter,
    ndStopsFor: ndStopsFor,
    starTrail: starTrail,
    shutterForIsoChange: shutterForIsoChange,
    apertureForShutterChange: apertureForShutterChange,
    stopsBetween: stopsBetween,
    fmtShutter: fmtShutter
  };
  root.ShutterMath = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
