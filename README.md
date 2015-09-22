# Minified-autocomplete

### Overview

This is a naked-as-possible implementation of a so called live-search (or autocomplete) feature for input fields using [minified.js](http://www.minified.js) as library. Given the fact that minified.js is a really small library and the features used are mostly selectors it should be fairly easy to convert this script to a version without library dependencies

### Usage

Use it as follows:

```javascript
var suggestions = ['javascript', 'java', 'php', 'phpstorm', 'options', 'oblea', 'oppium', 'facebook', 'facepalm'];
$.autocomplete( 'input.autocomplete', suggestions );
```

Where the first parameter of autocomplete is a selector for your input (all inputs with .autocomplete class on the example) and the second is the suggestions array. A third parameter can be sent which is the container for the values (useful so it can work together with some jquery autocomplete plugins)

 course you should include the CSS and JS files for autocomplete-minified and minified.js itself for this script to work. Then essentially change the 'suggestions' array to suit your needs and you are ready to go.
