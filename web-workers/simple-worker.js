console.log("Im a web worker! On a pc with ", navigator.hardwareConcurrency, " logical processors")

postMessage("Hello from the worker!")