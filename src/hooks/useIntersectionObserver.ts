import { RefObject, useEffect, useState } from "react";

function useIntersectionObserver(
  elementRef: RefObject<Element>,
  { threshold = 0.1, root = null, rootMargin = "0%" }
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    //intersectionObserverEntry 인스턴스를 담은 배열을 entry상태에 담아준다.
    setEntry(entry);
  };

  useEffect(() => {
    const node = elementRef?.current; //관찰 해야할 target
    const hasIOSupport = !!window.IntersectionObserver; //브라우저가 지원하는지 확인
    if (!node || !hasIOSupport) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    //observer를 생성했으므로, observe메서드를 통해서 target을 감시(target:페이지 맨 하단에 있는 div)
    observer.observe(node);

    return () => observer.disconnect(); //클린업 함수-언마운트되면 감시를 멈추도록한다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef?.current, root, rootMargin, JSON.stringify(threshold)]);
  return entry;
}
export default useIntersectionObserver;
