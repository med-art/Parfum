var modernThemeCss = Survey
  .StylesManager
  .ThemeColors["modern"];
modernThemeCss["$background-color"] = "#000000";
modernThemeCss["$main-color"] = "#FFFFFF"; // also used on the button
modernThemeCss["$main-hover-color"] = "#FFFFFF";
modernThemeCss["$text-color"] = "#DCDCDC";
modernThemeCss["$header-color"] = "#FFFFFF";
modernThemeCss["$text-input-color"] = "#C0C0C0";
modernThemeCss["$progress-button-color"] = "#C0C0C0";
modernThemeCss["$button-text-color"] = "#000000";
//     modernThemeCss["$foreground-color"] = "#000000";
// modernThemeCss["$header-background-color"] = "#FFFFFF";
// modernThemeCss["$body-container-background-color"] = "#FFFFFF";
// modernThemeCss["$add-button-color"] = "#FFFFFF";
// modernThemeCss["$answer-background-color"] = "#FFFFFF";
// modernThemeCss["$background-color"] = "#FFFFFF";
// modernThemeCss["$background-dim"] = "#FFFFFF";
// modernThemeCss["$body-background-color"] = "#FFFFFF";
// modernThemeCss["$body-container-background-color"] = "#FFFFFF";
// modernThemeCss["$border-color"] = "#FFFFFF";
// modernThemeCss["$button-text-color"] = "#FFFFFF";
// modernThemeCss["$checkmark-color "] = "#FFFFFF";
// modernThemeCss["$clean-button-color "] = "#FFFFFF";
// modernThemeCss["$disable-color "] = "#FFFFFF";
// modernThemeCss["$disabled-label-color"] = "#FFFFFF";
// modernThemeCss["$disabled-slider-color"] = "#FFFFFF";
// modernThemeCss["$disabled-switch-color"] = "#FFFFFF";
// modernThemeCss["$disabled-text-color"] = "#FFFFFF";
// modernThemeCss["$dropdown-border-color"] = "#FFFFFF";
// modernThemeCss["$error-background-color"] = "#FFFFFF";
// modernThemeCss["$error-color"] = "#FFFFFF";
// modernThemeCss["$foreground-color "] = "#FFFFFF";
// modernThemeCss["$foreground-disabled"] = "#FFFFFF";
// modernThemeCss["$foreground-light"] = "#FFFFFF";
// modernThemeCss["$header-background-color"] = "#FFFFFF";
// modernThemeCss["$header-color"] = "#FFFFFF";
// modernThemeCss["$inputs-background-color"] = "#FFFFFF";
// modernThemeCss["$light-text-color"] = "#FFFFFF";
// modernThemeCss["$main-color"] = "#FFFFFF";
// modernThemeCss["$main-hover-color"] = "#FFFFFF";
// modernThemeCss["$matrix-text-checked-color "] = "#FFFFFF";
// modernThemeCss["$progress-buttons-color"] = "#FFFFFF";
// modernThemeCss["$progress-buttons-line-color "] = "#FFFFFF";
// modernThemeCss["$progress-text-color"] = "#FFFFFF";
// modernThemeCss["$radio-checked-color"] = "#FFFFFF";
// modernThemeCss["$remove-button-color"] = "#FFFFFF";
// modernThemeCss["$slider-color"] = "#FFFFFF";
// modernThemeCss["$text-border-color"] = "#FFFFFF";
// modernThemeCss["$text-color"] = "#FFFFFF";
// modernThemeCss["$text-input-color"] = "#FFFFFF";

function doOnCurrentPageChanged(survey) {
    var prev = document.getElementById('surveyPrev');

    if (prev)
        prev.style.display = (
            !survey.isFirstPage
            ? "inline"
            : "none");

    var next = document.getElementById('surveyNext');
    if (next)
        next.style.display = (
            !survey.isLastPage
            ? "inline"
            : "none");

        //var complete = document
        //    .getElementById('surveyComplete');
        //complete && complete.style
        //    .display = (survey.isLastPage
        //        ? "inline"
        //        : "none");
    }




Survey.StylesManager.applyTheme("modern");

