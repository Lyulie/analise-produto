"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'

interface Item {
    id: string;
    src: string;
    checked: boolean;
}

export default function Concluido() {
    
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const option4 = searchParams.get('o4')
    const option5 = searchParams.get('o5')
    const finalChoice = searchParams.get('fc')

    let item: Item = {
        id: finalChoice!,
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