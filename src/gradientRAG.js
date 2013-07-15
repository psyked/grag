var grag = {
    
    // @param element obj Dom element obj (document.getElementById)
    // @param options obj
	    
    init : function(ragId, percentageId, options)
    {
        if (typeof ragId === 'string')
        {
            ragId = [ragId];
        }
        if (typeof percentageId === 'string')
        {
            percentageId = [percentageId];
        }
                          
        for (var rag in ragId)
        {
            var ragSelector = document.getElementById(ragId[rag]);
            ragSelector.grag = {
                element : ragSelector,
                source : document.getElementById(percentageId[rag]),
                options : {
                    saturation : 100,
                    lightness : 50
                },

                percentage : 0,

                init : function()
                {
                    this.processOptions(options);
                    var update = this;
                    var exisiting = this.source.onchange;
                    this.source.onchange = function() {
                        if(typeof exisiting == 'function')
                        {
                            exisiting();
                        }
                        update.update();
                    }
                },

                processOptions : function(options)
                {
                    if (typeof options !== 'undefined')
                    {
                        for (var option in options)
                        {
                            this.options[option] = options[option];
                        }
                    }
                },

                update : function()
                {
                    console.log(this.options);
                    if(this.getPercentage() !== false)
                    {
                        this.element.style.backgroundColor=grag.getRGB(this.percentage, this.options.saturation, this.options.lightness);
                    }
                },

                getPercentage : function()
                {
                    if (this.percentage < 0 || this.percentage > 100)
                    {
                        return false;
                    }
                    this.percentage = this.source.value;
                }
            }
            ragSelector.grag.init();
        }
    },
        
    getRGB : function(percentage, s, l)
    {
        var h = 110 * (percentage/100);
        var m1, m2, hue;
        var r, g, b
        s /=100;
        l /= 100;
        if (s == 0)
        {
            r = g = b = (l * 255);
        }
        else
        {
            if (l <= 0.5)
                m2 = l * (s + 1);
            else
                m2 = l + s - l * s;
            m1 = l * 2 - m2;
            hue = h / 360;
            r = HueToRgb(m1, m2, hue + 1/3);
            g = HueToRgb(m1, m2, hue);
            b = HueToRgb(m1, m2, hue - 1/3);
        }

        function HueToRgb(m1, m2, hue)
        {
            var v;
            if (hue < 0)
                hue += 1;
            else if (hue > 1)
                hue -= 1;

            if (6 * hue < 1)
                v = m1 + (m2 - m1) * hue * 6;
            else if (2 * hue < 1)
                v = m2;
            else if (3 * hue < 2)
                v = m1 + (m2 - m1) * (2/3 - hue) * 6;
            else
                v = m1;

            return 255 * v;
        }
        return 'rgb(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')';
    }    
}