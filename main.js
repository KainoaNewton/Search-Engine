document.addEventListener("keydown", (event) => {
	if ((event.ctrlKey || event.metaKey) && event.key === "Backspace") {
		clearSearchInput();
	}
});

document.addEventListener("keydown", (event) => {
	if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
		runActiveButtonSearches();
	}
});

const inputField = document.getElementById("searchinput");

inputField.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		runActiveButtonSearches();
	}
});

function clearSearchInput() {
	const searchInput = document.getElementById("searchinput");
	searchInput.value = "";
}

const google = document.getElementById("google");
const bing = document.getElementById("bing");
const yahoo = document.getElementById("yahoo");
const yandex = document.getElementById("yandex");
const duckduckgo = document.getElementById("duckduckgo");
const brave = document.getElementById("brave");
const youtube = document.getElementById("youtube");
const startpage = document.getElementById("startpage");

google.addEventListener("click", () => setActiveButton(google.id)); // Passing button ID
bing.addEventListener("click", () => setActiveButton(bing.id)); // Passing button ID
yahoo.addEventListener("click", () => setActiveButton(yahoo.id)); // Passing button ID
yandex.addEventListener("click", () => setActiveButton(yandex.id)); // Passing button ID
duckduckgo.addEventListener("click", () => setActiveButton(duckduckgo.id)); // Passing button ID
brave.addEventListener("click", () => setActiveButton(brave.id)); // Passing button ID
youtube.addEventListener("click", () => setActiveButton(youtube.id)); // Passing button ID
startpage.addEventListener("click", () => setActiveButton(startpage.id)); // Passing button ID

function setActiveButton(buttonId) {
	// Get the active buttons list from localStorage (or create an empty list if it doesn't exist)
	let activeButtons = [];
	const storedList = localStorage.getItem("activeButtons");
	if (storedList) {
		try {
			activeButtons = JSON.parse(storedList);
		} catch (error) {
			console.error("Error parsing activeButtons list:", error);
			activeButtons = []; // Reset to an empty list on parsing error
		}
	}

	// Remove all previously active buttons
	const existingActiveButtons = document.querySelectorAll(".active");
	existingActiveButtons.forEach((button) => button.classList.remove("active"));

	// Clear the active buttons list from localStorage
	localStorage.removeItem("activeButtons");

	// Add the new button ID to the list
	activeButtons.push(buttonId);

	// Store the updated list in localStorage
	localStorage.setItem("activeButtons", JSON.stringify(activeButtons));

	// Add the "active" class to the clicked button
	const button = document.getElementById(buttonId);
	if (button) {
		button.classList.add("active");
	} else {
		console.warn("Button with ID", buttonId, "not found.");
	}
}

function runActiveButtonSearches() {
	// Get the active buttons list from localStorage
	const storedList = localStorage.getItem("activeButtons");
	if (!storedList) {
		return; // No active buttons if list is empty
	}

	let buttonIds;
	try {
		buttonIds = JSON.parse(storedList);
	} catch (error) {
		console.error("Error parsing activeButtons list:", error);
		return; // Skip execution if parsing fails
	}

	// Call the first search function based on the first button ID
	const firstButtonId = buttonIds[0];
	if (firstButtonId) {
		const searchFunction = window[firstButtonId + "Search"]; // Construct function name
		if (typeof searchFunction === "function") {
			searchFunction(openLinksInNewTab); // Pass openLinksInNewTab state
		} else {
			console.warn("Search function", firstButtonId + "Search", "not found.");
		}
	}
}

const newTabCheckbox = document.getElementById("new-tab"); // Checkbox for opening in new tab
let openLinksInNewTab = false; // Variable to store checkbox state

function updateOpenInNewTabBehavior() {
	openLinksInNewTab = newTabCheckbox.checked; // Update variable based on checkbox state
}

// Initial state on page load
updateOpenInNewTabBehavior();

newTabCheckbox.addEventListener("change", updateOpenInNewTabBehavior);

function googleSearch() {
	var text = document.getElementById("searchinput").value;
	var cleanQuery = text.replace(" ", "+", text);
	var url = "http://www.google.com/search?q=" + cleanQuery;

	// Call handleLinkClick after constructing the URL
	handleLinkClick(url, openLinksInNewTab);
}

