<script>
  import { expenses } from './stores.js';

  export let editMode = false;
  export let editIndex = -1;
  export let onEditComplete = null;

  let storeName = "";
  let taxRate = "";
  let submitted = false;
  let initialized = false;

  // Make array with first item empty
  let items = [
    { expenseType: "receipt",
    name: "", 
    cost: "", 
    quantity:"1", 
    category: "" }
  ];

  // Initialize with existing data when in edit mode - with better guards
  $: if (editMode && editIndex >= 0 && $expenses && $expenses[editIndex] && !initialized) {
    const expense = $expenses[editIndex];
    if (expense) {
      storeName = expense.storeName || "";
      taxRate = expense.taxRate?.toString() || "";
      items = expense.items && expense.items.length > 0 ? expense.items.map(item => ({
        name: item.name || "",
        cost: item.cost?.toString() || "",
        quantity: item.quantity?.toString() || "1",
        category: item.category || ""
      })) : [{ name: "", cost: "", quantity:"1", category: "" }];
      initialized = true;
    }
  }

  // Reset initialization flag when switching modes
  $: if (!editMode) {
    initialized = false;
  }
  
  // Add reactive statements to force recalculation
  $: subtotal = items.reduce((sum, item) => {
    const cost = parseFloat(item.cost) || 0;
    const quantity = parseInt(item.quantity) || 0;
    return sum + cost * quantity;
  }, 0);

  $: total = subtotal * (1 + (parseFloat(taxRate) || 0) / 100);

  function addItem() {
    items = [...items, { expenseType: "receipt", name: "", cost: "", quantity:"1", category: "" }];
  }

  function removeItem(index) {
    items = items.filter((_, i) => i !== index);
  }

  function deleteReceipt() {
    if (editMode && editIndex >= 0 && $expenses && $expenses[editIndex]) {
      expenses.update(currentExpenses => {
        const updated = [...currentExpenses];
        updated.splice(editIndex, 1);
        return updated;
      });
      console.log('Receipt deleted at index:', editIndex);
      if (onEditComplete) onEditComplete();
    }
  }

  function submitReceipt() {
    if (subtotal === 0) {
      alert("Receipt has zero valid items.")
    }  
    else {
      const receiptData = {
        expenseType: "receipt",
        storeName,
        taxRate: parseFloat(taxRate) || 0,
        items: items.filter(item => item.name && item.cost && item.quantity).map(item => ({
          name: item.name,
          cost: parseFloat(item.cost) || 0,
          quantity: parseInt(item.quantity) || 1,
          category: item.category || ""
        })), // Ensure proper data types
        subtotal,
        total,
        timestamp: editMode && $expenses[editIndex] ? $expenses[editIndex].timestamp : Date.now()
      };
      
      if (editMode && editIndex >= 0) {
        // Update existing expense
        expenses.update(currentExpenses => {
          const updated = [...currentExpenses];
          updated[editIndex] = receiptData;
          return updated;
        });
        console.log('Receipt updated:', receiptData);
        if (onEditComplete) onEditComplete();
      } else {
        // Add new expense
        expenses.update(currentExpenses => [receiptData, ...currentExpenses]);
        console.log('Receipt added:', receiptData);
      }

      submitted = true;
      setTimeout(() => submitted = false, 2000); // Hide feedback after 2 seconds
      
      // Reset form if not in edit mode
      if (!editMode) {
        storeName = "";
        taxRate = "";
        items = [{ expenseType: "receipt", name: "", cost: "", quantity:"1", category: "" }];
      }
    }
  }

  function cancelEdit() {
    initialized = false;
    if (onEditComplete) onEditComplete();
  }
</script>

<section>
  <h2>{editMode ? 'Edit Receipt' : 'Receipt Entry'}</h2>
  <div class="top-inputs">
    <div class="input-group">
      <label for="store_name">Store Name:</label>
      <input id="store_name" type="text" bind:value={storeName} placeholder="Store Name" />
    </div>
    <div class="input-group">
      <label for="tax_rate">Tax Rate (%):</label>
      <input id="tax_rate" type="number" bind:value={taxRate} min="0" step="0.1" placeholder="Tax Rate" />
    </div>
  </div>

  <h3>Items ({items.length})</h3>
  {#each items as item, i}
    <div class="item-entry">
      <div class="item-row">
        <div class="input-group">
          <label for="item-name">Name:</label>
          <input id="item-name" type="text" bind:value={item.name} placeholder="Item Name" />
        </div>
        <div class="input-group">
          <label for="item-cost">Base Cost:</label>
          <input id="item-cost" type="number" bind:value={item.cost} min="0" step="0.01"/>
        </div>
        <div class="input-group">
          <label for="item-quantity">Quantity:</label>
          <input id="item-quantity" type="number" bind:value={item.quantity} min="0" step="1" />
        </div>
        <div class="input-group">
          <label for="item-category">Category:</label>
          <input id="item-category" type="text" bind:value={item.category} placeholder="Category" />
        </div>
        <div class="input-group">
          <label for="item-remove" style="min-height: 1.5em;"></label>
          <button class="danger-button" 
                  id="btn-remove" 
                  type="button" 
                  on:click={() => removeItem(i)} 
                  disabled={items.length === 1} 
                  title="Remove item"
                  >✖</button>
        </div>
      </div>
    </div>
  {/each}

  <button class="primary-button" on:click={addItem}>Add Item</button>

  <div style="margin-top:2em;">
    <strong>Subtotal:</strong> ${subtotal.toFixed(2)}<br>
    <strong>Total (with tax):</strong> ${total.toFixed(2)}
  </div>

  <div class="button-row">
    <button class="confirm-button" disabled={total.toFixed(2) === "0.00"} on:click={submitReceipt}>
      {editMode ? 'Update Receipt' : 'Submit Receipt'}
    </button>
    {#if editMode}
      <button class="caution-button" on:click={cancelEdit}>Cancel</button>
      <button class="danger-button" on:click={deleteReceipt}>Delete</button>
    {/if}
  </div>
  
  {#if submitted}
    <div style="color:green; margin-top:1em;">
      Receipt for ${total.toFixed(2)} {editMode ? 'updated' : 'recorded'}!
    </div>
  {/if}
</section>

<style>
  section {
    margin: 2em auto;
    padding: 2em;
    background: #2223;
    border-radius: 1em;
  }
  .top-inputs {
    display: flex;
    gap: 2em;
    margin-bottom: 2em;
  }
  .input-group {
    display: flex;
    flex-direction: column;
    min-width: 50px;
  }
  .item-entry {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #ccc;
    margin-bottom: 1em;
    padding-bottom: 1em;
    width: 100%;
  }
  .item-row {
    display: flex;
    gap: 2em;
    width: 100%;
    align-items: center;
  }
  .button-row {
    display: flex;
    gap: 1em;
    justify-content: center;
    margin-top: 1em;
  }
  label {
    margin-bottom: 0.3em;
    font-weight: bold;
  }
  input {
    padding: 0.5em;
    font-size: 1em;
  }

  #btn-remove{
    margin: 0;
  }
  #btn-remove:disabled {
    background-color: silver;
    color: darkgrey;
    cursor: not-allowed;
  }
  #btn-remove:hover:not(:disabled) {
    box-shadow: 0 0 8px rgba(255, 0, 0, 0.7);
  }
</style>