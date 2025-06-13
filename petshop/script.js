const pets = [ 
    // Dogs
    {"name": "Max", "type": "Dog", "age": 3, "img": "img/dogs/dog01.jpg"}, 
    {"name": "Luna", "type": "Dog", "age": 2, "img": "img/dogs/dog02.jpg"},
    {"name": "Rocky", "type": "Dog", "age": 4, "img": "img/dogs/dog03.jpg"},
    
    // Cats
    {"name": "Whiskers", "type": "Cat", "age": 2, "img": "img/cats/cat01.jpg"}, 
    {"name": "Mittens", "type": "Cat", "age": 1, "img": "img/cats/cat02.jpg"},
    {"name": "Oliver", "type": "Cat", "age": 3, "img": "img/cats/cat03.jpg"},
    
    // Birds
    {"name": "Rio", "type": "Bird", "age": 1, "img": "img/birds/bird01.jpg"},
    {"name": "Sky", "type": "Bird", "age": 2, "img": "img/birds/bird02.jpg"},
    
    // Capybaras
    {"name": "Cappy", "type": "Capybara", "age": 2, "img": "img/capybaras/capybara01.jpg"},
    {"name": "Bara", "type": "Capybara", "age": 3, "img": "img/capybaras/capybara02.jpg"}
];

// Carousel functionality
let currentSlide = 0;

function initCarousel() {
    const carousel = document.querySelector('.pet-cards');
    const dotsContainer = document.querySelector('.carousel-dots');
    
    if (carousel && dotsContainer) {
        const totalSlides = carousel.children.length;
        
        // Create dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = `dot ${i === 0 ? 'active' : ''}`;
            dot.onclick = () => goToSlide(i);
            dotsContainer.appendChild(dot);
        }
        
        // Initial position
        updateCarousel();
    }
}

function moveCarousel(direction) {
    const carousel = document.querySelector('.pet-cards');
    if (!carousel) return;
    
    const totalSlides = carousel.children.length;
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
}

function updateCarousel() {
    const carousel = document.querySelector('.pet-cards');
    const dots = document.querySelectorAll('.dot');
    
    if (carousel) {
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
}

function adoptPet() {
    alert("Thank you for your interest in adopting! Our team will contact you soon.");
}

function loadPets() {
    console.log('Loading pets...');
    const petList = document.getElementById('pet-list');
    
    // Only load pets if we're on the pets page
    if (petList) {
        // Add filter buttons
        const filterContainer = document.createElement('div');
        filterContainer.className = 'filter-buttons';
        const types = [...new Set(pets.map(pet => pet.type))];
        
        // Add "All" button
        const allButton = document.createElement('button');
        allButton.textContent = 'All Pets';
        allButton.className = 'filter-btn active';
        allButton.onclick = () => filterPets('All');
        filterContainer.appendChild(allButton);
        
        // Add type-specific buttons
        types.forEach(type => {
            const button = document.createElement('button');
            button.textContent = type + 's';
            button.className = 'filter-btn';
            button.onclick = () => filterPets(type);
            filterContainer.appendChild(button);
        });
        
        // Insert filter buttons before pet list
        petList.parentElement.insertBefore(filterContainer, petList);
        
        // Initial load of all pets
        displayPets(pets);
    }
}

function filterPets(type) {
    // Update active button
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter and display pets
    const filteredPets = type === 'All' ? pets : pets.filter(pet => pet.type === type);
    displayPets(filteredPets);
}

function displayPets(petsToShow) {
    const petList = document.getElementById('pet-list');
    petList.innerHTML = '';
    
    petsToShow.forEach(pet => {
        const petItem = document.createElement('div');
        petItem.className = 'pet';
        petItem.innerHTML = `
            <img src="${pet.img}" alt="${pet.name}">
            <div class="pet-info">
                <h3>${pet.name}</h3>
                <p>Type: ${pet.type}</p>
                <p>Age: ${pet.age} ${pet.age === 1 ? 'year' : 'years'}</p>
                <button onclick="adoptPet()">Adopt Now</button>
            </div>
        `;
        petList.appendChild(petItem);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadPets();
    initCarousel();
});

console.log('Script loaded successfully.'); 