const prevBtn = document.querySelector('.container .prev'),
nextBtn = document.querySelector('.container .next'),
next = document.querySelector('.categories .next'),
prev = document.querySelector('.categories .prev'),
slider = document.querySelector('.slider'),
sliderr = document.querySelector('.sliderr'),
images = document.querySelectorAll('picture img'),
categoriesEl = document.querySelector('.categories'),
randomEl = document.querySelector('.randomMeal')

let counter = 0
nextBtn.addEventListener('click', () => {
    nextSlide()
    
});
prevBtn.addEventListener('click', () => {
    prevSlide();
    
});
function nextSlide() {
    if (counter <= images.length - 2) {
        counter++;
        slider.style.transform = `translateX(-${images[2].clientWidth * counter}px)`;
        
    } else {
        counter = 0;
        slider.style.transform = `translateX(-${images[2].clientWidth * counter}px)`
    }
}
function prevSlide() {
    if (counter > 0) {
        counter--;
        slider.style.transform = `translateX(-${images[2].clientWidth * counter}px)`;
    } else {
        counter = images.length - 1;
        slider.style.transform = `translateX(-${images[2].clientWidth * counter}px)`;
    }
}
setInterval(nextSlide, 1500)

fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
.then(data => data.json())
.then(data => showCategories(data.categories));


fetch('https://www.themealdb.com/api/json/v1/1/random.php')
.then(data => data.json())
.then(data => {
    showRandomMeal(data.meals[0]);
});

function showCategories(categories) {
    categories.forEach(category => {
        console.log(category);
        let categoryEl = document.createElement('div')
        categoryEl.classList.add('category')
        let title = document.createElement('p')
        title.innerHTML = category.strCategory;
        let heart = document.createElement('i')
        heart.classList.add('uil')
        heart.classList.add('uil-heart')
        let footer = document.createElement('div')
        footer.classList.add('footer')
        footer.appendChild(title)
        footer.appendChild(heart)
        let image = document.createElement('img')
        image.src = category.strCategoryThumb;
        categoryEl.appendChild(image)
        categoryEl.appendChild(footer)
        sliderr.appendChild(categoryEl);
    })
}
function showRandomMeal(randomMeal) {
    console.log(randomMeal.strMeal, randomMeal.strMealThumb)
    let randomElement = document.createElement('div')
    let image = document.createElement('img')
    image.src = randomMeal.strMealThumb
    let title = document.createElement('p')
    title.innerHTML = randomMeal.strMeal;
    let heart = document.createElement('i')
    heart.classList.add('uil')
    heart.classList.add('uil-heart')
    let footer = document.createElement('div')
    footer.classList.add('footer')
    footer.appendChild(title)
    footer.appendChild(heart)    
    randomEl.appendChild(image)
    randomEl.appendChild(footer)
}
let count = 0
next.addEventListener('click', () => {
    if (count < sliderr.childNodes.length - 1) {
        count++;
    }else {
        count = 0
    }
    sliderr.style.transform = `translateX(-${sliderr.childNodes[0].clientWidth * count}px)`;
})
prev.addEventListener('click', () => {
    if (count > 0) {
        count--;
    } else {
        count = sliderr.childNodes.length - 1
    }
    sliderr.style.transform = `translateX(-${sliderr.childNodes[0].clientWidth * count}px)`;
})
