# trianglePegGame
A triangle peg game simulator to find ways to solve it with only one peg left.

No browserify. Must be opened in a ES6-compliant browser.

See app.js for example of how to find solution with only one peg left, and then send it to be displayed in the view tool. The view tool DOM must be present in the index.html file.

## TODO:
- doSimulation() should not return a snapshot. There should be a function called getSnapshot() for that purpose.
- The view tool should make its own DOM-structure
- The view tool should be more intuitive. It is quite confusing right now.
- Browserify/Babel to make it work in all browsers.
