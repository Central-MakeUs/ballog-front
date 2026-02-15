import type { SVGProps } from "react";
import { memo } from "react";
const CheckStroke = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 15 12" focusable="false" {...props}><path fill="#fff" d="M12.7.4a1 1 0 1 1 1.6 1.2l-6.741 8.989a2 2 0 0 1-3.137.08L.232 5.64a1.001 1.001 0 0 1 1.537-1.282l4.19 5.03z" /></svg>;
const Memo = memo(CheckStroke);
export default Memo;