let interval;

// Prevent future dates
document.addEventListener("DOMContentLoaded", () => {
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("birthdate").setAttribute("max", today);
});

// Force 2 digits
function pad(num) {
    return num.toString().padStart(2, "0");
}

function startCalculation() {
    const birthInput = document.getElementById("birthdate").value;

    if (!birthInput) {
        alert("Please enter your birthdate, Agent.");
        return;
    }

    const birthDate = new Date(birthInput);

    clearInterval(interval);

    interval = setInterval(() => {
        const now = new Date();

        if (birthDate > now) {
            alert("Future dates are not authorized.");
            clearInterval(interval);
            return;
        }

        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();
        let hours = now.getHours() - birthDate.getHours();
        let minutes = now.getMinutes() - birthDate.getMinutes();
        let seconds = now.getSeconds() - birthDate.getSeconds();

        // Adjust negatives properly

        if (seconds < 0) {
            seconds += 60;
            minutes--;
        }

        if (minutes < 0) {
            minutes += 60;
            hours--;
        }

        if (hours < 0) {
            hours += 24;
            days--;
        }

        if (days < 0) {
            const previousMonth = new Date(
                now.getFullYear(),
                now.getMonth(),
                0
            ).getDate();
            days += previousMonth;
            months--;
        }

        if (months < 0) {
            months += 12;
            years--;
        }

        document.getElementById("years").innerText = years;
        document.getElementById("months").innerText = pad(months);
        document.getElementById("days").innerText = pad(days);
        document.getElementById("hours").innerText = pad(hours);
        document.getElementById("minutes").innerText = pad(minutes);
        document.getElementById("seconds").innerText = pad(seconds);

        calculateBirthdayCountdown(birthDate);

    }, 1000);
}

function calculateBirthdayCountdown(birthDate) {
    const now = new Date();
    let nextBirthday = new Date(
        now.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate()
    );

    if (nextBirthday < now) {
        nextBirthday.setFullYear(now.getFullYear() + 1);
    }

    const diff = nextBirthday - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById("birthdayCountdown").innerText =
        `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s remaining`;
}