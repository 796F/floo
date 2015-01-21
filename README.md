# floo

floo is a mimimal command line LAN transfer tool inspired by a well known wizard.

## install

`npm install -g floo`

## usage examples

media files :

```
  myComp~$ cat myFace.jpg | floo
  floo powder 123

  mySecondComp~$ floo 1549 >> myFace.jpg
```

clipboare : 

```
  myComp~$ pbpaste | floo
  floo powder 123

  mySecondComp~$ floo 9377 | pbcopy
```

## to be implemented

file arguments :

```
  myComp~$ floo myFace.jpg
  floo powder 123

  mySecondComp~$ floo 4343
  Teleported : myFace.jpg
```

directory arguments :

```
  myComp~$ floo /my/dir
  floo powder 123

  mySecondComp~$ floo 1337
  Teleported : /my/dir/porn1.jpg
  Teleported : /my/dir/porn2.jpg
  Teleported : /my/dir/porn3.jpg
  ...
  Teleported : /my/dir/porn1957283940957.jpg
```