var surveyJSON = {

  "title": {
    "fr": "Avant de commencer, nous souhaiterions en savoir un peu plus sur vous",
    "en": "Tell us a little bit about you"
  },
  "description": {
    // "fr": "Pouvez-vous répondre à ces 3 questions",
    // "en": "Please answer the 3 following questions"
  },
  "logoPosition": "right",
  "locale": "fr",
  "pages": [{
    "name": "page1",
    "elements": [{
        "type": "dropdown",
        "name": "question1",
        "title": {
          "fr": "Âge",
          "en": "Age"
        },
        "isRequired": true,
        "choices": [{
            "value": "Under 18",
            "text": {
              "fr": "Moins de 18 ans",
              "en": "Under 18"
            },
          },
          {
            "value": "18-30",
            "text": "18-30"
          },
          {
            "value": "31-40",
            "text": "31-40"
          },
          {
            "value": "41-55",
            "text": "41-55"
          },
          {
            "value": "55-70",
            "text": "55-70"
          },
          {
            "value": "70-85",
            "text": "70-85"
          },
          {
            "value": "85+",
            "text": "85+"
          }
        ]
      },
      {
        "type": "expression",
        "name": "question2",
        "visibleIf": "{question1} = 'item1'",
        "titleLocation": "hidden",
        "expression":"'Si vous avez moins de 18 ans, ces données ne seront pas collectées./If you are under 18 years old your data will not be stored'"
      },
      {
        "type": "dropdown",
        "name": "question3",
        "title": {
          "fr": "Sexe",
          "en": "Gender"
        },
        "isRequired": true,
        "choices": [{
            "value": "Male",
            "text": {
              "fr": "Masculin",
              "en": "Male"
            }
          },
          {
            "value": "Female",
            "text": {
              "fr":"Féminin",
              "en": "Female"
            },
          },
          {
            "value": "Gender Diverse",
            "text": {
              "fr":"Genre",
              "en":"Gender Diverse"
            },
          },
          {
            "value": "Opt out",
            "text": {
              "fr":"Je ne souhaite pas le préciser",
              "en":"I would prefer not to say"},
          }
        ]
      },
      {
        "type": "dropdown",
        "name": "question4",
        "title": {
          "fr":"De quel continent venez-vous?",
          "en":"What continent or region are you from?"
        },
        "isRequired": true,
        "choices": [{
            "value": "Asia",
            "text": {
              "fr":"Asie",
              "en":"Asia"
            },
          },
          {
            "value": "Africa",
            "text": {
              "fr":"Afrique",
              "en":"Africa"
            },
          },
          {
            "value": "North America",
            "text": {
              "fr":"Amérique du Nord",
              "en":"North America"
            },
          },
          {
            "value": "South America",
            "text": {
              "fr":"Amérique du Sud",
              "en":"South America"
            },
          },
          {
            "value": "Antarctica",
            "text": {
              "fr":"Antarctique",
              "en":"Antarctica"
            },
          },
          {
            "value": "Europe",
            "text": {
              "fr":"Europe",
              "en":"Europe"
            },
          },
          {
            "value": "Australia/Oceania",
            "text": {
              "fr":"Australie/Océanie",
              "en":"Australia/Oceania"
            },
          },
          {
            "value": "Opt out",
            "text": {
              "fr":"Je ne souhaite pas le préciser",
              "en":"Prefer not to say"
            },
          }
        ]
      }
    ]
  }],
  "widthMode": "responsive",
  showCompletedPage: 0
}

function submitData(survey) {
  //send Ajax request to your web server.
  // alert("The results are:" + JSON.stringify(survey.data));

  var dat = survey.data;
  var id = Date.now();
  localStorage.setItem("id",id);
  logGuest(id, dat.question1, dat.question3, dat.question4, lang); // note question 2 is a statement, and can be discarded
  window.location.href = "../selectOdour/index.html";

}

var lang = localStorage.lang;
console.log(lang);
surveyJSON.locale = lang;

var survey = new Survey.Model(surveyJSON);
$("#surveyContainer").Survey({
  model: survey,
  onComplete: submitData
});



// Using jQuery (but could use pure JS with cross-browser event handlers):
var idleSeconds = 35;
// below timer copied from
// https://stackoverflow.com/questions/7071472/javascript-timeout-when-no-actions-from-user-for-specified-time

$(function(){
  var idleTimer;
  var warningTimer;
  function resetTimer(){
    clearTimeout(idleTimer);
    clearTimeout(warningTimer);
    idleTimer = setTimeout(whenUserIdle,idleSeconds*1000);
    warningTimer = setTimeout(warnTimeout, (idleSeconds/2)*1000);
  }

  $(document.body).bind('mousemove keydown click',resetTimer); //space separated events list that we want to monitor
  resetTimer(); // Start the timer when the page loads

});

function whenUserIdle(){
  console.log("User idle, resetting");
  {
      window.location.href = "../index.html";
  }
}

function warnTimeout(){
    modal.style.display = "block";

}

// below modal code sourced from
var modal = document.getElementById("myModal");


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  console.log(event.target);
    modal.style.display = "none";
}