function bingSearch() {
	var text = document.getElementById("searchinput").value;
	var cleanQuery = text.replace(" ", "+", text);
	var url = "https://www.bing.com/search?q=" + cleanQuery;

	// Check checkbox state and handle link behavior
	handleLinkClick(url, openLinksInNewTab);
}

function yahooSearch() {
	var text = document.getElementById("searchinput").value;
	var cleanQuery = text.replace(" ", "+", text);
	var url =
		"https://search.yahoo.com/search;_ylt=Awr48ty.AXZm.CMJbkNDDWVH;_ylc=X1MDMTE5NzgwNDg2NwRfcgMyBGZyAwRmcjIDcDpzLHY6c2ZwLG06c2ItdG9wBGdwcmlkA0x3YkxDX0lkUmhlUUcueV81LkVTU0EEbl9yc2x0AzAEbl9zdWdnAzEwBG9yaWdpbgNzZWFyY2gueWFob28uY29tBHBvcwMwBHBxc3RyAwRwcXN0cmwDMARxc3RybAM1BHF1ZXJ5A3dkJTIwd2QEdF9zdG1wAzE3MTkwMDk3Mjk-?p=" +
		cleanQuery;

	// Check checkbox state and handle link behavior
	handleLinkClick(url, openLinksInNewTab);
}

function yandexSearch() {
	var text = document.getElementById("searchinput").value;
	var cleanQuery = text.replace(" ", "+", text);
	var url = "https://yandex.com/search/?text=" + cleanQuery;

	// Check checkbox state and handle link behavior
	handleLinkClick(url, openLinksInNewTab);
}

function duckduckgoSearch() {
	var text = document.getElementById("searchinput").value;
	var cleanQuery = text.replace(" ", "+", text);
	var url = "https://duckduckgo.com/?q=" + cleanQuery;

	// Check checkbox state and handle link behavior
	handleLinkClick(url, openLinksInNewTab);
}

function braveSearch() {
	var text = document.getElementById("searchinput").value;
	var cleanQuery = text.replace(" ", "+", text);
	var url = "https://search.brave.com/search?q=" + cleanQuery;

	// Check checkbox state and handle link behavior
	handleLinkClick(url, openLinksInNewTab);
}

function youtubeSearch() {
	var text = document.getElementById("searchinput").value;
	var cleanQuery = text.replace(" ", "+", text);
	var url = "https://www.youtube.com/results?search_query=" + cleanQuery;

	// Check checkbox state and handle link behavior
	handleLinkClick(url, openLinksInNewTab);
}

function startpageSearch() {
	var text = document.getElementById("searchinput").value;
	var cleanQuery = text.replace(" ", "+", text);
	var url = "https://www.startpage.com/do/search?query=" + cleanQuery;

	// Check checkbox state and handle link behavior
	handleLinkClick(url, openLinksInNewTab);
}

function handleLinkClick(url, openLinksInNewTab) {
	if (openLinksInNewTab) {
		window.open(url, "_blank"); // Open in new tab
	} else {
		window.location.href = url; // Redirect current window
	}
}

const geminiDialog = document.getElementById("gemini-setup-dialog");
const yesButton = document.getElementById("yes-button");
const showMeHowButton = document.getElementById("show-me-how-button");

function geminiSearch() {
	geminiDialog.showModal(); // Display the dialog

	yesButton.addEventListener("click", () => {
		var text = document.getElementById("searchinput").value;
		var cleanQuery = text.replace(" ", "+", text);
		var url = "https://gemini.google.com/?question=" + cleanQuery;

		window.location.href = url;
		geminiDialog.close(); // Close the dialog
	});

	showMeHowButton.addEventListener("click", () => {
		window.location.href = "geminihelp.html";
		geminiDialog.close(); // Close the dialog
	});
}

const settingsDialog = document.getElementById("settings-dialog");
const closeButton = document.getElementById("close-button");

function settings() {
	settingsDialog.showModal(); // Display the dialog
	settingsDialog.style.display = "flex";

	closeButton.addEventListener("click", () => {
		settingsDialog.close(); // Close the dialog
		settingsDialog.style.display = "none";
	});
}

