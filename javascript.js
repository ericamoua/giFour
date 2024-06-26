

/**
 * 1. create strings into numbers to put inside input with class name 
 * 2.creating a function to add two strings into numbers
 * create opperations for adding and subtracting 
 * create a function to make sure the decimal can be used only once 
 * create a function to set the value to clear and delete
 * 3. write a function to update the balance by the two strings i turned into numbers 
 * 4. write a function to show past transaction by my numbers value and opperators
 */

/**
 * 1. Create a budget calculator class with constructor function to grab HTML ID's
 * 2. Create variables to make empty string 
 * 3. Create variable to combine event buttons 
 * 4. Create loops for each function for the buttons purpose 
 * 5. Create a statement for the decimal allow one decimal point
 * 6. Create a function for the operations with an if statment
 * 7. Create a function that that makes number and operation to the div element
 * 8.Create a function that clears and delete the strings in display
 * 9. Once functions are fully loaded on DOM output the new budget value
 */ 

class BudgetCalculator {
    constructor() {
        // Get elements by ID's from html 
        this.statementsDiv = document.getElementById('statements');
        this.display = document.getElementById('display');
        this.descriptionInput = document.getElementById('description');
        this.totalBalanceElement = document.getElementById('totalBalance');
        this.numberButtons = document.querySelectorAll('.numbers');
        this.clearButton = document.getElementById('clear');
        this.deleteButton = document.getElementById('delete');
        this.addIncomeButton = document.getElementById('add-income');
        this.addExpenseButton = document.getElementById('add-expense');

        // Variables
        // Initialize an empty string variable to store input
        this.inputString = "";
        // Initialize an empty string variable to store input
        this.totalBalance = 0;
        // Bind events (assuming there's a method or function called bindEvents() that handles event binding)
        this.bindEvents();
    }

    bindEvents() {
        // Add event listeners to number buttons
        this.numberButtons.forEach(button => {
            button.addEventListener('click', this.addNumber.bind(this));
        });

        // Clear button functionality
        this.clearButton.addEventListener('click', this.clearDisplay.bind(this));

        // Delete button functionality
        this.deleteButton.addEventListener('click', this.deleteLastDigit.bind(this));

        // Handle manual input in the display
        this.display.addEventListener('input', this.handleDisplayInput.bind(this));

        // Add Income button functionality
        this.addIncomeButton.addEventListener('click', this.addIncome.bind(this));

        // Add Expense button functionality
        this.addExpenseButton.addEventListener('click', this.addExpense.bind(this));
    }

    addNumber(event) {
        const value = event.target.textContent;
        
        // Only allow one decimal point
        if (value === '.' && this.inputString.includes('.')) {
            return;
        }

        this.inputString += value;
        this.display.value = this.inputString;
    }

    handleDisplayInput(event) {
        const value = event.target.value;
        // Validate input to allow only numbers and a single decimal point
        if (!isNaN(value) && value.split('.').length <= 2) {
            this.inputString = value;
        } else {
            this.display.value = this.inputString;  // Revert to last valid input
        }
    }

    addIncome() {
        // Retrieve description input and trim whitespace
        const description = this.descriptionInput.value.trim();
        // Retrieve amount input and parse to float
        const amount = parseFloat(this.display.value);

        // Check if both description and amount are valid

        if (description && !isNaN(amount) && amount > 0) {
            // Add the amount to the total balance
            this.totalBalance += amount;
            // Update the displayed balance
            this.updateBalance();
            // Append a statement to the UI indicating the income
            this.appendStatement(description, amount, 'Income');
            // Clear input fields
            this.clearInputs();
        } else {
            // If description or amount is invalid, show an alert
            alert('Please enter a valid description and amount for income.');
        }
    }

    addExpense() {
        // Retrieve description input and trim whitespace
        const description = this.descriptionInput.value.trim();
        
        // Retrieve amount input and parse to float
        const amount = parseFloat(this.display.value);
    
        // Check if both description and amount are valid
        if (description && !isNaN(amount) && amount > 0) {
            // Subtract the amount from the total balance
            this.totalBalance -= amount;
            // Update the displayed balance
            this.updateBalance();
            // Append a statement to the UI indicating the expense
            this.appendStatement(description, amount, 'Expense');
            // Clear input fields
            this.clearInputs();
        } else {
            // If description or amount is invalid, show an alert
            alert('Please enter a valid description and amount for expense.');
        }
    }    

    // Function to append a new statement to the UI, including transaction type, description, and amount
    appendStatement(description, amount, type) {
        const newStatement = document.createElement('p');
        newStatement.textContent = `${type}: ${description} - ${amount.toFixed(2)}`;
        this.statementsDiv.appendChild(newStatement);
    }

    updateBalance() {
        this.totalBalanceElement.textContent = this.totalBalance.toFixed(2);
    }

    clearInputs() {
        this.inputString = "";
        this.display.value = "";
        this.descriptionInput.value = "";
    }

    clearDisplay() {
        this.clearInputs();
    }

    deleteLastDigit() {
        this.inputString = this.inputString.slice(0, -1);
        this.display.value = this.inputString;
    }
}

// Initialize BudgetCalculator when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new BudgetCalculator();
});
