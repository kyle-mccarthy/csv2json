import {
  DragEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface UseDragAndDropReturn {
  isDragging: boolean;
  onDragOver: (ev: DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (ev: DragEvent) => void;
}

const useDragAndDrop = (
  onDropCb: (files: FileList) => void
): UseDragAndDropReturn => {
  const [isDragging, setIsDragging] = useState(false);
  const stateRef = useRef<{ isDragging: boolean }>({ isDragging: false });

  // use a state ref so we can prevent dispatching state updates when the next
  // state value is already equal to the current statet value
  useEffect(() => {
    stateRef.current.isDragging = isDragging;
  }, [isDragging, stateRef]);

  const onDragOver = useCallback(
    (ev: DragEvent) => {
      ev.preventDefault();

      // called periodically while dragging, only update  the state when it
      // actually needs to be updated
      if (stateRef.current.isDragging !== true) {
        setIsDragging(true);
      }
    },
    [setIsDragging]
  );

  const onDragLeave = useCallback(() => {
    if (stateRef.current.isDragging !== false) {
      setIsDragging(false);
    }
  }, [setIsDragging]);

  const onDrop = useCallback(
    (ev: DragEvent) => {
      ev.preventDefault();
      const files = ev.dataTransfer?.files;
      if (files) {
        onDropCb(files);
      }
      setIsDragging(false);
    },
    [onDropCb, setIsDragging]
  );

  return {
    isDragging,
    onDragOver,
    onDragLeave,
    onDrop,
  };
};

export default useDragAndDrop;
