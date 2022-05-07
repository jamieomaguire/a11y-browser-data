import './style.css'

import A11yTracker from '../../index';

document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
let a11yTracker = new A11yTracker(data => console.log(data), {
  prefersContrast: true,
  prefersReducedMotion: true,
  prefersColorScheme: true,
  listenForChanges: true
});

a11yTracker.track();
// a11yTracker.stopTracking();
// a11yTracker.track();