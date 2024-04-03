import React from 'react'
import { StatsArrowUp } from '../../../../assets/icons/StatsArrowUp'
import { decimalCurrency, noSymbolCount, noSymbolCurrecncy } from '../../../../shared/currencyFormat'

interface DataCardProps {
    color: string,
    title: string,
    value: string | number,
    percentage: string,
    isCount?: boolean,
    gradientFrom?:string,
    gradientTo?:string,
    meterElement?:any

}
export const DataCard = (props: DataCardProps) => {
    const { color, isCount, gradientFrom, gradientTo } = props
    return (
        <div style={{ background: color }} className={`bg-[${color}] p-5 rounded-md`}>
            <p className={`text-[${color}]`}>{props.title}</p>
            <p className='font-[700] text-[32px] py-3'>
                {isCount ?
                    noSymbolCount(Number(props.value))
                    : decimalCurrency(Number(props.value))}
            </p>
            {/* <p className='text-xs font-[400] flex'>
                {props.percentage} Per Month &nbsp; <StatsArrowUp />
            </p> */}
        </div>
    )
}

export const StatsDataCard = (props: DataCardProps) => {
    const { color, isCount, gradientFrom, gradientTo } = props

    return (
        <div style={{ background: color }} className={`bg-[${color}] shadow-sm  flex justify-between rounded-lg`}>
            <div className='p-5'>
                <p className={`text-[${color}]`}>{props.title}</p>
                <p className='font-[700] text-[32px] py-3'>
                    {isCount ?
                        noSymbolCount(Number(props.value))
                        : decimalCurrency(Number(props.value))}
                </p>
                {/* <p className='text-xs font-[400] flex'>
                    {props.percentage} Per Month &nbsp; <StatsArrowUp />
                </p> */}
            </div>
            <div className='mt-auto'>
                {props.meterElement}
                {/* <StatsMeter from={gradientFrom} tostring={gradientTo}/> */}
            </div>
        </div>
    )
}
