// https://jacintodesign.github.io/quotes-api/data/quotes.json
(function () {
  window.onload = function () {
    const quoteBlock = document.getElementById("quote-container");
    const quoteTxt = document.getElementById("quote1");
    const authorTxt = document.getElementById("author");
    const newQuote = document.getElementById("newQuote");
    const twitter = document.getElementById("twitter");
    const loader = document.getElementById("loader1");

    let apiQuotes = [];

    function getRandomQuote() {
      showLoader(true);
      let quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
      if (quote.text.length > 50) {
        quoteTxt.classList.add("long-quote");
      } else {
        quoteTxt.classList.remove("long-quote");
      }
      setTimeout(() => {
        quoteTxt.textContent = quote.text;
        authorTxt.textContent = quote.author || "Undefined";
        showLoader(false);
      }, 500);

      //   return quote;
    }

    async function getAllQuotes() {
      const api = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
      try {
        showLoader(true);
        const responce = await fetch(api);
        apiQuotes = await responce.json();
        getRandomQuote();
        console.log(apiQuotes);
      } catch (e) {
        alert(e);
      }
    }

    function tweetQuote() {
      const endPoint = `https://twitter.com/intent/tweet?text=${quoteTxt.textContent} - ${authorTxt.textContent}`;
      window.open(endPoint, "_blank");
    }
    function showLoader(show) {
      if (show) {
        loader.classList.remove("hide");
        loader.classList.add("show");
        quoteBlock.classList.add("hide");
        quoteBlock.classList.remove("show");
        loader.hidden = false;
        quoteBlock.hidden = true;
      } else {
        loader.hidden = true;
        quoteBlock.hidden = false;
        loader.classList.remove("show");
        loader.classList.add("hide");
        quoteBlock.classList.add("show");
        quoteBlock.classList.remove("hide");
      }
    }
    getAllQuotes();
    newQuote.addEventListener("click", getRandomQuote);
    twitter.addEventListener("click", tweetQuote);
  };
})();
