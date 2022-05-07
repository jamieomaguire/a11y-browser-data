import UserPreferences from './userPreferences';
import { MEDIA_QUERY_CONTRAST_LESS, MEDIA_QUERY_CONTRAST_MORE, MEDIA_QUERY_CONTRAST_NO_PREF, MEDIA_QUERY_REDUCED_MOTION, MEDIA_QUERY_REDUCED_MOTION_NO_PREF, MEDIA_QUERY_COLOR_SCHEME_LIGHT, MEDIA_QUERY_COLOR_SCHEME_DARK } from './constants';

export default class A11yTracker {
  #options;
  #userPreferences = new UserPreferences();
  #loggerCallback;
  #mediaQueries = []
  #changeEvent = 'change';

  constructor(
    loggerCallback, 
    options = {
      prefersContrast: false,
      prefersReducedMotion: false,
      prefersColorScheme: false,
      listenForChanges: false
    }) {

    if (!loggerCallback) {
      throw new Error('required parameter "loggerCallBack" is missing');
    }

    this.#loggerCallback = loggerCallback;
    this.#options = {
      prefersContrast: options.prefersContrast ?? false,
      prefersReducedMotion: options.prefersReducedMotion ?? false,
      prefersColorScheme: options.prefersColorScheme ?? false,
      listenForChanges: options.listenForChanges ?? false
    }
  }

  #checkIsSupported () {
    if (!window) {
      throw new Error('Browser window does not exist');
    }

    if (!window.matchMedia) {
      throw new Error('window.matchMedia is not supported');
    }
  }

  track() {
    this.#checkIsSupported();

    if (this.#options.prefersContrast) {
      this.#trackPrefersContrast();
    }

    if (this.#options.prefersReducedMotion) {
      this.#trackPrefersReducedMotion();
    }

    if (this.#options.prefersColorScheme) {
      this.#trackPrefersColorScheme();
    }

    this.#recordUserPreferences();
  }

  stopTracking() {
    this.#mediaQueries.forEach(mediaQuery => {
      mediaQuery.ref.removeEventListener(this.#changeEvent, mediaQuery.handler);
    });
  }

  #trackPrefersContrast() {
    console.log('tracking prefers contrast');

    // create JS media queries
    const lessContrastMq = window.matchMedia(MEDIA_QUERY_CONTRAST_LESS);
    const moreContrastMq = window.matchMedia(MEDIA_QUERY_CONTRAST_MORE);
    const noPreferenceMq = window.matchMedia(MEDIA_QUERY_CONTRAST_NO_PREF);

    // define checks
    const recordPrefersContrastSetting = () => {
      if (lessContrastMq.matches) {
        this.#userPreferences.prefersContrast.value = lessContrastMq.media;
      } else if (moreContrastMq.matches) {
        this.#userPreferences.prefersContrast.value = moreContrastMq.media;
      } else if (noPreferenceMq.matches) {
        this.#userPreferences.prefersContrast.value = noPreferenceMq.media;
      } else {
        this.#userPreferences.prefersContrast.value = null;
      }
    };

    // check initial value
    recordPrefersContrastSetting(lessContrastMq, moreContrastMq, noPreferenceMq);

    // define checks and change handler (optional)
    if (this.#options.listenForChanges) {
      const prefersContrastChangeHandler = () => {
        recordPrefersContrastSetting(lessContrastMq, moreContrastMq, noPreferenceMq);
        this.#userPreferences.prefersContrast.changed = true;
        this.#recordUserPreferences();
      }

      lessContrastMq.addEventListener(this.#changeEvent, prefersContrastChangeHandler);
      moreContrastMq.addEventListener(this.#changeEvent, prefersContrastChangeHandler);
      noPreferenceMq.addEventListener(this.#changeEvent, prefersContrastChangeHandler);

      // keep track of media queries and event listners so we can remove them later if needed
      this.#mediaQueries.push(
        {
          ref: lessContrastMq,
          handler: prefersContrastChangeHandler
        },
        {
          ref: moreContrastMq,
          handler: prefersContrastChangeHandler
        },
        {
          ref: noPreferenceMq,
          handler: prefersContrastChangeHandler
        });
    }
  }


  #trackPrefersReducedMotion() {
    console.log('tracking perfers reduced motion');
  }

  #trackPrefersColorScheme() {
    console.log('tracking perfers color scheme');
  }

  #recordUserPreferences() {
    this.#loggerCallback(JSON.stringify(this.#userPreferences, null, 2));
  }
}

const a11yTracker = new A11yTracker({
  prefersContrast: true
});
