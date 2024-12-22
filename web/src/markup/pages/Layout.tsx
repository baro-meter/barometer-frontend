import React from "react";

const Layout = () => {
  return (
    /* wrap, main, contents는 기본으로 들어갑니다. */
    <div className="wrap">
      <main className="main">
        <div className="contents">
          컨텐츠는 내용이 많아지면 스크롤 가능합니다.
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
          <br />
          @@@ contents @@@
        </div>
        {/* 하단 고정 영역. 하단 navigation 제외, 하단에 고정하는 영역이 있을 경우 모두 bottom-area 사용 */}
        <div className="bottom-area" style={{ backgroundColor: "cadetblue" }}>
          <div className="inner">
            하단 고정 영역. 하단 navigation 제외, 하단에 고정하는 영역이 있을
            경우 사용
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
