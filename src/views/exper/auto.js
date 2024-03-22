setInterval(() => {
  ["input", "#question-submit"].forEach(v => {
    const doms = document.querySelectorAll(v);
    doms.forEach(dom => {
      dom.click();
    });
  });
  document.body.dispatchEvent(new KeyboardEvent("keyup", {code: "Space"}));
}, 100);