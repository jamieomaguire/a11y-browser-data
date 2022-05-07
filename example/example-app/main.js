import './style.css'

import A11yTracker from '../../a11yTracker';

document.querySelector('#app').innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
const a11yTracker = new A11yTracker(data => console.log(data), {
  prefersContrast: true,
  listenForChanges: true
});

a11yTracker.track();
a11yTracker.stopTracking();
// a11yTracker.track();