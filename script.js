const restaurants = [
    { id: 101, name: "The Royal Kitchen", img: "images/images9.jpg", cuisine: "Indian Food• Fine Dining", rating: "4.9" },
    { id: 102, name: "Italiano Bistro", img: "images/images10.jpg", cuisine: "Italian • Pizza", rating: "4.8" },
    { id: 103, name: "Healthy Bites", img: "images/images7.jpg", cuisine: "Organic • Salads", rating: "4.7" },
    { id: 104, name: "Indori Tadka", img: "images/images8.jpg", cuisine: "Traditional • Street Food", rating: "4.6" }
];

const dishes = [
        { id: 1, resId: 101, name: "Dosa", price: 199, isVeg: true, rating: 4.8, img: "images/dosa.jpg" },
        { id: 2, resId: 101, name: "Butter Chicken", price: 399, isVeg: false, rating: 4.8, img: "images/2.jpg" },
    { id: 15, resId: 101, name: "Indori-Poha-Jalebi", price: 99, isVeg: true, rating: 4.8, img: "images/poha.jpg" },
    { id: 14, resId: 101, name: "Butter Chicken", price: 399, isVeg: false, rating: 4.8, img: "images/2.jpg" },
    { id: 3, resId: 101, name: "Mutton Biryani", price: 499, isVeg: false, rating: 4.8, img: "images/mutton.jpg" },
    { id: 4, resId: 101, name: "Salad", price: 99, isVeg: true, rating: 4.6, img: "images/salad.jpg" },
    { id: 5, resId: 101, name: "Chai", price: 99, isVeg: true, rating: 4.8, img: "images/chai.jpg" },
    { id: 6, resId: 101, name: "Noodles", price: 99, isVeg: true, rating: 4.6, img: "images/3.jpg" },
    { id: 7, resId: 101, name: "Burger", price: 99, isVeg: true, rating: 4.6, img: "images/burger.jpg" },
    { id: 8, resId: 101, name: "Coffie", price: 99, isVeg: true, rating: 4.6, img: "images/coffie.jpg" },
    { id: 9, resId: 101, name: "Paneer Tikka", price: 250, isVeg: true, rating: 4.5, img: "images/panner.jpg" },
    { id: 10, resId: 102, name: "Margherita Pizza", price: 250, isVeg: true, rating: 4.6, img: "images/4.jpg" },
    { id: 11, resId: 102, name: "Noodles", price: 250, isVeg: true, rating: 4.6, img: "images/3.jpg" },
    { id: 12, resId: 103, name: "Quinoa Salad", price: 120, isVeg: true, rating: 4.3, img: "images/salad.jpg" },
    { id: 13, resId: 104, name: "Indori Tadka Special", price: 99, isVeg: true, rating: 4.8, img: "images/poha.jpg" }

    
    
];

let cart = [];



