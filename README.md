# floo

floo is a LAN command line data transfer tool inspired by a well-known wizardry concept.

its useful for transfering files and clipboard content between computers via LAN.
TODO : implement transfering entire directories.

## install

`npm install -g floo`

## name your floo

```
LocalComputer-1 ~ $ floo name sirius-floo
your fireplace is now named sirius-floo
```

## use floo responsibly

#### transfer clipboard content via floo! 

`LocalComputer-1 ~ $ floo`

then ...

`LocalComputer-2 ~ $ floo sirius-floo`

viola! your clipboard just floo

#### piping things ... like bacon!

`LocalComputer-1 ~ $ cat bacon.jpg | floo`

then ...

`LocalComputer-9 ~ $ floo sirius-floo >> stolen_bacon.jpg`

viola!  your bacon just floo!

## getting nearby floo! 

```
LocalComputer-1 ~ $ floo list
floo-rider
sirius-floo
floo-away
floo-in
```

## commands, in case you forget

```
floo name (-n)
floo list (-l)
```
