let dishesEl = document.querySelector('.dishes'),
category = JSON.parse(localStorage.getItem('category')),
menuBtn = document.querySelector('.menu')
menu = document.querySelector('.toggleMenu')

let favorite;
if (localStorage.getItem('favorite')) {
    favorite = JSON.parse(localStorage.getItem('favorite'));
} else {
    favorite = [];
}
console.log(category.strCategory)
fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`)
.then(data => data.json())
.then(data => showDishes(data.meals))

function showDishes(dishes) {
    dishes.forEach(dish => {
        console.log(dish)
        let dishEl = document.createElement('div')
        dishEl.classList.add('dish')
        let title = document.createElement('p')
        title.innerHTML = dish.strMeal.slice(0, 19);
        let heart = document.createElement('i')
        heart.classList.add('uil')
        heart.classList.add('uil-heart')
        heart.addEventListener('click', () => {
            if (heart.id !== 'clicked') {
                heart.style.color = 'red'
                addToPreferences(dish)
                heart.setAttribute('id', 'clicked')
            } else {
                heart.style.color = 'black'
                removeFromPreferences(dish)
                heart.setAttribute('id', 'unclicked')
            }
        })
        
        let footer = document.createElement('div')
        footer.classList.add('footer')
        footer.appendChild(title)
        footer.appendChild(heart)
        let image = document.createElement('img')
        image.src = dish.strMealThumb
        dishEl.appendChild(image)
        dishEl.appendChild(footer)
        dishesEl.appendChild(dishEl)
    });
}
// menu showing and hiding
menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active')
    menuBtn.classList.toggle('active')
});
function addToPreferences(meal) {
    favorite.push(meal)
    localStorage.setItem('favorite', JSON.stringify(favorite))
}
function removeFromPreferences(meal) {
    favorite = favorite.filter(fav => {
        return fav.idMeal !== meal.idMeal;
    });
    localStorage.setItem('favorite', JSON.stringify(favorite))
}
