export default function createBudgetItemsForm(budgetFormPostDiv) {
  budgetFormPostDiv.innerHTML = `<form id="budgetItemsForm" action="">
      <input type="text" name="date" placeholder="MM/YYYY" required>
      <input type="number" name="amount" placeholder="Amount" min="0" step="0.01" required>
      <select id="category" name="category" required>
                  <option value="" disable selected hidden>
                    Select a category
                  </option>
                  <option value="Food & Restaurants">Food & Restaurants</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Travel">Travel</option>
                  <option value="Education">Education</option>
                  <option value="Auto & Transportation">Auto & Transportation</option>
                  <option value="Other">Other</option>
                </select>
      <button type="submit" id="budgetCardSubmit" class="mt-2">Add Budget Item</button>    
    </form>`;
}
