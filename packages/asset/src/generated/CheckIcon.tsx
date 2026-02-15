import type { SVGProps } from "react";
import { memo } from "react";
const CheckIcon = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 124 95" focusable="false" {...props}><circle cx={62} cy={47} r={40} fill="#4EB65A" /><path stroke="#fff" strokeLinecap="round" strokeWidth={6} d="m41 47.556 10.587 11.381a4 4 0 0 0 5.78.08L80 36" /></svg>;
const Memo = memo(CheckIcon);
export default Memo;