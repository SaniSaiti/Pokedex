 let allPokemons = 151;

 let backGroundColor = {
     "grass": "#4acfb2",
     "fire": "#fc6c6e",
     "water": "#75bafc",
     "normal": "#bdbc93",
     "electric": "#fff23d",
     "bug": "#d3fc75",
     "poison": "#9626ff",
     "ground": "#ffde26",
     "fairy": "#ff97f1",
     "fighting": "#d8d3b4",
     "psychic": "#af7ef0",
     "rock": "#c7c951",
     "ghost": "#8af4f8",
     "ice": "#b5f4f7",
     "dragon": "#ff97ad"
 }

 const allPokemonObj = [] 


 let getPokemon = async() => {
     for (let i = 1; i <= allPokemons; i++) {
         await loadPokemon(i);

     }
     renderPokemon(allPokemonObj);
     document.getElementById('roll').classList.add('display-none');
 }

 let renderPokemon = async(list) => {
     document.getElementById('showpokemon1').innerHTML = "";
     list.forEach(element => {
         let img = element['sprites']['other']['dream_world']['front_default'];
         let typePokemon = element.types[0].type;

         console.log("list :", list);
         console.log("Elemnt :", element);

         document.getElementById('showpokemon1').innerHTML += `   
     <div onclick="pokeindex(${element.id})" id="${element.id}" pok_name="${element.name}" class="pokesh" style="background-color:${backGroundColor[typePokemon.name]}">
     <h2>${element.name.charAt(0).toUpperCase()+ element.name.slice(1)}</h2>
     <img class="pokeimg" src="${img}" alt="">
     <div class="space">
     #${element.id}
     ${typePokemon.name}
     
     </div>
     </div>
    
    `
     });



 }

 let loadPokemon = async id => {
     let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
     let response = await fetch(url);
     let responceAsJason = await response.json();
     allPokemonObj.push(responceAsJason);
     // renderPokemon(allPokemonObj);

 }

 async function pokeindex(id) {

     let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
     let response = await fetch(url);
     let responceAsJason = await response.json();
     let img = responceAsJason['sprites']['other']['dream_world']['front_default'];
     let weight = responceAsJason.weight;
     let typePokemon = responceAsJason['types'][0]['type'];
     let speed = responceAsJason['stats'];
     console.log("Speed1", speed)


     document.getElementById('showpokemon1').classList.add('display-none');
     document.getElementById('showpokemon2').classList.remove('display-none')
     document.getElementById('showpokemon2').innerHTML = `
     
    <div>
     <div class="pokemonAlone" style="background-color:${backGroundColor[typePokemon.name]}">
        <p onclick="back()" class="back"><img class="arrow" src="img/arrow-81-32.png" alt=""></p>  
        <h2>${responceAsJason.name[0].toUpperCase()+ responceAsJason.name.slice(1)}</h2>    
        <img class="pokeimg" src="${img}" alt="">
     </div>
     <div class="pokemonAlone-card">
    <table class="space">
   
    <tr>
         <th>About</th>
         <th>Base</th>
         
    </tr>
    
    <tr>
        <td>Weight:</td>
        <td>${weight} Kg</td>
    </tr>
    <tr>
       <td>Hp:</td>
       <td> ${speed[0]['base_stat']} Hp</td>
    </tr>
    
    <tr>
       <td>Attack:</td>
       <td>${speed[1]['base_stat']} Hp</td>
    </tr>
    
    <tr>
        <td>Hp:</td>
        <td> ${speed[0]['base_stat']} Hp</td>
    </tr>
    
    <tr>
        <td> Defense:</td>
        <td>  ${speed[2]['base_stat']}  Hp</td>
    </tr>
    
    <tr>
        <td> Special-attack: </td>
        <td>  ${speed[3]['base_stat']}   Hp</td>
    </tr>
    
    <tr>
        <td> Speed:</td>
        <td>  ${speed[5]['base_stat']}  Hp</td>
    </tr>
    </table>
    </div>

     </div>
     `



     console.log("Hallo : " + id)


 }


 function back() {
     document.getElementById('showpokemon2').classList.add('display-none')
     document.getElementById('showpokemon1').classList.remove('display-none')

 }

 window.addEventListener('load', function() {
     const input = document.querySelector('input');
     input.addEventListener('input', filterName);
 })



 async function filterName(e) {

     let filteredlist = allPokemonObj.filter(p => p.name.startsWith(e.srcElement.value));
     console.log(filteredlist);
     await renderPokemon(filteredlist);
     console.log(e.srcElement.value)
     document.getElementById('roll').classList.add('display-none');
 }




 getPokemon();