// Dono functions ko replace karke ye ek single function rakhein
function searchFood() {
    const searchInput = document.getElementById('searchBar');
    if (!searchInput) return;

    const searchTerm = searchInput.value.toLowerCase().trim();
    const grid = document.getElementById('display-grid');
    const title = document.getElementById('menu-title');
    const backNav = document.getElementById('back-nav');

    // 1. Reset check
    if (searchTerm === "") {
        renderRestaurants();
        return;
    }

    // 2. DISHES Filter (Priority 1)
    const matchedDishes = dishes.filter(dish => 
        dish.name.toLowerCase().includes(searchTerm)
    );

    // 3. RESTAURANTS Filter (Priority 2)
    const matchedRestaurants = restaurants.filter(res => 
        res.name.toLowerCase().includes(searchTerm) || 
        res.cuisine.toLowerCase().includes(searchTerm)
    );

    // --- RENDERING ---
    
    // Pehle check karein agar koi dish mili hai
    if (matchedDishes.length > 0) {
        title.innerText = `Items for "${searchTerm}"`;
        if(backNav) backNav.classList.remove('hidden');
        renderDishList(matchedDishes); // Ye function call karega items render karne ke liye
    } 
    else if (matchedRestaurants.length > 0) {
        title.innerText = `Restaurants for "${searchTerm}"`;
        if(backNav) backNav.classList.remove('hidden');
        
        grid.innerHTML = matchedRestaurants.map(res => `
            <div onclick="renderMenu(${res.id}, '${res.name}')" class="group cursor-pointer bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-transparent hover:border-orange-500 transition-all duration-500">
                <div class="h-64 overflow-hidden relative">
                    <img src="${res.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                    <div class="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-xl text-xs font-black text-orange-500 flex items-center gap-1">
                        <i class="fas fa-star"></i> ${res.rating}
                    </div>
                </div>
                <div class="p-8">
                    <h3 class="text-2xl font-black mb-2 dark:text-white">${res.name}</h3>
                    <p class="text-gray-500 text-sm font-medium">${res.cuisine}</p>
                </div>
            </div>
        `).join('');
    } 
    // Kuch nahi mila
    else {
        title.innerText = "No results found";
        grid.innerHTML = `<div class="col-span-full text-center py-20 dark:text-white">Bhai, "${searchTerm}" nahi mila! Kuch aur try karo.</div>`;
    }
}

// --- CORE UI FUNCTIONS ---

function renderRestaurants() {
    const grid = document.getElementById('display-grid');
    if(!grid) return;

    document.getElementById('menu-title').innerText = "Popular Restaurants";
    document.getElementById('back-nav').classList.add('hidden');
    
    grid.innerHTML = restaurants.map(res => `
        <div onclick="renderMenu(${res.id}, '${res.name}')" class="group cursor-pointer bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-xl border border-transparent hover:border-orange-500 transition-all duration-500">
            <div class="h-64 overflow-hidden relative">
                <img src="${res.img}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                <div class="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-xl text-xs font-black text-orange-500 flex items-center gap-1">
                    <i class="fas fa-star"></i> ${res.rating}
                </div>
            </div>
            <div class="p-8">
                <h3 class="text-2xl font-black mb-2 dark:text-white">${res.name}</h3>
                <p class="text-gray-500 text-sm font-medium">${res.cuisine}</p>
            </div>
        </div>
    `).join('');
}

function renderMenu(resId, resName) {
    document.getElementById('menu-title').innerText = resName;
    document.getElementById('back-nav').classList.remove('hidden');
    const filtered = dishes.filter(d => d.resId === resId);
    renderDishList(filtered);
}

// Helper to render a list of dishes (used by search and menu)
function renderDishList(dishArray) {
    const grid = document.getElementById('display-grid');
    grid.innerHTML = dishArray.map(dish => {
        const cartItem = cart.find(i => i.id === dish.id);
        const qty = cartItem ? cartItem.qty : 0;
        return `
        <div class="bg-white dark:bg-slate-900 rounded-[2.5rem] p-4 shadow-xl">
            <img src="${dish.img}" class="w-full h-52 object-cover rounded-[2rem] mb-6">
            <div class="flex justify-between items-center mb-4 px-2">
                <h4 class="font-bold text-lg dark:text-white">${dish.name}</h4>
                <div class="${dish.isVeg ? 'text-green-500' : 'text-red-500'} text-[10px] border-2 border-current p-0.5 rounded-sm">
                    <i class="fas fa-circle"></i>
                </div>
            </div>
            <div class="flex justify-between items-center px-2">
                <span class="text-xl font-black text-orange-500">₹${dish.price}</span>
                <div id="btn-container-${dish.id}">
                    ${qty === 0 ? 
                        `<button onclick="changeQty(${dish.id}, 1)" class="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-orange-600 transition-colors">Add</button>` : 
                        `<div class="flex items-center bg-orange-500 text-white rounded-xl">
                            <button onclick="changeQty(${dish.id}, -1)" class="px-3 py-2 border-r border-orange-400">-</button>
                            <span class="px-4 font-bold">${qty}</span>
                            <button onclick="changeQty(${dish.id}, 1)" class="px-3 py-2 border-l border-orange-400">+</button>
                        </div>`
                    }
                </div>
            </div>
        </div>`;
    }).join('');
}


