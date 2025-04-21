console.log("Script is executing");

const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    const addedNodes = Array.from(mutation.addedNodes);
    const hasComposeElements = addedNodes.some((node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) return false;
      return (
        node.matches?.('.aDh,.btC,[role="dialog"]') ||
        node.querySelector?.('.aDh,.btC,[role="dialog"]')
      );
    });

    if (hasComposeElements) {
      console.log("Compose Window Detected");
      setTimeout(injectButton, 1500);
    }
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

function getEmailContent() {
  const selectors = [
    ".h7",
    ".a3s.aiL",
    '[role="presentation"]',
    ".gmail_quote",
  ];
  for (const selector of selectors) {
    const content = document.querySelector(selector);
    if (content) return content.innerText.trim();
  }
  return "";
}

function injectButton() {
  console.log("injectButton called");

  const existingButton = document.querySelector(".ai-reply-button");
  if (existingButton) {
    console.log("Existing AI button found, removing...");
    existingButton.remove();
  }

  const toolbar = findComposeToolBar();
  if (!toolbar) {
    console.log("Toolbar not found, retrying in 1000ms...");
    setTimeout(injectButton, 500);
    return;
  }

  console.log("Toolbar found:", toolbar);

  const button = createAIbutton();
  button.classList.add("ai-reply-button");

  button.addEventListener("click", async () => {
    button.innerHTML = "Generating...";
    button.disabled = true;

    try {
      const emailContent = getEmailContent();
      console.log("Collected Email Content:", emailContent);

      const res = await fetch("http://localhost:8080/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailContent: emailContent,
          tone: "professional",
        }),
      });

      if (!res.ok) {
        throw new Error("API request failed");
      }

      const genEmail = await res.text();
      console.log("Generated Email from AI:", genEmail);

      const composeBox = document.querySelector(
        '[role="textbox"][g_editable="true"]'
      );

      if (composeBox) {
        composeBox.focus();
        document.execCommand("insertText", false, genEmail);
      } else {
        console.error("Compose Box not found");
      }
    } catch (err) {
      console.error("Error in fetch:", err);
    } finally {
      button.innerHTML = "AI Reply";
      button.disabled = false;
    }
  });

  toolbar.insertBefore(button, toolbar.firstChild);
  console.log("AI button inserted");
}

function findComposeToolBar() {
  const selectors = [
    ".btC",
    ".aDh",
    ".btC .J-J5-Ji",
    ".aDh .J-J5-Ji",
    '[role="toolbar"]',
    '[aria-label="Toolbar"]',
  ];

  for (const selector of selectors) {
    const toolbars = document.querySelectorAll(selector);
    for (const toolbar of toolbars) {
      if (toolbar.offsetParent !== null) {
        console.log("Trying toolbar selector:", selector);
        return toolbar;
      }
    }
  }

  console.log("No visible toolbar found.");
  return null;
}

function createAIbutton() {
  const button = document.createElement("div");
  button.className = "T-I J-J5-Ji aoO v7 T-I-atl L3 ai-reply-button";
  button.style.marginRight = "8px";
  button.style.backgroundColor = "#0B57D0";
  button.innerText = "AI Reply";
  button.setAttribute("role", "button");
  button.setAttribute("data-tooltip", "Generate AI Reply");
  return button;
}
