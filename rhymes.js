// get relevant dom elements
const queryInputElem = document.getElementById('query');

const frigginForm = document.getElementById('vestigial');

frigginForm.addEventListener('submit', (event) => {
  console.log('submitting');
  event.preventDefault();
})

const results = document.getElementById('results');

function sizeTheWords() {
    const variableSizeResults = document.querySelectorAll(".result.imperfect");
    variableSizeResults.forEach((result) => {
      const resultScore = parseInt(result.dataset.score, 10);
      result.style.fontSize = `${0.5 + (3.5 * resultScore) / 300}rem`;
    });
  }

// add event listener to know when to search

queryInputElem.addEventListener('keyup', async function(ev) {
  ev.preventDefault()
  if (ev.key == 'Enter') {
    console.log('pressed enter')

    const rhymeResultsResp = await fetch(
      `https://rhymebrain.com/talk?function=getRhymes&word=${queryInputElem.value}`);
      console.log(rhymeResultsResp);
    const rhymeResults = await rhymeResultsResp.json();

    console.log(rhymeResults);

    const wordInfos = [];
    for (let i = 0; i < 10; i++) {
      const wordInfoResp = await fetch(
        `https://rhymebrain.com/talk?function=getWordInfo&word=${rhymeResults[i].word}`);
        console.log(wordInfoResp);
      const wordInfo = await wordInfoResp.json();
      wordInfos.push(wordInfo);
      // console.log(wordInfo);
    } 
    console.log(wordInfos);
    let index = 0;
    
    const rhymeResultsElems = rhymeResults.map((rhymeWord) => {
        const resultElem = document.createElement("div");
        resultElem.classList.add("result");
        if (rhymeWord.score >= 300) {
        resultElem.classList.add("perfect");
        } else {
        resultElem.classList.add("imperfect");
        }
        resultElem.dataset.score = rhymeWord.score;
        resultElem.append(rhymeWord.word);
        if (index < 10) {
          const pronX = document.createElement("DL");
          resultElem.appendChild(pronX);
    
          const pronY = document.createElement("DT");
          const txt = document.createTextNode("pron");
          pronY.appendChild(txt);
          resultElem.appendChild(pronY);
    
          const pronZ = document.createElement("DD");
          const txt2 = document.createTextNode(`${wordInfos[index].pron}`);
          pronZ.appendChild(txt2);
          resultElem.appendChild(pronZ);

          const ipaX = document.createElement("DL");
          resultElem.appendChild(ipaX);
    
          const ipaY = document.createElement("DT");
          const txt3 = document.createTextNode("ipa");
          ipaY.appendChild(txt3);
          resultElem.appendChild(ipaY);
    
          const ipaZ = document.createElement("DD");
          const txt4 = document.createTextNode(`${wordInfos[index].ipa}`);
          ipaZ.appendChild(txt4);
          resultElem.appendChild(ipaZ);

          const freqX = document.createElement("DL");
          resultElem.appendChild(freqX);
    
          const freqY = document.createElement("DT");
          const txt5 = document.createTextNode("freq");
          freqY.appendChild(txt5);
          resultElem.appendChild(freqY);
    
          const freqZ = document.createElement("DD");
          const txt6 = document.createTextNode(`${wordInfos[index].freq}`);
          freqZ.appendChild(txt6);
          resultElem.appendChild(freqZ);

          const flagsX = document.createElement("DL");
          resultElem.appendChild(flagsX);
    
          const flagsY = document.createElement("DT");
          const txt7 = document.createTextNode("flags");
          flagsY.appendChild(txt7);
          resultElem.appendChild(flagsY);
    
          const flagsZ = document.createElement("DD");
          const txt8 = document.createTextNode(`${wordInfos[index].flags}`);
          flagsZ.appendChild(txt8);
          resultElem.appendChild(flagsZ);
        }
        index += 1;
        return resultElem;
    });

    // const wordInfosElems = wordInfos.map((wordI) => {
    //   const infoX = document.createElement("DL");
    //   infoX.setAttribute("id", `myDL${wordI.word}`);
    //   document.body.appendChild(infoX);

    //   const infoY = document.createElement("DT");
    //   const text = document.createTextNode("pron");
    //   infoY.appendChild(text);
    //   infoY.setAttribute("id", "myDT");
    //   document.getElementById(`myDL${wordI.word}`).appendChild(infoY);

    //   const infoZ = document.createElement("DD");
    //   const text2 = document.createTextNode(`${wordI.pron}`);
    //   infoZ.appendChild(text2);
    //   document.getElementById(`myDL${wordI.word}`).appendChild(infoZ);
    // });

    const resultsContainer = document.getElementById("results");
    Array.from(resultsContainer.childNodes).forEach((child) => {
        child.remove();
    });
    resultsContainer.append(...rhymeResultsElems);
    sizeTheWords();
  }
});

// write function that searches the rhyme API given a (string) query (likely you should use the fetch API)

// write function that:
//  1. expects array of word object results 
//    that look like the spec says https://rhymebrain.com/api.html#rhyme
//  2. creates DOM elements and inserts them into the page
