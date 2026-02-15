import type { SVGProps } from "react";
import { memo } from "react";
const CalendarLeftArrow = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 10 18" focusable="false" {...props}><path fill="#9E9E9E" d="M9.742 1.36 1.765 8.535a.625.625 0 0 0 0 .93l7.977 7.175A.78.78 0 0 1 8.7 17.8L.724 10.625a2.186 2.186 0 0 1 0-3.25L8.7.2a.778.778 0 1 1 1.042 1.16" /></svg>;
const Memo = memo(CalendarLeftArrow);
export default Memo;