#!/usr/bin/env zsh
export CORRECT1="[ 'THERE', 'NAME', 'BRAD' ]";  
export TEST1="`echo "hey\nthere\nmy\nname\nis\nBrad" | jeval "cl(this.l.toUpperCase())" | jeval "([])" "this.l.length > 3 && this.a.push(this.l);" "cl(this);"`"; 
if [[ "$CORRECT1" == "$TEST1" ]]; then
    echo "Test 1 Passes"
else
    echo "Test 1 Fails"
    exit 1
fi

export CORRECT2="`echo \"hey@\nthere@\"`";  
export TEST2="`echo \"hey\nthere\n\" | jeval \"console.log(this.l + \\\"@\\\")\"`"; 
if [[ "$CORRECT2" == "$TEST2" ]]; then
    echo "Test 2 Passes"
else
    echo "Test 2 Fails"
    exit 1
fi

export CORRECT3="{ c: [ 'THERE', 'NAME', 'BRAD' ] }";  
export TEST3="`echo "hey\nthere\nmy\nname\nis\nBrad" | jeval "cl(this.l.toUpperCase())" | jeval "({c: []})" "this.l.length > 3 && this.a.c.push(this.l);" "cl(this);"`"; 
if [[ "$CORRECT3" == "$TEST3" ]]; then
    echo "Test 3 Passes"
else
    echo "Test 3 Fails"
    exit 1
fi


exit 0
