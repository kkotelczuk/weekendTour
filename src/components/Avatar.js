import React from 'react';

const Avatar = () => {
  return (
    <div>
      <svg width="52" height="52" viewBox="0 0 52 52" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <title>Avatar</title>
        <desc>Created using Figma</desc>
        <g id="Avatar" transform="translate(-2019 498)">
        <g id="Rectangle 3" filter="url(#filterA0_d)">
        <use xlinkHref="#pathA0_fill" transform="translate(2023 -498)" fill="#2D9CDB"/>
        </g>
        <g id="ic_person">
        <g id="Icon 24px">
        <g id="Man">
        <use xlinkHref="#pathA1_fill" transform="translate(2037 -484)"/>
        </g>
        </g>
        </g>
        </g>
        <defs>
        <filter id="filterA0_d" filterUnits="userSpaceOnUse" x="2019" y="-498" width="52" height="52" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 255 0"/>
        <feOffset dx="0" dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
        </filter>
        <path id="pathA0_fill" d="M 0 8C 0 3.58172 3.58172 0 8 0L 36 0C 40.4183 0 44 3.58172 44 8L 44 36C 44 40.4183 40.4183 44 36 44L 8 44C 3.58172 44 0 40.4183 0 36L 0 8Z"/>
        <path id="pathA1_fill" fillRule="evenodd" d="M 8 8C 10.21 8 12 6.21 12 4C 12 1.79 10.21 0 8 0C 5.79 0 4 1.79 4 4C 4 6.21 5.79 8 8 8ZM 8 10C 5.33 10 0 11.34 0 14L 0 16L 16 16L 16 14C 16 11.34 10.67 10 8 10Z"/>
        </defs>
      </svg>
    </div>
  )
}

export default Avatar;
