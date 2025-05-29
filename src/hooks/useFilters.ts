import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import debounce from 'lodash.debounce';

export function useFilters<T extends Record<string, string | string[] | undefined>>(defaultFilters: T) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const filters = useMemo(() => {
        const params: Record<string, string | string[] | undefined> = { ...defaultFilters };

        for (const key of searchParams.keys()) {
            const all = searchParams.getAll(key);
            params[key] = all.length > 1 ? all : all[0];
        }

        return params as T;
    }, [searchParams, defaultFilters]);

    const updateFilters = useMemo(() => debounce((newFilters: Partial<T>) => {
        const newParams = new URLSearchParams(searchParams);
    
        Object.entries(newFilters).forEach(([key, value]) => {
          newParams.delete(key);
          if (value !== undefined) {
            if (Array.isArray(value)) {
              value.forEach((v) => newParams.append(key, v));
            } else {
              newParams.set(key, value);
            }
          }
        });
        
        router.replace(`${pathname}?${newParams.toString()}`);
    }, 300), [router, pathname, searchParams]);

    const setFilter = useCallback(
        <K extends keyof T>(key: K, value: T[K]) => {
          updateFilters({ [key]: value } as unknown as Partial<T>);
        },
        [updateFilters]
    );

    return { filters, setFilter };
}