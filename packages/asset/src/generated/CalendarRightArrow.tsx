import type { SVGProps } from "react";
import { memo } from "react";
const CalendarRightArrow = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 22 22" focusable="false" {...props}><path fill="#9E9E9E" d="m6.258 3.36 7.977 7.175c.256.23.277.626.047.883l-.047.047-7.977 7.175A.78.78 0 0 0 7.3 19.8l7.976-7.175q.087-.078.165-.165a2.187 2.187 0 0 0-.165-3.085L7.3 2.2a.779.779 0 1 0-1.042 1.16" /></svg>;
const Memo = memo(CalendarRightArrow);
export default Memo;