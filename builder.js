class OTG {
    constructor(model, color, maxTemperature, maxTimeSelection) {
        this.model = model;
        this.title = 'OTG';
        this.color = color;
        this.maxTemperature = maxTemperature || 150;
        this.maxTimeSelection = maxTimeSelection || 30;
    }
}

const redOTG = new OTG('LG', 'red');
const highTempOTG = new OTG('LG', 'black', 200);
const highendTimeOTG = new OTG('LG', 'red', '150', '60');

class OTGBuilder {
    constructor(model, color) {
        this.model = model;
        this.title = 'OTG';
        this.color = color;
    }
    setMaxTemperature(temp) {
        this.maxTemperature = temp;
        return this;
    }

    setMaxTimeSelection(maxTime) {
        this.maxTimeSelection = maxTime;
        return this;
    }

    build() {
        return new OTG(this.model, this.color,
            this.maxTemperature, this.maxTimeSelection);
    }
}

const otg = new OTGBuilder('MorphyRichards', 'Black')
    .setMaxTemperature(250)
    .setMaxTimeSelection(60);

const basicOTG = new OTGBuilder('MorphyRichards', 'Black')
    .setMaxTemperature(250)
    .setMaxTimeSelection(60)
    .build();