export {};

declare global {
  interface SpotifyEmbedController {
    play: () => void;
    pause: () => void;
    togglePlay: () => void;
    seek: (seconds: number) => void;
    setVolume: (volume: number) => void;
    addListener: (event: 'ready' | 'playback_update' | string, callback: () => void) => void;
    removeListener: (event: string) => void;
  }

  interface SpotifyIframeApi {
    createController: (
      element: HTMLElement,
      options: {
        uri: string;
        width?: string;
        height?: string;
        autoplay?: boolean;
      },
      callback: (controller: SpotifyEmbedController) => void
    ) => void;
  }

  interface Window {
    SpotifyIframeApi?: SpotifyIframeApi;
    onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
  }
}