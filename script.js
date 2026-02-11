// কাউন্টডাউন টাইমার
const electionDate = new Date('February 12, 2026 07:30:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = electionDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // বাংলা সংখ্যায় রূপান্তর
    document.getElementById('days').textContent = convertToBengaliDigits(days);
    document.getElementById('hours').textContent = convertToBengaliDigits(hours);
    document.getElementById('minutes').textContent = convertToBengaliDigits(minutes);
    document.getElementById('seconds').textContent = convertToBengaliDigits(seconds);
    
    if (distance < 0) {
        // নির্বাচন শেষ হয়ে গেলে
        clearCountdown();
        updateElectionStatus();
    }
}

// বাংলা সংখ্যায় রূপান্তর ফাংশন
function convertToBengaliDigits(number) {
    const bengaliDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    let result = '';
    const numberString = number.toString();
    
    for (let i = 0; i < numberString.length; i++) {
        const digit = numberString.charAt(i);
        if (digit >= '0' && digit <= '9') {
            result += bengaliDigits[digit];
        } else {
            result += digit;
        }
    }
    
    return result.padStart(2, '০');
}

// কাউন্টডাউন স্টপ করা
function clearCountdown() {
    document.getElementById('days').textContent = '০০';
    document.getElementById('hours').textContent = '০০';
    document.getElementById('minutes').textContent = '০০';
    document.getElementById('seconds').textContent = '০০';
}

// নির্বাচন স্ট্যাটাস আপডেট
function updateElectionStatus() {
    const countdownTitle = document.querySelector('.countdown-title');
    const sloganText = document.querySelector('.slogan-text');
    
    if (countdownTitle) {
        countdownTitle.textContent = '🎉 নির্বাচন শুরু হয়েছে! 🎉';
    }
    
    if (sloganText) {
        sloganText.innerHTML = '<span class="slogan-icon">🎊</span> ভোট দিন, দেশ গড়ুন <span class="slogan-icon">🎊</span>';
    }
    
    // ইম্পরট্যান্স কার্ড আপডেট
    const importanceCards = document.querySelectorAll('.importance-card');
    if (importanceCards.length > 0) {
        importanceCards[0].querySelector('.card-title').textContent = 'নির্বাচন চলছে';
        importanceCards[0].querySelector('.card-content').textContent = 'নির্বাচন প্রক্রিয়া চলমান। আপনার ভোট দিন এবং অন্যকেও ভোট দিতে উৎসাহিত করুন।';
    }
}

// কার্ড হোভার এফেক্ট
function addHoverEffects() {
    const cards = document.querySelectorAll('.countdown-card, .importance-card, .yes-point');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (this.classList.contains('countdown-card')) {
                this.style.transform = 'translateY(-15px) scale(1.05)';
            } else {
                this.style.transform = 'translateY(-10px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ওয়েবসাইট লোড হওয়ার পর
document.addEventListener('DOMContentLoaded', function() {
    // কাউন্টডাউন শুরু
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // হোভার এফেক্ট যুক্ত করা
    addHoverEffects();
    
    // তারিখ বাজে আপডেট (Optional)
    const dateBadge = document.querySelector('.date-badge');
    if (dateBadge) {
        setInterval(() => {
            dateBadge.style.animation = 'none';
            setTimeout(() => {
                dateBadge.style.animation = 'pulse-glow 3s infinite';
            }, 10);
        }, 3000);
    }
});

// সময় আপডেট ফাংশন (প্রতি মিনিটে)
function updateTime() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // আপনি চাইলে এখানে সময়ভিত্তিক কোনো আপডেট যোগ করতে পারেন
    // যেমন: ভোটের সময় সম্পর্কিত বার্তা
}

// পেজ ভিজিবিলিটি ডিটেক্ট
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // যখন ট্যাব active হয়, তখন কাউন্টডাউন আপডেট
        updateCountdown();
    }
});

// টাচ ডিভাইসের জন্য ট্যাপ এফেক্ট
document.addEventListener('touchstart', function(e) {
    if (e.target.closest('.countdown-card, .importance-card, .yes-point')) {
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = '';
        }, 150);
    }
}, { passive: true });

// রিসাইজ ইভেন্টে আপডেট
window.addEventListener('resize', function() {
    // রেস্পন্সিভ আপডেটের জন্য
    updateCountdown();
});

// লোডিং সম্পূর্ণ হওয়ার পর
window.addEventListener('load', function() {
    console.log('বাংলাদেশের ১৩তম সাধারণ নির্বাচন ওয়েবসাইট লোড সম্পূর্ণ!');
});