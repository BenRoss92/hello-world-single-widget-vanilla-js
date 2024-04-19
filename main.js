import './style.css'

document.querySelector('#app').innerHTML = `
<div id="hubbox-widget"></div>
<button id="ho-ho-ho" type="button">Send Ho Ho Ho!</button>
`

import SingleWidgetManager from '@hubbox/single-widget-manager'

const singleWidgetManager = new SingleWidgetManager({
  container: document.getElementById("hubbox-widget"),
  // Points to Frame back-end (sandbox version):
  // iframeUrl: "https://sandbox.frame.hub-box.com",
  // Points to locally running single-widget-react app:
  iframeUrl: "http://localhost:20001/",
  // Enable debugging so that we can see errors getting logged to the Chrome dev tools console. We need this option to see the error that was being thrown when the healthCheck option was enabled by default.
  isDebug: true,
  // We disable the health check. Is enabled by default. When enabled, it will hit an endpoint to check if the Frame back-end is running, and if so, return JSON in the response to tell us whether the back-end service is up or down (running or not). Vite by default expects to be given an HTML document as a response, not JSON as a response, so will produce an error (as shown in the Chrome dev tools console when healthCheck option is enabled). Disabling this option stops this error from happening. If the error happens, we won't see events being logged to the console.
  // To enable and fix the health check, I have added a fake endpoint named 'health' in the public folder of the locally running single-widget-react repo, which contains the expected JSON data that we get from https://sandbox.frame.hub-box.com/health. File is called: public/health (no file extension)
  // healthCheck: false,
  // This is needed when pointing to Frame (e.g. the sandbox version of Frame URL), but not when pointing to the single-widget-react app (we hardcode the config into the react app's index.html page instead of asking Frame to give us an HTML doc with config data included in the script tag). So we can comment this out when running against a locally running version of the single-widget-react app.
  // iframeParams: {
  //   configId: "macys",
  // }
});


// Subscribe to the TOGGLE_COOL_NEW_FEATURE event topic and log events received under this topic:
singleWidgetManager.events.subscribe(singleWidgetManager.topics.subscribe.TOGGLE_COOL_NEW_FEATURE, (messageAndTopic) => console.log("I subscribed to topic:" + messageAndTopic.topic, messageAndTopic.message));

const hoHoHoButton = document.querySelector("#ho-ho-ho");

hoHoHoButton.addEventListener('click', () => {
  singleWidgetManager.events.emit(singleWidgetManager.topics.emit.SEND_HO_HO_HO, "HO HO HO!");
});
