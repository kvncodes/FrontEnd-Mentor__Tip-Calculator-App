const bill = {
	billAmount: 0.0,
	tipPercentage: 0,
	numPeople: undefined,

	billInput: document.querySelector("#bill"),
	numberOfPeopleInput: document.querySelector("#peopleAmount"),

	amountPerPersonDisplay: document.querySelector("#perPerson"),
	amountTotalDisplay: document.querySelector("#total"),
};

const selectOptions = document.querySelectorAll(
	".select-options input:not(#custom)"
);

const customInput = document.querySelector("#custom");

const dangerTextBill = document.querySelector("#billp");
const dangerTextPeople = document.querySelector("#people");

const resetButton = document.querySelector("#reset");
resetButton.disabled = true;

let customValue;

bill.billInput.addEventListener("input", function () {
	bill.billAmount = parseFloat(this.value);

	if (bill.billAmount === 0 || bill.billAmount <= 0) {
		bill.billInput.classList.add("danger-input");
		dangerTextBill.classList.remove("hidden");
		bill.billAmount = 0;
		bill.billInput.value = 0;
		bill.numberOfPeopleInput.disabled = true;
	} else {
		bill.billInput.classList.remove("danger-input");
		dangerTextBill.classList.add("hidden");
		bill.numberOfPeopleInput.disabled = false;
		resetButton.classList.remove("disabled-button");
		resetButton.disabled = false;
	}

	updateAmountPersonDisplay(bill);
	updateTotalPersonDisplay(bill);
});

for (let opt of selectOptions) {
	opt.addEventListener("click", function () {
		bill.tipPercentage = parseInt(this.value);

		resetButton.disabled = false;
		resetButton.classList.remove("disabled-button");

		updateAmountPersonDisplay(bill);
		updateTotalPersonDisplay(bill);
	});
}

bill.numberOfPeopleInput.addEventListener("input", function () {
	bill.numPeople = parseInt(this.value);

	if (bill.numPeople === 0 || bill.numPeople <= 0) {
		bill.numberOfPeopleInput.classList.add("danger-input");
		dangerTextPeople.classList.remove("hidden");
		bill.numPeople = 0;
		bill.numberOfPeopleInput.value = 0;
		bill.billInput.disabled = true;
	} else {
		bill.numberOfPeopleInput.classList.remove("danger-input");
		dangerTextPeople.classList.add("hidden");
		bill.billInput.disabled = false;
		resetButton.classList.remove("disabled-button");
		resetButton.disabled = false;
	}

	updateAmountPersonDisplay(bill);
	updateTotalPersonDisplay(bill);
});

customInput.addEventListener("input", function () {
	customValue = this.value;

	if (customValue > 100 || customValue < 0) {
		customInput.value = 0;
		bill.tipPercentage = 0;
	} else {
		for (let opt of selectOptions) {
			opt.checked = false;
		}
		customInput.value = customValue;
		bill.tipPercentage = customValue;
		resetButton.classList.remove("disabled-button");
		resetButton.disabled = false;
	}

	updateAmountPersonDisplay(bill);
	updateTotalPersonDisplay(bill);
});

resetButton.addEventListener("click", function () {
	bill.billAmount = 0;
	bill.tipPercentage = 0;
	bill.billInput.value = null;
	bill.numberOfPeopleInput.value = null;
	bill.amountPerPersonDisplay.textContent = "$0.00";
	bill.amountTotalDisplay.textContent = "$0.00";
	customInput.value = undefined;
	customValue = undefined;
	resetButton.disabled = true;
	for (let opt of selectOptions) {
		opt.checked = false;
	}
});

function updateAmountPersonDisplay(bill) {
	let newAmount =
		(bill.billAmount * bill.tipPercentage) / 100 / bill.numPeople;

	if (Number.isNaN(newAmount) || newAmount === null) {
		bill.amountPerPersonDisplay.textContent = "$0.00";
	} else {
		let i = 0;
		const duration = 2000;
		const intervalTime = 10;

		const increment = (newAmount / duration) * intervalTime;

		const countUpInterval = setInterval(() => {
			i += increment;

			if (i >= newAmount) {
				i = newAmount;
				clearInterval(countUpInterval);
			}

			(bill.amountPerPersonDisplay.textContent = `$${parseFloat(
				i
			).toFixed(2)}`),
				intervalTime;
		});
	}
}

function updateTotalPersonDisplay(bill) {
	let newAmount =
		bill.billAmount / bill.numPeople +
		(bill.billAmount * bill.tipPercentage) / 100 / bill.numPeople;

	if (Number.isNaN(newAmount) || newAmount === null) {
		bill.amountTotalDisplay.textContent = "$0.00";
	} else {
		let i = 0;
		const duration = 2000;
		const intervalTime = 10;

		const increment = (newAmount / duration) * intervalTime;

		const countUpInterval = setInterval(() => {
			i += increment;

			if (i >= newAmount) {
				i = newAmount;
				clearInterval(countUpInterval);
			}

			(bill.amountTotalDisplay.textContent = `$${parseFloat(i).toFixed(
				2
			)}`),
				intervalTime;
		});
	}
}
