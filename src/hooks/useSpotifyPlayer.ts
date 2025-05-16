import { useEffect, useRef, useState } from 'react';

interface SpotifyPlayerOptions {
    uri: string
    width?: string
    height?: string
    autoplay?: boolean
}

function useSpotifyPlayer(
    containerId: string,
    options: SpotifyPlayerOptions,
    shouldInit: boolean
) {
    const controllerRef = useRef<any>(null)
    const [isScriptReady, setIsScriptReady] = useState(false);

    useEffect(() => {
        if (window.SpotifyIframeApi) {
            setIsScriptReady(true);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://open.spotify.com/embed/iframe-api/v1';
        script.async = true;

        window.onSpotifyIframeApiReady = (IFrameAPI: any) => {
            window.SpotifyIframeApi = IFrameAPI;
            setIsScriptReady(true);
        };

        document.body.appendChild(script);

        return () => {
            delete window.onSpotifyIframeApiReady;
        };
    }, []);

    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        if (!shouldInit || controllerRef.current || !window.SpotifyIframeApi) return

        const element = document.getElementById(containerId)
        if (!element) return

        window.SpotifyIframeApi.createController(
            element,
            {
                uri: options.uri,
                width: options.width ?? '100%',
                height: options.height ?? '152',
                autoplay: options.autoplay ?? false,
            },
            (controller: any) => {
                controllerRef.current = controller;

                controller.addListener('ready', () => {
                    setIsReady(true);
                });
            }
        );
    }, [shouldInit, containerId, options])

    const play = () => controllerRef.current?.play()
    const pause = () => controllerRef.current?.pause()

    return {
        isReady,
        play,
        pause,
        isScriptReady
    };
}

export {
    useSpotifyPlayer
}