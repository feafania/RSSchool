const RaceState = {
  isRacing: false,

  race() {
    this.isRacing = true;
  },

  stop() {
    this.isRacing = false;
  },
};

export default RaceState;
