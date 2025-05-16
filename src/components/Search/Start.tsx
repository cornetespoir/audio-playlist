import { useSearchDataContext } from "@/context/SearchDataContext";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactElement } from "react";

function Start(): ReactElement {
    const searchParams = useSearchParams();
    const { setTag, setOffset } = useSearchDataContext()
    const pathname = usePathname()
    const router = useRouter()

    function setDemo() {
        setTag('maestro-demo')
        const params = new URLSearchParams(searchParams.toString())
        params.set('user', 'maestro-demo')
        setOffset(0)
        if (pathname.includes('playlist')) {
            router.push(`${pathname}?${params}`)
        }
        else {
            router.push(`${pathname}playlist?${params}`)
        }
    }
    return (
        <div className='start flex-wrap flex-column'>
            <h3>Don&apos;t know where to start?</h3>
            <button onClick={setDemo}>Try the demo</button>
        </div>
    )
}

export {
    Start
}