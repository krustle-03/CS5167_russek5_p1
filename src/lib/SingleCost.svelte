<script>
  import { expenses } from './stores.js';

  export let editMode = false;
  export let editIndex = -1;
  export let onEditComplete = null;

  let expenseName = "";
  let amount = "";
  let category = "";

</script>


<section>
<h2>{editMode ? 'Edit Expense' : 'Single Expense Entry'}</h2>
  <div class="top-inputs">
    <div class="input-group">
      <label for="expense-name">Expense Name:</label>
      <input id="expense-name" type="text" bind:value={expenseName} placeholder="e.g., Lunch, Taxi" />
    </div>
    <div class="input-group">
      <label for="expense-amount">Amount ($):</label>
      <input id="expense-amount" type="number" min="0" step="0.01" bind:value={amount} placeholder="0.00" />
    </div>
    <div class="input-group">
      <label for="expense-category">Category:</label>
      <input id="expense-category" type="text" bind:value={category} placeholder="e.g., Food, Travel" />
    </div>
  </div>  

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

</style>