import clsx from 'clsx';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
import { forwardRef } from 'react';

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('a')({
    '&.active': {
        color: 'white', // активное состояние
    },
});

interface NextLinkComposedProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
    Omit<NextLinkProps, 'href' | 'as' | 'passHref' | 'onMouseEnter' | 'onClick' | 'onTouchStart'> {
    to: NextLinkProps['href'];
    linkAs?: NextLinkProps['as'];
}

export const NextLinkComposed = forwardRef<HTMLAnchorElement, NextLinkComposedProps>(
    function NextLinkComposed(props, ref) {
        const {
            to,
            linkAs,
            replace,
            scroll,
            shallow,
            prefetch,
            legacyBehavior = true,
            locale,
            ...other
        } = props;

        return (
            <NextLink
                href={to}
                prefetch={prefetch}
                as={linkAs}
                replace={replace}
                scroll={scroll}
                shallow={shallow}
                passHref
                locale={locale}
                legacyBehavior={legacyBehavior}
            >
                <Anchor ref={ref} {...other} />
            </NextLink>
        );
    },
);

export type LinkProps = {
    activeClassName?: string;
    as?: NextLinkProps['as'];
    href: NextLinkProps['href'];
    linkAs?: NextLinkProps['as']; // Useful when the as prop is shallow by styled().
    noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
    Omit<MuiLinkProps, 'href'>;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/pages/api-reference/components/link
const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
    const {
        activeClassName = 'active',
        as,
        className: classNameProps,
        href,
        legacyBehavior,
        linkAs: linkAsProp,
        locale,
        noLinkStyle,
        prefetch,
        replace,
        role, // Link don't have roles.
        scroll,
        shallow,
        ...other
    } = props;

    const pathname = usePathname()
    
    // Determine if the current route matches the link's href
    const isActive = pathname === href;

    // Define the class for the active state of the link
    const className = clsx(classNameProps, {
        [activeClassName]: isActive && activeClassName,
    });

    const linkAs = linkAsProp || as;
    const nextjsProps = {
        to: href,
        linkAs,
        replace,
        scroll,
        shallow,
        prefetch,
        legacyBehavior,
        locale,
    };

    if (noLinkStyle) {
        return <NextLinkComposed className={className} ref={ref} {...nextjsProps} {...other} />;
    }

    return (
        <MuiLink
            component={NextLinkComposed}
            className={className}
            ref={ref}
            {...nextjsProps}
            {...other}
        />
    );
});

export default Link;