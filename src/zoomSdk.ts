import ZoomAppsSdk from '@zoom/appssdk';

declare global {
  interface Window {
    zoomSdk: typeof ZoomAppsSdk;
  }
}

const zoomSdk = typeof window !== 'undefined' && window.zoomSdk ? window.zoomSdk : ZoomAppsSdk;

export default zoomSdk;
