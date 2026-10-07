/** Resolves once the preloader curtain has lifted, so entrance animations can start. */
let resolveReady: () => void = () => {};
export const ready = new Promise<void>((resolve) => {
  resolveReady = resolve;
});
export const markReady = () => resolveReady();
