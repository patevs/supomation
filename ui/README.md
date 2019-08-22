# [Supomation-Dash](https://github.com/patevs/supomation-dash)

> Forked from: [creativetimeofficial/material-dashboard-react](https://github.com/creativetimofficial/material-dashboard-react)

---

## Documentation

The documentation for the Material Dashboard React is hosted at our [website](https://demos.creative-tim.com/material-dashboard-react/#/documentation/tutorial).

---

## File Structure

Within the download you'll find the following directories and files:

```md
material-dashboard-react
.
├── LICENSE.md
├── README.md
├── bower.json
├── package.json
├── documentation
│   ├── assets
│   └── tutorial-components.html
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── index.js
    ├── logo.svg
    ├── routes.js
    ├── assets
    │   ├── css
    │   ├── github
    │   ├── img
    │   │   └── faces
    │   └── jss
    │       ├── material-dashboard-react
    │       │   ├── components
    │       │   ├── layouts
    │       │   └── views
    │       └── material-dashboard-react.jsx
    ├── components
    │   ├── Card
    │   │   ├── Card.jsx
    │   │   ├── CardAvatar.jsx
    │   │   ├── CardBody.jsx
    │   │   ├── CardFooter.jsx
    │   │   ├── CardHeader.jsx
    │   │   └── CardIcon.jsx
    │   ├── CustomButtons
    │   │   └── Button.jsx
    │   ├── CustomInput
    │   │   └── CustomInput.jsx
    │   ├── CustomTabs
    │   │   └── CustomTabs.jsx
    │   ├── FixedPlugin
    │   │   └── FixedPlugin.jsx
    │   ├── Footer
    │   │   └── Footer.jsx
    │   ├── Grid
    │   │   ├── GridContainer.jsx
    │   │   └── GridItem.jsx
    │   ├── Navbars
    │   │   ├── AdminNavbarLinks.jsx
    │   │   ├── Navbar.jsx
    │   │   └── RTLNavbarLinks.jsx
    │   ├── Sidebar
    │   │   └── Sidebar.jsx
    │   ├── Snackbar
    │   │   ├── Snackbar.jsx
    │   │   └── SnackbarContent.jsx
    │   ├── Table
    │   │   └── Table.jsx
    │   ├── Tasks
    │   │   └── Tasks.jsx
    │   └── Typography
    │       ├── Danger.jsx
    │       ├── Info.jsx
    │       ├── Muted.jsx
    │       ├── Primary.jsx
    │       ├── Quote.jsx
    │       ├── Success.jsx
    │       └── Warning.jsx
    ├── layouts
    │   ├── Admin.jsx
    │   └── RTL.jsx
    ├── variables
    │   ├── charts.jsx
    │   └── general.jsx
    └── views
        ├── Dashboard
        │   └── Dashboard.jsx
        ├── Icons
        │   └── Icons.jsx
        ├── Maps
        │   └── Maps.jsx
        ├── Notifications
        │   └── Notifications.jsx
        ├── RTLPage
        │   └── RTLPage.jsx
        ├── TableList
        │   └── TableList.jsx
        ├── Typography
        │   └── Typography.jsx
        ├── UpgradeToPro
        │   └── UpgradeToPro.jsx
        └── UserProfile
            └── UserProfile.jsx
```

---

### Babel Config

```json
  "scripts": {
    "build-package-css": "cp src/assets/css/material-dashboard-react.css dist/material-dashboard-react.css",
    "build-package": "npm run build-package-css && babel src --out-dir dist"
  },
  "babel": {
    "presets": [
      "es2015"
    ],
    "plugins": [
      "transform-class-properties",
      "transform-react-jsx",
      "transform-object-rest-spread",
      [
        "module-resolver",
        {
          "root": [
            "./src"
          ]
        }
      ],
      [
        "import-rename",
        {
          "^(.*)\\.jsx": "$1"
        }
      ]
    ]
  }
```

---
