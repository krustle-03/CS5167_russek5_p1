<script>
  import Header from './lib/Header.svelte';
  import Welcome from './lib/Welcome.svelte';
  import Expense from './lib/expense.svelte';
  import Tracking from './lib/tracking.svelte';
  import { currentPage } from './lib/stores.js';
</script>

<Header />
  
<!-- This is gonna be the fake routing section -->
{#if $currentPage == 0}
  <Welcome />
  <!--Buttons for fake routing: Input cost and Track Expenses-->
  <div class="centered-items">
    <button class="primary-button" on:click={() => currentPage.set(1)}>Enter Expense</button>
    <button class="primary-button" on:click={() => currentPage.set(2)}>Track Expenses</button>
  </div>

{:else if $currentPage == 1}
  <Expense />
{:else if $currentPage == 2}
  <Tracking />
{/if}




<style>

</style>