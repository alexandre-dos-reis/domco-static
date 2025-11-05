declare global {
  interface Window {
    mergeHead: (text: string) => void;
  }
}

// INFO: Taken from https://github.com/bigskysoftware/htmx-extensions/blob/main/src/head-support/head-support.js
window.mergeHead = (
  newContent: string,
  defaultMergeStrategy: "merge" | "append" = "merge",
) => {
  if (newContent && newContent.indexOf("<head") > -1) {
    const htmlDoc = document.createElement("html");
    // remove svgs to avoid conflicts
    var contentWithSvgsRemoved = newContent.replace(
      /<svg(\s[^>]*>|>)([\s\S]*?)<\/svg>/gim,
      "",
    );
    // extract head tag
    var headTag = contentWithSvgsRemoved.match(
      /(<head(\s[^>]*>|>)([\s\S]*?)<\/head>)/im,
    );

    // if the  head tag exists...
    if (headTag) {
      var added = [];
      var removed = [];
      var preserved = [];
      var nodesToAppend = [];

      htmlDoc.innerHTML = headTag.toString();
      var newHeadTag = htmlDoc.querySelector("head");
      var currentHead = document.head;

      if (newHeadTag == null) {
        return;
      } else {
        // put all new head elements into a Map, by their outerHTML
        var srcToNewHeadNodes = new Map();
        for (const newHeadChild of newHeadTag.children) {
          srcToNewHeadNodes.set(newHeadChild.outerHTML, newHeadChild);
        }
      }

      // determine merge strategy
      var mergeStrategy = defaultMergeStrategy;

      // get the current head
      for (const currentHeadElt of currentHead.children) {
        // If the current head element is in the map
        var inNewContent = srcToNewHeadNodes.has(currentHeadElt.outerHTML);
        var isReAppended = currentHeadElt.getAttribute("hx-head") === "re-eval";
        if (inNewContent) {
          if (isReAppended) {
            // remove the current version and let the new version replace it and re-execute
            removed.push(currentHeadElt);
          } else {
            // this element already exists and should not be re-appended, so remove it from
            // the new content map, preserving it in the DOM
            srcToNewHeadNodes.delete(currentHeadElt.outerHTML);
            preserved.push(currentHeadElt);
          }
        } else {
          if (mergeStrategy === "append") {
            // we are appending and this existing element is not new content
            // so if and only if it is marked for re-append do we do anything
            if (isReAppended) {
              removed.push(currentHeadElt);
              nodesToAppend.push(currentHeadElt);
            }
          } else {
            // if this is a merge, we remove this content since it is not in the new head
            removed.push(currentHeadElt);
          }
        }
      }

      // Push the tremaining new head elements in the Map into the
      // nodes to append to the head tag
      nodesToAppend.push(...srcToNewHeadNodes.values());

      for (const newNode of nodesToAppend) {
        var newElt = document
          .createRange()
          .createContextualFragment(newNode.outerHTML);

        currentHead.appendChild(newElt);
        added.push(newElt);
      }

      // remove all removed elements, after we have appended the new elements to avoid
      // additional network requests for things like style sheets
      for (const removedElement of removed) {
        currentHead.removeChild(removedElement);
      }
    }
  }
};
