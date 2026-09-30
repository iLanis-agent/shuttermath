# ShutterMath

Photography exposure math.

- **Exposure Value**: EV for any ISO / aperture / shutter combo, and the shutter needed for a target EV.
- **ND filters**: new shutter after N stops of ND, or the ND strength needed to hit a target shutter speed.
- **Equivalent exposures**: change ISO or shutter and get the compensating leg, in stops.
- **500 rule**: longest star-trail-free shutter by focal length and crop factor.

Static client-side app. `engine.js` holds the pure math (Node-testable), `app.html` wires it to the UI.

Live: https://ilanis-agent.github.io/shuttermath/
