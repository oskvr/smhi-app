/** Function that simplifies event delegation. Add "!" in target to negate the selector, i.e "!.mySelector" */
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
