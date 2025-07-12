document.addEventListener("DOMContentLoaded", function () {
  const statusIndicator = document.getElementById("statusIndicator");
  const statusText = document.getElementById("statusText");
  const statusMessage = document.getElementById("statusMessage");
  const lastSeen = document.getElementById("lastSeen");
  const lastOnlineTime = document.getElementById("lastOnlineTime");
  const notification = document.getElementById("notification");
  let lastOnline = null;
  function updateOnlineStatus() {
    const isOnline = navigator.onLine;
    if (isOnline) {
      statusIndicator.className = "status-indicator online";
      statusText.textContent = "You are currently online";
      statusMessage.textContent = "Internet connection is active";
      statusMessage.style.color = "#4CAF50";
      lastOnline = new Date();
      lastOnlineTime.textContent = lastOnline.toLocaleTimeString();
      showNotification("Internet connection restored", "online-notification");
      lastSeen.classList.add("hidden");
    } else {
      statusIndicator.className = "status-indicator offline";
      statusText.textContent = "You are currently offline";
      statusMessage.textContent = "No internet connection";
      statusMessage.style.color = "#F44336";
      showNotification("Internet connection lost", "offline-notification");
      if (lastOnline) {
        lastSeen.classList.remove("hidden");
      }
    }
  }
  function showNotification(message, type) {
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add("show");
    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }
  function checkConnection() {
    fetch("https://httpbin.org/get", {
      method: "HEAD",
      cache: "no-cache",
      mode: "no-cors",
    })
      .then(() => {
        if (!navigator.onLine) {
          updateOnlineStatus();
        }
      })
      .catch(() => {
        if (navigator.onLine) {
          updateOnlineStatus();
        }
      });
  }
  updateOnlineStatus();
  setInterval(checkConnection, 10000);
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
});

// Project: Internet Connection Monitor
// Author: Kamran Javed
// Portfolio: https://kamranjaved.com
// Company: OneDigitalLine
// Website: https://onedigitalline.com
// Email: meet@kamranjaved.com
// License: For personal or client use only. Redistribution prohibited.
// © Kamran Javed. All rights reserved.
