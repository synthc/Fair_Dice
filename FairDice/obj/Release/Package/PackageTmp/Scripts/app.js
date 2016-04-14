//Dice object that can roll random numbers and keep track of the results:
var Dice = new function () {
    //Roll instance counters:  //TODO: make this an array
    this.two = 0;
    this.three = 0;
    this.four = 0;
    this.five = 0;
    this.six = 0;
    this.seven = 0;
    this.eight = 0;
    this.nine = 0;
    this.ten = 0;
    this.eleven = 0;
    this.twelve = 0;
    this.counter = 0;

    //Roll cycle size and tolerances within cycle:
    this.cycleSize = 36;
    this.twoTol = 1;
    this.threeTol = 2;
    this.fourTol = 3;
    this.fiveTol = 4;
    this.sixTol = 5;
    this.sevenTol = 6;
    this.eightTol = 5;
    this.nineTol = 4;
    this.tenTol = 3;
    this.elevenTol = 2;
    this.twelveTol = 1;

    //About text switch:
    this.showAbout = false;

    //Tolerance overage report array:
    this.overages = [two = false, three = false, four = false, five = false, six = false, seven = false, eight = false, nine = false, ten = false, eleven = false, twelve = false];

    //Array to keep track of rerolls:
    this.rerolls = [two = 0, three = 0, four = 0, five = 0, six = 0, seven = 0, eight = 0, nine = 0, ten = 0, eleven = 0, twelve = 0];

    //Array to keep track of passed (adjusted) rolls:
    this.rolls = [two = 0, three = 0, four = 0, five = 0, six = 0, seven = 0, eight = 0, nine = 0, ten = 0, eleven = 0, twelve = 0];

    this.roll = function (mode) {
        //Reset counters when the cycle completes
        if (this.counter >= this.cycleSize) {
            this.d_Reset();
        }

        var result = 0;

        if (mode == "natural") {
            var die1 = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
            var die2 = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
            this.cycleSize = 36;
            this.twoTol = 1;
            this.threeTol = 2;
            this.fourTol = 3;
            this.fiveTol = 4;
            this.sixTol = 5;
            this.sevenTol = 6;
            this.eightTol = 5;
            this.nineTol = 4;
            this.tenTol = 3;
            this.elevenTol = 2;
            this.twelveTol = 1;
            result = die1 + die2;
        }
        else {
            this.cycleSize = 11;
            this.twoTol = 1;
            this.threeTol = 1;
            this.fourTol = 1;
            this.fiveTol = 1;
            this.sixTol = 1;
            this.sevenTol = 1;
            this.eightTol = 1;
            this.nineTol = 1;
            this.tenTol = 1;
            this.elevenTol = 1;
            this.twelveTol = 1;
            result = Math.floor(Math.random() * (12 - 2 + 1)) + 2;
        }
        if (result == 2) {
            this.two++;
        }
        else if (result == 3) {
            this.three++;
        }
        else if (result == 4) {
            this.four++;
        }
        else if (result == 5) {
            this.five++;
        }
        else if (result == 6) {
            this.six++;
        }
        else if (result == 7) {
            this.seven++;
        }
        else if (result == 8) {
            this.eight++;
        }
        else if (result == 9) {
            this.nine++;
        }
        else if (result == 10) {
            this.ten++;
        }
        else if (result == 11) {
            this.eleven++;
        }
        else if (result == 12) {
            this.twelve++;
        }
        this.checkTolerances();
        return result;
    }

    this.checkTolerances = function () {
        //If tolerances are exceeded, mark them as such:
        if (this.two > this.twoTol && !this.overages[0]) {
            this.overages[0] = true;
        }
        if (this.three > this.threeTol && !this.overages[1]) {
            this.overages[1] = true;
        }
        if (this.four > this.fourTol && !this.overages[2]) {
            this.overages[2] = true;
        }
        if (this.five > this.fiveTol && !this.overages[3]) {
            this.overages[3] = true;
        }
        if (this.six > this.sixTol && !this.overages[4]) {
            this.overages[4] = true;
        }
        if (this.seven > this.sevenTol && !this.overages[5]) {
            this.overages[5] = true;
        }
        if (this.eight > this.eightTol && !this.overages[6]) {
            this.overages[6] = true;
        }
        if (this.nine > this.nineTol && !this.overages[7]) {
            this.overages[7] = true;
        }
        if (this.ten > this.tenTol && !this.overages[8]) {
            this.overages[8] = true;
        }
        if (this.eleven > this.elevenTol && !this.overages[9]) {
            this.overages[9] = true;
        }
        if (this.twelve > this.twelveTol && !this.overages[10]) {
            this.overages[10] = true;
        }
    }

    this.d_Reset = function () {
        this.two = 0;
        this.three = 0;
        this.four = 0;
        this.five = 0;
        this.six = 0;
        this.seven = 0;
        this.eight = 0;
        this.nine = 0;
        this.ten = 0;
        this.eleven = 0;
        this.twelve = 0;
        this.counter = 0;
        this.overages = [two = false, three = false, four = false, five = false, six = false, seven = false, eight = false, nine = false, ten = false, eleven = false, twelve = false];
    }
}

