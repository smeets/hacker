(function(GLOBAL) {

    function Stream () {
        this.data = "";
        
        this.mark = 0;
        this.cursor = 0;

        this.pipes = [];
        this.callbacks = [];
    }

    Stream.prototype.write = function(data) {
        for (var i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i].func.call(this.callbacks[i].ctx || this, data);
        };

        for (var i = 0; i < this.pipes.length; i++) {
            this.pipes[i].write(data);
        };
        
        this.data += data;
    }

    Stream.prototype.read = function(length) {}
    Stream.prototype.readLine = function() {}
    
    Stream.prototype.pipe = function(stream, ctx) {
        if (this.data.length > 0) stream.write(this.data);
        this.pipes.push(stream);
        return stream;
    }
    Stream.prototype.unpipe = function(stream) {
        this.pipes.splice(this.pipes.indexOf(stream));
    }

    Stream.prototype.on = function(func, ctx) {
        return this.callbacks.push({ func: func, ctx : ctx });
    }
    Stream.prototype.off = function(id) {
        this.callbacks.splice(id);
    }
  
    // Export 'Stream'
    GLOBAL.Stream = Stream;
})(Hacker);