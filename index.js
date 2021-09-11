let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    document.querySelector(".install").style.display = "flex";
    deferredPrompt = e;
    setTimeout(() => document.querySelector(".install").classList.add("disp"), 100);

    document.querySelector("#installPWA").addEventListener('click', async () => {
        hideUI();
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        deferredPrompt = null;
    });
    document.querySelector("#continuePWA").addEventListener('click', async () => {
        hideUI();
    });
    document.onclick = function (e) {
        if (!e.target.classList.contains("install")) {
            hideUI();
        }
    }
    window.onappinstalled = function () {
        hideUI();
    };
});
window.addEventListener("load", () => {
    document.head.innerHTML += `<link rel="manifest" href="index.webmanifest">
    <meta name="theme-color" content="#1e1e1e">`;
    document.body.innerHTML += `<div class="install">
    <div class="imgContainerPWA"></div>
    <div class="contain">
        <button id="continuePWA">Не сейчас</button>
        <button id="installPWA">Установить</button>
    </div>
</div>`;
    
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("service-worker.js");
    }
});

function hideUI() {
    document.querySelector(".install").classList.remove("disp");
    setTimeout(() => document.querySelector(".install").style.display = "none", 300);
}
