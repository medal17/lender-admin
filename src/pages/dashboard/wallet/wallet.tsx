import React, { useEffect, useState } from 'react'
import { MoneyWallet } from '../../../assets/icons/MoneyWallet'
import { WalletTable } from '../../../components/tables/walletTable'
import { WALLET_DATA } from '../../../shared/constants/dummyList'
import { AiFillEye } from 'react-icons/ai'
import { FiSearch } from 'react-icons/fi'
import { BiFilter } from 'react-icons/bi'
import { RiEyeCloseLine } from 'react-icons/ri'
import { ExportIcon } from '../../../assets/icons/ExportIcon'
import { decimalCurrency } from '../../../shared/currencyFormat'
import { CustomModal } from '../../../components/modal'
import { AddMoney } from './addMoney'
import { Popover } from 'antd'
import { FilterMenu } from './components/FilterMenu'
import { ExportMenu } from './components/ExportMenu'
import { EyeIcon } from '../../../assets/icons/EyeIcon'
import { ViewDetails } from './viewDetails'
import { TablePagination } from '../../../components/tables/TablePagination'
import { exportTxnDetails, filterTxnDetails, getWalletBalance, getWalletHistory, getWalletParams } from '../../../shared/services/wallet.service'
import { walletBalanceModel } from '../../../shared/models/wallet.model'
import { AuthPayload } from '../../../shared/authPayload'
import { useRequest } from '../../../shared/hooks/useRequest'
import { BASE_URL, ENDPOINTS } from '../../../shared/constants'


export const tabelTitleStyle = 'bg-transparent py-1.5 py-1-half flex align-middle border font-[400] rounded-md border-darkGrey border-opacity-60';

