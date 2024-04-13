"use client"

import React, { Suspense, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'

interface Item {
    id: string;
    src: string;
    checked: boolean;
}

export default function Etapa6() {
    
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const option4 = searchParams.get('o4')
    const option5 = searchParams.get('o5')

    let items: Item[] = [
        {
            id: option4!,
            checked: false,
            src: `/img/${option4}.png`
        },
        {
            id: option5!,
            checked: false,
            src: `/img/${option5}.png`
        }
    ]

    const [itemsState, setItemsState] = useState<Item[]>(items)

    const handleCheck = (checked_index: number) => 
        setItemsState(
            itemsState.map((item, index) => 
                index == checked_index
                    ? {...item, checked: true} 
                    : {...item, checked: false}
            )
        )
    
    const isChecked = () => itemsState.filter((item) => item.checked == true).length > 0

    return (
        <Suspense fallback={<div className='flex items-center justify-center'>Carregando</div>}>
        <main className="flex flex-col min-h-screen w-full items-center justify-center">
            <div className='flex gap-18 w-full justify-center gap-16'>

                {itemsState.map((item, index) => (
                    <div key={index} className='flex flex-col gap-4'>
                        <input
                            type="radio"
                            checked={item.checked}
                            className="w-8 h-8"
                            onChange={() => handleCheck(index)}
                        />
                        <Image className="h-[473px]" width="183" height="473" src={item.src} alt="" />
                    </div>
                ))}
            </div>

            <button 
            className={`
            text-white bg-gradient-to-br 
            from-pink-500 to-orange-400 
            hover:bg-gradient-to-bl focus:ring-4 
            focus:outline-none focus:ring-pink-200 
            font-medium rounded-lg 
            text-sm px-5 py-2.5 
            text-center me-2 mb-2 mt-10
            `}>
                    <Link href={isChecked() && `/concluido?id=${id}&o4=${option4}&o5=${option5}&fc=${itemsState.find((item) => item.checked == true)?.id}` || ""}>
                        Concluir
                    </Link>
            </button>
        </main>
        </Suspense>
    );
}