// 'use client';

// import '@uiw/react-md-editor/markdown-editor.css';
// import '@uiw/react-markdown-preview/markdown.css';
// import useModal from '@/hooks/useModal';
// import Modal from './Modal';
// import MDEditor from '@uiw/react-md-editor';
// import { usePathname, useSearchParams } from 'next/navigation';
// import React, { ElementRef, useEffect, useRef, useState } from 'react';

// import { useRouter } from 'next/navigation';
// import { Button } from './ui/button';
// import { useAction } from '@/hooks/useAction';
// import { createQuestion } from '@/actions/question';
// import { toast } from 'sonner';

// import { useTheme } from 'next-themes';
// import { getUpdatedUrl, searchParamsToObject } from '@/lib/utils';
// import { FormPostInput } from './posts/form/form-input';
// import { FormPostErrors } from './posts/form/form-errors';

// export const NewPostDialog = () => {
//   const { theme } = useTheme();
//   const formRef = useRef<ElementRef<'form'>>(null);
//   const searchParam = useSearchParams();
//   const paramsObject = searchParamsToObject(searchParam);
//   const path = usePathname();
//   const router = useRouter();
//   const [value, setValue] = useState<string>('**Hello world!!!**');
//   const [editorHeight, setEditorHeight] = useState<number>(200);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const { ref, onOpen, onClose } = useModal();

//   const handleMarkdownChange = (newValue?: string) => {
//     if (typeof newValue === 'string') {
//       setValue(newValue);
//     }
//   };

//   useEffect(() => {
//     let timeoutId: any;
//     if (paramsObject.newPost === 'open') {
//       onOpen();
//       timeoutId = setTimeout(() => {
//         if (containerRef.current) {
//           const rect = containerRef.current.getBoundingClientRect();
//           setEditorHeight(rect.height);
//         }
//       }, 0);
//     } else {
//       onClose();
//     }
//     return () => {
//       clearTimeout(timeoutId);
//     };
//   }, [onClose, onOpen, paramsObject.newPost]);

//   const { execute, fieldErrors, setFieldErrors } = useAction(createQuestion, {
//     onSuccess: (data) => {
//       toast.success(`Question "${data.title}" created`);
//       formRef?.current?.reset();
//       if (!fieldErrors?.content && !fieldErrors?.title && !fieldErrors?.tags) {
//         setValue('');
//         router.push(getUpdatedUrl(`${path}/`, paramsObject, { newPost: 'close' }));
//       }
//     },
//     onError: (error) => {
//       toast.error(error);
//     },
//   });

//   const handleOnCloseClick = () => {
//     router.push(getUpdatedUrl(`${path}/`, paramsObject, { newPost: 'close' }));
//     if (fieldErrors?.content || fieldErrors?.title || fieldErrors?.tags) {
//       setFieldErrors({});
//     }
//   };

//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     const title = formData.get('title');
//     const tags = formData.get('tags');

//     execute({
//       title: title?.toString() || '',
//       content: value,
//       tags: (tags?.toString() || '').split(','),
//     });
//   };

//   return (
//     <Modal ref={ref} onClose={handleOnCloseClick}>
//       <form ref={formRef} onSubmit={onSubmit} className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 space-y-6 max-w-4xl mx-auto">
//         <div className="relative flex flex-col h-full">
//           <button
//             type="button"
//             className="absolute top-2 right-2 p-3 text-white bg-red-600 rounded-full shadow-md hover:bg-red-700 focus:outline-none"
//             onClick={handleOnCloseClick}
//           >
//             ×
//           </button>
//           <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Create New Post</h2>
//           <div className="space-y-6">
//             <FormPostInput
//               id="title"
//               label="Title"
//               placeholder="Enter question title..."
//               errors={fieldErrors}
//             />
//             <div className="relative flex-grow">
//               <MDEditor
//                 id="content"
//                 value={value}
//                 onChange={handleMarkdownChange}
//                 style={{ height: '100%' }}
//                 height={editorHeight - 180}
//                 visibleDragbar={false}
//                 className="border rounded-md shadow-sm"
//               />
//               <FormPostErrors id="content" errors={fieldErrors} />
//             </div>
//             <FormPostInput
//               id="tags"
//               label="Tags"
//               placeholder="Enter tags separated by commas (e.g., hello,world)"
//               errors={fieldErrors}
//             />
//           </div>
//           <Button type="submit" className="mt-6 py-2 px-4 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none">
//             Post-it
//           </Button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

