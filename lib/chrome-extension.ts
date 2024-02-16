const extensionId = process.env.NEXT_PUBLIC_CHROME_EXTENSION_ID;

export const refreshInChromeExt = () => {
  window?.chrome?.runtime?.sendMessage?.(
    extensionId,
    { refresh: true },
    (response) => {
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
    (response) => {
      if (!response.success) {
        console.error('Failed to logout the extension');
      }
    },
  );
};
