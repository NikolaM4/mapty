"use strict";const form=document.querySelector(".form"),containerWorkouts=document.querySelector(".workouts"),inputType=document.querySelector(".form__input--type"),inputDistance=document.querySelector(".form__input--distance"),inputDuration=document.querySelector(".form__input--duration"),inputCadence=document.querySelector(".form__input--cadence"),inputElevation=document.querySelector(".form__input--elevation");class Workout{date=new Date;id=(Date.now()+"").slice(-10);clicks=0;constructor(t,e,o){this.coords=t,this.distance=e,this.duration=o}_setDescription(){this.description=`${this.type[0].toUpperCase()}${this.type.slice(1)} on ${["January","February","March","April","May","June","July","August","September","October","November","December"][this.date.getMonth()]} ${this.date.getDate()}`}click(){this.clicks++}}class Running extends Workout{type="running";constructor(t,e,o,n){super(t,e,o),this.cadence=n,this.calcPace(),this._setDescription()}calcPace(){return this.pace=this.duration/this.distance,this.pace}}class Cycling extends Workout{type="cycling";constructor(t,e,o,n){super(t,e,o),this.elevationGain=n,this.calcSpeed(),this._setDescription()}calcSpeed(){return this.speed=(this.distance/(this.duration/60)).toFixed(2),+this.speed}}class App{#t;#e=13;#o;#n=[];constructor(){this._getPosition(),this._getLocalStorage(),form.addEventListener("submit",this._newWorkout.bind(this)),inputType.addEventListener("change",this._toggleElevationField),containerWorkouts.addEventListener("click",this._moveToPopup.bind(this))}_getPosition(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),(function(){alert("Could not get your position")}))}_loadMap(t){const{latitude:e}=t.coords,{longitude:o}=t.coords;console.log(`https://www.google.com/maps/@${e},${o}`);const n=[e,o];this.#t=L.map("map").setView(n,this.#e),L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(this.#t),this.#t.on("click",this._showForm.bind(this)),this.#n.forEach((t=>{this._renderWorkoutMarker(t)}))}_showForm(t){this.#o=t,form.classList.remove("hidden"),inputDistance.focus()}_hideForm(){inputDistance.value=inputDuration.value=inputCadence.value=inputElevation.value="",form.style.display="none",form.classList.add("hidden"),setTimeout((()=>form.style.display="grid"),1e3)}_toggleElevationField(){inputElevation.closest(".form__row").classList.toggle("form__row--hidden"),inputCadence.closest(".form__row").classList.toggle("form__row--hidden")}_newWorkout(t){const e=(...t)=>t.every((t=>Number.isFinite(t))),o=(...t)=>t.every((t=>t>0));t.preventDefault();const n=inputType.value,s=+inputDistance.value,i=+inputDuration.value,{lat:a,lng:r}=this.#o.latlng;let u;if("running"===n){const t=+inputCadence.value;if(!e(s,i,t)||!o(s,i,t))return alert("Inputs have to be positive numbers!");u=new Running([a,r],s,i,t)}if("cycling"===n){const t=+inputElevation.value;if(!e(s,i,t)||!o(s,i))return alert("Inputs have to be positive numbers!");u=new Cycling([a,r],s,i,t)}this.#n.push(u),this._renderWorkoutMarker(u),this._renderWorkout(u),this._hideForm(),this._setLocalStorage()}_renderWorkoutMarker(t){L.marker(t.coords).addTo(this.#t).bindPopup(L.popup({maxWidth:250,minWidth:100,autoClose:!1,closeOnClick:!1,className:`${t.type}-popup`})).setPopupContent(`${"running"===t.type?"🏃‍♂️":"🚴‍♀️"} ${t.description}`).openPopup()}_renderWorkout(t){let e=`\n        <li class="workout workout--${t.type}" data-id="${t.id}">\n          <h2 class="workout__title">${t.description}</h2>\n          <div class="workout__details">\n            <span class="workout__icon">${"running"===t.type?"🏃‍♂️":"🚴‍♀️"}</span>\n            <span class="workout__value">${t.distance}</span>\n            <span class="workout__unit">km</span>\n          </div>\n          <div class="workout__details">\n            <span class="workout__icon">⏱</span>\n            <span class="workout__value">${t.duration}</span>\n            <span class="workout__unit">min</span>\n          </div>\n    `;"running"===t.type&&(e+=`\n          <div class="workout__details">\n            <span class="workout__icon">⚡️</span>\n            <span class="workout__value">${t.pace.toFixed(1)}</span>\n            <span class="workout__unit">min/km</span>\n          </div>\n          <div class="workout__details">\n            <span class="workout__icon">🦶🏼</span>\n            <span class="workout__value">${t.cadence}</span>\n            <span class="workout__unit">spm</span>\n          </div>\n        </li>\n        `),"cycling"===t.type&&(e+=`\n          <div class="workout__details">\n            <span class="workout__icon">⚡️</span>\n            <span class="workout__value">${t.speed}</span>\n            <span class="workout__unit">km/h</span>\n          </div>\n          <div class="workout__details">\n            <span class="workout__icon">⛰</span>\n            <span class="workout__value">${t.elevationGain}</span>\n            <span class="workout__unit">m</span>\n          </div>\n        </li>\n        `),form.insertAdjacentHTML("afterend",e)}_moveToPopup(t){const e=t.target.closest(".workout");if(!e)return;const o=this.#n.find((t=>t.id===e.dataset.id));this.#t.setView(o.coords,this.#e,{animate:!0,pan:{duration:1}})}_setLocalStorage(){localStorage.setItem("workouts",JSON.stringify(this.#n))}_getLocalStorage(){const t=JSON.parse(localStorage.getItem("workouts"));t&&(this.#n=t,this.#n.forEach((t=>{this._renderWorkout(t)})))}reset(){localStorage.removeItem("workouts"),location.reload()}}const app=new App;
//# sourceMappingURL=index.79cb54a1.js.map
