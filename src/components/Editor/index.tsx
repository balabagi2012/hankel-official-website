'use client';

import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect, useRef } from 'react';

import MenuBar from '@/components/MenuBar';

export interface EditorComponentProps {
  name?: string;
  value: string;
  onChange: (content: string) => void;
}

const EditorComponent = (props: EditorComponentProps) => {
  const contentRef = useRef('');
  const editor = useEditor({
    extensions: [
      Link.configure({
        autolink: false,
      }),
      StarterKit.configure({
        history: {
          depth: 5,
        },
      }),
      Highlight,
      Image,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      props.onChange(html);
    },
  });

  useEffect(() => {
    if (editor && !contentRef.current) {
      editor.commands.setContent(props.value);
      contentRef.current = props.value;
    }
  }, [editor, props.value]);

  return (
    <div className="editor mt-3" key={props.name}>
      {editor && <MenuBar name={props.name} editor={editor} />}
      <EditorContent
        name={props.name}
        className="focus:border-0 outline-0 editor__content"
        editor={editor}
      />
    </div>
  );
};

export default EditorComponent;
