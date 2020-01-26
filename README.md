This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Current Status

Just an idea; on ice for now :(

### Questions to ask: 
* How am I doing?
    * energy level
    * external stress level
* getting started + first decision ("of the day")


### How to get here from zero?

1. Get started
    1. `$ npx create-react-app my-app`
    1. `$ cd my-app`
    1. `$ npm start`
    1. (Read [the create-react-app docs](https://facebook.github.io/create-react-app/docs/))
1. Improve things for VSCode
   1. [Experimental Decorators error present](https://github.com/Microsoft/vscode/issues/28097)
   1. [Simple-react-snippets](https://marketplace.visualstudio.com/items?itemName=burkeholland.simple-react-snippets)
   1. Configure emmet to include JS files: https://code.visualstudio.com/docs/editor/emmet
1. Get ready for a more pleasant development experience
    1. Install chalk: `$ npm i -s chalk`
    1. Install Nodemon: `$ npm i -s nodemon`
    1. Configure eslint: https://www.npmjs.com/package/eslint-config-react-app
    1. Adding custom folder aliases: (a) add to webpack and also (b) add to `package.json`'s `jest.`[`moduleNameMapper`](https://alexjover.com/blog/enhance-jest-configuration-with-module-aliases/)
    1. Add `src/samples` folder to test new libraries and new concepts
1. Setup Babel for server
    1. See: https://babeljs.io/docs/en/babel-node
    1. Add `.babelrc`
        1. [reference config](https://github.com/Domiii/dbdi/blob/master/.babelrc)
    1. Install 
        1. missing plugins: `$ npm i --save-dev @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties @babel/plugin-proposal-function-bind @babel/plugin-syntax-export-default-from`
        1. `npm i --save-dev @babel/core @babel/node @babel/cli`
        1. `npm i -s core-js@3`
        1. More dev tools: `npm i -D nodemon`
    1. Add scripts to `package.json`:
        1. Start server (without debugger): `nodemon --exec npx babel-node server`
        1. Debug + wait initially (without nodemon): `npx babel-node --inspect-brk server`
        1. Debug + nodemon: `nodemon --exec npx babel-node --inspect server`
1. Make things prettier
    1. Add Bootstrap + reactstrap
         1. See: https://reactstrap.github.io/
    1. Add [flexbox-react](https://www.npmjs.com/package/flexbox-react) for simple, practical layouting
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


## Basic Features?
1. Read, edit and display markdown
    * https://github.com/rexxars/react-markdown
    * https://glitch.com/edit/#!/markdown-test
1. User list + management
1. Cohorts
1. Make + keep a list of notes
1. Personalized checklists
1. Super-awesome-buffet for really tracking your own stuff~
  * Related: https://devhints.io/


## Misc
* more ideas
  * 網站開發課綱： https://gist.github.com/Domiii/707257ceaa13d76ab6f743a1bae95e21

* Allow to quickly tab through the entire thing
* Proper outcome + expectation of what you can get out of this:
    * -> Assists decision making in your learning
    * -> Helps you shape your learning path incrementally (rather than (fully) pre-planned) 
    * -> TODO: Must be super tangible
        * -> Problem: Learning is not just working through a TODO list
        * also needs proper reflection
        * also needs laying out of strategy (could be self- or other-directed)
    * -> TODO: Allow new-comers to this to quickly feel how this supports their learning
* Features:
    * Learning Paths: Content + Knowledge Base
        * step-by-step run-downs + hints for working through individual problems
        * Concepts: identify/review concepts that will be inescapable on the learning path
    * Routines; Daily(or "Regularly")/weekly/monthly
    * Problem solving strategies
    * Challenges
        * Daily vs. Weekly vs. Monthly vs. one-off?
        * Personal vs. Co-learning
        * hard skills vs. soft skills (e.g. habits of code vs. habits of mind?)
        * -> build the Routines that you want to build
    * -> Linkage for different IDEs/editors + other basic 基本功 (including english + code typing)
        * -> Keyboard shortcuts basics
            * -> UNDO/REDO
            * -> Move around with arrow keys
            * -> Jump to beginning/end of line/file
            * -> select with shift
            * -> e.g. https://vscodecandothat.com/
                * -> Toggle sidebar focus: CTRL/Cmd + 1/0
                * -> Soft Undo: CTRL/Cmd + U
    * -> Goal setting, TODOs + Milestones?
    * -> More Project stuff?
    * Custom login options
        * Coach can manually add new coachee (via name and/or URL) and use session to keep track of login status
        * Coach can control coachee interface
* Design
    * -> Positive feedback + basic gamification elements to feel in flow while using this

// TODO: Link in concepts + research behind this approach (and each individual aspect of it)
// TODO: personalized log sections?
TODO:
-> Write up on the desperation and inefficiencies of the traditional approaches to learning programming + CS, and what my alternative to that looks like.
-> Concrete examples of problems + what most students feel when they go through the process (inside the system)

-> On the plus side:
  -> more concrete examples of learner strategies
    -> How to learn language basics?
    -> How to learn Algorithms/problem solving strategies?
    -> How to learn frameworks?
    -> How to get started with your own projects?
    -> How to own your learning?!!!
  -> freedom, "overcoming the reptile brain" + creativity
-> Citations + references
