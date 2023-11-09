import { progressContainer } from './ProgressBarStyle';
import classNames from 'classnames';
import useDrag from '../../hooks/useDrag/useDrag';
import { useEffect, useMemo, useRef, useState } from 'react';

type ReactNodeChildren = { children: React.ReactNode };

type TItems = {
  key: string | number;
  label: React.ReactNode;
  pointLabel: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type TProgressItemStatus = 'inComplete' | 'inProgress' | 'complete';

type TProgressItems = TItems & {
  progresskey: string;
  progressStatus: TProgressItemStatus;
  progressPercent: number;
};

interface IProgressItem {
  progressStatus: TProgressItemStatus;
  children: React.ReactNode;
}
interface IProgressItemPoint {
  progressPercent: number;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
}

export interface IProgressBar extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  activeKey: string;
  progressPercent: number;
  items: TItems[];
  className?: string;
}

function ProgressItemPoint({
  progressPercent,
  disabled,
  onClick = () => null,
  children,
}: Readonly<IProgressItemPoint>) {
  return (
    <div className="progressbar-point">
      <button type="button" disabled={disabled} className="progressbar-button" onClick={onClick}>
        {children}
      </button>
      <div className="progressbar-line">
        <div className="progressbar-percent" style={{ width: `${progressPercent}%` }}></div>
      </div>
    </div>
  );
}
function ProgressItemLabel({ children }: Readonly<ReactNodeChildren>) {
  return <div className="progressbar-label">{children}</div>;
}

function ProgressItem({ progressStatus, children }: Readonly<IProgressItem>) {
  return (
    <div
      className={classNames('progressbar-item', {
        'progressbar-in-progress': progressStatus === 'inProgress',
        'progressbar-complete': progressStatus === 'complete',
      })}
    >
      {children}
    </div>
  );
}

function ProgressBar({ activeKey, progressPercent, items = [], className = '', ...props }: Readonly<IProgressBar>) {
  const scrollRef = useRef<HTMLDivElement>(null!);
  const innerScrollRef = useRef<HTMLDivElement>(null!);
  const timer = useRef<any>(null!);
  const [translateX, setTranslateX] = useState(0);
  const [firstTranslateX, setFirstTranslateX] = useState(false);
  const [scrollContainerWidth, setScrollContainerWidth] = useState<number>(null!);

  const values: TProgressItems[] = useMemo(() => {
    const progressItems = [] as TProgressItems[];
    const indexOfActiveKey = items.findIndex((f) => f.key === activeKey);

    if (indexOfActiveKey < 0) console.warn('WARNING!!! Not found this activeKey in items.');

    // loop for set progressPercent *** progressPercent: 100 === complete
    items.forEach((value: any, index) => {
      let _progressStatus: TProgressItemStatus = 'inComplete';
      let _progressPercent = 0;

      if (indexOfActiveKey > 0 && index < indexOfActiveKey) {
        _progressStatus = 'complete';
        _progressPercent = 100;
      }
      if (indexOfActiveKey === index) {
        _progressStatus = 'inProgress';
        _progressPercent = progressPercent;
      }

      progressItems.push({
        ...value,
        progresskey: value.key,
        progressStatus: _progressStatus,
        progressPercent: _progressPercent,
      });
    });

    return progressItems;
  }, [activeKey, progressPercent, items]);

  const isDragging = useDrag(innerScrollRef, (x) => setTranslateX(translateX + x));

  // reset scrollbar
  useEffect(() => {
    if (translateX > 0 && !isDragging) {
      setTranslateX(0);
    }

    if (scrollRef.current && scrollContainerWidth > 0) {
      const innerScrollWidth = innerScrollRef.current.offsetWidth;
      const overScrollWidth = translateX + (scrollContainerWidth / 1.5) * -1;

      if (!isDragging && overScrollWidth < innerScrollWidth * -1) {
        const x = innerScrollWidth - scrollContainerWidth / 1.5;
        setTranslateX(x * -1);
      }

      if (values && !firstTranslateX && innerScrollWidth > scrollContainerWidth) {
        const indexOfInProgress = values.findIndex((f) => f.progressStatus === 'inProgress');
        const itemWidth = innerScrollWidth / values.length;
        const translateWithPoint = (indexOfInProgress + 1) * itemWidth;
        timer.current = setTimeout(() => {
          if (translateWithPoint >= scrollContainerWidth) {
            if (translateWithPoint + scrollContainerWidth > innerScrollWidth - scrollContainerWidth / 1.5) {
              const x = innerScrollWidth - scrollContainerWidth / 1.5;
              setTranslateX(x * -1);
            } else {
              setTranslateX(translateWithPoint * -1);
            }
            setFirstTranslateX(true);
          }
        }, 300);
      }

      return () => clearTimeout(timer.current);
    }
  }, [
    innerScrollRef.current,
    scrollRef.current,
    translateX,
    isDragging,
    values,
    firstTranslateX,
    scrollContainerWidth,
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      const checkScrollContainerWidth = () => {
        setScrollContainerWidth(scrollRef.current.offsetWidth);
      };

      checkScrollContainerWidth();
      window.addEventListener('resize', checkScrollContainerWidth);

      return () => {
        setFirstTranslateX(false);
        window.removeEventListener('resize', checkScrollContainerWidth);
      };
    }
  }, [scrollContainerWidth, scrollRef.current]);

  return (
    <div {...props} className={classNames(progressContainer, { [className]: className })}>
      <div ref={scrollRef} className="scroll-container">
        <div
          ref={innerScrollRef}
          className="inner-scroll-container"
          style={{
            transform: `translateX(${translateX}px)`,
          }}
        >
          {values.map((item) => {
            return (
              <ProgressItem key={item.key} progressStatus={item.progressStatus}>
                <ProgressItemPoint
                  progressPercent={item.progressPercent}
                  disabled={item.disabled}
                  onClick={item.onClick}
                >
                  {item.pointLabel}
                </ProgressItemPoint>
                <ProgressItemLabel>{item.label}</ProgressItemLabel>
              </ProgressItem>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
