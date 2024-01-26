import { useEffect, useRef, useState } from 'react';

export const useDynamicSVGImport = (path, options = {}) => {
    const ImportedIconRef = useRef();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const { onCompleted, onError } = options;
    
    useEffect(() => {
        if (path && path !== "") {
            setLoading(true);

            const importIcon = async () => {
                try {
                    ImportedIconRef.current = ( await import(`${path}` ) ).ReactComponent;
                    if (onCompleted) {
                        onCompleted(path, ImportedIconRef.current);
                    }
                } catch (err) {
                    if (onError) {
                        onError(err);
                    }
                    setError(err);
                } finally {
                    setLoading(false);
                }
            };
            importIcon();
        }
    }, [path, onCompleted, onError]);

    return { error, loading, SvgIcon: ImportedIconRef.current };
}