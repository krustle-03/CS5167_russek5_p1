<script>
  import { currentPage } from './stores.js';
  import { onMount } from 'svelte';

  let headerElement;

  function goHome() {
    currentPage.set(0);
  }

  function updateHeaderHeight() {
    if (headerElement) {
      const height = headerElement.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${height}px`);
    }
  }

  onMount(() => {
    updateHeaderHeight();
    
    // Update height on window resize
    const handleResize = () => updateHeaderHeight();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  });

</script>

<header class="header" bind:this={headerElement}>
  <div class="header-content">
    <button class="accent-button home-button" on:click={goHome}>
      <img src="/home.svg" alt="Home" class="home-icon" />
    </button>
    <div >
      DEBUG INFO:
      [Current Page: {$currentPage}]
    </div>
  </div>
</header>

<style>
  .header {
    color: #729295;
    position: fixed;
    border-radius: 15px;
    inset: 1em 1em auto 1em; /* top right bottom left */
    background-color: #e8d9ca;
    z-index: 1000;
    box-sizing: border-box;
  }

  .header-content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .home-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    min-width: 1.5em;
    min-height: 1.5em;
  }

  .home-icon {
    width: 1.5em;
    height: 1.5em;
    filter: brightness(0) invert(1); /* Makes SVG white if it's black */
  }

</style>