// --- CART LOGIC ---
function changeQty(dishId, delta) {
    const dish = dishes.find(d => d.id === dishId);
    const cartIndex = cart.findIndex(item => item.id === dishId);

    if (cartIndex > -1) {
        cart[cartIndex].qty += delta;
        if (cart[cartIndex].qty <= 0) cart.splice(cartIndex, 1);
    } else if (delta > 0) {
        cart.push({ ...dish, qty: 1 });
    }

    const container = document.getElementById(`btn-container-${dishId}`);
    const updatedItem = cart.find(i => i.id === dishId);
    const newQty = updatedItem ? updatedItem.qty : 0;

    if (newQty === 0) {
        container.innerHTML = `<button onclick="changeQty(${dishId}, 1)" class="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-orange-600">Add</button>`;
    } else {
        container.innerHTML = `
            <div class="flex items-center bg-orange-500 text-white rounded-xl">
                <button onclick="changeQty(${dishId}, -1)" class="px-3 py-2 border-r border-orange-400">-</button>
                <span class="px-4 font-bold">${newQty}</span>
                <button onclick="changeQty(${dishId}, 1)" class="px-3 py-2 border-l border-orange-400">+</button>
            </div>`;
    }
}

// Initialize
renderRestaurants();
// 3. Cart Logic
function changeQty(id, delta) {
    const dish = dishes.find(d => d.id === id);
    const exists = cart.find(i => i.id === id);

    if(exists) {
        exists.qty += delta;
        if(exists.qty <= 0) cart = cart.filter(i => i.id !== id);
    } else if(delta > 0) {
        cart.push({...dish, qty: 1});
    }

    updateCart();
    
    const currentTitle = document.getElementById('menu-title').innerText;
    if(currentTitle !== "Popular Restaurants") {
        renderMenu(dish.resId, currentTitle);
    }
}

function updateCart() {
    const list = document.getElementById('cart-items');
    let total = 0, count = 0;

    list.innerHTML = cart.length === 0 ? 
        '<p class="text-center text-gray-400 py-10">Bag is empty</p>' : 
        cart.map(item => {
            total += item.price * item.qty;
            count += item.qty;
            return `<div class="flex justify-between items-center bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl mb-2">
                <div class="flex items-center gap-3">
                    <img src="${item.img}" class="w-12 h-12 rounded-lg object-cover">
                    <div>
                        <h5 class="font-bold text-xs dark:text-white">${item.name}</h5>
                        <p class="text-orange-500 text-xs font-bold">₹${item.price} x ${item.qty}</p>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button onclick="changeQty(${item.id}, -1)" class="w-8 h-8 bg-white dark:bg-slate-700 rounded-lg shadow-sm dark:text-white font-bold">-</button>
                    <button onclick="changeQty(${item.id}, 1)" class="w-8 h-8 bg-white dark:bg-slate-700 rounded-lg shadow-sm dark:text-white font-bold">+</button>
                </div>
            </div>`;
        }).join('');

    document.getElementById('total-price').innerText = total;
    document.getElementById('cart-count').innerText = count;

    const checkoutBtnContainer = document.getElementById('checkout-btn-container');
    if(checkoutBtnContainer) {
        checkoutBtnContainer.innerHTML = cart.length > 0 ? 
            `<button onclick="processCheckout()" class="w-full bg-orange-500 text-white py-5 rounded-3xl font-black uppercase tracking-widest shadow-xl shadow-orange-500/40 hover:-translate-y-1 transition-all">Proceed to Checkout</button>` : '';
    }
}

