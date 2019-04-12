This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


### How to get here from zero?

1. Get started
    1. `$ npx create-react-app my-app`
    1. `$ cd my-app`
    1. `$ npm start`
1. Fix things for VSCode
   1. [Experimental Decorators error present](https://github.com/Microsoft/vscode/issues/28097)
1. Read [the create-react-app docs](https://facebook.github.io/create-react-app/docs/)
1. Get ready for a more pleasant development experience
    1. Install chalk: `$ npm i -s chalk`
    1. Install Nodemon: `$ npm i -s nodemon`
    1. Configure eslint: https://www.npmjs.com/package/eslint-config-react-app
    1. Adding custom folder aliases: (a) add to webpack and also (b) add to `package.json`'s `jest.`[`moduleNameMapper`](https://alexjover.com/blog/enhance-jest-configuration-with-module-aliases/)
    1. Add `src/samples` folder to test new libraries and new concepts
    1. Setup Babel for running individual files
        1. See: https://babeljs.io/docs/en/babel-node
        1. Add `.babelrc`
            1. [reference config](https://github.com/Domiii/dbdi/blob/master/.babelrc)
            1. `"presets": ["@babel/preset-env", "@babel/preset-react"]`
        1. Install missing plugins: `$ npm i --save-dev @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties @babel/plugin-proposal-function-bind @babel/plugin-syntax-export-default-from`
        1. `npm i --save-dev @babel/core @babel/node @babel/cli`
        1. `npm i -s core-js@3`
        1. Debug + wait initially: `babel-node --inspect-brk src/samples/someSample`
        1. Using nodemon: `nodemon --exec babel-node --inspect src/samples/someSample`
1. Make things prettier
    1. Add Bootstrap + reactstrap
         1. See: https://reactstrap.github.io/
    1. Add [react-fontawesome](https://github.com/FortAwesome/react-fontawesome)
        * `npm i -s @fortawesome/fontawesome-svg-core @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons`
        * https://fontawesome.com/how-to-use/on-the-web/using-with/react
    1. Add [material-ui](https://material-ui.com/) - `npm i -s @material-ui/core @material-ui/icons`
1. Add firebase ([as explained in the docs](https://facebook.github.io/create-react-app/docs/deployment#firebase-https-firebasegooglecom))
    1. `$ firebase init`
    1. Change config accordingly
    1. Add to `.gitignore`
    1. Setup firebase + add firebase login: https://codepen.io/Domiii/pen/JwrZVr?editors=0010
1. Add [react-router](https://github.com/reactjs/react-router-tutorial/tree/master/lessons/01-setting-up)
    1. `$ npm i -s react-router react-router-dom`
    1. [Article: Getting started with React Router](https://codeburst.io/getting-started-with-react-router-5c978f70df91)
    1. Use [`Switch`](https://medium.com/@jenniferdobak/react-router-vs-switch-components-2af3a9fc72e) instead of `Router`
    1. Add [protected routes](https://stackoverflow.com/a/48497783)
1. Add external data and remote API logic
    1. Add `api`, `api/index.js` and `api/firebaseInit.js`
    1. TODO
1. Add Google login
    1. TODO
1. Add [Unstated](https://github.com/jamiebuilds/unstated)
    1. [unstated — The setState of React State Management](https://medium.com/react-native-training/unstated-the-setstate-of-react-state-management-8ce47b240e6d)
    1. TODO


## Basics
1. Display a list of things
1. Read, edit and display markdown
    * https://github.com/rexxars/react-markdown
    * https://glitch.com/edit/#!/markdown-test

## Features?
1. User list + management
1. Door opener


## Firestore REST
* Docs: https://firebase.google.com/docs/firestore/use-rest-api
* Example: https://firestore.googleapis.com/v1/projects/iot-fun-a9915/databases/(default)/documents/usersPublic