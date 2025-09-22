<script>
  import { currentPage, expenses } from './stores.js';
  import Receipt from './Receipt.svelte';
  
  let expandedEntry = null; // Track which entry is expanded
  let editingEntry = null; // Track which entry is being edited

  function toggleEntry(index) {
    expandedEntry = expandedEntry === index ? null : index;
  }

  function startEdit(index) {
    editingEntry = index;
  }

  function stopEdit() {
    editingEntry = null;
  }

  function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Safe calculation functions
  function calculateItemTotal(item) {
    const cost = typeof item.cost === 'number' ? item.cost : parseFloat(item.cost) || 0;
    const quantity = typeof item.quantity === 'number' ? item.quantity : parseInt(item.quantity) || 1;
    return cost * quantity;
  }

  function formatCurrency(value) {
    const num = typeof value === 'number' ? value : parseFloat(value) || 0;
    return num.toFixed(2);
  }

  // Add keyboard event handler for accessibility
  function handleKeydown(event, index) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleEntry(index);
    }
  }
</script>

<section>
  <h3>Expenses ({$expenses.length})</h3>
  
  {#if editingEntry !== null}
    <!-- Show edit form when editing -->
    <div class="edit-container">
      <Receipt editMode={true} editIndex={editingEntry} onEditComplete={stopEdit} />
    </div>
  {:else}
    <!-- Show expense list when not editing -->
    {#each $expenses as expense, index}
      <div class="expense-item">
        <!-- Clickable summary -->
        <div 
          class="expense-summary" 
          role="button"
          tabindex="0"
          aria-expanded={expandedEntry === index}
          aria-label="Toggle receipt details for {expense.storeName || 'Unknown Store'}, ${formatCurrency(expense.total)}"
          on:click={() => toggleEntry(index)}
          on:keydown={(event) => handleKeydown(event, index)}
        >
          <div class="expense-info">
            <span class="store-name">{expense.storeName || 'Unknown Store'}</span>
            <span class="expense-date">{formatDate(expense.timestamp || Date.now())}</span>
          </div>
          <div class="expense-total">${formatCurrency(expense.total)}</div>
          <div class="expand-arrow" class:expanded={expandedEntry === index}>▼</div>
        </div>

        <!-- Expands into a receipt! -->
        {#if expandedEntry === index}
          <div class="receipt-container" role="region" aria-label="Receipt details">
            <div class="receipt">
              <div class="receipt-header">
                <h4>{expense.storeName || 'RECEIPT'}</h4>
                <div class="receipt-date">{formatDate(expense.timestamp || Date.now())}</div>
              </div>
              
              <div class="receipt-divider">═══════════════════════════</div>
              
              <div class="receipt-items">
                {#each expense.items || [] as item}
                  <div class="receipt-item">
                    <div class="item-line">
                      <span class="item-name">{item.name || 'Unknown Item'}</span>
                      <span class="item-price">${formatCurrency(calculateItemTotal(item))}</span>
                    </div>
                    <div class="item-details">
                      {item.quantity || 1} × ${formatCurrency(item.cost)}
                    </div>
                  </div>
                {/each}
              </div>
              
              <div class="receipt-divider">═══════════════════════════</div>
              
              <div class="receipt-totals">
                <div class="total-line">
                  <span>SUBTOTAL:</span>
                  <span>${formatCurrency(expense.subtotal)}</span>
                </div>
                <div class="total-line">
                  <span>TAX ({expense.taxRate || 0}%):</span>
                  <span>${formatCurrency((expense.total || 0) - (expense.subtotal || 0))}</span>
                </div>
                <div class="total-line final-total">
                  <span>TOTAL:</span>
                  <span>${formatCurrency(expense.total)}</span>
                </div>
              </div>
            </div>
            
            <!-- Edit button -->
            <div class="edit-actions">
              <button class="primary-button" on:click={() => startEdit(index)}>
                Edit Receipt
              </button>
            </div>
          </div>
        {/if}
      </div>
    {/each}
    
    {#if $expenses.length === 0}
      <div class="no-expenses">
        <p>No expenses recorded yet.</p>
      </div>
    {/if}
  {/if}
</section>

<style>
  section {
    margin-top: var(--header-height);
    padding: 2rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .edit-container {
    margin-bottom: 2rem;
  }

  .expense-item {
    margin-bottom: 1rem;
    border: 1px solid #444;
    border-radius: 8px;
    overflow: hidden;
    background: #2a2a2a;
  }

  .expense-summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
    user-select: none;
  }

  .expense-summary:hover {
    background-color: #333;
  }

  .expense-summary:focus {
    outline: 2px solid #4CAF50;
    outline-offset: 2px;
  }

  .expense-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .store-name {
    font-weight: bold;
    font-size: 1.1rem;
    color: #fff;
    padding-right: 0.9rem;
  }

  .expense-date {
    font-size: 0.9rem;
    color: #aaa;
  }

  .expense-total {
    font-size: 1.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-right: 0.5rem;
    font-weight: bold;
    color: #4CAF50;
    text-align: right;
    min-width: 80px;
  }

  .expand-arrow {
    transition: transform 0.35s ease-in-out;
    color: #888;
    font-size: 1rem;
    text-align: center;
    flex-shrink: 0;
  }
  .expand-arrow.expanded {
    transform: rotate(180deg);
  }

  .receipt-container {
    border-top: 1px solid #444;
    padding: 1rem;
    background: #1a1a1a;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .receipt {
    font-family: 'Courier New', monospace;
    background: white;
    color: black;
    padding: 1.5rem;
    border-radius: 4px;
    width: 250px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  }
  .receipt-header {
    text-align: center;
    margin-bottom: 1rem;
  }
  .receipt-header h4 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
  }

  .receipt-date {
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }

  .receipt-divider {
    text-align: center;
    margin: 0.8rem 0;
    font-size: 0.8rem;
  }

  .receipt-items {
    margin: 1rem 0;
  }

  .receipt-item {
    margin-bottom: 0.8rem;
  }

  .item-line {
    display: flex;
    justify-content: space-between;
    font-weight: bold;
  }

  .item-name {
    flex: 1;
    padding-right: 1rem;
  }

  .item-price {
    font-weight: bold;
  }

  .item-details {
    font-size: 0.85rem;
    color: #666;
    margin-top: 0.2rem;
    margin-left: 1rem;
  }

  .receipt-totals {
    margin: 1rem 0;
  }

  .total-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3rem;
    font-size: 0.9rem;
  }

  .final-total {
    font-weight: bold;
    font-size: 1rem;
    border-top: 1px solid #000;
    padding-top: 0.3rem;
    margin-top: 0.5rem;
  }

  .edit-actions {
    display: flex;
    gap: 1rem;
  }

  .no-expenses {
    text-align: center;
    padding: 2rem;
    color: #888;
  }

  @media (max-width: 768px) {
    .expense-summary {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .receipt {
      width: 100%;
      max-width: 350px;
      padding: 1rem;
      font-size: 0.9rem;
    }
  }
</style>