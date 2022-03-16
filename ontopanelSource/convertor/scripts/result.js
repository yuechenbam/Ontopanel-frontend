import resultHtml from "../html/result.html";
import { hostAddress } from "../../vars.js";
import { storeData } from "./store.js";

class ResultFrom {
  constructor() {
    this.init();
  }

  init() {
    let resultWindow = document.createElement("div");
    resultWindow.innerHTML = resultHtml;
    this.resultWindow = resultWindow;

    let searchBtn = resultWindow.querySelector(
      'input[name="result-search-btn"]'
    );
    let nextBtn = resultWindow.querySelector('input[name="next-btn"]');
    let copyBtn = resultWindow.querySelector('input[name="result-copy"]');

    let resultShow = resultWindow.querySelector('pre[class="result-show"]');
    this.resultShow = resultShow;

    this.markIndex = 0;

    nextBtn.onclick = (evt) => {
      evt.preventDefault();
      let allMark = this.resultShow.getElementsByTagName("mark");
      if (allMark && allMark.length > 0) {
        if (this.markIndex >= allMark.length) {
          this.markIndex = 0;
        }
        allMark[this.markIndex].scrollIntoView({
          block: "nearest",
          inline: "nearest",
        });
        allMark[this.markIndex].classList.add("locate");

        let lastIndex =
          this.markIndex - 1 >= 0 ? this.markIndex - 1 : allMark.length - 1;
        if (allMark[lastIndex].classList.contains("locate")) {
          allMark[lastIndex].classList.remove("locate");
        }

        this.markIndex += 1;
      }
    };

    searchBtn.onclick = (evt) => {
      let searchBar = resultWindow.querySelector('input[name="result-search"]');
      this.markIndex = 0;
      evt.preventDefault();
      let termValue = searchBar.value.trim();
      this.searchText(termValue);
    };

    copyBtn.onclick = (evt) => {
      navigator.clipboard.writeText(storeData.result);
    };
  }
  showdata() {
    this.resultShow.textContent = storeData.result;
    this.resetSearch();
  }
  searchText(text) {
    let searchContent = storeData.result;
    if (text) {
      let regex = new RegExp(text, "gi");

      let newText = searchContent.replace(
        regex,
        "<ontopanelmark>$&<ontopanel/mark>"
      );
      let div = document.createElement("div");
      div.innerText = newText;
      let htmlText = div.innerHTML;

      let newhtmlText = htmlText
        .replace(
          new RegExp("&lt;ontopanelmark&gt;", "g"),
          '<mark class="highlight">'
        )
        .replace(new RegExp("&lt;ontopanel/mark&gt;", "g"), "</mark>");

      this.resultShow.innerHTML = newhtmlText;

      let allMark = this.resultShow.getElementsByTagName("mark");
      if (allMark && allMark.length > 0) {
        this.resultWindow.querySelector(
          'div[class="match-info"]'
        ).innerText = `${allMark.length} Matches`;
        this.resultWindow.querySelector('input[name="next-btn"]').click();
      } else {
        this.resultWindow.querySelector(
          'div[class="match-info"]'
        ).innerText = `No Match`;
      }
    } else {
      this.resultShow.innerText = searchContent;
      this.resultWindow.querySelector('div[class="match-info"]').innerText =
        "No Input";
    }
  }

  resetSearch() {
    this.resultWindow.querySelector('input[name="result-search"]').value = "";
    this.markIndex = 0;
    this.resultWindow.querySelector('div[class="match-info"]').innerText = "";
  }
}

let resultContainer = new ResultFrom();
export { resultContainer };
