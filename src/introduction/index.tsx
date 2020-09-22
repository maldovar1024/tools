import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import readme from './introduction.md';

const Introduction: FC = () => <ReactMarkdown source={readme} />;

export default Introduction;
