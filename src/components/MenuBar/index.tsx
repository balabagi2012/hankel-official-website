'use client';
import './MenuBar.scss';

import { Editor } from '@tiptap/react';
import { ChangeEvent, Fragment, useCallback } from 'react';

import Image from 'next/image';
import MenuItem from './MenuItem';

interface EdiorMenuProps {
  name?: string;
  editor: Editor;
}

const EdiorMenu = ({ name, editor }: EdiorMenuProps) => {
  const uploadFile = async (file: File) => {
    const url = `https://www.hiape.ntpc.edu.tw/uploads`;
    const form = new FormData();
    form.append('file', file);
    const res = await fetch(url, {
      method: 'POST',
      body: form,
    });
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      return window.alert('Failed to upload file');
    }
    return res.json();
  };

  const addImage = (url?: string) => {
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const addFile = useCallback(
    (url?: string) => {
      // cancelled
      if (url === null) {
        return;
      }
      // empty
      else if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink().run();

        return;
      } else if (url && typeof url === 'string') {
        // update link
        editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .setLink({ href: url })
          .run();
      }
    },
    [editor]
  );

  const selectFile = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
      event.stopPropagation();
      const file = event.target.files?.[0];
      if (file) {
        uploadFile(file).then((data) => {
          if (data.file) {
            addFile(data.file);
            event.target.value = '';
          }
        });
      }
    },
    [addFile]
  );

  if (!editor) {
    return null;
  }

  const items = [
    {
      title: 'B',
      icon: (
        <Image
          src={'/icons/Bold.svg'}
          width={12}
          height={12}
          alt="bold"
          objectFit="cover"
        />
      ),
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      title: 'I',
      icon: (
        <Image
          src={'/icons/Itatic.svg'}
          width={12}
          height={12}
          alt="italic"
          objectFit="cover"
        />
      ),
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      title: '-',
      icon: (
        <Image
          src={'/icons/Strike.svg'}
          width={12}
          height={12}
          alt="strike"
          objectFit="cover"
        />
      ),
      action: () => editor.chain().focus().toggleStrike().run(),
      isActive: () => editor.isActive('strike'),
    },
    {
      type: 'divider',
    },
    {
      title: 'H1',
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      title: 'H2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      title: 'H3',
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive('heading', { level: 3 }),
    },
    {
      type: 'divider',
    },
    {
      title: 'Code',
      icon: (
        <Image
          src={'/icons/Code.svg'}
          width={12}
          height={12}
          alt="code"
          objectFit="cover"
        />
      ),
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive('code'),
    },
    {
      title: 'Link',
      icon: (
        <Image
          src={'/icons/Link.svg'}
          width={12}
          height={12}
          alt="link"
          objectFit="cover"
        />
      ),
      action: () => setLink(),
      isActive: () => editor.isActive('link'),
    },
    {
      title: 'Img',
      icon: (
        <Image
          src={'/icons/Image.svg'}
          width={12}
          height={12}
          alt="image"
          objectFit="cover"
        />
      ),
      action: () =>
        document.getElementById(`editor-img${name ? '-' + name : ''}`)?.click(),
      isActive: () => false,
    },
    {
      title: 'File',
      icon: (
        <Image
          src={'/icons/File.svg'}
          width={12}
          height={12}
          alt="file"
          objectFit="cover"
        />
      ),
      action: () => {
        document
          .getElementById(`editor-file${name ? '-' + name : ''}`)
          ?.click();
      },
      isActive: () => false,
    },
    {
      title: 'Highlight',
      icon: (
        <Image
          src={'/icons/Highlight.svg'}
          width={12}
          height={12}
          alt="Highlight"
          objectFit="cover"
        />
      ),
      action: () => editor.chain().focus().toggleHighlight().run(),
      isActive: () => editor.isActive('highlight'),
    },
    {
      type: 'divider',
    },
    {
      title: 'Ordered List',
      icon: (
        <Image
          src={'/icons/Order.svg'}
          width={12}
          height={12}
          alt="Order"
          objectFit="cover"
        />
      ),
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
    {
      title: 'Code Block',
      icon: (
        <Image
          src={'/icons/CodeBlock.svg'}
          width={12}
          height={12}
          alt="CodeBlock"
          objectFit="cover"
        />
      ),
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive('codeBlock'),
    },
    {
      title: 'Blockquote',
      icon: (
        <Image
          src={'/icons/Quote.svg'}
          width={12}
          height={12}
          alt="Quote"
          objectFit="cover"
        />
      ),
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive('blockquote'),
    },
    {
      title: 'Horizontal Rule',
      icon: (
        <Image
          src={'/icons/Horizontal.svg'}
          width={12}
          height={12}
          alt="Horizontal"
          objectFit="cover"
        />
      ),
      action: () => editor.chain().focus().setHorizontalRule().run(),
    },
    {
      type: 'divider',
    },
    {
      title: 'Clear Format',
      icon: (
        <Image
          src={'/icons/Clear.svg'}
          width={12}
          height={12}
          alt="Clear"
          objectFit="cover"
        />
      ),
      action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    },
    {
      title: 'Undo',
      icon: (
        <Image
          src={'/icons/Undo.svg'}
          width={12}
          height={12}
          alt="Undo"
          objectFit="cover"
        />
      ),
      action: () => editor.commands.undo(),
    },
    {
      title: 'Redo',
      icon: (
        <Image
          src={'/icons/Redo.svg'}
          width={12}
          height={12}
          alt="Redo"
          objectFit="cover"
        />
      ),
      action: () => editor.commands.redo(),
    },
  ];

  return (
    <div className="editor__header flex flex-row gap-x-2">
      <input
        type="file"
        id={`editor-img${name ? '-' + name : ''}`}
        className="hidden"
        accept="images/*"
        onChange={(event) => {
          event.preventDefault();
          event.stopPropagation();
          const file = event.target.files?.[0];
          if (file) {
            uploadFile(file).then((data) => {
              if (data.file) {
                addImage(data.file);
                event.target.value = '';
              }
            });
          }
        }}
      />
      <input
        type="file"
        id={`editor-file${name ? '-' + name : ''}`}
        className="hidden"
        onChange={selectFile}
      />
      {items.map((item, index) => (
        <Fragment key={index}>
          {item.type === 'divider' ? (
            <div className="divider" />
          ) : (
            <MenuItem {...item} />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default EdiorMenu;
