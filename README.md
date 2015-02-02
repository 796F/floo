# floo

floo is a LAN command line data transfer tool inspired by a well-known wizardry concept.

its (arguably) useful for transfering files and clipboard content between computers via LAN.

this is also my first tool, so any code reviews/feedback/ideas are welcome!  

## 1.  install

`npm install -g floo`

## 2.  name your floo

```
LocalComputer-1 ~ $ floo name sirius-floo
your fireplace is now named sirius-floo
```

## 3.  use floo - responsibly

transfer clipboard content via floo! 

```
LocalComputer-1 ~ $ floo
sirius-floo is now ready on port 1337
```

then at another computer ...

```LocalComputer-2 ~ $ floo sirius-floo```

viola! your clipboard just floo

piping things ... like bacon!

```
LocalComputer-1 ~ $ cat bacon.jpg | floo
sirius-floo is now ready on port 1337
```

then at another computer ...

`LocalComputer-9 ~ $ floo sirius-floo >> bacon_get.jpg`

viola!  your bacon just floo!

## getting nearby floo! 

```
LocalComputer-1 ~ $ floo list
floo-rider
sirius-floo
floo-away
bacon-floo
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
