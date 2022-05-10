var modernThemeCss = Survey
  .StylesManager
  .ThemeColors["modern"];
modernThemeCss["$background-color"] = "#000000";
modernThemeCss["$main-color"] = "#C0C0C0"; // also used on the button
modernThemeCss["$main-hover-color"] = "#FFFFFF";
modernThemeCss["$text-color"] = "#DCDCDC";
modernThemeCss["$header-color"] = "#FFFFFF";
modernThemeCss["$text-input-color"] = "#C0C0C0";
modernThemeCss["$progress-button-color"] = "#C0C0C0";
modernThemeCss["$button-text-color"] = "#000000";
// modernThemeCss["$foreground-color"] = "#00FF00";
// modernThemeCss["$header-background-color"] = "#FFFFFF";
// modernThemeCss["$body-container-background-color"] = "#FFFFFF";
// modernThemeCss["$add-button-color"] = "#FFFFFF";
modernThemeCss["$answer-background-color"] = "rgba(64, 64, 64, 0.1)";
// modernThemeCss["$background-color"] = "#FFFFFF";
// modernThemeCss["$background-dim"] = "#FFFFFF";
// modernThemeCss["$body-background-color"] = "#FFFFFF";
// modernThemeCss["$body-container-background-color"] = "#FFFFFF";
modernThemeCss["$border-color"] = "#C0C0C0";
// modernThemeCss["$button-text-color"] = "#FFFFFF";
// modernThemeCss["$checkmark-color "] = "#FFFFFF";
// modernThemeCss["$clean-button-color "] = "#FFFFFF";
// modernThemeCss["$disable-color "] = "#FFFFFF";
modernThemeCss["$disabled-label-color"] = "#FFFFFF";
// modernThemeCss["$disabled-slider-color"] = "#FFFFFF";
// modernThemeCss["$disabled-switch-color"] = "#FFFFFF";
modernThemeCss["$disabled-text-color"] = "#C0C0C0";
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
modernThemeCss["$radio-checked-color"] = "#FFFFFF";
// modernThemeCss["$remove-button-color"] = "#FFFFFF";
// modernThemeCss["$slider-color"] = "#FFFFFF";
// modernThemeCss["$text-border-color"] = "#FFFFFF";
// modernThemeCss["$text-color"] = "#FFFFFF";
// modernThemeCss["$text-input-color"] = "#FFFFFF";





Survey.StylesManager.applyTheme("modern");

