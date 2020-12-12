// utils to delay promise
export default function wait(ms) {
  return (x) => new Promise((resolve) => setTimeout(() => resolve(x), ms));
}
