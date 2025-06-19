import { useProduct } from "@/Context/productContext";

const DrawerPop = () =>{
    const { barcode } = useProduct();
    return(
        <div className={`fixed bg-white inset-0 flex items-center ${
				barcode ? "translate-x-0" : "translate-x-full"
			}`}>
            <div className="flex flex-col max-w-[1440px] w-full"></div>
        </div>
    )

}
export default DrawerPop;