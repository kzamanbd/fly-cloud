import { ButtonHTMLAttributes, useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        router.on('start', () => {
            setLoading(true);
        });
        router.on('finish', () => {
            setLoading(false);
        });
    }, []);

    const isDisabled = disabled || loading;

    return (
        <button
            {...props}
            className={`btn h-max ${isDisabled && 'opacity-25'} ${className}`}
            disabled={isDisabled}>
            {children}
        </button>
    );
}

