import handlebars from "handlebars";
import documents from "../views/documents";
import section from "../views/section";
import blocks from "../views/blocks";

function render(layoutBlocks, documentId, isExport = false, name = "Exported Page") {
  const innerHTML = layoutBlocks.reduce((acc, layoutBlock) => {
    const blockConfig = blocks[layoutBlock.blockId];

    if (!blockConfig || !blockConfig.hbs) {
      console.error(`Block with id "${layoutBlock.blockId}" not found or is missing hbs template. Skipping.`);
      return acc;
    }

    const blockHbs = blockConfig.hbs;
    const blockTemplate = handlebars.compile(blockHbs);
    const blockHTML = blockTemplate(layoutBlock.data);

    const sectionTemplate = handlebars.compile(section);
    const sectionHTML = sectionTemplate({
      content: blockHTML,
      uuid: layoutBlock.uuid
    });

    return `${acc}${sectionHTML}`;
  }, ``);

  const documentConfig = documents[documentId];
  if (!documentConfig || !documentConfig.hbs) {
    console.error(`Document with id "${documentId}" not found or is missing hbs template.`);
    return 'Error: Document template not found.';
  }

  return handlebars.compile(documentConfig.hbs)({
    content: innerHTML,
    is_export: isExport,
    title: isExport ? name : undefined
  });
}

export default render;
