import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import readme from './introduction.md';
import './github-md-style.css';

const Introduction: FC = () => (
  <ReactMarkdown className="markdown-body" source={readme} />
);

export default Introduction;
