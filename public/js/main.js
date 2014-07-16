var bootTime = 0;
var bootStages = [
  "Loading kernel",
  "Starting network interface",
  "Reading file system",
  "Switching user"
];
var bootTimeScales = [0.1, 0.1, 0.3, 0.05];
var timescale = 0.1;


// print dotted boot msg: str<dots>OK, time taken is spd * (2 + dots) seconds
function printBootMessage(str, dots, spd) {
  Hacker.Terminal.printTimed.delay(bootTime, str, 0.15);
  bootTime += (0.15 / str.length) + 0.1;

  $R(0, dots - 1).each(function (n) {
    bootTime += spd;
    Hacker.Terminal.print.delay(bootTime, ".");
  });
  bootTime += spd;
  Hacker.Terminal.prettyPrintln.delay(bootTime, "OK", "#AAFFAA");
}

// prepare all boot stages
$A(bootStages).each(function (str, index) {
  printBootMessage(str, 5 + Math.floor((0.5 + Math.random()) * 5), bootTimeScales[index] * timescale + 0.33 * Math.random() * timescale);
});

function handleUserInput(entries) {
  if (!entries.length) entries = [entries];

    entries.each(function (container) {
      if (container.entry) {
          // this is a command
          if (container.entry.cmd === "output") {
            console.log(FileStream);
            var fs = new FileStream("file", 6);
            fs.write("hej");
          }
      } else if (container.io) {
          // pipeline / redirect for next command
      }
      console.log(container);
    });
}

// once boot is done, call this and fire up erryting!
Hacker.Terminal.printTimed.delay(bootTime, "System ready, startup took ", .15,
  function() {
    Hacker.Terminal.prettyPrint(bootTime.toPrecision(3), "#AAFFAA");
    Hacker.Terminal.println("s");
    Hacker.resetInputBar();

    // setup input handling
    Hacker.keyboardInput.on(function (data) {
      Hacker.Terminal.print(Hacker.Terminal.prefix + data + "<br>");
      handleUserInput(Hacker.CONSOLE_REGEXP.parse(data));
    }, Hacker);
  }
);
