import UserPreference from './userPreference';

export default class UserPreferences {
  prefersContrast = new UserPreference();
  prefersReducedMotion = new UserPreference();
  prefersColorScheme = new UserPreference();
  
  constructor () {}
}