import Lenis from 'lenis';

let instance = null;

export function createLenis() {
  instance = new Lenis({ lerp: 0.08, smoothWheel: true });
  return instance;
}

export function getLenis() {
  return instance;
}
