const hbsToJsx = (hbsString, dataKeys) => {
  let tempJsxString = hbsString;

  // 1. Handle {{#if condition}} ... {{else}} ... {{/if}}
  tempJsxString = tempJsxString.replace(/\{\{#if\s+([a-zA-Z0-9_]+)\}\}(.*?)\{\{else\}\}(.*?)\{\{\/if\}\}/gs, (match, condition, ifContent, elseContent) => {
    // Process content within if/else blocks using the same conversion logic
    const processedIfContent = hbsToJsx(ifContent.trim(), dataKeys); // Recursive call
    const processedElseContent = hbsToJsx(elseContent.trim(), dataKeys); // Recursive call
    return `{${condition} ? (${processedIfContent}) : (${processedElseContent})}`;
  });

  // 2. Handle {{#if condition}} ... {{/if}}
  tempJsxString = tempJsxString.replace(/\{\{#if\s+([a-zA-Z0-9_]+)\}\}(.*?)\{\{\/if\}\}/gs, (match, condition, content) => {
    // Process content within if block using the same conversion logic
    const processedContent = hbsToJsx(content.trim(), dataKeys); // Recursive call
    return `{${condition} && (${processedContent})}`;
  });

  // 3. Replace Handlebars variables with JSX expressions
  dataKeys.forEach(key => {
    const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, 'g');
    tempJsxString = tempJsxString.replace(regex, `{${key}}`);
  });

  // 4. Replace class with className
  tempJsxString = tempJsxString.replace(/\bclass=/g, 'className=');

  // 5. Handle self-closing tags for input and other void elements
  tempJsxString = tempJsxString.replace(/<(input|img|br|hr|meta|link|area|base|col|embed|source|track|wbr)([^>]*?)(?<!\/)\s*>/gi, '<$1$2 />');

  return tempJsxString;
};

export default hbsToJsx;