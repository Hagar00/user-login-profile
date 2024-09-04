// src/components/BreadCrumbs.js
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

function BreadCrumbs() {
    const { asPath } = useRouter();

    if (!asPath) {
        return null; // or a fallback UI
    }

    // Split the pathname into parts
    const pathParts = asPath.split('/').filter(part => part);

    // Define breadcrumb items
    const breadcrumbItems = pathParts.map((part, index) => {
        const href = `/${pathParts.slice(0, index + 1).join('/')}`;

        return {
            label: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '), // Capitalize first letter and replace dashes with spaces
            href,
        };
    });

    // Add Home breadcrumb
    const breadcrumbs = [
        { label: 'Home', href: '/' },
        ...breadcrumbItems,
    ];

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {breadcrumbs.map((item, index) => (
                    <li key={index} className="breadcrumb-item">
                        <Link href={item.href}>
                            {item.label}
                        </Link>
                        {index < breadcrumbs.length - 1 && <span> &gt; </span>}
                    </li>
                ))}
            </ol>
            <style jsx>{`
                .breadcrumb {
                    display: flex;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .breadcrumb-item {
                    margin-right: 8px;
                }
                .breadcrumb-item span {
                    margin-right: 8px;
                }
            `}</style>
        </nav>
    );
}

export default BreadCrumbs;
