# JEval

# What is this?

A tool that allows you to use Javascript when mapping over lines from stdin. Meant to be used when mapping over results from a shell command. This can also handle reduce and filter and probably other functional methods that I have not demoed below:

#### Example of map - Print out each line with an @ symbol appended
```
echo "hey\nthere\n" | jeval "console.log(this.l + \"@\")"
```
#### Example of filter - filtering for only strings including "there"
```
echo "hey\nthere\n" | jeval "this.l.includes(\"there\") && console.log(this.l + \"@\")"
```
#### Example of reduce - Start with an empty array, push each line onto the array, when done iterating over everything run the last line
* The final eval string occurs so that you can figure out how to want to return the accumulator. As JSON for example or maybe line by line to be mapped over again
```
echo "hey\nthere\n" | jeval "[]" "console.log(this.l + \"@\"); this.a.push(this.l);" "console.log(this);"
```
* A demo showing map then reduce
```
echo "hey\nthere\nmy\nname\nis\nbrad" | jeval "console.log(this.l.toUpperCase())" | jeval "[]" "this.l.length > 3 && this.a.push(this.l);" "console.log(this);"
```
