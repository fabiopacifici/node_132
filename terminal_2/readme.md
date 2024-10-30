# Files management

- create a file using `touch` (linux o mac) or `ni` (in windows powershell)
- see the file content using `cat` (linux/mac/win)
- remove a file using `rm` (linux/mac/win)

## create an empty file

```bash
touch file_name_here.txt
```

## remove a file

```bash
rm file_name_here.txt
```

## view the content of a file

if the file is empty you won't see any output

```bash
cat file_name_here.txt
```

## create a file and add content to (linux/mac)

solo per mac e linux

```bash

echo "some text here" > file_name_here.txt
```

solo per powershell

```powershell
write  "some text here" > file_name_here.txt 
```
