const extensionId = process.env.NEXT_PUBLIC_CHROME_EXTENSION_ID;

export const refreshBookmarksInChromeExt = () => {
  window?.chrome?.runtime?.sendMessage?.(
    extensionId,
    { refresh: true },
    (response) => {
      if (!response.success) {
        console.error('Failed to refresh extension');
      }
    },
  );
};
