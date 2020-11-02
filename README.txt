# [THEMENAME]

[Sub-theme of Drupal Bootstrap utilising Sass and Webpack](https://www.drupal.org/project/bootstrap)

## Background

This theme is designed to leverage ES6 as Drupal 8 now has this in core. In the same token we can utilise standards set
in core for linting with CSS and JavaScript.

JS files should be added to theme level if they are related to that theme. Other than that, they should be added
to related module.

**Assumptions:**

- you already have a development environment
- you already have [Drupal Bootstrap](https://www.drupal.org/project/bootstrap) installed
- Node.js is installed
- Package dependencies installed in core - from the root of your Drupal folder: cd core && npm install
(note we are extending core configuration)


## Enable the custom theme and set it as default theme

```
drush config:set system.theme default [THEMENAME] --yes
```

## Disable Drupal 8 caching during development
See [drupal.org](https://www.drupal.org/node/2598914) for more details but the following outlines the steps:

- Configure settings.local.php
- Disable CSS/JS aggregation
- Disable render cache
- Disable dynamic page cache
- Disable internal page cache

## How to install

```
npm install
```

## How to run

```
# Build for development mode
npm run dev

# Watch & Build for development mode
npm run watch

# Build production mode
npm run prod

# Lint custom JS
npm run lint

# Lint & Fix custom JS
npm run lint:fix
```

## Browsersync
If using Chrome, open your developer tools (F12), go to settings (F1) and check Disable cache (while DevTools is open)
under the network section. Otherwise you will need to clear Drupal cache to see changes.
