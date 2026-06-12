const markdownFiles = import.meta.glob('./blogs/*.md', { 
  query: '?raw', 
  import: 'default', 
  eager: true 
});

export const BLOGS_LIST = Object.keys(markdownFiles).map((filePath) => {
  const rawText = markdownFiles[filePath];

  const match = rawText.match(/---\n([\s\S]*?)\n---\n([\s\S]*)/);
  if (!match) return null;

  const frontmatter = match[1];
  const content = match[2].trim();
  
  const data = {};
  frontmatter.split('\n').forEach(line => {
    const [key, ...value] = line.split(':');
    if (key && value.length) data[key.trim()] = value.join(':').trim().replace(/^"|"$/g, '').replace(/^'|'$/g, '');
  });

  return {
    id: filePath.replace('./blogs/', '').replace('.md', ''),
    title: data.title || "Untitled",
    date: data.date || "Unknown Date",
    excerpt: data.excerpt || "",
    content: content
  };
}).filter(Boolean).reverse();