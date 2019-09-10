let Ramp = {
    part: [ { a: 0,   b: 0,  c: 14,  d: 0,   e: 0  },
            { a: 0.5, b: 1,  c: 2,   d: 10,  e: 10 },
            { a: 0,   b: 0,  c: 1.5, d: 0,   e: 0  }, 
            { a: 0.5, b: 1,  c: 2,   d: 21,  e: 21 },
            { a: 0,   b: 0,  c: 6,   d: 0,   e: 0  },
            { a: 0,   b: 0,  c: 0,   d: 0,   e: 0  }, ],

    f: function(part, x) {
        return part.a * Math.pow((x - part.d), 2) + part.b * (x - part.e) + part.c;
    },

    Plot: function() {
        let x = 0;

        Context.beginPath();
        Context.lineWidth = 0.1;

        Context.moveTo(0, this.f(this.part[0], x));

        for (; x <= 30; x += 0.2) {
            let y = 0;

            if (x >= 0 && x <= 4)
                y = this.f(this.part[0], x); 
            else if (x > 4 && x <= 9)
                y = this.f(this.part[1], x); 
            else if (x > 9 && x <= 20)
                y = this.f(this.part[2], x); 
            else if (x > 20 && x <= 23)
                y = this.f(this.part[3], x); 
            else if (x > 23 && x <= 28)
                y = this.f(this.part[4], x); 
            else if (x > 28 && x <= 40)
                y = this.f(this.part[5], x); 

            Context.lineTo(x, y);
            Context.stroke();
        }

        Context.closePath();
    }
}