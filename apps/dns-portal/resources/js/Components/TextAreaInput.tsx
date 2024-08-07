import { forwardRef, useEffect, useImperativeHandle, useRef, TextareaHTMLAttributes } from 'react';

export default forwardRef(function TextAreaInput(
    {
        className = '',
        isFocused = false,
        rows = 5,
        ...props
    }: TextareaHTMLAttributes<HTMLTextAreaElement> & { isFocused?: boolean },
    ref
) {
    const localRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus()
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, []);

    return (
        <textarea
            ref={localRef}
            {...props}
            rows={rows}
            className={`py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 ${className}`}></textarea>
    );
});

