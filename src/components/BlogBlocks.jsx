import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, Check, Copy, Info, Lightbulb } from 'lucide-react';
import { tokenizeInline } from '../content/blog/inline';

// Text with **bold**, *italic*, `code` and [links](/path). Site paths use the router; other links open in a new tab.
export const Inline = ({ text }) =>
  tokenizeInline(text).map((token, i) => {
    switch (token.type) {
      case 'bold':
        return <strong key={i}>{token.text}</strong>;
      case 'em':
        return <em key={i}>{token.text}</em>;
      case 'code':
        return <code key={i}>{token.text}</code>;
      case 'link':
        return token.href.startsWith('/') ? (
          <Link key={i} to={token.href}>{token.text}</Link>
        ) : (
          <a key={i} href={token.href} target="_blank" rel="noopener noreferrer">{token.text}</a>
        );
      default:
        return <React.Fragment key={i}>{token.text}</React.Fragment>;
    }
  });

const CALLOUT_ICONS = { note: Info, tip: Lightbulb, warning: AlertTriangle };

const CodeBlock = ({ lang, code }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };
  return (
    <figure className="post--code">
      <figcaption>
        <span>{lang}</span>
        <button type="button" onClick={copy} aria-label="Copy code">
          {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </figcaption>
      <pre><code>{code}</code></pre>
    </figure>
  );
};

export const Block = ({ block }) => {
  switch (block.type) {
    case 'p':
      return <p><Inline text={block.text} /></p>;

    case 'list': {
      const List = block.ordered ? 'ol' : 'ul';
      return (
        <List className="post--list">
          {block.items.map((item, i) => <li key={i}><Inline text={item} /></li>)}
        </List>
      );
    }

    case 'steps':
      return (
        <ol className="post--steps">
          {block.items.map((step, i) => (
            <li key={i}>
              <span className="post--step-num" aria-hidden="true">{i + 1}</span>
              <div>
                <strong><Inline text={step.title} /></strong>
                {step.text && <p><Inline text={step.text} /></p>}
              </div>
            </li>
          ))}
        </ol>
      );

    case 'table':
      return (
        <figure className="post--table">
          {block.caption && <figcaption>{block.caption}</figcaption>}
          <div className="post--table-scroll" tabIndex={0} role="region" aria-label={block.caption || 'Table'}>
            <table className={block.head.length > 2 ? 'is-wide' : undefined}>
              <thead>
                <tr>{block.head.map((cell, i) => <th key={i} scope="col"><Inline text={cell} /></th>)}</tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r}>
                    {row.map((cell, c) => (c === 0
                      ? <th key={c} scope="row"><Inline text={cell} /></th>
                      : <td key={c}><Inline text={cell} /></td>))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      );

    case 'callout': {
      const tone = CALLOUT_ICONS[block.tone] ? block.tone : 'note';
      const Icon = CALLOUT_ICONS[tone];
      return (
        <aside className={`post--callout is-${tone}`}>
          <Icon size={18} aria-hidden="true" className="post--callout-icon" />
          <div>
            {block.title && <p className="post--callout-title">{block.title}</p>}
            <p><Inline text={block.text} /></p>
          </div>
        </aside>
      );
    }

    case 'quote':
      return (
        <blockquote className="post--quote">
          <p><Inline text={block.text} /></p>
          {block.cite && <cite>{block.cite}</cite>}
        </blockquote>
      );

    case 'code':
      return <CodeBlock lang={block.lang} code={block.code} />;

    case 'flow':
      return (
        <figure className="post--flow">
          <ol>
            {block.steps.map((step, i) => (
              <li key={i}>
                <span><Inline text={step} /></span>
                {i < block.steps.length - 1 && <ArrowRight size={16} aria-hidden="true" className="post--flow-arrow" />}
              </li>
            ))}
          </ol>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );

    default:
      return null;
  }
};
