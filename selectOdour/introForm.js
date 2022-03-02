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
    "pages": [{
          "name": "page1",
          "elements": [{
            "type": "imagepicker",
            "name": "question1",
            "titleLocation": "hidden",
            "isRequired": true,
            "choices": [{
                "value": "item1",
                "imageLink": "a.png"
              },
              {
                "value": "item2",
                "imageLink": "b.png"
              },
              {
                "value": "item3",
                "imageLink": "c.png"
              }
            ],
            "imageHeight": 100,
            "imageWidth": 100
          }],
          "title": "Odour Selection",
          "description": "Please select any of the odours labelled with the letter 'A', 'B' or 'C', and choose the corresponding letter below."
        },
        {
          "name": "page2",
          "elements": [{
              "type": "panel",
              "name": "panel1",
              "elements": [
                  {
                    "type": "image",
                    "name": "question4",
                    "visibleIf": "{question1} = 'item1'",
                    "imageLink": "a.png"
                  },
                  {
                    "type": "image",
                    "name": "question4",
                    "visibleIf": "{question1} = 'item2'",
                    "imageLink": "b.png"
                  },
                  {
                    "type": "image",
                    "name": "question4",
                    "visibleIf": "{question1} = 'item3'",
                    "imageLink": "c.png"
                  }
                ],
                    "title": "Your selected odour is"
                },
                {
                  "type": "rating",
                  "name": "Hedonicity",
                  "minWidth": "825px",
                  "title": "Hédonicité (apprécier ou désapprouver) / Hedonicity (like or dislike)",
                  "titleLocation": "hidden",
                  "description": "Notez en fonction de votre perception sur l'hédonisme de tres desagreable a tres agreable. (4) pour Neutre / Rate according to your perceived Hedonicity from 'Very Unpleasant' (1) to ‘Very Pleasing’ (7). Neutral is (4). ",
                  "isRequired": true,
                  "rateMax": 7,
                  "minRateDescription": "Tres desagreable / Very unpleasant",
                  "maxRateDescription": "Tres agreable / Very pleasant"
                }
              ],
              "title": "Hédonicité (apprécier ou désapprouver) / Hedonicity (like or dislike)",
              "description": "Notez en fonction de votre perception sur l'hédonisme de tres desagreable a tres agreable. (4) pour Neutre / Rate according to your perceived Hedonicity from 'Very Unpleasant' (1) to ‘Very Pleasing’ (7). Neutral is (4)."
            },
            {
              "name": "page3",
              "elements": [{
                  "type": "panel",
                  "name": "panel1",
                  "elements": [
                      {
                        "type": "image",
                        "name": "question4",
                        "visibleIf": "{question1} = 'item1'",
                        "imageLink": "a.png"
                      },
                      {
                        "type": "image",
                        "name": "question4",
                        "visibleIf": "{question1} = 'item2'",
                        "imageLink": "b.png"
                      },
                      {
                        "type": "image",
                        "name": "question4",
                        "visibleIf": "{question1} = 'item3'",
                        "imageLink": "c.png"
                      }
                    ],
                        "title": "Your selected odour is"
                    },
                    {
                "type": "rating",
                "name": "Intensité / Intensity",
                "minWidth": "825px",
                "title": "Intensité / Intensity",
                "titleLocation": "hidden",
                "description": "dwe",
                "isRequired": true,
                "rateMax": 7,
                "minRateDescription": " l’Odeur de ‘Pas d’odeur’ / No smell",
                "maxRateDescription": "à ‘odeur très forte’ / Strong smell "
              }],
              "title": "Intensité / Intensity",
              "description": "Notez en fonction de l'intensité de l’Odeur de ‘Pas d’odeur’ (1) à ‘odeur très forte’ (7). (4) pour Neutre. / Rate according to the Odour intensity from No smell (1) to Smell is Very Strong (7). Neutral is (4). "
            }
          ],
          showCompletedPage: 0
        }

        function submitData(survey) {
          //send Ajax request to your web server.
          // alert("The results are:" + JSON.stringify(survey.data));
          window.location.href = "../ColourSelector/index.html";
        }

        var survey = new Survey.Model(surveyJSON);
        $("#surveyContainer").Survey({
          model: survey,
          onComplete: submitData
        });
