<script>
  
</script>

<div id="example" class="multi-border" />

<style lang="scss">
  #example {
    width: 350px;
    height: 350px;
    --stripe-count: 13;
    --stripe-color: #000 #fff;
    --stripe-radius: 300;
  }

  .multi-border {
    background-color: cyan;
    background-image: paint(circle-stripe);
  }
</style>
