export default function launcher() {
  return `
<div class="launcher">
  <div class="header">
    <p class="title">Launcher</p>
    <p class="desc">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam facilisis et dui ut cursus. Cras dictum convallis ante, non mollis lacus mollis ut. Suspendisse vitae gravida leo. Etiam eget varius est. Nulla rhoncus urna at arcu venenatis cursus sed in eros. Fusce ut ex neque. Donec porttitor, ex vel blandit accumsan, metus lectus venenatis nibh, ac tristique leo purus quis massa.
    </p>
  </div>
  <div id="launch-configuration" class="configuration">
    <div class="frameworks">
      <label>Frameworks</label>
      <select id="launch-frameworks" name="" class="react input">
        <option value="react">React</option>
      </select>
    </div>
    <div class="options">
      <p>Options</p>
      <textarea id="launch-options">
{
  foo: 1,
  bar: 'baz',
}
      </textarea>
    </div>
    <div class="buttonGroup">
      <button id="launch-button">launch</button>
    </div>
  </div>
</div>
<script>
  const elem = document.getElementById('launch-button');
  elem.addEventListener('click', (e) => {
    const frameworks = document.getElementById('launch-frameworks');
    const options = document.getElementById('launch-options');

    const frameworkVal = frameworks.options[frameworks.selectedIndex].value;
    const launchOptionVal = eval('(' + options.value + ')');
    let launchOption;
    try {
      launchOption = JSON.stringify(launchOptionVal);
    } catch (err) {
      console.error('Error parsing launchOption, %s', launchOptionVal);
    }

    window.location.href = '/frameworks/' + frameworkVal + '?launchOptions=' + launchOption;
  });
</script>
`;
}
