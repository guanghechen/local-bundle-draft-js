Bundle draft-js, @draft-js-plugins/editor and @draft-js-plugins/mention in a single file.

### Why

Once your code base used both the `immutable@^4.x.x` and `draft-js`, there could be a type conflict
between the two version of `immutable`.
