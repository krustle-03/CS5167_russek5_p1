<script>
  let storeName = "";
  let taxRate = "";
  let items = [
    { name: "", cost: "", category: "" }
  ];

  function addItem() {
    items = [...items, { name: "", cost: "", category: "" }];
  }
</script>

<section>
  <h2>Receipt Entry</h2>
  <div>
    <label>
      Store Name:
      <input type="text" bind:value={storeName} placeholder="Store Name" />
    </label>
    <label>
      Tax Rate (%):
      <input type="number" bind:value={taxRate} min="0" step="0.01" placeholder="Tax Rate" />
    </label>
  </div>

  <h3>Items</h3>
  {#each items as item, i}
    <div class="item-entry">
      <label>
        Name:
        <input type="text" bind:value={item.name} placeholder="Item Name" />
      </label>
      <label>
        Cost:
        <input type="number" bind:value={item.cost} min="0" step="0.01" placeholder="Cost" />
      </label>
      <label>
        Category:
        <input type="text" bind:value={item.category} placeholder="Category" />
      </label>
    </div>
  {/each}

  <button on:click={addItem}>Add Item</button>
</section>

<style>
  section {
    max-width: 600px;
    margin: 2em auto;
    padding: 2em;
    background: #2223;
    border-radius: 1em;
  }
  label {
    display: block;
    margin-bottom: 1em;
  }
  .item-entry {
    border-bottom: 1px solid #ccc;
    margin-bottom: 1em;
    padding-bottom: 1em;
  }
</style>