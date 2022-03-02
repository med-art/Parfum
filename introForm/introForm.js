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
"description": "Please answer the 3 following questions",
"logoPosition": "right",
"pages": [
{
 "name": "page1",
 "elements": [
  {
   "type": "dropdown",
   "name": "question1",
   "title": "Age / Âge",
   "isRequired": true,
   "choices": [
    {
     "value": "item1",
     "text": "Under 18"
    },
    {
     "value": "item2",
     "text": "18-30"
    },
    {
     "value": "item3",
     "text": "31-40"
    },
    {
     "value": "item4",
     "text": "41-55"
    },
    {
     "value": "item5",
     "text": "55-70"
    },
    {
     "value": "item6",
     "text": "70-85"
    },
    {
     "value": "item7",
     "text": "85 or above"
    }
   ]
  },
  {
    "type": "expression",
    "name": "question2",
    "visibleIf": "{question1} = 'item1'",
    "titleLocation": "hidden",
    "expression": "'Please note, we are not able to keep records of any person under the age of 18. You can still continue with the experiment, but your data will not be kept on file'"
  },
  {
   "type": "dropdown",
   "name": "question3",
   "title": "Sexe / Sex",
   "isRequired": true,
   "choices": [
    {
     "value": "item1",
     "text": "Masculin / Male"
    },
    {
     "value": "item2",
     "text": "Féminin / Female"
    },
    {
     "value": "item3",
     "text": "Gender Diverse"
   },
   {
    "value": "item4",
    "text": "Je ne souhaite pas le préciser / I would prefer not to say"
   }
   ]
  },
  {
   "type": "dropdown",
   "name": "question4",
   "title": "What continent or region are you from?",
    "isRequired": true,
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
