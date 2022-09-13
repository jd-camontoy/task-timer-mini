# Task Timer Mini

A simple Pomodoro-based timer that promotes productivity by providing a countdown to where the user is encouraged to focus on a task with the given period.

Used simple HTML, CSS, and JavaScript, with the help of [canvas-sketch](https://github.com/mattdesl/canvas-sketch) for the page art.

---

## Running the Canvas

If you wish to edit the side art, you can update the `noise-on-grid.js` file located at the `canvas` folder. To see the canvas updates in real-time, run the following command on terminal:

```
canvas-sketch noise-on-grid.js --open
```

Once done with the updates, and would like to attach the art to the timer main page, build the canvas art by running the following command on terminal:

```
canvas-sketch noise-on-grid.js --name index --build
```

> Note: Ensure that the related dependencies were installed before running the commands. If unsure, run the following command: `npm install`