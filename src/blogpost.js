// A simplified look at how your Blog Template handles 20+ paragraphs
import { PortableText } from '@portabletext/react';

function BlogPost({ content }) {
  return (
    <article className="prose prose-invert lg:prose-xl mx-auto py-20 px-6">
      <PortableText value={content} />
    </article>
  );
}