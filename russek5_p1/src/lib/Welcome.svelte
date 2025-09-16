<script>
  import { onMount } from "svelte";

  // Mock user info. User will eventually be grabbed from a login.
  let user = {
    name: "Kyle Russell",
    startDate: new Date("2025-09-15"), // pretend user started Jan 1, 2025 (just for now)
    activeDays: 1, // just a placeholder, actual value would come from the user simply logging on.
  };

  // Reactive values
  let now = new Date();
  let daysSinceStart = 0;

  // Create timer to update the time every second.
  let timer;
  onMount(() => {
    updateTime();
    timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  });

  function updateTime() {
    now = new Date();
    const diff = now.getTime() - user.startDate.getTime();
    daysSinceStart = Math.floor(diff / (1000 * 60 * 60 * 24));
  }

</script>

<section>

  <h1>Welcome back, {user.name}!</h1>
  <p>You've been with us since {user.startDate.toLocaleDateString()}, and have been active for {user.activeDays} day(s).</p>
  <p>Current date and time: {now.toLocaleString()}</p>

</section>

<style>

  section {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }

  h1 {
    font-size: 3.2em;
    line-height: .5em;
  }

</style>