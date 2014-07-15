var Hacker = {};

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
    prettyPrintln : prettyPrintln
  });

  // Setup input handler

  var terminal = document.getElementById("terminal");
  var terminalLine = "mbair:/ root$ ";

  terminal.value = terminalLine;
  terminal.focus();
  terminal.selectionStart = terminalLine.length;

  var keyCodes = {
    "backspace" : 8, // backspace
    "enter" : 13 // enter
  };

  terminal.onkeypress = function (event) {
    switch (event.keyCode) {
      case keyCodes.enter:
        var input = terminal.value.substring(terminalLine.length, terminal.value.length);
  
        Hacker.Terminal.print(terminalLine);
        Hacker.Terminal.prettyPrintln(input, "green");
        
        terminal.value = terminalLine;
        
        event.preventDefault();
        window.scrollTo(0, document.body.scrollHeight);
        break;
      case keyCodes.backspace:
        var start = terminalLine.length;
        if (terminal.selectionStart < start || terminal.selectionEnd < start)
          event.preventDefault();
        break;
    } 
  }

})(Hacker);

var bootTime = 0;
var bootStages = ["Loading kernel", "Reading file system", "Switching user"];
var bootTimeScales = [0.1, 0.3, 0.05];

function printBootMessage(str, dots, spd) {
  Hacker.Terminal.print.delay(bootTime, str);
  $R(0, dots - 1).each(function (n) {
    bootTime += spd;
    Hacker.Terminal.print.delay(bootTime, ".");
  });
  bootTime += spd;
  Hacker.Terminal.println.delay(bootTime, "OK");
}

$A(bootStages).each(function (str, index) {
  printBootMessage(str, 3, bootTimeScales[index] + 0.33 * Math.random());
});

Hacker.Terminal.println.delay(bootTime, "System ready, boot took " + bootTime + "s.");