var surveyJSON = {

  "title": "",
  "logoPosition": "right",
  "locale": "fr",
  "pages": [{
      "name": "page1",
      "elements": [{
        "type": "imagepicker",
        "name": "SelectedOdour",
        "titleLocation": "hidden",
        "isRequired": true,
        "choices": [{
            "value": "A",
            "imageLink": "a.png"
          },
          {
            "value": "B",
            "imageLink": "b.png"
          },
          {
            "value": "C",
            "imageLink": "c.png"
          }
        ],
        "imageHeight": 100,
        "imageWidth": 100
      }],
      "title": {
        "fr": "Sélectionnez une odeur",
        "en": "Select an Odour"
      },
      "description": {
        "fr": "Choisissez une odeur parmi 'A', 'B', 'C' et utilisez le dispositif olfactif correspondant.",
        "en": "Please select any of the odours labelled with the letter 'A', 'B' or 'C', and choose the corresponding letter below."
      }
    },
    {
      "name": "page2",
      "elements": [{
          "type": "panel",
          "name": "panel1",
          "elements": [{
              "type": "image",
              "name": "question4",
              "visibleIf": "{SelectedOdour} = 'A'",
              "imageLink": "a.png"
            },
            {
              "type": "image",
              "name": "question4",
              "visibleIf": "{SelectedOdour} = 'B'",
              "imageLink": "b.png"
            },
            {
              "type": "image",
              "name": "question4",
              "visibleIf": "{SelectedOdour} = 'C'",
              "imageLink": "c.png"
            }
          ],
          "title": {
            "fr": "L'odeur sélectionnée est:",
            "en": "Your selected odour is:",
          },
        },
        {
          "type": "rating",
          "name": "Hedonicity",
          "minWidth": "825px",

          "titleLocation": "hidden",
          "isRequired": true,
          "rateMax": 7,
          "minRateDescription": {
            "fr": "Très désagréable",
            "en": "Very unpleasant"
          },
          "maxRateDescription": {
            "fr": "Très agréable",
            "en": "Very pleasant"
          },
        }
      ],
      "title": {
        "fr": "Hédonicité (apprécier ou ne pas apprécier)",
        "en": "Hedonicity (like or dislike)"
      },
      "description": {
        "fr": "Notez en fonction de votre perception de 'très désagréable' à 'très agréable' (4) pour Neutre",
        "en": "Rate according to your perceived Hedonicity from 'Very Unpleasant' (1) to ‘Very Pleasing’ (7). Neutral is (4)."
      },
    },
    {
      "name": "page3",
      "elements": [{
          "type": "panel",
          "name": "panel1",
          "elements": [{
              "type": "image",
              "name": "question4",
              "visibleIf": "{SelectedOdour} = 'A'",
              "imageLink": "a.png"
            },
            {
              "type": "image",
              "name": "question4",
              "visibleIf": "{SelectedOdour} = 'B'",
              "imageLink": "b.png"
            },
            {
              "type": "image",
              "name": "question4",
              "visibleIf": "{SelectedOdour} = 'C'",
              "imageLink": "c.png"
            }
          ],
          "title": {
            "fr": "L'odeur sélectionnée est:",
            "en": "Your selected odour is:",
          },
        },
        {
          "type": "rating",
          "name": "Familiarity",
          "minWidth": "825px",

          "titleLocation": "hidden",
          "isRequired": true,
          "rateMax": 7,
          "minRateDescription": {
            "fr": "Jamais sentie",
            "en": "Never Smelt"
          },
          "maxRateDescription": {
            "fr": "Déjà sentie",
            "en": "Can identify"
          },
        }
      ],
      "title": {
        "fr": "Familiarité",
        "en": "Familiarity"

      },
      "description": {
        "fr": "Notez en fonction de votre perception de 'odeur inconnue' à 'odeur connue.' (4) pour Neutre",
        "en": "Rate according to your familiarity with the Odour from Never smelt (1) to Definite identification of this smell (7). Neutral is (4)."
      },
    },
    {
      "name": "page4",
      "elements": [{
          "type": "panel",
          "name": "panel1",
          "elements": [{
              "type": "image",
              "name": "question4",
              "visibleIf": "{SelectedOdour} = 'A'",
              "imageLink": "a.png"
            },
            {
              "type": "image",
              "name": "question4",
              "visibleIf": "{SelectedOdour} = 'B'",
              "imageLink": "b.png"
            },
            {
              "type": "image",
              "name": "question4",
              "visibleIf": "{SelectedOdour} = 'C'",
              "imageLink": "c.png"
            }
          ],
          "title": {
            "fr": "L'odeur sélectionnée est:",
            "en": "Your selected odour is:",
          },
        },
        {
          "type": "rating",
          "name": "Intensity",
          "minWidth": "825px",
          "titleLocation": "hidden",
          "isRequired": true,
          "rateMax": 7,
          "minRateDescription": {
            "fr": "l’Odeur de ‘sans odeur’",
            "en": "No smell"
          },
          "maxRateDescription": {
            "fr": "à ‘odeur très forte’",
            "en": "Strong smell",
          },
        }
      ],
      "title": {
        "fr": "Intensité",
        "en": "Intensity"
      },
      "description": {
        "fr": "Notez en fonction de l'intensité de l’Odeur de ‘Pas d’odeur’ (1) à ‘odeur très forte’ (7). (4) pour Neutre.",
        "en": "Rate according to the Odour intensity from No smell (1) to Smell is Very Strong (7). Neutral is (4)."
      },
    }
  ],
  showCompletedPage: 0
}

function submitData(survey) {
  //send Ajax request to your web server.
  // alert("The results are:" + JSON.stringify(survey.data));

  var dat = survey.data;
  localStorage.setItem("selectedOdour", dat.SelectedOdour);
  console.log(dat.SelectedOdour);
  var formLogId = Date.now();
  localStorage.setItem("sessionId", formLogId);
  var userId = localStorage.getItem("id");
  logResponse(formLogId, userId, dat.SelectedOdour, dat.Familiarity, dat.Hedonicity, dat.Intensity);
  window.location.href = "../ColourSelector/index.html";


}

var lang = localStorage.lang;
console.log(lang);
surveyJSON.locale = lang;

var survey = new Survey.Model(surveyJSON);
$("#surveyContainer").Survey({
  model: survey,
  onComplete: submitData
});


// // Using jQuery (but could use pure JS with cross-browser event handlers):
// var idleSeconds = 35;
//
//
// // below timer copied from
// // https://stackoverflow.com/questions/7071472/javascript-timeout-when-no-actions-from-user-for-specified-time
//
// $(function() {
//   var idleTimer;
//   var warningTimer;
//
//   function resetTimer() {
//     clearTimeout(idleTimer);
//     clearTimeout(warningTimer);
//     idleTimer = setTimeout(whenUserIdle, idleSeconds * 1000);
//     warningTimer = setTimeout(warnTimeout, (idleSeconds / 2) * 1000);
//   }
//
//   $(document.body).bind('mousemove keydown click', resetTimer); //space separated events list that we want to monitor
//   resetTimer(); // Start the timer when the page loads
//
// });
//
// function whenUserIdle() {
//   console.log("User idle, resetting"); {
//     window.location.href = "../index.html";
//   }
// }
//
// function warnTimeout() {
//   modal.style.display = "block";
//
// }
//
// // below modal code sourced from
// var modal = document.getElementById("myModal");
//
//
// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   console.log(event.target);
//   modal.style.display = "none";
// }