// 4. Coupon System
function applyCoupon() {
    const code = document.getElementById('coupon-code').value.trim().toUpperCase();
    const msg = document.getElementById('coupon-msg');
    const discountLabel = document.getElementById('discount-label');
    const finalTotalDisplay = document.getElementById('display-final-total');
    
    let originalTotal = 0;
    cart.forEach(item => originalTotal += (item.price * item.qty));

    msg.classList.remove('hidden', 'text-green-500', 'text-red-500');
    
    if (code === 'WELCOME50') {
        currentDiscount = Math.round(originalTotal * 0.5);
        msg.innerText = "Coupon Applied: 50% OFF!";
        msg.classList.add('text-green-500');
    } else if (code === 'PARTY150' && originalTotal >= 500) {
        currentDiscount = 150;
        msg.innerText = "Coupon Applied: ₹150 OFF!";
        msg.classList.add('text-green-500');
    } else {
        currentDiscount = 0;
        msg.innerText = (code === 'PARTY150') ? "Min. order ₹500 required" : "Invalid Coupon Code";
        msg.classList.add('text-red-500');
    }

    msg.classList.remove('hidden');
    const newTotal = originalTotal - currentDiscount;
    finalTotalDisplay.innerText = `₹${newTotal}`;
    
    if (currentDiscount > 0) {
        discountLabel.innerText = `(Saved ₹${currentDiscount})`;
        discountLabel.classList.remove('hidden');
    } else {
        discountLabel.classList.add('hidden');
    }
}

