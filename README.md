# gualy (a goal-tracking app)

Gualy is a web app written using Node, MongoDB, and Express. It allows its users
to track and update their goals. If they choose, they can make their account (or
specific goals) public to show the world how far they've come.

### Build Info

To install, you must have `bower`, `npm`, and `gulp` installed. `npm` should
come with Node, and the other two can be installed through `npm`.

In addition, by default gualy occupies the database `gualy` on the local MongoDB
server. Meaning that:

1. You must have a MongoDB installation.
2. Unless you edit the source code, you must make sure no other application is
occupying that space.

```bash
$ git clone http://github.com/crockeo/gualy
$ cd gualy
$ npm install
$ bower install
$ gulp deploy
$ node app.js
```
