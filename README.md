console-faker
=============

Get some file content to be printed out on console while you type anything on your keyboard.

It is basic a [hackertyper](http://hackertyper.com/)-like implementation but using the Node.js console. Use any file you want as an input.


## What is it good for anyways?

Now, there is one serious use for this tool. It is great for live presentations. Do you love the coolness of live-coding but find it too risky and error-prone to do it under all the stress of presenting to a real crowd?

Here is your solution, any javascript file used as an input will have each line executed by the node console as if it were a real input. So you can have your shaking hand slamming on the keyboard as you speak and your previously-tested code will be outputed (and executed if it's javascript) neatly.


## Install

Just use a simple npm install command:

```shell
npm install -g console-faker
```


## Usage

It is as simple as running:

```shell
console-faker ./path/to/my-file.js
```

You can also use multiple files as an input:

```shell
console-faker ./test.js ./src/index.js
```


### Running from shell scripts

If you are going to use it for presenting to an audience, it might be a good idea to have a shell script file to run it from, instead of invoking the `consoke-faker` command directly.

Having a `./run` file with, let's say:

```shell
console-faker ./my-demo-code.js
```

Will do the job. Just do not forget to give it the proper execution rights: `chmod a+x ./run`
And execute your script with: `./run`.


### Formatting a js file for a presentation

Ideally, you will need a javascript file formatted just like if you were inputting it into the console. Actually creating it while inputting each line on the node console should be the better way to go.

A small examples is available under the `example/presentation.js` file in the [Github repository](https://github.com/ruyadorno/console-faker).


## License

Released under the MIT license
