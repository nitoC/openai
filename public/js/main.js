let inputD = document.getElementById("inputData");
let box = document.getElementById("message-box");
let submit = document.getElementById("submit-btn");
let loadingIcon = document.getElementById("loading-icon");
let form = document.getElementById("textarea-form");
let temp = document.getElementById("temperature-input");
let len = document.getElementById("word-length-input");
let body = document.getElementById("body");
let logout = document.getElementById("logout");
let startText = document.getElementById("start-text-input");
let tempWrapper = document.getElementById("temperature");
let lenWrapper = document.getElementById("word-length");
let settingBtn = document.getElementById("settings");
let sidebar = document.getElementById("sidebar");
let range = document.getElementsByClassName("range-input");
let visibleSidebar = false;
let dataValid = body.getAttribute("data-valid");
let submited = false;
let container = "";
let inputval = "";
let responseText = "";
let data;
let messages;
let messageWrapper;
let result;
let loading = false;
let lastElement;
let interval = Math.random() * (25 - 10) + 10;

const settings = async () => {
  let temperature = (parseInt(temp.value) / 100).toString();
  let length = parseInt(len.value).toString();
  let injectText = startText.value;
  let final;
  tempWrapper.setAttribute("gloss", temperature);
  lenWrapper.setAttribute("gloss", length);

  try {
    let result = await fetch("http://localhost:4000/config", {
      method: "POST",
      body: JSON.stringify({ temperature, length, startText: injectText }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    final = await result.json();
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
};

let handleLogout = async () => {
  try {
    body.setAttribute("data-valid", "false");
    dataValid = false;
    let logoutdata = await fetch("http://localhost:4000/chat", {
      method: "POST",
      body: JSON.stringify({ inputData: "" }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    let logoutfinal = await logoutdata.json();

    logout.innerHTML = `<div class="logout-modal">
                             logout successfull
                             </div>`;

    setTimeout(() => {
      window.location.href = "http://localhost:4000";
    }, 1500);
  } catch (err) {
    if (err) console.log(err);
  }
};

let handleSidebar = () => {
  if (visibleSidebar === false) {
    sidebar.classList.add("side-visible");
    visibleSidebar = true;
    return;
  }
  sidebar.classList.remove("side-visible");
  visibleSidebar = false;
  return;
};

//this is the loading gif when response is being generated
let loadingGif = `<div class="message-wrapper message-wrapper--assistant">
                <div class="message-text"><img src="images/loadingchat.gif" class="loadinggif"/></div>
                <div class="identifier-wrapper">
                    <div class="message-identifier">
                        AI
                    </div>
                </div>
                `;

//this is the the error message when api request was not successfull
let error = `<div class="message-wrapper message-wrapper--assistant">
                 <div style-"color:red;" class="message-text">OOPS!! something went wrong with your request this could be due to a timeout, please refresh page or try again</div>
                <div class="identifier-wrapper">
                     <div class="message-identifier">
                          AI
                     </div>
                </div>
                    `;

async function handleSubmit() {
  // if input is empty or no value is typed in return without submitting to server
  if (inputD.value.length < 1) {
    return;
  }
  // if it is submitted to server already or a request is being processed return and dont submit
  if (submited === true) {
    return;
  }
  submitted = true;
  submit.classList.add("btn--hide");
  loadingIcon.classList.add("loading-icon--visible");

  container = `<div class="message-wrapper message-wrapper--user">
                    <div class="message-text">${inputD.value}</div>
                         <div class="identifier-wrapper">
                             <div class="message-identifier">
                                ET
                             </div>
                        </div>
                    </div>
                     `;

  inputval = inputD.value;
  container += loadingGif;

  box.innerHTML += container;

  window.scrollTo(0, document.body.scrollHeight);
  try {
    
    await settings();//apply settings

    data = fetch("http://localhost:4000/chat", {
      method: "POST",
      body: JSON.stringify({ inputData: inputD.value }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
 
    //timesout request on the client
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("client timeout");
        reject(new Error(" request timeout"));
      }, 29000);
    });
   //timesout request on the client
    result = await Promise.race([data, promise]);
    messages = await result.json();

  } catch (err) {
    if (err) {
      console.log(err, "error caught");
      submit.classList.remove("btn--hide");
      loadingIcon.classList.remove("loading-icon--visible");
      submitted = false;
      box.lastElementChild.innerHTML = error;
      container = inputval;
      return;
    }
  }

  // this maps array of request history  and generated messages or text to the chat area page
  if (result) {
    container = "";
    messages.message.forEach((msg) => {
      if (messages.message[messages.message.length - 1] === msg) {
        let textArray = msg.content.split("");
        let count = 0;

        messageWrapper = `
        <div class="message-wrapper message-wrapper--${msg.role}">
        <div class="message-text"></div>
        <div class="identifier-wrapper">
        <div class="message-identifier">${
          msg.role === "user" ? "ET" : "AI"
        }</div>
        </div>
        </div>
        `;
        container += messageWrapper;
        box.innerHTML = container;

        lastElement = box.lastElementChild;
        let firstChildOfLastElement = lastElement.firstElementChild;
        let typingInterval = setInterval(() => {
          if (count === textArray.length - 1) {
            clearInterval(typingInterval);
          }
          firstChildOfLastElement.innerHTML += textArray[count];
          count++;
          interval = Math.random() * (25 - 10) + 10;
          window.scrollTo(0, document.body.scrollHeight); // this makes sure the page is scrolled to the bottom to see latest messages or response
        }, interval);
      } else {
        messageWrapper = `
                    <div class="message-wrapper message-wrapper--${msg.role}">
                      <div class="message-text">${msg.content}</div>
                      <div class="identifier-wrapper">
                        <div class="message-identifier">${
                          msg.role === "user" ? "ET" : "AI"
                        }</div>
                      </div>
                    </div>
                  `;
        container += messageWrapper;
      }
    });
  }
  inputD.value = "";
  submit.classList.remove("btn--hide");
  loadingIcon.classList.remove("loading-icon--visible");
  submitted = false;
}
if (dataValid === "true") {
  console.log("success");
} else {
  window.location.href = "http://localhost:4000";
}

//update each range input gloss attribute on value change
Array.from(range).forEach((input) => {
  let handleGloss = (e) => {
    let parent = e.target.parentNode;
    if (parent.id === "temperature") {
      return parent.setAttribute(
        "gloss",
        (parseInt(e.target.value) / 100).toString()
      );
    }
    parent.setAttribute("gloss", e.target.value);
  };
  input.addEventListener("change", handleGloss);
});

//handles sidebar translation
settingBtn.addEventListener("click", handleSidebar);

//handles the submit event of the chat
submit.addEventListener("click", handleSubmit);
document.addEventListener("keypress", (e) => {
  if (document.activeElement === inputD && e.key === "Enter") {
    handleSubmit();
  }
});

//handles the logout event

logout.addEventListener("click", handleLogout);
