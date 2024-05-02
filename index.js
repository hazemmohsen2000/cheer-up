// database connection start here
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://cheer-me-up-fc0f3-default-rtdb.firebaseio.com/",
};
const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsData = ref(database, "user");
// end here database connection

const inputText = document.getElementById("input-box")
const publishBtn =document.getElementById("btn1")
const listUl = document.getElementById("list")
const fromEl = document.getElementById("from-el");
const toEl = document.getElementById("to-el");
 
function clearText(){
    inputText.value=""
    fromEl.value = "";
   
}
publishBtn.addEventListener("click", function(){
  let inputvalue = inputText.value
  const fromData = fromEl.value;
  const toData = toEl.value;
  let arr = [inputvalue, fromData, toData, 0];
  if (inputvalue && fromData && toData){
    push(endorsementsData,arr)
    inputText.style.border = "none";
    toEl.style.border = "none";
    clearText();
  }else{
   inputText.style.border = "2px solid red";
   fromEl.style.border = "2px solid red";
    clearText();
    }
})
onValue(endorsementsData, function(snapshot) {
      if (snapshot.exists()) {
          listUl.innerHTML=""
          let textArray = Object.entries(snapshot.val())
          for(let i =0 ; i < textArray.length ; i++){
              let currentText = textArray[i]
              render(currentText)
          }
      }else{
      listUl.innerHTML = "No Text here... yet"  
      }
})
function render(review){
  let reviewId = review[0];
  let reviewData = review[1];
  let reviewText = reviewData[0];
  let reviewFrom = reviewData[1];
  let reviewTo = reviewData[2];
  let reviewLikes = reviewData[3];
   
  let newEl = document.createElement("li");
  let mainConEl = document.createElement("div");
  let toEl = document.createElement("h3");
  let reviewEl = document.createElement("p");
  let flexEl = document.createElement("div");
  let fromEl = document.createElement("h3");
  let likesEl = document.createElement("button");
  toEl.textContent = `To ${reviewTo}`;
  reviewEl.textContent = reviewText;
  fromEl.textContent = `From ${reviewFrom}`;
  likesEl.textContent = `♥ ${reviewLikes}`;
  newEl.appendChild(mainConEl);
  mainConEl.appendChild(toEl);
  mainConEl.appendChild(reviewEl);
  mainConEl.appendChild(flexEl);
  flexEl.appendChild(fromEl);
  flexEl.appendChild(likesEl);

   newEl.classList=("Textli")
   reviewEl.classList = "review-text";
  flexEl.classList = "flex-container";
  likesEl.classList = "like-btn";
  toEl.addEventListener("dblclick",function(){
       remove(ref(database ,`user/${reviewId }`))
   })

   likesEl.addEventListener("click", function () {
    reviewLikes += 1;
    let exactLocationDB = ref(database, `user/${reviewId}`);
    update(exactLocationDB, {
      3: reviewLikes,
    });
  });
   listUl.append(newEl)
}





