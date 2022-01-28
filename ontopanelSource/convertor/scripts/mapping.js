import mappingHtml from "../html/mapping.html";
export const makeMappingWindow = () => {
  let mappingWindow = document.createElement("div");
  mappingWindow.innerHTML = mappingHtml;

  return mappingWindow;
};
