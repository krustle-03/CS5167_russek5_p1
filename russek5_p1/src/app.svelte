<script>
  import Header from './lib/Header.svelte';
  import Welcome from './lib/Welcome.svelte';
  import Expense from './lib/expense.svelte';
  import { currentPage } from './lib/stores.js';
  
  // Use the store instead of a local variable
  let expenses = []
</script>

<Header />
  
<!-- This is gonna be the fake routing section -->
{#if $currentPage == 0}
  <Welcome />
  <!--Buttons for fake routing: Input cost and Track Expenses-->
  <div class="centered-items">
    <button class="primary-button" on:click={() => currentPage.set(1)}>Enter Expense</button>
    <button class="primary-button" on:click={() => currentPage.set(0)}>Track Expenses</button>
  </div>

{:else if $currentPage == 1}
  <Expense {expenses}/>
{/if}




<style>

</style>