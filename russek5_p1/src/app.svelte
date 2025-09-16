<script>
  import Welcome from './lib/Welcome.svelte';
  import Receipt from './lib/Receipt.svelte';
  //import SingleCostEntry from './lib/SingleCostEntry.svelte';
  let mode = 'receipt'; // or 'single'
</script>

<Welcome />
<div class="mode-select-container">
  <div class="mode-select">
    <label for="mode-select-dropdown">Select Mode:</label>
    <select id="mode-select-dropdown" bind:value={mode}>
      <option value="receipt">Receipt Mode</option>
      <option value="single">Single Cost Entry</option>
      <!-- Add more modes here as needed -->
    </select>
  </div>
</div>


{#if mode === 'receipt'}
  <Receipt />
{/if}


<style>

  .mode-select-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

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