// 5. Checkout & Order Flow
function processCheckout() {
    const userName = localStorage.getItem('userName');
    if (!userName) {
        alert("Please Login first to place an order!");
        toggleAuthModal();
        return;
    }
    if (cart.length === 0) {
        alert("Aapka bag khali hai!");
        return;
    }

    const totalPrice = document.getElementById('total-price').innerText;
    currentDiscount = 0; 

    const existingModal = document.getElementById('checkout-modal');
    if(existingModal) existingModal.remove();

    const checkoutHTML = `
        <div id="checkout-modal" class="fixed inset-0 bg-black/70 backdrop-blur-md z-[200] flex items-center justify-center p-4">
            <div class="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl border dark:border-slate-800">
                <div id="checkout-content-area">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-black dark:text-white">Checkout 🚚</h3>
                        <button onclick="closeCheckout()" class="text-gray-400 hover:text-red-500 text-xl"><i class="fas fa-times"></i></button>
                    </div>
                    
                    <div class="space-y-4">
                        <div>
                            <label class="text-[10px] font-black text-orange-500 ml-1 uppercase tracking-widest">Delivery Address</label>
                            <textarea id="cust-address" rows="2" placeholder="Flat No., Area, City..." 
                                class="w-full mt-1 p-4 rounded-2xl bg-gray-100 dark:bg-slate-800 border-2 border-transparent focus:border-orange-500 outline-none resize-none dark:text-white"></textarea>
                        </div>

                        <div>
                            <label class="text-[10px] font-black text-orange-500 ml-1 uppercase tracking-widest">Payment Method</label>
                            <select id="payment-method" class="w-full mt-1 p-4 rounded-2xl bg-gray-100 dark:bg-slate-800 border-2 border-transparent focus:border-orange-500 outline-none dark:text-white cursor-pointer appearance-none">
                                <option value="cod">💵 Cash on Delivery (COD)</option>
                            </select>
                        </div>
                        
                        <div>
                            <label class="text-[10px] font-black text-orange-500 ml-1 uppercase tracking-widest">Apply Promo Code</label>
                            <div class="flex gap-2 mt-1">
                                <input type="text" id="coupon-code" placeholder="WELCOME50" 
                                    class="flex-1 p-4 rounded-2xl bg-gray-100 dark:bg-slate-800 border-2 border-transparent focus:border-orange-500 outline-none uppercase text-xs font-bold dark:text-white">
                                <button onclick="applyCoupon()" class="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-6 rounded-2xl font-bold text-xs">Apply</button>
                            </div>
                            <p id="coupon-msg" class="text-[10px] font-bold mt-2 ml-2 hidden"></p>
                        </div>

                        <div class="p-5 rounded-[2rem] bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20">
                            <div class="flex justify-between items-center">
                                <span class="font-bold text-gray-500 dark:text-gray-400">Grand Total:</span>
                                <div class="text-right">
                                    <span id="display-final-total" class="text-2xl font-black text-orange-600">₹${totalPrice}</span>
                                    <p id="discount-label" class="text-[10px] text-green-500 font-bold hidden"></p>
                                </div>
                            </div>
                        </div>

                        <button onclick="confirmFinalOrder()" 
                            class="w-full bg-orange-500 hover:bg-orange-600 text-white py-5 rounded-2xl font-black shadow-lg shadow-orange-500/40 transition-all active:scale-95 uppercase">
                            Place Order Now
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
    document.body.insertAdjacentHTML('beforeend', checkoutHTML);
}


function confirmFinalOrder() {
    const address = document.getElementById('cust-address').value.trim();
    const finalAmount = document.getElementById('display-final-total').innerText;

    if (address.length < 10) {
        alert("Please enter a full delivery address (Min 10 chars)");
        return;
    }

    const contentArea = document.getElementById('checkout-content-area');
    contentArea.innerHTML = `
        <div class="text-center py-4">
            <div class="w-20 h-20 bg-green-100 dark:bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 animate-bounce">
                <i class="fas fa-check"></i>
            </div>
            <h2 class="text-3xl font-black mb-2 dark:text-white">Order Placed!</h2>
            <p class="text-gray-500 dark:text-gray-400 mb-6">Preparing your food with love.</p>
            <div class="p-5 rounded-[2rem] bg-slate-50 dark:bg-slate-800/50 text-left mb-8 border border-slate-100 dark:border-slate-700">
                <p class="text-[10px] font-black text-gray-400 uppercase mb-1">Shipping to:</p>
                <p class="font-bold text-sm text-slate-700 dark:text-slate-300 mb-3">${address}</p>
                <p class="text-sm font-black text-orange-500 border-t pt-2">Paid Total: ${finalAmount}</p>
            </div>
            <button onclick="finishOrderFlow()" class="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-4 rounded-2xl font-black">CONTINUE SHOPPING</button>
        </div>`;

    cart = [];
    updateCart();
}

function finishOrderFlow() {
    closeCheckout();
    document.getElementById('cart-sidebar').classList.add('translate-x-full');
    renderRestaurants();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeCheckout() {
    const modal = document.getElementById('checkout-modal');
    if(modal) modal.remove();
}

// 6. Auth Logic
function updateNavbar() {
    const userName = localStorage.getItem('userName');
    const loginBtn = document.getElementById('login-btn');
    const userProfile = document.getElementById('user-profile');
    const nameDisplay = document.getElementById('user-name-display');

    if (userName) {
        loginBtn?.classList.add('hidden');
        userProfile?.classList.remove('hidden');
        if(nameDisplay) nameDisplay.innerText = "Hi, " + userName;
    } else {
        loginBtn?.classList.remove('hidden');
        userProfile?.classList.add('hidden');
    }
}

function logout() {
    localStorage.removeItem('userName');
    window.location.reload();
}

function toggleAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.classList.toggle('hidden');
    modal.classList.toggle('flex');
}

function switchAuth(type) {
    document.getElementById('login-form-container').classList.toggle('hidden', type === 'signup');
    document.getElementById('signup-form-container').classList.toggle('hidden', type === 'login');
}

// 7. Global Helpers & Init
function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    const icon = document.getElementById('theme-icon');
    if(icon) icon.className = isDark ? 'fas fa-sun text-yellow-500' : 'fas fa-moon';
}

function toggleCart() { 
    document.getElementById('cart-sidebar').classList.toggle('translate-x-full'); 
}

function handleSearch() {
    const q = document.getElementById('searchBar').value.toLowerCase();
    const filtered = restaurants.filter(r => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q));
    const grid = document.getElementById('display-grid');
    if(grid) {
        grid.innerHTML = filtered.map(res => `
            <div onclick="renderMenu(${res.id}, '${res.name}')" class="group cursor-pointer bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-xl">
                <img src="${res.img}" class="h-64 w-full object-cover">
                <div class="p-8"><h3 class="text-2xl font-black mb-2 dark:text-white">${res.name}</h3><p class="text-gray-500">${res.cuisine}</p></div>
            </div>`).join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderRestaurants();
    updateNavbar();
    updateCart();

    // Registration
    document.getElementById('registerForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const pass = document.getElementById('regPass').value;
        localStorage.setItem(email, JSON.stringify({ name, email, pass }));
        alert("Success! Now Login.");
        switchAuth('login');
    });

    // Login
    document.getElementById('loginForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const pass = document.getElementById('loginPass').value;
        const storedUser = localStorage.getItem(email);

        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.pass === pass) {
                localStorage.setItem('userName', user.name);
                toggleAuthModal();
                updateNavbar();
            } else { alert("Wrong Password!"); }
        } else { alert("User not found!"); }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('#section-contact form');
    const submitBtn = contactForm.querySelector('button');

    if (contactForm) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Get values
            const inputs = contactForm.querySelectorAll('input, textarea');
            let isValid = true;

            // Simple Validation check
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('ring-2', 'ring-red-500');
                    setTimeout(() => input.classList.remove('ring-red-500'), 3000);
                }
            });

            if (!isValid) {
                alert("Please fill all fields!");
                return;
            }

            // Button Loading State
            const originalText = submitBtn.innerText;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fas fa-circle-notch animate-spin mr-2"></i> Sending...`;

            // Simulate API Call (Server-side bypass)
            setTimeout(() => {
                // Success State
                submitBtn.innerHTML = `<i class="fas fa-check-circle mr-2"></i> Message Sent!`;
                submitBtn.style.backgroundColor = '#22c55e'; // Green color

                // Feedback to User
                const userName = inputs[0].value;
                alert(`Shukriya ${userName}! Humne aapka inquiry receive kar liya hai. Hamari team 24 ghante mein aapko contact karegi.`);

                // Reset Form
                contactForm.reset();

                // Revert Button
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalText;
                    submitBtn.style.backgroundColor = ''; // Back to orange
                }, 4000);

            }, 2000);
        });
    }
});
document.querySelectorAll('.offer-card button').forEach(button => {
    button.addEventListener('click', function() {
        // 1. Find the code text (the span right before the button)
        const codeElement = this.previousElementSibling;
        const codeToCopy = codeElement.innerText;

        // 2. Use the Clipboard API
        navigator.clipboard.writeText(codeToCopy).then(() => {
            // 3. Visual Feedback
            const originalText = this.innerText;
            this.innerText = 'Copied!';
            this.classList.add('bg-green-500', 'text-white');
            this.classList.remove('bg-white', 'text-orange-600', 'text-indigo-600', 'text-emerald-600');

            // 4. Reset after 2 seconds
            setTimeout(() => {
                this.innerText = originalText;
                this.classList.remove('bg-green-500', 'text-white');
                this.classList.add('bg-white');
                
                // Restore original color based on the card type
                if (codeToCopy === 'WELCOME50') this.classList.add('text-orange-600');
                if (codeToCopy === 'NIGHTOWL') this.classList.add('text-indigo-600');
                if (codeToCopy === 'PARTY150') this.classList.add('text-emerald-600');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });
});
    function toggleMobileMenu() {
        const menu = document.getElementById('mobile-menu');
        const backdrop = document.getElementById('menu-backdrop');
        const content = document.getElementById('menu-content');

        if (menu.classList.contains('invisible')) {
            menu.classList.remove('invisible');
            document.body.style.overflow = 'hidden'; // Scroll disable
            setTimeout(() => {
                backdrop.classList.add('opacity-100');
                content.classList.remove('translate-x-full');
            }, 10);
        } else {
            backdrop.classList.remove('opacity-100');
            content.classList.add('translate-x-full');
            document.body.style.overflow = 'auto'; // Scroll enable
            setTimeout(() => {
                menu.classList.add('invisible');
            }, 300);
        }
    }

    