export const Wallet = () => {
    const headings = ['S/N', 'Transaction Date ', 'Reference Number', 'Description', 'Name', 'Amount', 'Status', 'Action']
    const keys = ['sn', 'transactionEndDate', 'transactionReference', 'narration', 'receiverName', 'transactionAmount', 'transactionEvent', 'Action']
    const tabelTitleStyle = 'bg-transparent py-2 flex border-2 rounded-md border-darkGrey';
    const [details, setDetails] = useState<any>()
    const [openDetails, setOpenDetails] = useState(false)
    const [openAddMoney, setAddMoney] = useState(false)
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [walletDetails, setWalletDetails] = useState<walletBalanceModel>()
    const [walletHistory, setWalletHistory] = useState<any>()
    const [payloadData, setPayloadData] = useState<any>()
    const [walletParams, setWalletParams] = useState('')
    const [openFilter, setOpenFilter] = useState(false)
    const [openExport, setOpenExport] = useState(false)
    const [refresh, setRefresh] = useState('')
    const [currentPage, setCurrentPage] = useState({page:0})
    const [seeBalance, setSeeBalance] = useState(true)
    // const [refreshm]
    const handleSelect = (data: any) => { setDetails(data); setOpenDetails(data) }
    const [filterData, setFilterData] = useState({
        "transactionStatus": null,
        "transactionStartDate": null,
        "transactionEndDate": null,
        referenceNumber: '',
        narration: '',

    })

    const walletBalanceInfo = useRequest(`${ENDPOINTS.WALLET}my/wallet/balance`,'get','get-wallet-balance');
    // console.log('wallet-i n',getWalletBalanceInfo?.data?.data?.walletInfos)
    const walletData =  
     useRequest(`${ENDPOINTS.TRANSACTION}my/transaction/history`, 'post',
        'get-wallet-history', 
        search?
        { ...AuthPayload, ...filterData,...payloadData, genericSearchParameter:search,
            walletIds:walletBalanceInfo?.data?.data &&walletBalanceInfo?.data?.data?.walletInfos.map(item => item.walletId),
            pageSize:10, page:currentPage?.page }
        
        :{ ...AuthPayload, ...filterData,...payloadData, 
            walletIds:walletBalanceInfo?.data?.data &&walletBalanceInfo?.data?.data?.walletInfos.map(item => item.walletId),
            pageSize:10, page:currentPage?.page }, 
        currentPage?.page, refresh, walletBalanceInfo?.data?.data)||undefined;


    const handleFilterValue = (name: string, value: any) => {
        setFilterData({ ...filterData, [name]: value })
    }

    const searchWalletHistory = () => {
        walletData?.refetch()
        setLoading(true)
    }

    const paramsCallback = (response: any) => {
        setWalletParams(response && response.runtimeEnvInfos[0].runtimeParams)
    }

    useEffect(() => {
        // setLoading(true)
        // getWalletBalance(callback);
        getWalletParams(paramsCallback, { runtimeEnvironments: ['TRANSACTION_STATUS_LIST'] })
    }, [])

    // const walletHistoryCallback = (response: any) => {
    //     setWalletHistory(response?.data);
    //     setLoading(false);
    //     setOpenDetails(false);
    // }
    // const callback = (response: walletBalanceModel) => {
    //     // setWalletDetails(response);
    //     setPayloadData({ ...payloadData, walletIds: response.walletInfos.map(item => item.walletId) })
    //     search ?
    //         getWalletHistory(walletHistoryCallback, { ...payloadData, walletIds: response.walletInfos.map(item => item.walletId) }, search)
    //         :
    //         getWalletHistory(walletHistoryCallback, { ...payloadData, walletIds: response.walletInfos.map(item => item.walletId) })
    // }

    const handleMenu = (type: string) => {
        // console.log()
        if (type === 'export') {
            setOpenExport(!openExport);
            setOpenFilter(false)
        } else {
            setOpenExport(false)
            setOpenFilter(!openFilter)
        }

    }

    const handleNext = (data: any) => {
        let currentP = data?.page
        // setCurrent
        getWalletHistory({ ...payloadData, page: currentP, pageSize: 10, lastRecord: walletHistory?.currentLastRecord })
    }

    return (
        <div className='mb-4 w-full'>
            <div className='lg:w-full flex flex-wrap justify-between align-middle w-full bg-white rounded-lg p-8 shadow-md'>
                <div className='flex flex-wrap'>
                    <div className='p-4 bg-orange bg-opacity-20 rounded-full w-fit md:flex hidden'>
                        <MoneyWallet />
                    </div>
                    <div className='my-auto ml-4'>
                        <p className='text-darkGrey'>Wallet Balance</p>
                        <p className='text-[23px] flex align-middle font-semibold '>
                            <div className='w-[200px]'>{seeBalance ?
                                decimalCurrency(
                                    walletBalanceInfo?.data?.data?.totalAvailableBalance || 0,
                                    walletBalanceInfo?.data?.data?.currency?.symbol) : '********'} </div>
                            <span
                                onClick={() => setSeeBalance(!seeBalance)}
                                className='my-auto text-[28px] ml-2 cursor-pointer'>
                                {seeBalance ?
                                    <div className='my-auto'><EyeIcon /></div>
                                    :
                                    <RiEyeCloseLine className='my-auto' />}
                            </span>
                        </p>
                    </div>
                </div>
                <div
                    onClick={() => setAddMoney(true)}
                    className='my-auto bg-primary-light px-5 rounded-md cursor-pointer py-1 text-white'
                >
                    <p >Fund Wallet</p>
                </div>
            </div>
            <div className='lg:w-full my-5 justify-between align-middle w-full bg-white rounded-lg py-8 shadow-md'>
                <div className='px-5 mb-5 flex flex-wrap justify-between'>
                    <h4 className='text-[18px]'><b>Wallet Statement</b></h4>

                    <div className='flex flex-wrap'>
                        <div className='flex border-2 rounded-md md:w-[350px] w-full md:my-0 my-3 border-darkGrey pl-2'>
                            <FiSearch className='text-darkGrey text-[20px] my-auto' />
                            <input
                                placeholder='Search'
                                className='bg-transparent mx-2 py-2 md:w-[230px] w-full outline-none'
                                onChange={(value: any) => setSearch(value.target.value)}
                            />
                            <div onClick={() => searchWalletHistory()} className='bg-primary-light cursor-pointer flex align-middle  rounded-md text-white my-1'>
                                <div className='h-fit px-2 my-auto'>Search</div>
                            </div>
                        </div>
                        <div onClick={() => handleMenu('filter')}
                            className={`${tabelTitleStyle} md:w-fit w-5/12
                            cursor-pointer md:mx-5 mx-1.5 md:px-5 px-1.5`}>
                            <BiFilter className={`text-[25px] mr-1 my-auto`} />
                            Filter
                        </div>
                        <Popover
                            content={
                                <FilterMenu
                                    filterValue={filterData}
                                    handleFilterValue={handleFilterValue}
                                    handleClose={() => setOpenFilter(false)}
                                    setWalletHistory={setWalletHistory}
                                    walletDetails={walletBalanceInfo?.data?.data}
                                    refresh={walletData?.refetch}
                                />}
                            trigger={'click'}
                            placement='bottom'
                            open={openFilter}
                        // className={`${tabelTitleStyle} mx-5 px-5`}
                        >
                            {/* <BiFilter className='text-[25px] mr-1 my-auto' />
                            Filter */}
                        </Popover>
                        <div
                            onClick={() => handleMenu('export')}
                            className={`${tabelTitleStyle} md:w-fit w-5/12
                            cursor-pointer md:mx-5 mx-1.5 md:px-5 px-1.5`}
                        >
                            <ExportIcon /> &nbsp;
                            Export
                        </div>
                        <Popover
                            content={
                                <ExportMenu
                                    filterValue={filterData}
                                    handleClose={() => setOpenExport(false)}
                                    walletDetails={walletBalanceInfo?.data?.data}
                                />}
                            trigger={'click'}
                            placement='bottomLeft'
                            open={openExport}

                        // className={`${tabelTitleStyle} mx-5 px-5`}
                        >

                        </Popover>
                    </div>
                </div>

                {/* {walletData&&walletData?.data?.data&&walletData?.data?.data?.pages&& */}
                <WalletTable
                    headings={headings}
                    tableData={walletData?.data?.data?.contents || []}
                    keys={keys}
                    actionElement={<ActionButton />}
                    actionButtonAction={handleSelect}
                    paginatedData={walletData?.data?.data}
                    setPayloadData={() => null}
                    getHistory={() => null}
                    payloadData={undefined}
                    isLoading={walletData.isLoading}
                />
               {/* / } */}

                {walletData && walletData?.data && walletData?.data?.data&&walletData?.data?.data?.pages ?
                    <div className='py-3'>
                        <TablePagination
                            currentPage={currentPage?.page}
                            lastPage={walletData?.data?.data?.currentLastRecord}
                            nextPageAction={null} 
                            prevPageAction={() => null}
                            setPage={setCurrentPage} totalPages={walletData?.data?.data?.pages}
                        />
                        {/* <TablePagination 
                        totalPages={walletHistory?.pages} currentPage={walletHistory?.current_page} /> */}
                    </div>
                    :
                    <></>}
            </div>
            <CustomModal
                status={openAddMoney}
                bgColor={''}
                toggle={() => setAddMoney(false)}
                component={<AddMoney closeModal={() => setAddMoney(false)} walletDetails={walletBalanceInfo?.data?.data} />}
            />
            <CustomModal
                size='550px'
                status={openDetails}
                bgColor={''}
                toggle={() => setOpenDetails(false)}
                component={<ViewDetails closeModal={() => setOpenDetails(false)} walletDetails={details} />}
            />

        </div>
    )
}

const ActionButton = () => {
    return (<div className='flex text-primary-light cursor-pointer'>
        <AiFillEye className='my-auto text-[20px] mr-2' />
        <b>View</b>
    </div>)
}