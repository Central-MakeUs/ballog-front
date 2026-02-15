import type { SVGProps } from "react";
import { memo } from "react";
const BlackCloseButton = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 12 12" focusable="false" {...props}><path fill="#212121" d="M6 7.167 1.917 11.25a.8.8 0 0 1-.584.23.8.8 0 0 1-.583-.23.8.8 0 0 1-.23-.583.8.8 0 0 1 .23-.584L4.833 6 .75 1.917a.8.8 0 0 1-.23-.584A.8.8 0 0 1 .75.75a.8.8 0 0 1 .583-.23.8.8 0 0 1 .584.23L6 4.833 10.083.75a.8.8 0 0 1 .584-.23.8.8 0 0 1 .583.23.8.8 0 0 1 .23.583.8.8 0 0 1-.23.584L7.167 6l4.083 4.083a.8.8 0 0 1 .23.584.8.8 0 0 1-.23.583.8.8 0 0 1-.583.23.8.8 0 0 1-.584-.23z" /></svg>;
const Memo = memo(BlackCloseButton);
export default Memo;