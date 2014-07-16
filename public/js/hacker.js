(function(GLOBAL) {
  // Hijack eval
  GLOBAL.EVAL = window.eval;
  window.eval = function(args) {};

  // Setup terminal
  var output = document.getElementById("output");
  GLOBAL.Terminal = {};

  function print(str) { output.innerHTML += str; }
  function println(str) { print(str + "<br>"); }
  function clear() { output.innerHTML = ""; }

  function printTimed(str, time, clbk) {
    var charTime = time / str.length; // chars per second
    var cursor = 0;

    function printLoop(){
      print(str.substr(cursor++, 1));
      if (cursor < str.length)
        setTimeout(printLoop, charTime);
    }
    printLoop();
    
    if (clbk) clbk.delay(charTime * str.length);
    return charTime * str * length;
  }

  function prettyPrint(str, clr) {
    print("<font color='" + clr + "'>" + str + "</font>");
  }

  function prettyPrintln(str, clr) {
    prettyPrint(str + "<br>", clr);
  }

  Object.extend(GLOBAL.Terminal, {
    print : print,
    println : println,
    clear : clear,
    prettyPrint : prettyPrint,
    prettyPrintln : prettyPrintln,
    printTimed : printTimed
  });

  GLOBAL.keyboardInput = new GLOBAL.Stream();

  // Setup input handler

  var terminal = document.getElementById("terminal");
  GLOBAL.Terminal.prefix = "mbair:/ root$ ";

  GLOBAL.resetInputBar = function () {
    terminal.value = GLOBAL.Terminal.prefix;
    terminal.focus();
    terminal.selectionStart = GLOBAL.Terminal.prefix.length;
  }

  var keyCodes = {
    "backspace" : 8, // backspace
    "enter" : 13 // enter
  };

  terminal.onkeypress = function (event) {
    switch (event.keyCode) {
      case keyCodes.enter:
        var input = terminal.value.substring(GLOBAL.Terminal.prefix.length, terminal.value.length);
  
        GLOBAL.keyboardInput.write(input);
        
        GLOBAL.resetInputBar();
        
        event.preventDefault();
        window.scrollTo(0, document.body.scrollHeight);
        break;
      case keyCodes.backspace:
        var start = GLOBAL.Terminal.prefix.length;
        if (terminal.selectionStart < start || terminal.selectionEnd < start)
          event.preventDefault();
        break;
    } 
  }

})(Hacker);