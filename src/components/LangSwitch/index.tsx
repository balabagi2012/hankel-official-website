import Image from 'next/image';
import { useState } from 'react';

import Typography from '../Typography';

export interface LangSwitchPros {
  value: 'en' | 'zh';
  onChange: (value: 'en' | 'zh') => void;
}

const LangSwitch = ({ value, onChange }: LangSwitchPros) => {
  const [openLanguageDropDown, setOpenLanguageDropDown] = useState(false);
  return (
    <div
      className={`ml-auto flex flex-row items-center self-center`}
      onClick={() => setOpenLanguageDropDown(!openLanguageDropDown)}
    >
      <Image
        src="/icons/LanguageOutlined.svg"
        alt="hankel language"
        width="24"
        height="24"
        className="w-auto h-auto"
      ></Image>
      <div className="ml-1 mr-2 font-bold text-blue">
        {value === 'en' ? 'EN' : '中文'}
      </div>
      <Image
        src="/icons/ChevronBottomFilled.svg"
        alt="hankel chevron bottom"
        width="24"
        height="24"
        className="w-auto h-auto"
      ></Image>
      <div
        className={`${
          openLanguageDropDown ? 'block' : 'hidden'
        } absolute top-20 z-10  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="language-button"
        tabIndex={-1}
        id="language-dropdown"
      >
        <div className="p-4" role="none">
          <div
            onClick={() => onChange('en')}
            className={`mb-4 h-[25px] flex flex-row justify-start`}
            rel="noopener noreferrer"
          >
            <Typography
              varient="h6"
              className={`${value === 'en' ? 'font-bold' : ''}`}
            >
              English
            </Typography>
          </div>
          <div
            onClick={() => onChange('zh')}
            className={`h-[25px] flex flex-row justify-start`}
            rel="noopener noreferrer"
          >
            <Typography
              varient="h6"
              className={`${value === 'zh' ? 'font-bold' : ''}`}
            >
              中文
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LangSwitch;
