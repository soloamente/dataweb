import { type SVGProps } from "react";

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: string;
}

function IconParty({ size = "20px", ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      {...props}
    >
      <path
        d="m17.722,4.529l-1.521-.752-.752-1.521c-.168-.341-.729-.341-.896,0l-.752,1.521-1.521.752c-.171.084-.278.258-.278.448s.107.364.278.448l1.521.752.752,1.521c.084.17.258.278.448.278s.364-.108.448-.278l.752-1.521,1.521-.752c.171-.084.278-.258.278-.448s-.107-.364-.278-.448Z"
        fill="currentColor"
        strokeWidth="0"
        data-color="color-2"
      ></path>
      <circle
        cx="9.25"
        cy="3.25"
        r="1.25"
        fill="currentColor"
        strokeWidth="0"
        data-color="color-2"
      ></circle>
      <circle
        cx="16.75"
        cy="10.75"
        r="1.25"
        fill="currentColor"
        strokeWidth="0"
        data-color="color-2"
      ></circle>
      <path
        d="m3.044,15.72l2.745-9.017c.218-.715,1.118-.94,1.647-.412l6.274,6.274c.529.529.303,1.429-.412,1.647l-9.018,2.745c-.757.231-1.466-.477-1.235-1.235h0Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        fill="currentColor"
      ></path>
    </svg>
  );
}

export default IconParty;
