/// <reference path="bundle.d.ts" />

import assert = require('assert');
import co = require('co');

export function * test () {
  yield wait(100);

  return true;
}

function wait (ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

const run = co.wrap(test);

Promise.all([
  co(test),
  run()
])
  .then(values => {
    assert.equal(values[0], true);
    assert.equal(values[1], true);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
