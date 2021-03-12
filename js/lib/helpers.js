/** Utility for simplifying event delegation. Add "!" in target to negate the selector, i.e "!.mySelector" */
export function on(event, target, fn) {
  document.addEventListener(event, (e) => {
    if (target.substring(0, 1) === "!") {
      if (!e.target.closest(target.substring(1, target.length))) {
        fn(e);
      }
    } else if (e.target.closest(target)) {
      fn(e);
    }
  });
}

export function capitalizeFirstLetter(string) {
  const firstLetter = string.substring(0, 1).toUpperCase();
  const rest = string.substring(1, string.length);
  return firstLetter + rest;
}
