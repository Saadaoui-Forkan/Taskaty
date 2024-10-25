import Link from "next/link";

interface PaginationProps {
    pages: number;
    pageNumber: number;
    route: string;
}

const Pagination = ({ pages, pageNumber, route }: PaginationProps) => {
    const pageLimit = 2;
    const startPage = Math.max(1, pageNumber - Math.floor(pageLimit / 2));
    const endPage = Math.min(pages, startPage + pageLimit - 1);

    const prev = pageNumber - 1;
    const next = pageNumber + 1;
    return (
        <>
            {pages > 1 ? <div className="flex flex-wrap items-center justify-center mt-5 mb-10 space-x-1">
                {pageNumber !== 1 && (
                    <Link
                        href={`${route}?pageNumber=${prev}`}
                        className="mx-1 py-1 px-3 md:px-4 border rounded-l-lg shadow-md cursor-pointer text-sm md:text-base transition
                 bg-white text-slateGray hover:bg-coralRed hover:text-white
                 dark:bg-coolGray dark:text-white dark:hover:bg-dustyGray"
                    >
                        Prev
                    </Link>
                )}

                {startPage > 1 && (
                    <>
                        <Link
                            href={`${route}?pageNumber=1`}
                            className="mx-1 py-1 px-3 md:px-4 border rounded-md shadow-md cursor-pointer text-sm md:text-base transition
                   bg-white text-slateGray hover:bg-coralRed hover:text-white
                   dark:bg-coolGray dark:text-white dark:hover:bg-dustyGray"
                        >
                            1
                        </Link>
                        {startPage > 2 && <span className="mx-2 text-slateGray dark:text-white">...</span>}
                    </>
                )}

                {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
                    <Link
                        href={`${route}?pageNumber=${page}`}
                        key={page}
                        className={`mx-1 py-1 px-3 md:px-4 border rounded-md shadow-md cursor-pointer text-sm md:text-base transition
                                    ${pageNumber === page
                                        ? "bg-coralRed text-white"
                                        : "bg-white text-slateGray dark:bg-coolGray dark:text-white"
                                    }
                                    hover:bg-coralRed hover:text-white dark:hover:bg-dustyGray`}
                    >
                        {page}
                    </Link>
                ))}

                {endPage < pages && (
                    <>
                        {endPage < pages - 1 && <span className="mx-2 text-slateGray dark:text-white">...</span>}
                        <Link
                            href={`${route}?pageNumber=${pages}`}
                            className="mx-1 py-1 px-3 md:px-4 border rounded-md shadow-md cursor-pointer text-sm md:text-base transition
                   bg-white text-slateGray hover:bg-coralRed hover:text-white
                   dark:bg-coolGray dark:text-white dark:hover:bg-dustyGray"
                        >
                            {pages}
                        </Link>
                    </>
                )}

                {pageNumber !== pages && (
                    <Link
                        href={`${route}?pageNumber=${next}`}
                        className="mx-1 py-1 px-3 md:px-4 border rounded-r-lg shadow-md cursor-pointer text-sm md:text-base transition
                                bg-white text-slateGray hover:bg-coralRed hover:text-white
                                dark:bg-coolGray dark:text-white dark:hover:bg-dustyGray"
                    >
                        Next
                    </Link>
                )}
            </div> : ""}
        </>
    );
};

export default Pagination;