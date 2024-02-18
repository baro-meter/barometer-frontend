import MonthlyCalendar from '@/components/Calendar/MonthlyCalendar';
import React, {MutableRefObject, useCallback, useRef} from 'react';
import html2canvas from 'html2canvas';

interface CapturePageViewProps {
  target: MutableRefObject<HTMLDivElement | null>;
  handleSaveCaptureImage: () => void;
}

const CapturePageView = ({
  target,
  handleSaveCaptureImage,
}: CapturePageViewProps) => {
  return (
    <div>
      <div id="capture_container" ref={target}>
        <MonthlyCalendar />
      </div>
      <button onClick={handleSaveCaptureImage}>capture 이미지 저장</button>
    </div>
  );
};

interface CapturePageProps {}

const CapturePage = ({}: CapturePageProps) => {
  const target = useRef<HTMLDivElement>(null);

  const saveAs = (uri: string, filename: string) => {
    var link = document.createElement('a');
    console.log(uri);
    console.log('saveAs');
    if (typeof link.download === 'string') {
      link.href = uri;
      link.download = filename;

      document.body.appendChild(link);

      //simulate click
      link.click();

      //remove the link when done
      document.body.removeChild(link);
    } else {
      window.open(uri);
    }
  };

  const handleSaveCaptureImage = useCallback(async () => {
    const printTarget = target.current;
    if (!printTarget) {
      alert('cannot find target!');
      return;
    }

    // // 2
    html2canvas(printTarget, {
      allowTaint: true,
      useCORS: true,
      ignoreElements: function (e: any) {
        // Here, ignore external URL links and lazyload images
        if (
          (e.tagName === 'A' && e.host !== window.location.host) ||
          e.getAttribute('loading') === 'lazy'
        ) {
          return true;
        } else {
          return false;
        }
      },
    })
      .then(canvas => {
        //@ts-ignore
        window.ReactNativeWebView.postMessage(
          JSON.stringify({
            eventKey: 'saveImage',
            data: canvas.toDataURL('image/png'),
          }),
        );
      })
      .catch(e => console.error(e));
  }, [target, saveAs]);
  const viewProps = {target, handleSaveCaptureImage};

  return <CapturePageView {...viewProps} />;
};

export const getServerSideProps = () => {
  return {
    props: {}, // will be passed to the page component as props
  };
};

export default CapturePage;
