const fromText = document.querySelector(".from-text"),
toText = document.querySelector(".to-text"),
exchangeIcon = document.querySelector(".exchange"),
selectTag = document.querySelectorAll("select"),
translateBtn = document.querySelector("button"),
icons = document.querySelectorAll(".row i");

selectTag.forEach( (tag, id) => {
    for(const country_code in countrieList){
        // console.log(tag, id);
        // SELECTING ENG BY DEAFULT AS FROM LANG AND HINDI as TO
        let selected;
        if(id == 0 && country_code == "en-GB"){
            selected ="selected";
        }else if( id== 1 && country_code == "hi-IN"){
            selected = "selected";
        }
        let option = `<option value="${countrieList[country_code]}" ${selected}>${countrieList[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);

    }
});

exchangeIcon.addEventListener("click", () => {
    // ICONS TOGGLE FUNCTIONALITY
    let tempText = fromText.value,
    tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
});

translateBtn.addEventListener("click", () => {
    let text = fromText.value,
    // fromSelect amd toSelect tag value 
    translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    // console.log(text, translateFrom, translateTo);
    // CALLING API REQ
    // API URL
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

    fetch(apiUrl).then(res => res.json()).then(data => {
        console.log(data);
        toText.value = data.responseData.translatedText;
    });
});

icons.forEach( icon => {
    icon.addEventListener("click", ({target}) => {
        console.log(target);
        // COPY ICONS FUNCTIONALITY
        if(target.classList.contains("fa-copy")){
            if(target.id == "from"){
                navigator.clipboard.writeText(fromText.value);
                console.log("FROM copy icon clicked");
            }else{
                navigator.clipboard.writeText(toText.value);
                console.log("To copy icon clicked");
            }
        }else{
            // SPEAKER ICONS FUNCTIONALITY
            let utterance;
            // console.log("Speech icon Clicked");
            if(target.id == "from"){
                utterance = new SpeechSynthesisUtterance(fromText.value);
                utterance.lang = selectTag[0].value;
                console.log("work "+ utterance.lang);
            }else{
               utterance = new SpeechSynthesisUtterance(toText.value);
               utterance.lang = selectTag[1].value;
               console.log("work "+ utterance.lang);
            }
            speechSynthesis.speak(utterance);
        }
    })
})