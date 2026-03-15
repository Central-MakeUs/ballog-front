import type { SVGProps } from "react";
import { memo } from "react";
const Notification = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" focusable="false" {...props}><path fill="#9E9E9E" d="M5 19a.97.97 0 0 1-.713-.288A.97.97 0 0 1 4 18q0-.424.287-.712A.97.97 0 0 1 5 17h1v-7q0-2.074 1.25-3.687T10.5 4.2v-.7q0-.625.438-1.062A1.45 1.45 0 0 1 12 2q.624 0 1.063.438.437.436.437 1.062v.7q2 .5 3.25 2.113T18 10v7h1q.424 0 .712.288.288.287.288.712 0 .424-.288.712A.97.97 0 0 1 19 19zm7 3q-.825 0-1.412-.587A1.93 1.93 0 0 1 10 20h4q0 .824-.588 1.413A1.93 1.93 0 0 1 12 22" /></svg>;
const Memo = memo(Notification);
export default Memo;