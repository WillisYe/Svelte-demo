<script>
  
</script>

<div class="flex items-center">
  <div class="example multi-border" />
  <div class="example multi-border-1" />
</div>


<style lang="scss">
  .example {
    width: 350px;
    height: 350px;
    --stripe-count: 5;
    --stripe-color: #000 #fff;
    --stripe-radius: 300;
  }

  .multi-border {
    background-color: cyan;
    background-image: paint(circle-stripe);
  }

  .multi-border-1 {
    background-color: cyan;
    background-image: paint(circle-stripe-1);
  }
</style>
