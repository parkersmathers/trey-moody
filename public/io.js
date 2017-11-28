function query(selector) {
  return Array.from(document.querySelectorAll(selector));
}

var observer = new IntersectionObserver(
  // Pre-load items that are within 2 multiples of the visible viewport height.
  function(changes) {
    changes.forEach(function(change) {
      var container = change.target;
      var content = container.querySelector("template").content;
      container.appendChild(content);
      observer.unobserve(container);
    });
  },
  { rootMargin: "200% 0%" }
);

// Set up lazy loading
query("#page").forEach(function(item) {
  observer.observe(item);
});
