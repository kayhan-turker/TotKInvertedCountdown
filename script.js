
var skipTime = 0;
var moon_opacity = 0.12;


// Function to update the timer value_days

function updateTimer() {


    // Calculate the time difference

    var now = new Date();
    var targetDate = new Date("May 12, 2023 12:00:00");
    var timeDifference = targetDate - now - (12 * 60 * 60 + 60 * 60 * 24 * skipTime) * 1000;
    timeDifference = (timeDifference / (1000 * 60 * 60 * 24));

    // Update description

    var descString = getDescription(timeDifference);

    // Calculate the inverted value_days (100% divided by time difference in seconds)

    if (timeDifference < 0) {
        timeDifference = 0;
    }

    var invertedPercentvalue_days = (100 / timeDifference).toFixed(4);
    var invertedPercentLastTwo = "";

    if (timeDifference > 0){
        invertedPercentLastTwo = invertedPercentvalue_days.slice(-2) + "%";
        invertedPercentRemaining = invertedPercentvalue_days.slice(0, -2);
    }
    else
    {
        invertedPercentLastTwo = "";
        invertedPercentRemaining = "Infinity%";
    }


    // Display the time update value_days on the webpage

    var timeRemainingString;
    var invertedTimeString = "Inverted Time: " + invertedPercentRemaining;

    if (timeDifference > 3) {
        var days = timeDifference.toFixed(2);
        timeRemainingString = "Countdown: " + days + " days left";
    }
    else if (timeDifference > 0.25) {
        var hours = (timeDifference * 24).toFixed(2);
        timeRemainingString = hours + " Hours Remain";
    }
    else {
        var hours = Math.floor(timeDifference * 24);
        var minutes = Math.floor((timeDifference * 24 - hours) * 60);
        var seconds = Math.floor(((timeDifference * 24 - hours) * 60 - minutes) * 60);

        timeRemainingString = "Time Remaining: " + hours.toString().padStart(2, '0') + " : ";
        timeRemainingString += minutes.toString().padStart(2, '0') + " : ";
        timeRemainingString += seconds.toString().padStart(2, '0');
    }

    document.getElementById("timeLeft").innerHTML = timeRemainingString;
    document.getElementById("invertedPercent").innerHTML = invertedTimeString;
    document.getElementById("invertedPercentLastTwo").innerHTML = invertedPercentLastTwo;
    document.getElementById("description").innerHTML = descString;

}



function updateTimerSlow() {


    // Calculate the time difference

    var now = new Date();
    var targetDate = new Date("May 12, 2023 12:00:00");
    var timeDifference = targetDate - now - (12 * 60 * 60 + 60 * 60 * 24 * skipTime) * 1000;
    timeDifference = (timeDifference / (1000 * 60 * 60 * 24));

    if (timeDifference < 0) {
        timeDifference = 0;
    }

    // calculate moon size

    var size = 3 * 0.11 / timeDifference;  
    var imgs = document.getElementsByClassName("image-moon");

    for (var i = 0; i < imgs.length; i++) {
        imgs[i].style.transform = "translateX(-50%) translateY(-50%) translateX(935px) translateY(430px) scale(" + size + ") ";
    }

    // set the font color

    var factor = 0.26;
    var value_days = factor / (factor + timeDifference); 
    var value_hours = (0.5 - timeDifference * 24) / 0.5; 
    var value_seconds = (10 - timeDifference * 24 * 60 * 60) / 10; 

    var divs = document.getElementsByClassName("font-color");

    var color1 = "#41b081";
    var color2 = "#FF0000";
    var interpolatedColor = interpolateHexColor(color1, color2, value_days);
    if (value_seconds > 0)
        interpolatedColor = interpolateHexColor(interpolatedColor, "#FFFFFF", value_seconds);

    for (var i = 0; i < divs.length; i++) {
        divs[i].style.color = interpolatedColor;
    }


    // set moon color

    document.getElementById("moon").style.opacity = moon_opacity * (1 - value_days);
    document.getElementById("moon-red").style.opacity = moon_opacity * value_days;

    if (value_seconds > 0) {
        var value_days = value_hours;
        document.getElementById("moon").style.opacity = 0;
        document.getElementById("moon-red").style.opacity = moon_opacity * (1 - value_seconds);
        document.getElementById("image-done").style.opacity = value_seconds;
    }
}


// Function to interpolate between two colors

