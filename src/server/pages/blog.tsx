export default () => (
  <div>
    blog
    <a href="/fragments/foo" target="#">
      load foo
    </a>
    <a href="/fragments/bar" target="#fragment">
      load bar
    </a>
    <div id="fragment"></div>
  </div>
);
