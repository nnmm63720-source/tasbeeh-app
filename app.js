// العدادات

let counts = {
    1: 0,
    2: 0,
    3: 0
};

// تحميل العدادات من الجهاز
function loadProgress() {
    const saved = localStorage.getItem("tasbeehCounts");
    if (saved) {
        counts = JSON.parse(saved);
    }
    updateUI();
}
// حفظ العدادات في الجهاز
function saveProgress() {
    localStorage.setItem(
        "tasbeehCounts",
        JSON.stringify(counts)
    );
}
// عند الضغط على زر التسبيح
function increment(duaId) {
    // لا يتجاوز 100
    if (counts[duaId] >= 100) {
        return;
    }
    counts[duaId]++;
    saveProgress();
    updateUI();
    // عند الوصول إلى 100
    if (counts[duaId] === 100) {
        alert(" أتممت 100 مرة");
    }
}
// تحديث الشاشة
function updateUI() {
    let total = 0;
    for (let id = 1; id <= 3; id++) {
        const count = counts[id];
        total += count;
        document.getElementById(
            `count-${id}`
        ).textContent = count;
        document.getElementById(
            `progress-${id}`
        ).style.width =  `${count}%`;
    }

    // مجموع الثلاثة

    document.getElementById(

        "total-text"

    ).textContent =`${total}% من 300`;

    // شريط المجموع

    document.getElementById(

        "overall-bar"

    ).style.width =`${(total / 300)*100}%`;
}

// إعادة دعاء واحد

function resetDua(duaId) {

    if (

        !confirm(

            "هل تريدين إعادة هذا العداد إلى صفر؟"

        )

    ) {

        return;

    }

    counts[duaId] = 0;

    saveProgress();

    updateUI();

}

// إعادة كل العدادات

function resetAll() {

    if (

        !confirm(

            "هل تريدين إعادة جميع العدادات إلى صفر؟"

        )

    ) {

        return;

    }

    counts = {

        1: 0,

        2: 0,

        3: 0

    };

    saveProgress();

    updateUI();

}

// تشغيل البرنامج

loadProgress();