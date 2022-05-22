const prevBtn = document.querySelector('.container .prev'),
nextBtn = document.querySelector('.container .next'),
next = document.querySelector('.categories .next'),
prev = document.querySelector('.categories .prev'),
slider = document.querySelector('.slider'),
sliderr = document.querySelector('.sliderr'),
images = document.querySelectorAll('picture img'),
categoriesEl = document.querySelector('.categories'),
randomEl = document.querySelector('.randomMeal'),
searchedEl = document.querySelector('.searched'),
menuBtn = document.querySelector('.menu'),
menu = document.querySelector('.toggleMenu'),
input = document.querySelector('.search'),
form = document.querySelector('form'),
info = document.querySelector('.moreInfo'),
close = document.querySelector('.uil-times'),
mealImage = document.querySelector('.moreInfo img'),
mealInfo = document.querySelector('.mealInfo'),
instructions = document.querySelector('.instructions')

let counter = 0
let favorite;
if (localStorage.getItem('favorite')) {
    favorite = JSON.parse(localStorage.getItem('favorite'))
} else {
    favorite = [];
}
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
        // console.log(category);
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
        categoryEl.addEventListener('click', () => {
            addCategoryToLocalStorage(category)
            window.open('./mealsPage/meals.html', "_self")
        })
    })
}
function showRandomMeal(randomMeal) {
    // console.log(randomMeal.strMeal, randomMeal.strMealThumb)
    let randomElement = document.createElement('div')
    let image = document.createElement('img')
    image.src = randomMeal.strMealThumb
    let title = document.createElement('p')
    title.innerHTML = randomMeal.strMeal;
    let heart = document.createElement('i')
    heart.classList.add('uil')
    heart.classList.add('uil-heart')
    heart.addEventListener('click', () => {
        if (heart.id !== 'clicked') {
            addToPreferences(randomMeal)
            heart.setAttribute('id', 'clicked')
            heart.style.color = 'red';
        } else {
            removeFromPreferences(randomMeal)
            heart.setAttribute('id', '')
            heart.style.color = 'black';
        }
    });

    let footer = document.createElement('div')
    footer.classList.add('footer')
    footer.appendChild(title)
    footer.appendChild(heart)    
    randomEl.appendChild(image)
    randomEl.appendChild(footer)
    image.addEventListener('click', () => {
        showInfo(randomMeal)
    })

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
function addCategoryToLocalStorage(category) {
    localStorage.setItem('category', JSON.stringify(category))
}
// menu showing and hiding
menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active')
    menuBtn.classList.toggle('active')
});
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let text = input.value
    fetchTheData(text);
});
function fetchTheData(title) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${title}`)
    .then(data => data.json())
    .then(data => showRelatedData(data))
}
function showRelatedData(data) {
    searchedEl.innerHTML = ''
    data.meals.forEach((meal) => {
        let mealEl = document.createElement('div')
        let image = document.createElement('img')
        image.src = meal.strMealThumb
        let text = document.createElement('p')
        text.innerHTML = meal.strMeal
        let heart = document.createElement('i')
        for (let i = 0; i < favorite.length; i++) {
            if (favorite[i].idMeal == meal.idMeal) {
                heart.style.color =  'red';
                heart.setAttribute('id', "clicked")
            }
        }
        heart.classList.add('uil')
        heart.classList.add('uil-heart')
        heart.setAttribute('id', "unclicked")
        favorite.forEach(fav => {
            if (fav.idMeal === meal.idMeal) {
                heart.setAttribute('id', "clicked")
            }
        })
        heart.addEventListener('click', () => {
            console.log(heart.id)
            if (heart.id !== "clicked") {
                addToPreferences(meal)
                heart.style.color = 'red'
                heart.setAttribute('id', "clicked")
            } else {
                removeFromPreferences(meal)
                heart.style.color = 'black'
            }
        })
        let footer = document.createElement('div')
        footer.classList.add('footer')
        footer.appendChild(text)
        footer.appendChild(heart)
        mealEl.appendChild(image)
        mealEl.appendChild(footer)
        image.addEventListener('click', () => {
            mealImage.src = meal.strMealThumb
            mealInfo.innerText = meal.strMeal
            instructions.innerText = meal.strInstructions
            showInfo(meal)
        })
        searchedEl.appendChild(mealEl)   
    });
}
close.addEventListener('click', () => {
    info.classList.add('hide')
})
function showInfo(Meal) {
    console.log(Meal)
    window.scroll({
        top: 0,
        behavior: "smooth"
    })
    info.classList.remove('hide');
    mealImage.src = Meal.strMealThumb;
    mealInfo.innerText = Meal.strMeal;
    instructions.innerText = Meal.strInstructions;
}
function addToPreferences(meal) {
    favorite.push(meal)
    localStorage.setItem('favorite', JSON.stringify(favorite))
}
function removeFromPreferences(meal) {
        console.log(meal)
        favorite = favorite.filter(fav => {
            return fav.idMeal != meal.idMeal
        })
    localStorage.setItem('favorite', JSON.stringify(favorite))
}
