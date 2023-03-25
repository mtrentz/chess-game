import React from 'react'
import Image from 'next/image'
// Import from /public all svgs like bB.svg wP.svg.
import bB from '@/public/pieces/bB.svg'
import bK from '@/public/pieces/bK.svg'
import bN from '@/public/pieces/bN.svg'
import bP from '@/public/pieces/bP.svg'
import bQ from '@/public/pieces/bQ.svg'
import bR from '@/public/pieces/bR.svg'
import wB from '@/public/pieces/wB.svg'
import wK from '@/public/pieces/wK.svg'
import wN from '@/public/pieces/wN.svg'
import wP from '@/public/pieces/wP.svg'
import wQ from '@/public/pieces/wQ.svg'
import wR from '@/public/pieces/wR.svg'

type Props = {
    piece: string,
    color: string,
    onClick: () => void,
}


const SquareUI = ({ piece, color, onClick }: Props) => {
    return (
        <div
            className={`h-20 w-20 border border-black ${color}`}
            onClick={() => onClick()}
        >

            {/* Render correct image */}
            {piece === "bB" && <Image src={bB} alt="bB" />}
            {piece === "bK" && <Image src={bK} alt="bK" />}
            {piece === "bN" && <Image src={bN} alt="bN" />}
            {piece === "bP" && <Image src={bP} alt="bP" />}
            {piece === "bQ" && <Image src={bQ} alt="bQ" />}
            {piece === "bR" && <Image src={bR} alt="bR" />}
            {piece === "wB" && <Image src={wB} alt="wB" />}
            {piece === "wK" && <Image src={wK} alt="wK" />}
            {piece === "wN" && <Image src={wN} alt="wN" />}
            {piece === "wP" && <Image src={wP} alt="wP" />}
            {piece === "wQ" && <Image src={wQ} alt="wQ" />}
            {piece === "wR" && <Image src={wR} alt="wR" />}


        </div>
    )
}

export default SquareUI