'use client';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import useModal from '@/hooks/useModal';
import Modal from './Modal';
import MDEditor from '@uiw/react-md-editor';
import { usePathname, useSearchParams } from 'next/navigation';
import React, { ElementRef, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { useAction } from '@/hooks/useAction';
import { createQuestion } from '@/actions/question';
import { toast } from 'sonner';

import { useTheme } from 'next-themes';
import { getUpdatedUrl, searchParamsToObject } from '@/lib/utils';
import { FormPostInput } from './posts/form/form-input';
import { FormPostErrors } from './posts/form/form-errors';
import { XCircle } from 'lucide-react';

export const NewPostDialog = () => {
  const { theme } = useTheme();
  const formRef = useRef<ElementRef<'form'>>(null);
  const searchParam = useSearchParams();
  const paramsObject = searchParamsToObject(searchParam);
  const path = usePathname();
  const router = useRouter();
  const [value, setValue] = useState<string>('**Hello world!!!**');
  const [editorHeight, setEditorHeight] = useState<number>(200);
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, onOpen, onClose } = useModal();
  const handleMarkdownChange = (newValue?: string) => {
    if (typeof newValue === 'string') {
      setValue(newValue);
    }
  };
  useEffect(() => {
    let timeoutId: any;
    if (paramsObject.newPost === 'open') {
      onOpen();

      timeoutId = setTimeout(() => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          setEditorHeight(rect.height);
        }
      }, 0); // Adjust the delay time if needed

      // Cleanup function to clear the timeout
    } else {
      onClose();
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [onClose, onOpen, paramsObject.newPost]);

  const { execute, fieldErrors, setFieldErrors } = useAction(createQuestion, {
    onSuccess: (data) => {
      toast.success(`Question "${data.title}" created`);
      formRef?.current?.reset();
      if (!fieldErrors?.content && !fieldErrors?.title && !fieldErrors?.tags) {
        setValue('');
        router.push(
          getUpdatedUrl(`${path}/`, paramsObject, { newPost: 'close' }),
        );
      }
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const handleOnCloseClick = () => {
    router.push(getUpdatedUrl(`${path}/`, paramsObject, { newPost: 'close' }));
    if (fieldErrors?.content || fieldErrors?.title || fieldErrors?.tags) {
      setFieldErrors({});
    }
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title');

    const tags = formData.get('tags');

    execute({
      title: title?.toString() || '',
      content: value,
      tags: (tags?.toString() || '').split(','),
    });
  };

  return (
    <Modal ref={ref} onClose={handleOnCloseClick}>
      <form ref={formRef} onSubmit={onSubmit}>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            ref={containerRef}
            className="relative z-10 h-full w-full max-w-3xl space-y-4 rounded-lg bg-white p-2 pt-8 shadow-lg dark:bg-gray-800 md:max-w-4xl"
          >
            <button
              type="button"
              className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white"
              onClick={handleOnCloseClick}
            >
              <XCircle className="h-4 w-4" />
            </button>
            <FormPostInput
              id="title"
              placeholder="Enter question title..."
              errors={fieldErrors}
            />
            <div className="flex-grow">
              <div data-color-mode={theme}>
                <div className="wmde-markdown-var"> </div>
                <MDEditor
                  id="content"
                  value={value}
                  onChange={handleMarkdownChange}
                  style={{ height: '100%' }}
                  height={editorHeight - 250}
                  visibleDragbar={false}
                />
                <FormPostErrors id="content" errors={fieldErrors} />
              </div>
            </div>
            <FormPostInput
              id="tags"
              placeholder="Enter tags seperated by comma : hello,world"
              errors={fieldErrors}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white shadow-md hover:bg-blue-700 focus:outline-none"
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};
