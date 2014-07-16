(function(GLOBAL){
  
  var Program = {
    pipe: function (other) {
      this.process.stdout.pipe(other.process.stdin);
      return other;
    },
    write : function (data) {
      this.process.stdin.write(data);
    }
  };

  GLOBAL.Program = Program;

})(Hacker);