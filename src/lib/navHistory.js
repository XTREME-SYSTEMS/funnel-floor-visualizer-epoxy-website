// Tracks how many in-app PUSH navigations have happened so a back button can
// tell whether there's a real previous page to return to. `window.history.length`
// is unreliable inside an iframe (the app preview), so we count pushes/pops
// ourselves via the router's navigation type.
let depth = 0;

export function recordPush() {
  depth += 1;
}

export function recordPop() {
  depth = Math.max(0, depth - 1);
}

export function canGoBack() {
  return depth > 0;
}