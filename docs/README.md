
# [`supomation`](https://github.com/patevs/supomation)

## Libraries & Packages

- [`nest`](https://github.com/nestjs/nest)
- [`strapi`](https://github.com/strapi/strapi)
- [`keystone`](https://github.com/keystonejs/keystone)
- [`cli-table3`](https://github.com/cli-table/cli-table3)

---

## Backlog

1. [X] Save of scraped data to file
2. [ ] Save scraped data to database
3. [ ] Scrap multiple pages
4. [ ] Change store location
5. [ ] Download and save virtual mailer to file
6. [X] Scrap by categories

---

0.2.0 `package.json`

```json
    {
        "name": "supomation",
        "version": "0.2.0",
        "description": "Supomation CLI",
        "homepage": "https://github.com/patevs/supomation",
        "repository": "patevs/supomation",
        "author": "PatEvs",
        "license": "MIT",
        "files": [
            "lib"
        ],
        "main": "lib/index.js",
        "scripts": {
            "clean:data": "trash data",
            "clean": "trash node_modules && npm run clean:data",
            "start": "node lib/index.js",
            "pretest": "eslint . --fix && echo Pretest Complete!",
            "test": "jest && echo Test Complete!"
        },
        "dependencies": {
            "axios": "^0.19.0",
            "boxen": "^4.1.0",
            "chalk": "^2.4.2",
            "cheerio": "^1.0.0-rc.3",
            "clear": "^0.1.0",
            "inquirer": "^6.5.0",
            "log-symbols": "^3.0.0",
            "signale": "^1.4.0",
            "write-json-file": "^4.1.1"
        },
        "devDependencies": {
            "eslint": "^6.0.1",
            "eslint-config-prettier": "^6.0.0",
            "eslint-config-xo": "^0.26.0",
            "eslint-plugin-prettier": "^3.0.0",
            "husky": "^3.0.0",
            "jest": "^24.8.0",
            "lint-staged": "^9.2.0",
            "prettier": "^1.15.2"
        },
        "engines": {
            "npm": ">= 10.0.0"
        },
        "lint-staged": {
            "*.js": [
                "eslint --fix",
                "git add"
            ],
            "*.json": [
                "prettier --write",
                "git add"
            ]
        },
        "eslintConfig": {
            "extends": [
                "xo",
                "prettier"
            ],
            "env": {
                "jest": true,
                "node": true
            },
            "plugins": [
                "prettier"
            ],
            "rules": {
                "valid-jsdoc": 0,
                "no-warning-comments": 0
            }
        },
        "jest": {
            "testEnvironment": "node"
        }
    }
```

---
