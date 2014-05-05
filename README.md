Slate
=====

Slate is a JavaScript library for declaring and efficiently executing complex
asynchronous workflows.

The `Promise` type provides mechanisms for aggregating many promises together
(`Promise.all`, `Promise.race`) which allow trees of promise resolution
to be created.

However, more complex applications can have a resolution workflow that more
closely resembles a graph. For problems of this type it can be difficult
to structure a `Promise.all` dispatch tree that ensures that the correct
information is available at the correct time for the most efficient execution.

*Slate* builds on `Promise.all` to support the declaration of a directed
acyclic graph of dependencies, which are then automatically resolved in the
best possible order.

The API of this library remains experimental. More docs to follow later once
the interface is more stable. For now, see the code.

License
-------

Copyright 2014 Say Media Ltd

This library is released under the terms of the MIT license, as detailed in
the file `LICENSE`.
