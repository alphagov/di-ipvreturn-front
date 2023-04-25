module.exports = {
  "/": {
    resetJourney: true,
    reset: true,
    entryPoint: true,
    skip: true,
    next: "landingPage",
  },
  "/landingPage": {
    next: "done"
  }
}
