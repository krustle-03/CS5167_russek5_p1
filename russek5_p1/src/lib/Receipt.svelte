<script>
  let storeName = "";
  let taxRate = "";
  // Make array with first item empty
  let items = [
    { name: "", 
    cost: "", 
    quantity:"1", 
    category: "" }
  ];

  let submitted = false;

  function addItem() {
    items = [...items, { name: "", cost: "", quantity:"1", category: "" }];
  }

  function removeItem(index) {
    items = items.filter((_, i) => i !== index);
  }

  function getSubtotal() {
    return items.reduce((sum, item) => {
      const cost = parseFloat(item.cost) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return sum + cost * quantity;
    }, 0);
  }

  function getTotal() {
    const subtotal = getSubtotal();
    const tax = (parseFloat(taxRate) || 0) / 100;
    return subtotal * (1 + tax);
  }

  function submitReceipt() {
    let subtotal = getSubtotal();
    if (subtotal === 0) {
      alert("Receipt has zero valid items.")
    }  
    else {
      submitted = true;
      setTimeout(() => submitted = false, 2000); // Hide feedback after 2 seconds
    }
  }
</script>

<section>
  <h2>Receipt Entry</h2>
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
          <button id="btn-remove" type="button" on:click={() => removeItem(i)} title="Remove item">✖</button>
          
        </div>
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
      </div>
    </div>
  {/each}

  <button on:click={addItem}>Add Item</button>

  <div style="margin-top:2em;">
    <strong>Subtotal:</strong> ${getSubtotal().toFixed(2)}<br>
    <strong>Total (with tax):</strong> ${getTotal().toFixed(2)}
  </div>

  <button style="margin-top:1em;" on:click={submitReceipt}>Submit Receipt</button>
  {#if submitted}
    <div style="color:green; margin-top:1em;">Receipt for ${getTotal().toFixed(2)} recorded!</div>
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
  label {
    margin-bottom: 0.3em;
    font-weight: bold;
  }
  input {
    padding: 0.5em;
    font-size: 1em;
  }

  #btn-remove {
    cursor: pointer;
    max-width: 2em;
    padding: .5em;
    border: none;
    color: #c00;
    font-size: 2em;
    line-height: 1;

  }
  #btn-remove:hover {
    color: #f00;
    background: #eee;
    transition: 0.2s;
  }
</style>