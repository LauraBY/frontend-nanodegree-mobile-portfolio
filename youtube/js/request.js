'use strict'

let pagination = require("./pagination");
let player = require("./video");

const apiUrl = "https://www.googleapis.com/youtube/v3/search";
const key = "AIzaSyA8EeU2jUSXTJgi8RjGOjIkUeEzhbzP6t0";

module.exports = {
    requertResults: requertResults,
    getResults: getResults
}

let req = new XMLHttpRequest();
req.onload = getResults;

function requertResults(token) {
    let q = document.getElementById("query").value;
    let url = apiUrl + "?" + "key=" + key + "&part=snippet&type=video&maxResults=15&q=" + q;

    if (typeof token != "undefined") {
        url += "&pageToken=" + token;
    }

    req.open("get", url, true);
    req.send();
}

function getResults() {
    let res = JSON.parse(req.responseText);
    console.log(res);

    let ul = document.querySelector(".result");
    ul.innerHTML = "";

    for (let i = 0; i < res.items.length; i++) {
        let newLi = document.createElement("li");
        newLi.innerHTML = "<h4>" + res.items[i].snippet.title + "</h4>";
        newLi.innerHTML += "<a href=\"#\" data-videoid=\"" + res.items[i].id.videoId + "\"><img src='" + res.items[i].snippet.thumbnails.medium.url + "' alt=\"видео\"></a>";
        ul.appendChild(newLi);
    }

    document.querySelectorAll(".result a").forEach(function(link) {
        link.addEventListener("click", function(evt) {
            let video = document.querySelector(".video");
            video.classList.remove("hide");

            player.play(this.dataset.videoid);

            evt.preventDefault();
        }, false);
    });

    pagination.pagination(res);
}
