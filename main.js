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

google.addEventListener("click", () => setActiveButton(google.id)); // Passing button ID
bing.addEventListener("click", () => setActiveButton(bing.id)); // Passing button ID
yahoo.addEventListener("click", () => setActiveButton(yahoo.id)); // Passing button ID
yandex.addEventListener("click", () => setActiveButton(yandex.id)); // Passing button ID
duckduckgo.addEventListener("click", () => setActiveButton(duckduckgo.id)); // Passing button ID

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

	// Loop through each button ID and call the corresponding search function
	buttonIds.forEach((buttonId) => {
		const searchFunction = window[buttonId + "Search"]; // Construct function name
		if (typeof searchFunction === "function") {
			searchFunction(); // Call the search function if it exists
		} else {
			console.warn("Search function", buttonId + "Search", "not found.");
		}
	});
}

function googleSearch() {
	var text = document.getElementById("searchinput").value;
	var cleanQuery = text.replace(" ", "+", text);
	var url = "http://www.google.com/search?q=" + cleanQuery;

	window.location.href = url;
}

function bingSearch() {
	var text = document.getElementById("searchinput").value;
	var cleanQuery = text.replace(" ", "+", text);
	var url = "https://www.bing.com/search?q=" + cleanQuery;

	window.location.href = url;
}

function yahooSearch() {
	var text = document.getElementById("searchinput").value;
	var cleanQuery = text.replace(" ", "+", text);
	var url =
		"https://search.yahoo.com/search;_ylt=Awr48ty.AXZm.CMJbkNDDWVH;_ylc=X1MDMTE5NzgwNDg2NwRfcgMyBGZyAwRmcjIDcDpzLHY6c2ZwLG06c2ItdG9wBGdwcmlkA0x3YkxDX0lkUmhlUUcueV81LkVTU0EEbl9yc2x0AzAEbl9zdWdnAzEwBG9yaWdpbgNzZWFyY2gueWFob28uY29tBHBvcwMwBHBxc3RyAwRwcXN0cmwDMARxc3RybAM1BHF1ZXJ5A3dkJTIwd2QEdF9zdG1wAzE3MTkwMDk3Mjk-?p=" +
		cleanQuery;

	window.location.href = url;
}

function yandexSearch() {
	var text = document.getElementById("searchinput").value;
	var cleanQuery = text.replace(" ", "+", text);
	var url = "https://yandex.com/search/?text=" + cleanQuery;

	window.location.href = url;
}

function duckduckgoSearch() {
	var text = document.getElementById("searchinput").value;
	var cleanQuery = text.replace(" ", "+", text);
	var url = "https://duckduckgo.com/?q=" + cleanQuery;

	window.location.href = url;
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

	closeButton.addEventListener("click", () => {
		settingsDialog.close(); // Close the dialog
	});
}
