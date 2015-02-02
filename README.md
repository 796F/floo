# floo

floo is a LAN command line data transfer tool inspired by a well-known wizardry concept.

## step 1 : install

`npm install -g floo`

## step 2 : configure floo

`floo name sirius-floo`
your fireplace is now named `sirius-floo`

## step 3 : use responsibly

transfer clipboard content via floo! 

`LocalComputer-1 ~ $ floo clip`
`LocalComputer-2 ~ $ floo clip sirius-floo`

piping things ... like bacon!

`LocalComputer-1 ~ $ cat bacon.jpg | floo`
`LocalComputer-9 ~ $ floo sirius-floo >> stolen_bacon.jpg`

## get nearby floo! 

```
LocalComputer-1 ~ $ floo list
floo-rider
sirius-floo
floo-away
floo-in
```

## commands

```
floo name (-n)
floo clip (-c)
floo list (-l)
```