function interpolateHexColor(color1, color2, value_days) {
  // Convert the hex color codes to RGB value_dayss
  var r1 = parseInt(color1.substring(1, 3), 16);
  var g1 = parseInt(color1.substring(3, 5), 16);
  var b1 = parseInt(color1.substring(5, 7), 16);
  var r2 = parseInt(color2.substring(1, 3), 16);
  var g2 = parseInt(color2.substring(3, 5), 16);
  var b2 = parseInt(color2.substring(5, 7), 16);

  // Interpolate between the RGB value_dayss
  var r = Math.round(r1 + (r2 - r1) * value_days);
  var g = Math.round(g1 + (g2 - g1) * value_days);
  var b = Math.round(b1 + (b2 - b1) * value_days);

  // Convert the result back to hex
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}


function getDescription(timeDifference) {
    var descString = "";

    if (timeDifference > 3)
        descString = "Out of the days left right now, <br>what percent of that will be covered <br>with one more day of waiting.";
    else if ((3 - 6 / 24 ) < timeDifference && timeDifference <  (3 - 0 / 24 ))
        descString = "In the land of Hyrule, there<br>echoes a legend. A legend held<br>dearly by the Royal Family that<br>tells of a boy...";

    else if ((3 - 12 / 24 ) < timeDifference && timeDifference <  (3 - 6 / 24))
        descString = "You've met with a terrible fate,<br>haven't you?";


    else if ((3 - 14 / 24 ) < timeDifference && timeDifference <  (3 - 12 / 24))
        descString = "You cowards! Do you actually<br>believe the moon will fall?";

    else if ((3 - 16 / 24 ) < timeDifference && timeDifference <  (3 - 14 / 24))
        descString = "You, too...<br>You're also looking for Kafei.";

    else if ((3 - 18 / 24 ) < timeDifference && timeDifference <  (3 - 16 / 24))
        descString = "How about...Grasshopper?<br>That's the name Romani gives you.";

    else if ((2 - 5 / 24 ) < timeDifference && timeDifference <  (2 - 0 / 24))
        descString = "I am sorry to trouble you late<br>at night. It's about him...Kafei.";

    else if ((2 - 6 / 24 ) < timeDifference && timeDifference <  (2 - 5 / 24))
        descString = "It's almost time for my sister to get<br>up, so I have to get back to bed...";


    else if ((2 - 18 / 24 ) < timeDifference && timeDifference <  (2 - 16 / 24))
        descString = "Green hat...<br>Green clothes...<br>Anju wrote about you in her letter.";

    else if ((2 - 20 / 24 ) < timeDifference && timeDifference <  (2 - 18 / 24))
        descString = "We have to take this detour through<br>ugly country...";

    else if ((2 - 22 / 24 ) < timeDifference && timeDifference <  (2 - 20 / 24))
        descString = "OK, Anju, we're leaving in the<br>evening for the ranch.";

    else if ((1 - 6 / 24 ) < timeDifference && timeDifference <  (2 - 22 / 24))
        descString = "That melody... It brings back<br>so many memories!";

    else if ((1 - 10 / 24 ) < timeDifference && timeDifference <  (1 - 6 / 24))
        descString = "Actually...<br>I know...<br>We're not safe here, either...";

    else if ((1 - 16 / 24 ) < timeDifference && timeDifference <  (1 - 10 / 24))
        descString = "I have decided to wait for him.<br>I've made my promise...";

    else if ((1 - 19 / 24 ) < timeDifference && timeDifference <  (1 - 16 / 24))
        descString = "I found him, green hat boy...<br>If he sees us, he'll run away for sure.<br>We'd better both hide here.";

    else if ((1 - 21 / 24 ) < timeDifference && timeDifference <  (1 - 19 / 24))
        descString = "He's trying to pull it out of our reach<br>and make his escape...<br>We've got to hurry!";

    else if ((0 ) < timeDifference && timeDifference <  (6 / 24))
        descString = "Save and return to the Dawn of<br>the First Day?<br>&nbsp;&nbsp;&nbsp;Yes<br>&nbsp;&nbsp;&nbsp;No";

    else if ((- 6 / 24 ) < timeDifference && timeDifference <  (- 4 / 24 / 3600))
        descString = "We shall greet the morning...<br>together.";


    else
        descString = "";
    
    return descString;

}


updateTimer();
updateTimerSlow();

setInterval(updateTimer, 10);
setInterval(updateTimerSlow, 100);
