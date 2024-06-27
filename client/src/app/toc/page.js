import Head from 'next/head';

const Page = () => {
  const headings = [];
  const toc = [];

  // Get all headings from the content
  const content = `
    <h1 id="heading-1">Heading 1</h1>
    <p>This is some text.</p>
    <h2 id="heading-2">Heading 2</h2>
    <p>This is some more text.</p>
    <h3 id="heading-3">Heading 3</h3>
    <p>This is even more text.</p>
  `;

  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const headingsElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

  headingsElements.forEach((heading) => {
    const text = heading.textContent;
    const id = heading.id;
    headings.push({ text, id });
  });

  // Create the TOC
  headings.forEach((heading, index) => {
    toc.push(` ${index + 1}. [${heading.text}](#${heading.id})`);
  });

  return (
    <div>
      <Head>
        <title>Table of Contents</title>
      </Head>
      <h1>Table of Contents</h1>
      <ul>
        {toc.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default Page;