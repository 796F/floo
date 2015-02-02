# floo

floo is a simple LAN command line data transfer tool inspired by well-known modern wizardry.

its (arguably) useful for transfering files and clipboard content between computers via LAN.

this is also my first tool, so any code reviews/feedback/ideas are much appreciated!

## 1.  install

`npm install -g floo`

## 2.  name your floo using `floo name`

```
LocalComputer-1 ~ $ floo name sirius-floo
your fireplace is now named sirius-floo
```

## 3.  start using floo - responsibly

to transfer clipboard content, simply run `floo` at one computer, and `floo sirius-floo` at another

```
LocalComputer-1 ~ $ floo
sirius-floo is now ready on port 1337

...

LocalComputer-2 ~ $ floo sirius-floo```

viola! your clipboard just floo

now let's pipe something ... like bacon!

```
LocalComputer-1 ~ $ cat bacon.jpg | floo
sirius-floo is now ready on port 1337

...

LocalComputer-9 ~ $ floo sirius-floo >> bacon_get.jpg```

viola!  your bacon just floo!

## get nearby floo using `floo list` 

```
LocalComputer-1 ~ $ floo list
floo-rider
sirius-floo
floo-away
my-bacon-floo
```

## misc

`floo help` for commands
`floo port <number>` to set the port number (default 1337)

```
TODO : 
implement transfering entire directories.
transfer across http
better code!
```
