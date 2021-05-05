<script>
  import store from '../store';
  let confirmCode = '';
  const confirmAction = () => {
    store.confirm(confirmCode);
  };
</script>

<h2>Confirm</h2>
<label>
  <div>6 digit Confirmation:</div>
  <input type="text" bind:value={confirmCode} placeholder="e.g. 123456" />
</label>
<button on:click={confirmAction}>Confirm</button>