// const checkboxes = document.querySelectorAll('input[type="checkbox"]');
// const STORAGE_KEY = "checkedEngines"; // Key for local storage

// function getCheckedEnginesFromStorage() {
// 	const storedData = localStorage.getItem(STORAGE_KEY);
// 	try {
// 		return storedData ? JSON.parse(storedData) : []; // Parse stored data or return empty array
// 	} catch (error) {
// 		console.error("Error parsing stored engine data:", error);
// 		return []; // Return empty array on parsing error
// 	}
// }

// function setCheckedEnginesToStorage(checkedEngines) {
// 	localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedEngines));
// }

// function updateEngineVisibility(checkbox, engineId) {
// 	const targetElement = document.getElementById(engineId);

// 	if (checkbox.checked) {
// 		// Add "visible" class if it doesn't exist
// 		if (!targetElement.classList.contains("visible")) {
// 			targetElement.classList.add("visible");
// 		}
// 	} else {
// 		// Remove "visible" class if it exists
// 		targetElement.classList.remove("visible");
// 	}
// }

// // Load previously checked engines from local storage (if any)
// const checkedEngines = getCheckedEnginesFromStorage();

// // Set initial checkbox states based on saved data
// checkboxes.forEach((checkbox) => {
// 	const engineId = checkbox.id.replace(/-checkbox$/, "");
// 	checkbox.checked = checkedEngines.includes(engineId);
// });

// checkboxes.forEach((checkbox) => {
// 	checkbox.addEventListener("change", function () {
// 		const engineId = this.id.replace(/-checkbox$/, "");
// 		const isChecked = this.checked;

// 		// Update checked engine list in storage
// 		const currentCheckedEngines = getCheckedEnginesFromStorage();
// 		if (isChecked) {
// 			currentCheckedEngines.push(engineId);
// 		} else {
// 			const index = currentCheckedEngines.indexOf(engineId);
// 			if (index > -1) {
// 				currentCheckedEngines.splice(index, 1);
// 			}
// 		}
// 		setCheckedEnginesToStorage(currentCheckedEngines);

// 		// Update visibility of the corresponding element
// 		updateEngineVisibility(checkbox, engineId);
// 	});
// });

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const STORAGE_KEY = "checkedEngines"; // Key for local storage

function getCheckedEnginesFromStorage() {
	const storedData = localStorage.getItem(STORAGE_KEY);
	try {
		return storedData ? JSON.parse(storedData) : []; // Parse stored data or return empty array
	} catch (error) {
		console.error("Error parsing stored engine data:", error);
		return []; // Return empty array on parsing error
	}
}

function setCheckedEnginesToStorage(checkedEngines) {
	localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedEngines));
}

function updateEngineVisibility(checkbox, engineId) {
	const targetElement = document.getElementById(engineId);

	if (checkbox.checked) {
		targetElement.classList.add("visible");
	} else {
		targetElement.classList.remove("visible");
	}
}

// Load previously checked engines from local storage (if any)
const checkedEngines = getCheckedEnginesFromStorage();

// Set initial checkbox states based on saved data
checkboxes.forEach((checkbox) => {
	const engineId = checkbox.id.replace(/-checkbox$/, "");
	checkbox.checked = checkedEngines.includes(engineId);
});

function checkOnLoad() {
	checkboxes.forEach((checkbox) => {
		const engineId = checkbox.id.replace(/-checkbox$/, "");
		updateEngineVisibility(checkbox, engineId);
	});
}

// Call the checkOnLoad function on page load
checkOnLoad();

checkboxes.forEach((checkbox) => {
	checkbox.addEventListener("change", function () {
		const engineId = this.id.replace(/-checkbox$/, "");
		const isChecked = this.checked;

		// Update checked engine list in storage
		const currentCheckedEngines = getCheckedEnginesFromStorage();
		if (isChecked) {
			currentCheckedEngines.push(engineId);
		} else {
			const index = currentCheckedEngines.indexOf(engineId);
			if (index > -1) {
				currentCheckedEngines.splice(index, 1);
			}
		}
		setCheckedEnginesToStorage(currentCheckedEngines);

		// Update visibility of the corresponding element
		updateEngineVisibility(checkbox, engineId);
	});
});

window.onload = function () {
	clearSearchInput();
};
