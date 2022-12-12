const insert = (content) => {
  const elements = document.getElementsByClassName("droid");

  if (elements.length === 0) {
    return;
  }

  const element = elements[0];

  // Grab the first p tag so we can replace it with our injection
  // const pToRemove = element.childNodes[0];
  // pToRemove.remove();

  const splitContent = content.split("\n");

  splitContent.forEach((content) => {
    const p = document.createElement("p");

    if (content === "") {
      const br = document.createElement("br");
      p.appendChild(br);
    } else {
      p.textContent = content;
    }

    // Insert into HTML one at a time
    element.appendChild(p);
  });

  return splitContent;
};

chrome.runtime.onMessage.addListener(
  // This is the message listener
  (request, sender, sendResponse) => {
    if (request.message === "inject") {
      const { content } = request;

      // Call this insert function
      const result = insert(content);

      console.log(result)

      // If something went wrong, send a failed status
      if (!result) {
        sendResponse({ status: "failed" });
      }

      sendResponse({ status: "success" });
    }
  }
);
