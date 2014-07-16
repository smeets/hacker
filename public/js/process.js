(function(GLOBAL){
    function Process (id, owner) {
        this.id = id;
        this.owner = owner;

        this.stdin = new Hacker.Stream();
        this.stdout = new Hacker.Stream();
    }

    Process.prototype.pipe = function(proc) {
        this.stdout.pipe(proc.stdin);
        return proc;
    };

    GLOBAL.Process = Process;
})(Hacker);