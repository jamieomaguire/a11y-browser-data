export default class UserPreference {
  value;
  changed = false;
  
  constructor (value = null) {
    this.value = value;
  }
}