export default function react({
  appInString,
  nadanEnvElement,
  reactAssetElements,
  reduxStateElement,
  xongkoroStateElement,
}) {
  return `
${xongkoroStateElement}
${reduxStateElement}
${nadanEnvElement}
<div id="react-root">${appInString}</div>
${reactAssetElements}
`;
}
