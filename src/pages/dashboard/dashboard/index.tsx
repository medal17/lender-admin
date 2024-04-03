import React, { useEffect, useState } from 'react'
import { DataCard, StatsDataCard } from './components/DataCard'
import { StatsMeterGreen, StatsMeterOrange } from '../../../assets/icons/StatsMeter'
import { ExportIcon } from '../../../assets/icons/ExportIcon'
import { tabelTitleStyle } from '../wallet/wallet'
import { BarChart } from '../../../components/charts/BarChart'
import { ChartTab } from './components/ChartTab'
import { getDashboardGraph, getStats } from '../../../shared/services/dashboard.services'
import { useGetWalletDeatils } from '../../../shared/hooks/useGetWalletDetails'
import { useRequest } from '../../../shared/hooks/useRequest'
import { ENDPOINTS } from '../../../shared/constants'
import { AuthPayload } from '../../../shared/authPayload'
import html2canvas from 'html2canvas'
import { Spin } from 'antd'

export const Dashboard = () => {
    const [stats, setStats] = useState('');
    const [allData, setAllData] = useState<any>()
    const [loading, setLoading] = useState(false)
    const [allDataTab, setCurrentTab] = useState(new Date().getFullYear())
    const [disbursed, setDisbursed] = useState(new Date().getFullYear())
    const [repaidYear, setRepaid] = useState(new Date().getFullYear())
    const { data, isLoading } = useRequest(`${ENDPOINTS.LOAN}fetch/loan/details/count/amount`, 'get',
        'mystats')
    const chartData = useRequest(`${ENDPOINTS.LOAN}partner/loan/graph`, 'post', allDataTab.toString(),
        { ...AuthPayload, year: allDataTab, loanStatus: '' });

    const disbursedChartData = useRequest(`${ENDPOINTS.LOAN}partner/loan/graph`, 'post', '',
        { ...AuthPayload, year: disbursed, loanStatus: 'Active' }, disbursed);

    const repaidChartData = useRequest(`${ENDPOINTS.LOAN}partner/loan/graph`, 'post', 'rapid',
        { ...AuthPayload, year: repaidYear, loanStatus: 'Settled' }, repaidYear)

    // const getChartData(year:number, status:string) {
    //         return useRequest(`${ENDPOINTS.LOAN}partner/loan/graph`,'post',allDataTab,
    // {...AuthPayload, year:allDataTab,loanStatus:''})
    // }

    const statsData = data?.data?.loanAnalyticsCountDetails;
    const amountStatsData = data?.data?.loanAnalyticsAmountDetails;

    const downloadReceipt = (id: string) => {
        html2canvas(document.querySelector(`#${id}`), {
            onclone: function (document) {
                const style = document.createElement('style');
                style.innerHTML = '.py-2{padding-bottom:18px;}';
                document.body.appendChild(style);
            }
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = imgData;
            downloadLink.download = id.split('_') + '.png';
            downloadLink.click();
        });

    };

    // useEffect(() => {
    //     // getStats(setStats, ()=>setLoading)
    //     // getDashboardGraph(allYear,setAllData,setLoading, '')
    // }, [])

    const dataList = [
        {
            title: 'Approved Loans' || '',
            value: statsData?.approved?.value || 0,
            percentage: statsData?.approved?.percentageValue || 0,
            color: '#D9FBE4', status: statsData?.approved?.status || 0
        },
        {
            title: 'Declined Loans' || '',
            value: statsData?.declined?.value || 0,
            percentage: statsData?.declined?.percentageValue8 || 0,
            color: '#F3E8FF', status: statsData?.declined?.status || 0
        },
        {
            title: 'Pending Loans' || '',
            value: statsData?.pending?.value || 0,
            percentage: statsData?.pending?.percentageValue || 0,
            color: '#FEF8F1', status: statsData?.pending?.status || 0
        }
    ]
    const activeRapidList = [
        // { title: 'Approved Loans', value: '10000', percentage: '+11%', color: '#D9FBE4', meter: <StatsMeterOrange /> },
        {
            title: 'Active Loans' || '',
            value: statsData?.active?.value || 0,
            percentage: statsData?.active?.percentageValue || 0,
            color: '#D9FBE4', status: statsData?.active?.status || 0,
            // meter: <StatsMeterOrange/>
        },
        {
            title: 'Settled Loans' || '',
            value: statsData?.settled?.value || 0,
            percentage: statsData?.settled?.percentageValue || 0,
            color: '#FEF8F1', status: statsData?.settled?.status || 0,
            // meter: <StatsMeterGreen/>
        },
    ]

    const amountList = [
        {
            title: amountStatsData?.active?.name || '',
            value: amountStatsData?.active?.value || 0,
            percentage: amountStatsData?.active?.percentageValue || 0,
            color: '#D9FBE4', status: amountStatsData?.active?.status || 0,
            meter: <StatsMeterOrange />
        },
        {
            title: amountStatsData?.repaid?.name || '',
            value: amountStatsData?.repaid?.value || 0,
            percentage: amountStatsData?.repaid?.percentageValue || 0,
            color: '#D9FBE4', status: amountStatsData?.repaid?.status || 0,
            meter: <StatsMeterGreen />
        }
    ]

    return (
        isLoading ?
            <div className='py-40 my-auto text-center'>
                <span className="relative flex h-10 w-10 mx-auto">
                    <Spin size="large" />
                </span>
                Loading Data
            </div> :
            <div className='py-5 w-full'>
                <div className='w-full lg:mr-10 mr-0'>
                    <div className='w-[100%] flex overflow-x-scroll pb-2'>
                        {dataList.map((item: any) =>
                            <div className='min-w-[352px] px-3'>
                                <DataCard
                                    color={item?.color}
                                    title={item?.title}
                                    value={Number(item?.value)}
                                    isCount
                                    percentage={`${item?.status === 'Positive' ? '+' : ''}
                            ${item?.percentage} %`}
                                />
                            </div>
                        )
                        }
                        {activeRapidList.map((item: any) =>
                            <div className='min-w-[352px] px-3'>
                                <StatsDataCard
                                    color={item?.color}
                                    title={item?.title}
                                    value={item?.value}
                                    isCount
                                    percentage={item?.percentage}
                                    meterElement={item?.meter}
                                />
                            </div>
                        )
                        }
                    </div>
                </div>
                {/* <div className='flex py-5'>
                {activeRapidList.map((item: any) =>
                    <div className='w-6/12 px-3'>
                        <StatsDataCard
                            color={'#fff'}
                            title={item?.title}
                            value={item?.value}
                            isCount
                            percentage={item?.percentage}
                            meterElement={item?.meter}
                        />
                    </div>
                )
                }
            </div> */}
                <div className='flex  py-8'>
                    {amountList.map((item: any) =>
                        <div className='w-6/12 px-3'>
                            <StatsDataCard
                                color={'#fff'}
                                title={item?.title}
                                value={item?.value}
                                percentage={item?.percentage}
                                meterElement={item?.meter}
                            />
                        </div>
                    )
                    }
                </div>

                <div className='px-3'>
                    <div id='Loan-Requests' className='shadow-md rounded-xl py-3 bg-[#fff]'>
                        <div className='mb-8 p-5 flex justify-between'>
                            <div className='my-auto text-lg font-[600]'>Loan Request</div>
                            <div className='my-auto'>
                                <ChartTab setCurrentTab={setCurrentTab} currentTab='This Year' tabList={['This Year', 'Last Year', 'Custom Year']} />
                            </div>
                            <div onClick={() => downloadReceipt('Loan-Requests')}
                                className={`${tabelTitleStyle} cursor-pointer mx-5 px-3`}>
                                <div data-html2canvas-ignore="true">
                                    <ExportIcon />
                                </div> &nbsp;
                                <div className='my-auto'>Export</div>
                            </div>
                        </div>
                        <div className='h-[300px] font-poppins my-5 px-5 w-full flex justify-center'>
                            <BarChart dataList={chartData?.data ? chartData?.data?.data?.graphDetails?.map((item: any) => item?.y_value) : []} />
                        </div>
                    </div>

                    {/* <div className='my-10'>
                    <div className='flex '>
                        {dataList.map((item: any) =>
                            <div className='w-4/12 px-3'>
                                <DataCard
                                    color={'#fff'}
                                    title={item?.title}
                                    value={item?.value}
                                    isCount
                                    percentage={item?.percentage}
                                />
                            </div>
                        )
                        }
                    </div> */}
                    {/* <div className='flex py-5'>
                        {activeRapidList.map((item: any) =>
                            <div className='w-6/12 px-3'>
                                <StatsDataCard
                                    color={'#fff'}
                                    title={item?.title}
                                    value={item?.value}
                                    percentage={item?.percentage}
                                    meterElement={item?.meter}
                                />
                            </div>
                        )
                        }
                    </div> */}

                </div>

                <div id='Disbursed-Loans' className='shadow-md rounded-xl py-3 my-10 bg-[#fff]'>
                    <div className='mb-8 p-5 flex justify-between'>
                        <div className='my-auto text-lg font-[600]'>Disbursed Loans</div>
                        <div className='my-auto'>
                            <ChartTab setCurrentTab={setDisbursed} currentTab='This Year' tabList={['This Year', 'Last Year', 'Custom Year']} />
                        </div>
                        <div onClick={() => downloadReceipt('Disbursed-Loans')} className={`${tabelTitleStyle} cursor-pointer mx-5 px-3`}>
                            <div data-html2canvas-ignore="true">
                                <ExportIcon />
                            </div>&nbsp;
                            Export
                        </div>
                    </div>
                    <div className='h-[300px] fosnt-poppins my-5 px-5 w-full flex justify-center'>
                        <BarChart bg='#068037' dataList={disbursedChartData?.data?.data?.graphDetails?.map((item: any) => item?.y_value) || []} />
                    </div>
                </div>

                <div id='Repaid-Loans' className='shadow-md rounded-xl py-3 my-10 bg-[#fff]'>
                    <div className='mb-8 p-5 flex justify-between'>
                        <div className='my-auto text-lg font-[600]'>Repaid Loans</div>
                        <div className='my-auto'>
                            <ChartTab currentTab='This Year' tabList={['This Year', 'Last Year', 'Custom Year']} setCurrentTab={setRepaid} />
                        </div>
                        <div onClick={() => downloadReceipt('Repaid-Loans')} className={`${tabelTitleStyle} cursor-pointer mx-5 px-3`}>
                            <div data-html2canvas-ignore="true">
                                <ExportIcon />
                            </div> &nbsp;
                            Export
                        </div>
                    </div>
                    <div className='h-[300px] fosnt-poppins my-5 px-5 w-full flex justify-center'>
                        <BarChart bg='#068037' dataList={repaidChartData?.data?.data?.graphDetails?.map((item: any) => item?.y_value)} />
                    </div>
                </div>

                {/* <div className='shadow-md rounded-xl py-3 my-10 bg-[#fff]'>
                    <div className='mb-8 p-5 flex justify-between'>
                        <div className='my-auto text-lg font-[600]'>Total Revenue</div>
                        <div className='my-auto'>
                            <ChartTab currentTab='This Year' tabList={['This Year', 'Last Year', 'Custom Year']} />
                        </div>
                        <div className={`${tabelTitleStyle} mx-5 px-3`}>
                            <ExportIcon /> &nbsp;
                            Export
                        </div>
                    </div>
                    <div className='h-[300px] fosnt-poppins my-5 px-5 w-full flex justify-center'>
                        <BarChart bg='#068037' />
                    </div>
                </div>

                <div className='shadow-md rounded-xl py-3 my-10 bg-[#fff]'>
                    <div className='mb-8 p-5 flex justify-between'>
                        <div className='my-auto text-lg font-[600]'>Partner Commission</div>
                        <div className='my-auto'>
                            <ChartTab currentTab='This Year' tabList={['This Year', 'Last Year', 'Custom Year']} />
                        </div>
                        <div className={`${tabelTitleStyle} mx-5 px-3`}>
                            <ExportIcon /> &nbsp;
                            Export
                        </div>
                    </div>
                    <div className='h-[300px] fosnt-poppins my-5 px-5 w-full flex justify-center'>
                        <BarChart bg='#068037' />
                    </div> */}
            </div>
        // </div> 
        // </div>
    )
}


