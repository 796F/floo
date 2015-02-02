# floo

floo is a mimimal command line LAN transfer tool inspired by a well known wizard.

## install

`npm install -g floo`

## basic usage

step 1: decide on a portal name.  for these examples, I have used dumbledore.  

clipboard

```
ctrl+c something ...

myComp~$ floo -c dumbledore
clipboard floo ready!

mySecondComp~$ floo -c dumbledore
floo to clipboard!

now your cliboard is copied to mySecondComp!
```

pipes

```
echo, cat, etc ...

myComp~$ cat myConfig.txt | floo dumbledore
pipe floo ready!

mySecondComp~$ floo dumbledore >> myConfig.txt
out comes floo!

fat pipes fit files of any size!
```

## other options

file io using `-f`:

```
myComp~$ floo -f myConfig.txt dumbledore
mySecondComp~$ floo dumbledore

```

directory io using `-d`:

```
myComp~$ floo -d /my/configs/dir dumbledore

mySecondComp~$ floo -d /my/new/dir dumbledore

```

## data output examples

file : 

`mySecondComp~$ floo 123 myConfig.txt`

directories :

`mySecondComp~$ floo 123 ./my/new/dir`
