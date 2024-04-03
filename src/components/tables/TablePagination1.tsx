import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi'

interface PaginationModel {
    totalPages: number,
    currentPage: number,
    lastPage: any,
    nextPageAction: Function,
    prevPageAction: Function,
    setPage: Function
}

export const TablePagination = (props: PaginationModel) => {
    const [pageList, setPageList] = useState<Array<number>>([]);
    const [prevList, setPrevList] = useState([1, 2, 3])

    const [currentPageH, setCurrentPage] = useState<any>(1);

    const { totalPages, currentPage } = props
    useEffect(() => {
        setPageList([]);
        for (let i = 1; i <= props.totalPages; i++) {
            setPageList(current => [...current, i]);
        }
    }, [props.totalPages]);

    useEffect(() => {
        currentPage === prevList[2] && (prevList[prevList.length-1]+1)<pageList[pageList?.length - 3]&&
        setPrevList([prevList[2], prevList[2] + 1, prevList[2] + 2])
        currentPage === 1 && setPrevList([1, 2, 3])
    }, [currentPage])

    const handlePick = (page: any) => {
        setCurrentPage(page)
        props.setPage({ page: page, pageSize: 10, lastRecord: props.lastPage })
    }

    // console.log('prev-last', prevList[prevList.length-1]+1)
    // console.log('post-first', pageList[pageList?.length - 3])
    return (
        <div className='py-3 px-8 col-lg-11 mx-auto flex justify-between '>
            <button onClick={() => props.currentPage > 1 && handlePick(currentPage - 1)} className='h-fit flex border'>
                <BiArrowBack className='my-auto' />&nbsp;
                <div>Previous</div>
            </button>
            <div className='col-lg-5 mx-auto'>
                {totalPages > 0 && pageList?.length < 6 ? pageList.map((item, index) =>
                    (props.currentPage===0 ?
                        <button key={index} onClick={() => handlePick(item)} 
                        className={`page-button ${(item === props.currentPage||item===currentPage-1) ? 
                        'selected' : 'inactive px-3'} `}>
                        {item}
                    </button>
                        :<button key={index} onClick={() => handlePick(item)} 
                        className={`page-button ${item === props.currentPage ? 
                        'selected' : 'inactive px-3'} `}>
                        {item}
                    </button>)) :
                    <div className='mx-auto d-flex justify-content-center'>
                        {pageList[pageList?.length - 3] > prevList[2] ?
                            <>
                                <button onClick={() => handlePick(prevList[0])} className={`page-button ${prevList[0] === props.currentPage || currentPage === 0 ? 'selected' : 'inactive px-3'} `}>
                                    {prevList[0]}
                                </button>
                                <button onClick={() => handlePick(prevList[1])} className={`page-button ${prevList[1] === props.currentPage ? 'selected' : 'inactive px-4'} `}>
                                    {prevList[1]}
                                </button>
                                <button onClick={() => handlePick(prevList[2])} className={`page-button ${prevList[2] === props.currentPage ? 'selected' : 'inactive px-4'} `}>
                                    {prevList[2]}
                                </button>
                            </> :
                            <button onClick={() => handlePick(pageList[0])} className={`page-button ${pageList[0] === props.currentPage || currentPage === 0 ? 'selected' : 'inactive px-3'} `}>
                                {pageList[0]}
                            </button>
                        }
                        <span className='px-3 mt-2'>...</span>
                        <button onClick={() => handlePick(pageList?.length - 3)} className={`page-button ${pageList?.length - 3 === props.currentPage ? 'selected' : 'inactive px-4'} `}>
                            {pageList[pageList?.length - 3]}
                        </button>
                        <button onClick={() => handlePick(pageList?.length - 2)} className={`page-button ${pageList?.length - 2 === props.currentPage ? 'selected' : 'inactive px-4'} `}>
                            {pageList[pageList?.length - 2]}
                        </button>
                        <button onClick={() => handlePick(pageList?.length - 1)} className={`page-button ${pageList?.length - 1 === props.currentPage ? 'selected' : 'inactive px-4'} `}>
                            {pageList[pageList?.length - 1]}
                        </button>
                    </div>
                }
            </div>
            <button onClick={() => props.currentPage < pageList[pageList?.length - 1] && handlePick(currentPage + 1)} className='flex  border'>
                <div className='mr-2'>Next</div> &nbsp;
                <BiArrowBack className='arrow-right my-auto rotate-180' />
            </button>
        </div>
    )
}
