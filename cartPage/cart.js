let favoriteMeals = document.querySelector('.favoriteMeals'),
favorite = JSON.parse(localStorage.getItem('favorite')),
menuBtn = document.querySelector('.menu')
menu = document.querySelector('.toggleMenu')

favorite.forEach(fav => {
    let meal = document.createElement('div')
    let image = document.createElement('img')
    image.src = fav.strMealThumb
    meal.appendChild(image)
    favoriteMeals.appendChild(meal)
});

// menu showing and hiding
menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active')
    menuBtn.classList.toggle('active')
});