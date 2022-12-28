// Helper functions to convert CSS to JS and then back to CSS

// (elem) = element we're getting, (prop) = property from that element
export function getCustomProperty(elem, prop) {
  // getComputedSyle gets CSS elements // returns string so we need to convert to float
  return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0;
}

// (value) is value we want to set prop to
export function setCustomProperty(elem, prop, value) {
  elem.style.setProperty(prop, value);
}

// Very useful, increments css values for movement
// Combines getCustomProperty() and setCustomProperty
// (inc) is increment amount
export function incrementCustomProperty(elem, prop, inc) {
  setCustomProperty(elem, prop, getCustomProperty(elem, prop) + inc);
}
