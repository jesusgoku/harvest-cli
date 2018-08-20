const me = require('./api').me;

me()
  .then(data => console.log(data))
  .catch(e => console.log(e))
;
