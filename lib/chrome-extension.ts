declare global {
  interface Window {
    chrome: any;
  }
}

const extensionId = process.env.NEXT_PUBLIC_CHROME_EXTENSION_ID;

export const refreshInChromeExt = () => {
  window?.chrome?.runtime?.sendMessage?.(
    extensionId,
    { refresh: true },
    (response: { success: boolean }) => {
      if (!response.success) {
        console.error('Failed to refresh the extension');
      }
    },
  );
};

export const logoutInChromeExt = () => {
  window?.chrome?.runtime?.sendMessage?.(
    extensionId,
    { logout: true },
    (response: { success: boolean }) => {
      if (!response.success) {
        console.error('Failed to logout the extension');
      }
    },
  );
};
