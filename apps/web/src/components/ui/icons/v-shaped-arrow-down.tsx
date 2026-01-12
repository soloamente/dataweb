
import type { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  strokeWidth?: number;
  size?: string;
}

export default function VShapedArrowDown({strokeWidth = 1.5, size = '18px', ...props}: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={size} height={size} viewBox="0 0 18 18" {...props}><polyline points="15.25 7.5 9 11.75 2.75 7.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth}></polyline></svg>
  );
};

