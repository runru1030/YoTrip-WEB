import { useCallback, useEffect, useState } from "react";

/**
 * 모달 close하는 기능 block
 * @param blockScroll {boolean}
 */
interface IProps {
  blockScroll?: boolean;
}
const useModal = ({ blockScroll = true }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const closeModal = () => {
    blockScroll && document.body.classList.remove("scroll-hide");
    setIsModalOpen(false);
  };
  const openModal = () => {
    blockScroll && document.body.classList.add("scroll-hide");
    setIsModalOpen(true);
  };

  const openToastModal = () => {
    blockScroll && document.body.classList.add("scroll-hide");
    setIsModalOpen(true);
    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  const handleClickModal = useCallback(
    (e: TouchEvent) => {
      const target = e.target as HTMLElement;
      if (isModalOpen && !target.closest("#modal-content")) {
        // 클릭된 타겟의 최상위부모가 modal content가 아니면
        closeModal();
      }

      const { type } = (e.target as HTMLElement).dataset;
      if (type === "modal-bg") {
        closeModal();
      }
    },
    [isModalOpen]
  );
  useEffect(() => {
    window.addEventListener("touchstart", handleClickModal);

    return () => {
      window.removeEventListener("touchstart", handleClickModal);
    };
  }, [handleClickModal]);
  return { isModalOpen, openModal, closeModal, openToastModal };
};

export default useModal;
