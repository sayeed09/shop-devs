import { usePdf } from "@mikecousins/react-pdf";
import React, { useRef, useState } from "react";
import { LoaderWithoutBackground } from "../../../views/cart/loader";

interface Props {
    pdfSrc: string;
}
const PdfReader = ({ pdfSrc }: Props) => {
    const [page, setPage] = useState(1);
    const canvasRef = useRef(null);
    const [loading, setLoading] = useState(true)
    const { pdfDocument } = usePdf({
        file: pdfSrc,
        page,
        canvasRef,
        onDocumentLoadSuccess: () => setLoading(false)
    });
    return <>
        {loading && <div className="pdf-reader-loader"><LoaderWithoutBackground /></div>}
        <canvas ref={canvasRef} />
        {Boolean(pdfDocument && pdfDocument.numPages) && (
            <div className="next-prev-btn-pdf">

                <img onClick={() => page === 1 ? {} : setPage(page - 1)} src="https://cdn.shopify.com/s/files/1/2393/2199/files/chevron_left_black.svg?v=1724078330" />
                <span>Page {page}/{pdfDocument?.numPages}</span>
                <img onClick={() => Number(pdfDocument?.numPages) === page ? {} : setPage(page + 1)} src="https://cdn.shopify.com/s/files/1/2393/2199/files/chevron_right_black.svg?v=1724078331" />

            </div>
        )}
    </>
}
export default PdfReader;