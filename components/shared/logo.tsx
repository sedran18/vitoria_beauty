import {APP_NAME} from '@/lib/constants';

export default function Logo() {
    return (<div className='font-semibold'>
    <h1 className={`tracking-widest uppercase text-xs lg:text-[22px]`}>{APP_NAME}</h1>
        <h2 className={` text-[8px] lg:text-[10px] text-center uppercase`}>Vitoria Trindade</h2>
    </div>)
}