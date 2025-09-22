<script>
  import { currentPage, expenses } from './stores.js';
</script>

<section>
  <h3> Expenses </h3>
  {#each $expenses as expense, index}
    <div class="expense-entry">
      <p><strong>Store:</strong> {expense.storeName}</p>
      <p><strong>Tax Rate:</strong> {expense.taxRate}%</p>
      <p><strong>Items:</strong></p>
      <ul>
        {#each expense.items as item}
            <li>{item.quantity} x {item.name} @ ${item.cost.toFixed(2)} each</li>
        {/each}
      </ul>
      <p><strong>Subtotal:</strong> ${expense.subtotal.toFixed(2)}</p>
      <p><strong>Total:</strong> ${expense.total.toFixed(2)}</p>
    </div>
  {/each}
  {#if $expenses.length === 0}
    <p>No expenses recorded yet.</p>
  {/if}
</section>

<style>
  section {
    margin-top: var(--header-height); /* Adjust based on your header height */
    display: flex;
    flex-direction: column;
    place-items: center;
    min-width: 320px;
    min-height: calc(100vh - var(--header-height)); /* Subtract header height from viewport height */
  }
</style>