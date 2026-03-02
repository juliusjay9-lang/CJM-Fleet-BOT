import {
  FLEET_VEHICLES,
  getActiveVehicles,
  getDailyReportData,
  getMaintenanceDueVehicles,
} from "./fleetData.js";
import { resolveFleetCommand } from "./commandEngine.js";

function byId(id) {
  return document.getElementById(id);
}

function isIOSLikeDevice() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

function createFileDownload(content, fileName) {
  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  const objectUrl = URL.createObjectURL(blob);
  link.href = objectUrl;
  link.download = fileName;

  if (isIOSLikeDevice()) {
    window.open(objectUrl, "_blank", "noopener,noreferrer");
  } else {
    link.click();
  }

  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
}

function setBusyButton(button, isBusy, idleText) {
  if (isBusy) {
    button.disabled = true;
    button.setAttribute("aria-busy", "true");
    button.innerHTML =
      '<span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></span>...';
    return;
  }

  button.disabled = false;
  button.removeAttribute("aria-busy");
  button.innerHTML = idleText;
}

function renderDashboard() {
  const activeVehicles = getActiveVehicles(FLEET_VEHICLES);
  const maintenanceDue = getMaintenanceDueVehicles(FLEET_VEHICLES);
  const report = getDailyReportData(FLEET_VEHICLES);

  const activeVehicleCount = byId("activeVehicleCount");
  const reportMiles = byId("reportMiles");
  const reportFuel = byId("reportFuel");
  const maintenanceDueCount = byId("maintenanceDueCount");

  if (
    !activeVehicleCount ||
    !reportMiles ||
    !reportFuel ||
    !maintenanceDueCount
  ) {
    return;
  }

  activeVehicleCount.textContent = String(activeVehicles.length);
  reportMiles.textContent = report.miles.toLocaleString();
  reportFuel.textContent = String(report.fuelGallons);
  maintenanceDueCount.textContent = String(maintenanceDue.length);

  const activeVehiclesList = byId("activeVehiclesList");
  if (!activeVehiclesList) {
    return;
  }
  activeVehiclesList.innerHTML = activeVehicles
    .slice(0, 3)
    .map(
      (vehicle) => `
      <div class="p-3 rounded-xl bg-white/5">
        <div class="flex justify-between">
          <span class="font-semibold">${vehicle.id}</span>
          <span class="text-sm">${vehicle.location}</span>
        </div>
        <div class="text-xs text-gray-400">${vehicle.driver} • ${vehicle.speedMph} mph</div>
      </div>
    `,
    )
    .join("");

  const maintenanceList = byId("maintenanceList");
  if (!maintenanceList) {
    return;
  }
  maintenanceList.innerHTML = maintenanceDue
    .slice(0, 3)
    .map((vehicle) => {
      const dueText =
        vehicle.maintenanceInDays <= 1
          ? "Tomorrow"
          : `${vehicle.maintenanceInDays} days`;
      const dueClass =
        vehicle.maintenanceInDays <= 1 ? "text-[#FEE75C]" : "text-[#57F287]";

      return `
      <div class="p-2 rounded-xl bg-white/5 flex justify-between">
        <span>${vehicle.id}</span>
        <span class="text-xs ${dueClass}">${dueText}</span>
      </div>
      `;
    })
    .join("");
}

function initCommands() {
  const commandForm = byId("commandForm");
  const commandInput = byId("commandInput");
  const responseBox = byId("responseBox");
  const responseText = byId("responseText");
  const responseType = byId("responseType");

  if (
    !commandForm ||
    !commandInput ||
    !responseBox ||
    !responseText ||
    !responseType
  ) {
    return;
  }

  commandForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const command = commandInput.value;
    const result = resolveFleetCommand(command, FLEET_VEHICLES);

    responseText.textContent = result.response;
    responseType.textContent = result.key;
    responseBox.classList.remove("hidden");
  });

  window.setCommand = function setCommand(command) {
    commandInput.value = command;
    commandForm.dispatchEvent(new Event("submit"));
  };
}

function initDownloads() {
  const reportButton = byId("reportBtn");
  const guideButton = byId("guideBtn");
  const downloadSuccess = byId("downloadSuccess");

  if (!reportButton || !guideButton || !downloadSuccess) {
    return;
  }

  reportButton.addEventListener("click", function () {
    const button = this;
    setBusyButton(button, true);

    setTimeout(() => {
      const report = getDailyReportData(FLEET_VEHICLES);
      const date = new Date().toLocaleDateString();
      setBusyButton(button, false, "Generate Report");

      createFileDownload(
        `Fleet Report\nDate: ${date}\nMiles:${report.miles.toLocaleString()}\nFuel:${report.fuelGallons} gal\nActive:${report.activeCount}`,
        "fleet-report.txt",
      );
    }, 700);
  });

  guideButton.addEventListener("click", function () {
    const button = this;
    setBusyButton(button, true);

    setTimeout(() => {
      setBusyButton(button, false, "Download Guide");
      createFileDownload(
        "FLEET BOT GUIDE\n\nCommands:\n- BOT, where is TRUCK-001\n- BOT, show active vehicles\n- BOT, generate daily report\n- BOT, maintenance due\n\nTip: Add this app to your home screen for faster access.",
        "fleetbot-guide.txt",
      );

      downloadSuccess.classList.remove("hidden");
      setTimeout(() => downloadSuccess.classList.add("hidden"), 2000);
    }, 700);
  });
}

function initNavigation() {
  const button = byId("menuBtn");
  const menu = byId("mobileMenu");

  if (!button || !menu) {
    return;
  }

  button.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    button.setAttribute(
      "aria-expanded",
      String(!menu.classList.contains("hidden")),
    );
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      event.preventDefault();
      const id = anchor.getAttribute("href");
      if (id && id !== "#") {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  document.querySelectorAll("#mobileMenu a").forEach((anchor) => {
    anchor.addEventListener("click", () => {
      menu.classList.add("hidden");
    });
  });
}

function initCommandModal() {
  const commandModal = byId("commandModal");
  const searchInput = byId("searchCmd");

  if (!commandModal || !searchInput) {
    return;
  }

  window.openCommands = function openCommands() {
    commandModal.classList.remove("hidden");
    searchInput.focus();
  };

  window.closeCommands = function closeCommands() {
    commandModal.classList.add("hidden");
  };

  window.filterCommands = function filterCommands() {
    const search = searchInput.value.toLowerCase();
    document.querySelectorAll(".cmd-item").forEach((item) => {
      item.style.display = item.textContent.toLowerCase().includes(search)
        ? "block"
        : "none";
    });
  };

  commandModal.addEventListener("click", (event) => {
    if (event.target === commandModal) {
      window.closeCommands();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !commandModal.classList.contains("hidden")) {
      window.closeCommands();
    }
  });
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      const swUrl = `${import.meta.env.BASE_URL}sw.js`;
      navigator.serviceWorker.register(swUrl).catch(() => {
        // no-op: app works without offline cache
      });
    });
  }
}

renderDashboard();
initCommands();
initDownloads();
initNavigation();
initCommandModal();
registerServiceWorker();
