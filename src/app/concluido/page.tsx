"use client"

import Image from 'next/image';
import { useRouter } from 'next/router';

interface Item {
    id: string;
    src: string;
    checked: boolean;
}


export default function Concluido() {
    
    const router = useRouter();
    const { id, o4: option4, o5: option5, fc: finalChoice } = router.query;

    let item: Item = {
        id: finalChoice as string,
        checked: false,
        src: `/img/${finalChoice}.png`
    }

    //TODO: SALVAR

    return (
        <main className="flex flex-col min-h-screen w-full items-center justify-center">
            <div className='flex gap-18 w-full justify-center gap-16'>
                <Image className="h-[473px]" width="183" height="473" src={item.src} alt="" />
            </div>

            <h1 className='text-xl font-bold mt-6'>
            Obrigado!
            </h1>
        </main>
    );
}