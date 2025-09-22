<script>
    import Receipt from './Receipt.svelte';
    import SingleCost from './SingleCost.svelte';
    import SingleCostEntry from './SingleCost.svelte';
    import { currentPage } from './stores.js';

    let mode = 1 // Default to no mode selected
</script>


<br />


{#if mode == 1}
  <Receipt />

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