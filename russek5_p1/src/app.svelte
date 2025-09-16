<script>
  import Welcome from './lib/Welcome.svelte';
  import Receipt from './lib/Receipt.svelte';
  //import SingleCostEntry from './lib/SingleCostEntry.svelte';
  let mode = 'receipt'; // or 'single'
</script>

<Welcome />

{#if mode === 'receipt'}
  <Receipt />
{/if}
