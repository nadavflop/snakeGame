let userInput= prompt("write a number here");
function bob(){
    if ((userInput * userInput) %2 ==0){
        document.writeln("<div id='f'>"+"yay it works!"+"</div>")
    }
    document.writeln("<div id='ff'>"+Math.sqrt(userInput)+"</div id='ff'>")
}

bob();