var normalizer = function (naturalProb, equalProb, noAdjust) {
    var roll = 0;
    var valid = false;

    if (naturalProb) {
        while (!valid) {
            roll = Dice.roll("natural");
            //Check if the roll is over tolerance; if it is, reroll:
            if (Dice.overages[roll - 2]) {
                valid = false;
                //Log as a rerolled number:
                Dice.rerolls[roll - 2]++;
            }
            else {
                valid = true;
                //Augment the counter for each passed (valid) roll:
                Dice.counter++;
                //Log as a valid/passed roll:
                Dice.rolls[roll - 2]++;
            }
        }
    }
    else if (equalProb) {
        while (!valid) {
            roll = Dice.roll("equal");
            //Check if the roll is over tolerance; if it is, reroll:
            if (Dice.overages[roll - 2]) {
                valid = false;
                //Log as a rerolled number:
                Dice.rerolls[roll - 2]++;
            }
            else {
                valid = true;
                //Augment the counter for each passed (valid) roll:
                Dice.counter++;
                //Log as a valid/passed roll:
                Dice.rolls[roll - 2]++;
            }
        }
    }
    else {
        roll = Dice.roll("natural");
    }
    return roll;
}

//Create array to log recent passed rolls:
var rollLog = [];

function onRoll() {

    //Determine mode chosen by user:
    var naturalProb = document.getElementById("naturalProb").checked;
    var equalProb = document.getElementById("equalProb").checked;
    var noAdjust = document.getElementById("noAdjust").checked;

    //Run the normalizer with given parameters and get roll result:
    var result = normalizer(naturalProb, equalProb, noAdjust);

    //Log and display the results:
    rollLog.unshift(result);
    $("#adjLog0").text(rollLog[0]);
    if (rollLog.length > 1) {
        $("#adjLog1").text(rollLog[1]);
    }
    if (rollLog.length > 2) {
        $("#adjLog2").text(rollLog[2]);
    }
    if (rollLog.length > 3) {
        $("#adjLog3").text(rollLog[3]);
    }
    if (rollLog.length > 4) {
        $("#adjLog4").text(rollLog[4]);
    }
    if (rollLog.length > 5) {
        rollLog.pop();
    }

    if (!noAdjust) {
        //Log total passed rolls to the statistics table:
        $("#twoAdj").text(Dice.rolls[0]);
        $("#threeAdj").text(Dice.rolls[1]);
        $("#fourAdj").text(Dice.rolls[2]);
        $("#fiveAdj").text(Dice.rolls[3]);
        $("#sixAdj").text(Dice.rolls[4]);
        $("#sevenAdj").text(Dice.rolls[5]);
        $("#eightAdj").text(Dice.rolls[6]);
        $("#nineAdj").text(Dice.rolls[7]);
        $("#tenAdj").text(Dice.rolls[8]);
        $("#elevenAdj").text(Dice.rolls[9]);
        $("#twelveAdj").text(Dice.rolls[10]);

        //Log total rerolls to the statistics table:
        $("#twoRR").text(Dice.rerolls[0]);
        $("#threeRR").text(Dice.rerolls[1]);
        $("#fourRR").text(Dice.rerolls[2]);
        $("#fiveRR").text(Dice.rerolls[3]);
        $("#sixRR").text(Dice.rerolls[4]);
        $("#sevenRR").text(Dice.rerolls[5]);
        $("#eightRR").text(Dice.rerolls[6]);
        $("#nineRR").text(Dice.rerolls[7]);
        $("#tenRR").text(Dice.rerolls[8]);
        $("#elevenRR").text(Dice.rerolls[9]);
        $("#twelveRR").text(Dice.rerolls[10]);

        //Log total times rolled (including rerolls) to the statistics table:
        $("#twoAct").text(Dice.rolls[0] + Dice.rerolls[0]);
        $("#threeAct").text(Dice.rolls[1] + Dice.rerolls[1]);
        $("#fourAct").text(Dice.rolls[2] + Dice.rerolls[2]);
        $("#fiveAct").text(Dice.rolls[3] + Dice.rerolls[3]);
        $("#sixAct").text(Dice.rolls[4] + Dice.rerolls[4]);
        $("#sevenAct").text(Dice.rolls[5] + Dice.rerolls[5]);
        $("#eightAct").text(Dice.rolls[6] + Dice.rerolls[6]);
        $("#nineAct").text(Dice.rolls[7] + Dice.rerolls[7]);
        $("#tenAct").text(Dice.rolls[8] + Dice.rerolls[8]);
        $("#elevenAct").text(Dice.rolls[9] + Dice.rerolls[9]);
        $("#twelveAct").text(Dice.rolls[10] + Dice.rerolls[10]);
    }

}

function toggleAbout() {
    if (!Dice.showAbout) {
        Dice.showAbout = true;
        $("#aboutText").text("\n\nThis algorithm normalizes dice rolls with two dice.  This means that it will prevent numbers from being rolled too often.\n\n  When rolling two dice, certain numbers are more likely to be rolled than others.  This is due to the way the numbers add up.  For example, there are six different ways to roll a seven (1+6, 2+5, 3+4, 4+3, 5+2, 6+1), but only one way to roll a two (1+1).\n\n  This algorithm works by assigning a tolerance value to each possible roll result based on the natural probability of rolling that number with two dice.  If the tolerance for a number is exceeded (the number is rolled too many times without other numbers being rolled first) the number will be rerolled until a number whose tolerance has not been exceeded is rolled.");
    }
    else {
        Dice.showAbout = false;
        $("#aboutText").text("");
    }
    
}

function resetAll() {
    var cont = confirm("Your current session will be lost. Continue?");
    if (cont) {
        window.location.reload();
    }
}
