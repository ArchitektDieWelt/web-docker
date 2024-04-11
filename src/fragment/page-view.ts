const css = () => `<style>
  .test-fragment-on-page {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  }
</style>`;

const htmlPage = () =>
  `<div class="test-fragment-on-page">page fragment exists</div>`;

export { htmlPage, css };
