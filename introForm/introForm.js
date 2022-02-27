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





  Survey.StylesManager.applyTheme("modern");

  var surveyJSON = {
"title": "Before we begin, we want to know a little bit about you",
"description": "Please answer the 3 following (optional?) questions",
"logoPosition": "right",
"pages": [
{
 "name": "page1",
 "elements": [
  {
   "type": "dropdown",
   "name": "question1",
   "title": "Age / Âge",
   "choices": [
    {
     "value": "item1",
     "text": "Under 12"
    },
    {
     "value": "item2",
     "text": "12-17"
    },
    {
     "value": "item3",
     "text": "18-24"
    },
    {
     "value": "item4",
     "text": "25-34"
    },
    {
     "value": "item5",
     "text": "35-44"
    },
    {
     "value": "item6",
     "text": "45-54"
    },
    {
     "value": "item7",
     "text": "55-64"
    },
    {
     "value": "item8",
     "text": "65-74"
    },
    {
     "value": "item9",
     "text": "75-84"
    },
    {
     "value": "item10",
     "text": "85+"
    }
   ]
  },
  {
   "type": "dropdown",
   "name": "question2",
   "title": "Sex / Sexe",
   "choices": [
    {
     "value": "item1",
     "text": "Male /Masculin"
    },
    {
     "value": "item2",
     "text": "Female / Féminin"
    },
    {
     "value": "item3",
     "text": "I would prefer not to say / Je ne souhaite pas le préciser"
    }
   ]
  },
  {
   "type": "dropdown",
   "name": "question3",
   "title": "What continent or region are you from?",
   "choices": [
    {
     "value": "item1",
     "text": "Asia"
    },
    {
     "value": "item2",
     "text": "Africa"
    },
    {
     "value": "item3",
     "text": "North America"
    },
    {
     "value": "item4",
     "text": "South America"
    },
    {
     "value": "item5",
     "text": "Antarctica"
    },
    {
     "value": "item6",
     "text": "Europe"
    },
    {
     "value": "item7",
     "text": "Australia/Oceania"
    },
    {
     "value": "item8",
     "text": "Prefer not to say"
    }
   ]
  }
 ]
}
],
"widthMode": "responsive",
  showCompletedPage: 0
  }

  function submitData(survey) {
    //send Ajax request to your web server.
    // alert("The results are:" + JSON.stringify(survey.data));
    window.location.href = "../selectOdour/index.html";
  }

  var survey = new Survey.Model(surveyJSON);
  $("#surveyContainer").Survey({
    model: survey,
    onComplete: submitData
  });
