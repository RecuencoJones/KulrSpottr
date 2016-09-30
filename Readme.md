# KulrSpottr

KulrSpottr is a game where you have to spot the different tile. Every next step, tile number increases and color difference decreases. Number of steps depends on screen resolution keeping the tiles at a minimum reasonable size

## Pre-requirements
This application is build with tools that depends on node.js and npm. Personally I encourage tools like nvm for easy version management. Once you have installed npm and node.js you can continue to the next step.
https://github.com/creationix/nvm

## Installation/ Build
Internally this application uses node-sass for building the styles and grunt, uglify,  browserify, babel and color but you don't need to worry about this. All libraries are installed locally. In order to get the app working you just need to change to app's directory and run npm install.

```sh
cd app-folder
npm install
npm run all

```
A web server will start at *localhost:8080*. Open a browser pointing to that address and you can start playing.
A built version is included so building steps are optional.

## Build commands
```sh
npm run build # Build javascript application
npm run sass # Build styles

npm test # Run the test suits
npm run coverage # Generates a code coverage report.

npm run serve # Creates a webserver listening on port 8080
```
## Dependencies
### Mercury
It is a lean microframework built on top of virtual-dom. It outperforms all the other popular frameworks (https://github.com/evancz/todomvc-perf-comparison). This is key to a fast rendering speed in low end mobile devices. Virtual DOM improves rendering time by 'caching' and updating elements instead removing all of them and adding the new ones.
This library is not actively developed since it has reach a very stable state. However work is focus just on bug fixing now. This framework aligns with the few requirements and is focused in performance.

### Sass
Even thought the project is not so heavy in style I have opted to use sass in order to write styles more friendly.

### Browserify
For unified modules and bundling the app.

### Grunt
For creating a build pipe. This would scale as pipeline increases. Task like Sass could be included in grunt.

### Uglify
For Making bundle smaller and more compact. Even though is not a requirement it is a good practise for faster download times.

### Babel
Let you write ES6 and target browsers not supporting it. ES6 Code is more compact and less verbose and usually express functionality in less lines of code.

### Color
For creating and manipulating colors. Even though this part is trivial using a library let us focus in the app logic.


## Architecture
This app has an unidirectional architecture. App initialises and renders with a state and it cascades down to all the components.
Components can send values to channels through events and channels create new states which feeds the main render function again.
Render functions and components are pure since output just depends on the input(state). It's simple, clear, fast and components doesn't store
state internally.

```
App.render(state) -> Component1.render(state)-,-,------------->(Optional, trigger event)------,
^					 Component2.render(state)/ /										      |
New state			 Component3.render(state) /												  |
^					 																		  |
|					 																		  |
'----[Event Delegates send values to channels and channels update state]<---------------------'
```

## Solver
This is a script for solving the game. It has been build as an external script that interact with the app. They don't share state at all.
I have provided a solve.html file which loads this script.
There are two ways to use it:
- By clicking in the Solve button at the bottom right.It solves current step.
- Calling in the developer console the next function:

```javascript
solveSteps(steps, highlightTime, delay):
```
`steps` is the number of steps you want to solve.

`highlightTime` is the time the tile will be highlighted

`delay` is the time it will wait before solving the next level. It takes some time until App creates a new level.Because app doesn't tell when it's ready the solver script has to wait some time. It depends on the machine but in mine
a delay of 50ms(when highlightTime is 0) is more than enough for all the levels



## Road map/Possible improvements
- Error handling and validation.
- User name input. Minimum and maximum length. Custom error messages.
- Progressive web application. It would let play in offline mode and attach the game as an app to home screen.
- More responsive layout with a scroll system for board and lists.
