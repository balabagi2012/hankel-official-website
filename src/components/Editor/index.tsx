"use client";

import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import MenuBar from "@/components/MenuBar";
import { useEffect, useRef } from "react";

export interface EditorComponentProps {
  key?: string;
  value: string;
  onChange: (content: string) => void;
}

const EditorComponent = (props: EditorComponentProps) => {
  const contentRef = useRef("");
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
    content: "",
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
    <div className="editor mt-3">
      {editor && <MenuBar key={props.key} editor={editor} />}
      <EditorContent
        className="focus:border-0 outline-0 editor__content"
        editor={editor}
      />
    </div>
  );
};

export default EditorComponent;
