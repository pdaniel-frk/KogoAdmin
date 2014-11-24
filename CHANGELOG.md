
# CHANGELOG

## 1.0.1 -

Bug fixes and some smaller enhancements:
- fallback to Node.js to server static files
- all paths to static files prefixed with /static
- protractor tests added for CRUD on users, projects, boards and lanes
- cerberus api improvements moved across
- all modules removed and changed to new promise based
- all modals moved to ui-angular

Migration notes:
* Please update your Nginx config file when updgrading from 1.0.0
* Please reinstall bower components

```
rm -rf public/scripts/vendor
bower install
```

## 1.0.0 - 2014-11-17

First beta release of the app.
