<script>
    import Receipt from './Receipt.svelte';
    import SingleCost from './SingleCost.svelte';
    import SingleCostEntry from './SingleCost.svelte';
    import { currentPage } from './stores.js';

    let mode = -1 // Default to no mode selected
</script>


<br />

<div class="centered-items">
  <div class="mode-select">
    <label for="mode-select-dropdown">Select Mode:</label>
    <select id="mode-select-dropdown" bind:value={mode}>
      <option value="1">Receipt Mode</option>
      <option value="2">Single Cost Entry</option>
      <!-- Add more modes here as needed -->
    </select>
  </div>
</div>

{#if mode == 1}
  <Receipt />
{:else if mode == 2}
  <!-- <SingleCostEntry /> -->
  <p>Single Cost Entry mode is under construction.</p>
  <SingleCost />

{:else}
  <h1>Please select a mode using the dropdown above to begin.</h1>
{/if}

<style>
    .mode-select{
    max-width: 200px;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  #mode-select-dropdown {
    font-size: 1em;
    padding: 0.3em;
  }

</style>