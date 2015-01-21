# floo

floo is a simple command line LAN transfer tool inspired by a well known wizard.  

it accepts both pipe and file/dir.

## install

`npm install -g floo`

## piped

media files :

```
  myComp~$ cat myFace.jpg | floo
  floo Openned : 1549

  mySecondComp~$ floo 1549 >> myFace.jpg
```

text blobs : 

```
  myComp~$ echo "kopee me to ur klipboredz" | floo
  floo Openned : 9377

  mySecondComp~$ floo 9377 | pbcopy
```

## argument

file :

```
  myComp~$ floo myFace.jpg
  floo Openned : 4343

  mySecondComp~$ floo 4343
  Teleported : myFace.jpg
```

entire directory : 

```
  myComp~$ floo /my/dir
  floo Openned : 1337

  mySecondComp~$ floo 1337
  Teleported : /my/dir/porn1.jpg
  Teleported : /my/dir/porn2.jpg
  Teleported : /my/dir/porn3.jpg
  ...
  Teleported : /my/dir/porn1957283940957.jpg
```

## todo

file name and directory transfers