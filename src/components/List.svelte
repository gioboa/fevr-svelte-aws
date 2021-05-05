<script>
  import Item from './item/Item.svelte';
  import AddItem from './item/AddItem.svelte';
  import store from '../store';
</script>

<h2>My List</h2>
<AddItem />
<div class="list">
  {#each $store.items as item}
    <Item {item} />
  {/each}
</div>

<style>
  .list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
  }
</style>
