<script>
  let storeName = "";
  let taxRate = "";
  let items = [
    { name: "", 
    cost: "", 
    quantity:"", 
    category: "" }
  ];

  function addItem() {
    items = [...items, { name: "", cost: "", quantity:"", category: "" }];
  }

  function removeItem(index) {
    items = items.filter((_, i) => i !== index);
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

  <h3>Items</h3>
  {#each items as item, i}
    <div class="item-entry">
      <div class="item-row">
        <button class="remove-btn" type="button" on:click={() => removeItem(i)} title="Remove item">✖</button>
        <div class="input-group">
          <label for="item_name">Name:</label>
          <input id="item_name" type="text" bind:value={item.name} placeholder="Item Name" />
        </div>
        <div class="input-group">
          <label for="item_cost">Base Cost:</label>
          <input id="item_cost" type="number" bind:value={item.cost} min="0" step="0.01"/>
        </div>
        <div class="input-group">
          <label for="item_quantity">Quantity:</label>
          <input id="item_quantity" type="number" bind:value={item.quantity} min="0" step="1" />
        </div>
        <div class="input-group">
          <label for="item_category">Category:</label>
          <input id="item_category" type="text" bind:value={item.category} placeholder="Category" />
        </div>
      </div>
    </div>
  {/each}

  <button on:click={addItem}>Add Item</button>
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
    min-width: 100px;
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

  .remove-btn {
    max-width: 1.5em;
    border: none;
    color: #c00;
    font-size: 1.5em;
    cursor: pointer;
    line-height: 1;
  }
  .remove-btn:hover {
    color: #f00;
    background: #eee;
    transition: 0.2s;
  }
</style>