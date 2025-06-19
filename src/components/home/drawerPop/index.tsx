import { useProduct } from "@/Context/productContext";

const DrawerPop = () =>{
    const { barcode, product } = useProduct();
    return(
        <div className={`fixed bg-white inset-0 flex transition-all duration-300 ${
				barcode ? "translate-x-0" : "translate-x-full"
			}`}>
            <div className="flex flex-col max-w-[1440px] w-full items-center">
                <div className="flex flex-row gap-2 font-bold text-4xl my-5">Food<span className="text-emerald-400">Draft</span></div>
                {barcode}
                {product?.productName}
            </div>
        </div>
    )

}
export default DrawerPop;