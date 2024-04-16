import './style.css'

document.querySelector('#app').innerHTML = `
<div id="hubbox-widget"></div>
`

import SingleWidgetManager from '@hubbox/single-widget-manager'

const singleWidgetManager = new SingleWidgetManager({
  container: document.getElementById("hubbox-widget"),
  iframeUrl: "https://sandbox.frame.hub-box.com",
  iframeParams: {
    configId: "macys",
  }
});

singleWidgetManager.events.subscribe(singleWidgetManager.topics.subscribe.COLLECT_POINT_CONFIRMED, (messageAndTopic) => console.log("I subscribed to topic:" + messageAndTopic.topic, messageAndTopic.message));
