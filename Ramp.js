let Ramp = {
    part: [ { a: 0,   b: 0,  c: 14,  d: 0,   e: 0  },
            { a: 0.5, b: 1,  c: 2,   d: 10,  e: 10 },
            { a: 0,   b: 0,  c: 1.5, d: 0,   e: 0  }, 
            { a: 0.5, b: 1,  c: 2,   d: 21,  e: 21 },
            { a: 0,   b: 0,  c: 6,   d: 0,   e: 0  },
            { a: 0,   b: 0,  c: 0,   d: 0,   e: 0  }, ],

    f: function(x) {
        let chosenPart;

        if (x >= 0 && x <= 4)
            chosenPart = this.part[0]; 
        else if (x > 4 && x <= 9)
            chosenPart = this.part[1]; 
        else if (x > 9 && x <= 20)
            chosenPart = this.part[2]; 
        else if (x > 20 && x <= 23)
            chosenPart = this.part[3]; 
        else if (x > 23 && x <= 28)
            chosenPart = this.part[4]; 
        else if (x > 28 && x <= 40)
            chosenPart = this.part[5]; 
        else
            return 0;

        return chosenPart.a * Math.pow((x - chosenPart.d), 2) + chosenPart.b * (x - chosenPart.e) + chosenPart.c;
    }
}