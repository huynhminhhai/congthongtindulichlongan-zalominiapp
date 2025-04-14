export interface AppSliceType {
  isLoadingFullScreen: boolean;
  setIsLoadingFullScreen: (loading: boolean) => void;

  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (isOpen: boolean) => void;
}

export const createAppSlice = (set: any): AppSliceType => ({
  isLoadingFullScreen: false,
  setIsLoadingFullScreen: (loading: boolean) =>
    set((state: AppSliceType) => ({
      ...state,
      isLoadingFullScreen: loading,
    })),
  isLoginModalOpen: false,
  setIsLoginModalOpen: (isOpen: boolean) =>
    set((state: AppSliceType) => ({
      ...state,
      isLoginModalOpen: isOpen,
    })),
});
