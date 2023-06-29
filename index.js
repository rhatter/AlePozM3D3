window.onload = (e) => {
  burgerButton();
  createAllCards(data);
};

function burgerButton() {
  let button = document.querySelector("#sidOpenClose");
  button.addEventListener("click", (e) => {
    openClose();
  });
}

function openClose() {
  let sideNav = document.getElementById("sidenav-1");
  !sideNav.classList.contains("intro")
    ? sideNav.classList.add("intro")
    : sideNav.classList.remove("intro");
}

window.addEventListener(
  "resize",
  () => {
    const { clientWidth } = document.documentElement;

    if (
      clientWidth >= 990 &&
      document.getElementById("sidenav-1").classList.contains("intro")
    ) {
      document.getElementById("sidenav-1").classList.remove("intro");
    }
  },
  {
    passive: true,
  }
);

function createSingleCard(a) {
  let html = `
    <div class="col-11 col-md-6 col-lg-4 col-xl-3">
    <div class="card" data-bs-theme="dark">
      <div class="container-fluid fs-5">
        <div class="row justify-content-between align-items-center g-2 py-2">
          <div class="col-2"><img class="imgProfileCard" src="${a.profileImgDir}" alt=""></div>
          <div class="col">${a.userName}</div>
          <div class="col-1 d-flex justify-content-center"><i class="fa fa-solid fa-ellipsis-vertical"></i></div>
        </div>
      </div>
      <img src=${a.imgDir[0]} class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${a.cardTitle}</h5>
        <p class="card-text articleDescription">${a.cardText}</p>
        <div class="container-fluid d-flex justify-content-between px-0 fs-5">
          <div class="buttons col d-flex justify-content-between pe-2">
            <i class="fa fa-light fa-heart unSelected"></i>
            <!-- fa solid per cuore pieno-->
            <i class="fa fa-light fa-comment unSelected"></i>
            <i class="fa fa-light fa-paper-plane unSelected"></i>
          </div>
          <div class="col"></div>
          <div class="save col save col d-flex justify-content-end">
            <i class="fa fa-sharp fa-light fa-bookmark unSelected"></i>
          </div>                
        </div>
      </div>
    </div>
  </div>
    `;
  return html;
}

let indexCarusel = 1;

function createCarusel(a) {
  let caruselIndicator = "caruselInd" + indexCarusel;
  let caruselItem = createCaruselItem(a);
  let html = `
    <div class="col-11 col-md-6 col-lg-4 col-xl-3">
    <div class="card" data-bs-theme="dark">
      <div class="container-fluid fs-5">
        <div class="row justify-content-between align-items-center g-2 py-2">
          <div class="col-2"><img class="imgProfileCard" src="${a.profileImgDir}" alt=""></div>
          <div class="col">${a.userName}</div>
          <div class="col-1 d-flex justify-content-center"><i class="fa fa-solid fa-ellipsis-vertical"></i></div>
        </div>
      </div>
      <div id="${caruselIndicator}" class="carousel slide">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#${caruselIndicator}" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#${caruselIndicator}" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#${caruselIndicator}" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
            ${caruselItem}
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#${caruselIndicator}" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#${caruselIndicator}" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div class="card-body">
        <h5 class="card-title">${a.cardTitle}</h5>
        <p class="card-text articleDescription">${a.cardText}</p>
        <div class="container-fluid d-flex justify-content-between px-0 fs-5">
          <div class="buttons col d-flex justify-content-between pe-2">
            <i class="fa fa-light fa-heart unSelected"></i>
            <!-- fa solid per cuore pieno-->
            <i class="fa fa-light fa-comment unSelected"></i>
            <i class="fa fa-light fa-paper-plane unSelected"></i>
          </div>
          <div class="col"></div>
          <div class="save col save col d-flex justify-content-end">
            <i class="fa fa-sharp fa-light fa-bookmark unSelected"></i>
          </div>                
        </div>
      </div>
    </div>
  </div>
    `;
  indexCarusel++;
  return html;
}

function createCaruselItem(a) {
  let htmlItem = "";
  let activeControl = true;
  for (img of a.imgDir) {
    let activeClass = "";
    if (activeControl === true) activeClass = "active";
    htmlItem += `
 <div class="carousel-item ${activeClass}">
 <img
   src="${img}"
   class="d-block w-100"
   alt="..."
 />
 </div>    
 `;
    activeControl = false;
  }
  return htmlItem;
}

function createAllCards(a) {
  a.sort((a, b) => a.priority - b.priority);
  let areaCard = document.createElement("div");
  areaCard.classList.add("row");
  areaCard.classList.add("justify-content-start");
  areaCard.classList.add("col-11");
  areaCard.classList.add("g-2");
  htmlCards = "";
  for (card of a) {
    if (card.imgDir.length === 1) {
      htmlCards += createSingleCard(card);
    } else {
      htmlCards += createCarusel(card);
    }
    console.log(htmlCards);
  }
  areaCard.innerHTML = htmlCards;
  document.getElementById("cardDestination").appendChild(areaCard);
}
